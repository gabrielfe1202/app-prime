import { ScheduleConfigs, ScheduleTimes } from "@/entities/schedule";
import { User } from "@/entities/user";
import api from "@/utils/axiosApi";
import { DateData } from "react-native-calendars";
import { z } from 'zod'

export class ScheduleController {
    async getConfigSchedule(id: number): Promise<ScheduleConfigs> {
        const agendaSchema = z.object({
            Idt_agenda_config: z.number().int(),
            horario_inicio: z.string().regex(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/),
            horario_fim: z.string().regex(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/),
            hora_intervalo: z.string().regex(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/),
            mes: z.string().length(2).regex(/^(0[1-9]|1[0-2])$/),
            ano: z.string().length(4).regex(/^\d{4}$/),
            data_ativa: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/),
            limite_datas: z.string().nullable(),
            horarios: z.unknown().nullable(),
            liberado: z.boolean(),
            agendado: z.boolean(),
            data_ativa_formatada: z.string(),
            data_agendada: z.string().nullable()
        });
        const datasSchema = z.object({
            datas: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
            agenda: agendaSchema
        });

        const configs = new ScheduleConfigs()

        try {

            const response = await api.get("Agenda", {
                params: {
                    Idt_Cri_Crianca: id
                }
            })

            const result = datasSchema.safeParse(response.data);

            if (result.error) return configs;

            configs.id = result.data.agenda.Idt_agenda_config;
            configs.startTime = result.data.agenda.horario_inicio;
            configs.endTime = result.data.agenda.horario_fim;
            configs.avable = result.data.agenda.liberado;
            configs.avableDate = result.data.agenda.data_ativa;
            configs.year = result.data.agenda.ano;
            configs.month = result.data.agenda.mes;
            configs.scheduled = result.data.agenda.agendado
            configs.scheduledDateLabel = result.data.agenda.data_agendada;
            configs.datesAvailable = result.data.datas;

        } catch (error) {
            console.error(error)
        }

        return configs;
    }

    async isAvailable(): Promise<{ avable: boolean, msg?: string }> {
        return {
            avable: true,
        }
    }

    async getTimesFromDate(date: DateData, id_cri: number): Promise<ScheduleTimes[]> {
        const timeSchema = z.object({
            Idt_age_horario: z.number(),
            data: z.string(),
            data_formata: z.string(),
        })

        const requestSchema = z.object({
            horarios: z.array(timeSchema)
        });

        try {

            const response = await api.get("Horarios", {
                params: {
                    Idt_Cri_Crianca: id_cri,
                    dia: date.day,
                    mes: date.month,
                    ano: date.year
                }
            })

            const result = requestSchema.safeParse(response.data);

            if (result.error) return [];

            const times = result.data.horarios.map(_horario => {
                const time = new ScheduleTimes()

                time.id = _horario.Idt_age_horario;
                time.date = _horario.data;
                time.dateLabel = _horario.data_formata;

                return time
            })

            return times

        } catch (error) {
            console.log(error)
            return []
        }
    }

    async scheduleTime(timeId: number, chilId: number): Promise<{ success: boolean, msg: string }> {

        const responseShape = z.object({
            success: z.boolean(),
            msg: z.string()
        })

        try {
            const response = await api.post("Horarios", {
                Idt_Cri_Crianca: chilId,
                Idt_age_horario: timeId
            })

            const result = responseShape.safeParse(response.data)

            if (result.error) return {
                success: false,
                msg: "Erro ao agendar"
            }

            return {
                success: result.data.success,
                msg: result.data.msg
            }

        } catch (error) {
            console.log(error)
            return {
                success: false,
                msg: "Erro ao agendar"
            }
        }

    }
}