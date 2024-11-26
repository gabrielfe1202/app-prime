import { GoalTitle } from "@/entities/goal";
import { Introduction } from "@/entities/Introduction";
import api from "@/utils/axiosApi";
import { z } from "zod";
import { decode } from 'html-entities';

export class IntroductionController {
    async GetIntros(id_cri: number): Promise<Introduction[]> {

        const introShape = z.object({
            Idt_introducao: z.number(),
            data: z.string(),
            texto: z.string(),
            titulo: z.string()
        })

        const requestShape = z.object({
            introducao: z.array(introShape)
        })

        try {
            const response = await api.get('/Introducao', {
                params: {
                    Idt_Cri_Crianca: id_cri
                }
            });

            const result = requestShape.safeParse(response.data);

            if (result.error) {
                console.error('Erro de validação', result.error);
                return [];
            }

            const introductions = result.data.introducao.map(_introducao => {
                const introduction = new Introduction();
                introduction.id = _introducao.Idt_introducao;
                introduction.date = _introducao.data;
                introduction.text = decode(_introducao.texto);
                introduction.title = _introducao.titulo;
                return introduction;
            });

            return introductions;
        } catch (error) {
            console.error('Erro na requisição', error);
            return [];
        }
    }
}