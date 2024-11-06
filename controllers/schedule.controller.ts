import { ScheduleConfigs } from "@/entities/schedule";
import { User } from "@/entities/user";
import { z } from 'zod'

export class ScheduleController {
    async getConfigSchedule(): Promise<ScheduleConfigs> {
        const agendaSchema = z.object({
            Idt_agenda_config: z.number().int(),
            horario_inicio: z.string().regex(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/), // Valida o formato de hora HH:MM:SS
            horario_fim: z.string().regex(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/), // Valida o formato de hora HH:MM:SS
            hora_intervalo: z.string().regex(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/), // Valida o formato de hora HH:MM:SS
            mes: z.string().length(2).regex(/^(0[1-9]|1[0-2])$/), // Valida o mês como dois dígitos
            ano: z.string().length(4).regex(/^\d{4}$/), // Valida o ano como quatro dígitos
            data_ativa: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/), // Valida o formato da data no padrão ISO 8601
            limite_datas: z.string().nullable(),
            horarios: z.unknown().nullable(),
            liberado: z.boolean(),
            agendado: z.boolean(),
            data_ativa_formatada: z.string(),
            data_agendada: z.unknown().nullable()
          });
          
          // Schema para a lista de datas
          const datasSchema = z.object({
            datas: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)), // Valida cada data no formato YYYY-MM-DD
            agenda: agendaSchema
          });

        const result = datasSchema.safeParse(this.data);        

        const configs = new ScheduleConfigs()

        if (result.error) return configs;

        configs.id = result.data.agenda.Idt_agenda_config;
        configs.startTime = result.data.agenda.horario_inicio;
        configs.endTime = result.data.agenda.horario_fim

        return configs;
    }

    async isAvailable(): Promise<{avable: boolean, msg?: string}> {
        return {
            avable: true,            
        }
    }

    private data = {
        "datas": [
            "2024-09-11",
            "2024-09-23",
            "2024-09-26"
        ],
        "agenda": {
            "Idt_agenda_config": 1,
            "horario_inicio": "07:00:00",
            "horario_fim": "19:00:00",
            "hora_intervalo": "00:15:00",
            "mes": "09",
            "ano": "2024",
            "data_ativa": "2023-11-27T10:37:23",
            "limite_datas": null,
            "horarios": null,
            "liberado": true,
            "agendado": false,
            "data_ativa_formatada": "27/11/2023 às 10:37",
            "data_agendada": null
        }
    }

}