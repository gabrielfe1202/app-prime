import { GoalTitle } from "@/entities/goal";
import api from "@/utils/axiosApi";
import { z } from 'zod'
import { DI } from "./DI";

export class TitleController {
    async GetTitles(token: string | null): Promise<GoalTitle[]> {
        const TituloSchema = z.object({
            Idt_titulo: z.number(),
            titulo: z.string().nullable(),
            ordem: z.number().nullable(),
            ordem_app: z.number().nullable(),
            imagem: z.string().url().nullable(),
            imagem_app: z.string().url().nullable(),
            bac_cor: z.string().nullable(),
            texto: z.string().nullable(),
            grafico: z.number().nullable(),
            titulo_selected: z.string().nullable(),
            menu: z.number().nullable(),
            objetivos: z.string().nullable(),
            conclusao: z.string().nullable(),
            ordem_objetivo: z.number().nullable(),
        });

        const requestSchema = z.object({
            titulos: z.array(TituloSchema),
        });

        try {
            const response = await api.get('/Titulos', {
                params: {
                    token
                }
            });

            const result = requestSchema.safeParse(response.data);

            if (result.error) return [];

            const titles = result.data.titulos.map(_titulo => {
                const title = new GoalTitle();

                title.Idt_titulo = _titulo.Idt_titulo;
                title.titulo = _titulo.titulo ?? '';
                title.ordem = _titulo.ordem ?? 0;
                title.bac_cor = _titulo.bac_cor ?? '';
                title.imagem = _titulo.imagem ?? '';
                title.imagem_app = _titulo.imagem_app ?? '';
                title.menu = _titulo.menu ?? 0;

                return title;

            })

            return titles

        } catch (error) {
            console.error('Erro na requisição', error);
            return []
        }

    }
}