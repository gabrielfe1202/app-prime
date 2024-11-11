import { Conclusion } from "@/entities/conclusion";
import { GoalTitle } from "@/entities/goal";
import api from "@/utils/axiosApi";
import { z } from "zod";

export class ConclusionController {
    async GetConclusions(id: number): Promise<{ conclusions: Conclusion[], title: GoalTitle }> {

        const concluionShape = z.object({
            Idt_conclusao: z.number(),
            texto: z.string(),
            data_formatada: z.string()
        })

        const requestShape = z.object({
            conclusao: z.array(concluionShape),
            titulo: z.object({
                Idt_titulo: z.number(),
                titulo: z.string(),
            })
        })

        try {
            const response = await api.get('/Conclusao', {
                params: {
                    id: id, 
                    idt_crianca: 69
                }
            });
    
            const result = requestShape.safeParse(response.data);
    
            if (result.error) {
                console.error('Erro de validação', result.error);
                return {
                    conclusions: [],
                    title: new GoalTitle()
                };
            }
    
            const conclusions = result.data.conclusao.map(_conclusao => {
                const conclusion = new Conclusion();
                conclusion.id = _conclusao.Idt_conclusao;
                conclusion.text = _conclusao.texto;
                conclusion.dateLabel = _conclusao.data_formatada;
                return conclusion;
            });
    
            const title = new GoalTitle();
            title.Idt_titulo = result.data.titulo.Idt_titulo;
            title.titulo = result.data.titulo.titulo;
    
            return {
                conclusions,
                title
            };
        } catch (error) {
            console.error('Erro na requisição', error);
            return {
                conclusions: [],
                title: new GoalTitle()
            };
        }
    }
}