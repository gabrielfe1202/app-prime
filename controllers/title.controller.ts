import { GoalTitle } from "@/entities/goal";
import { z } from 'zod'

export class TitleController {
    async GetTitles(): Promise<GoalTitle[]> {
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
          
          const TitulosSchema = z.object({
            titulos: z.array(TituloSchema), 
          });

        const result = TitulosSchema.safeParse(this.data);
console.log("reesult", result)
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

        return titles;

    }

    private data = {
        "titulos": [
            {
                "Idt_titulo": 1,
                "titulo": "Desenvolvimento Sócio Emocional",
                "ordem": 3,
                "ordem_app": null,
                "imagem": "https://sistema.primetimecd.com.br/imgsist/titulos/coracao.png",
                "imagem_app": "https://sistema.primetimecd.com.br/imgsist/titulos/icones/coracao2.png",
                "bac_cor": "#00adef",
                "texto": null,
                "grafico": 1,
                "titulo_selected": null,
                "menu": 1,
                "objetivos": null,
                "conclusao": null,
                "ordem_objetivo": 1
            },
            {
                "Idt_titulo": 2,
                "titulo": "Desenvolvimento Físico",
                "ordem": 4,
                "ordem_app": null,
                "imagem": "https://sistema.primetimecd.com.br/imgsist/titulos/bola.png",
                "imagem_app": "https://sistema.primetimecd.com.br/imgsist/titulos/icones/bola2.png",
                "bac_cor": "#ea7323",
                "texto": null,
                "grafico": 1,
                "titulo_selected": null,
                "menu": 1,
                "objetivos": null,
                "conclusao": null,
                "ordem_objetivo": 10
            },
            {
                "Idt_titulo": 3,
                "titulo": "Desenvolvimento Cognitivo",
                "ordem": 5,
                "ordem_app": null,
                "imagem": "https://sistema.primetimecd.com.br/imgsist/titulos/dados.png",
                "imagem_app": "https://sistema.primetimecd.com.br/imgsist/titulos/icones/dados2.png",
                "bac_cor": "#e5b724",
                "texto": null,
                "grafico": 1,
                "titulo_selected": null,
                "menu": 1,
                "objetivos": null,
                "conclusao": null,
                "ordem_objetivo": 12
            },
            {
                "Idt_titulo": 4,
                "titulo": "Desenvolvimento da Linguagem",
                "ordem": 6,
                "ordem_app": null,
                "imagem": "https://sistema.primetimecd.com.br/imgsist/titulos/livros1.png",
                "imagem_app": "https://sistema.primetimecd.com.br/imgsist/titulos/icones/livros2.png",
                "bac_cor": "#ed3c96",
                "texto": null,
                "grafico": 1,
                "titulo_selected": null,
                "menu": 1,
                "objetivos": null,
                "conclusao": null,
                "ordem_objetivo": 20
            },
            {
                "Idt_titulo": 7,
                "titulo": "Relatório de Adaptação",
                "ordem": 1,
                "ordem_app": 1,
                "imagem": "https://sistema.primetimecd.com.br/imgsist/titulos/relatorio.jpg",
                "imagem_app": null,
                "bac_cor": "#999999",
                "texto": null,
                "grafico": 0,
                "titulo_selected": null,
                "menu": 2,
                "objetivos": null,
                "conclusao": null,
                "ordem_objetivo": 1
            },
            {
                "Idt_titulo": 9,
                "titulo": "Educação Nutricional",
                "ordem": 2,
                "ordem_app": 2,
                "imagem": "https://sistema.primetimecd.com.br/imgsist/titulos/edualimentarv.jpg",
                "imagem_app": null,
                "bac_cor": "#999999",
                "texto": null,
                "grafico": 0,
                "titulo_selected": null,
                "menu": 2,
                "objetivos": null,
                "conclusao": null,
                "ordem_objetivo": 1
            },
            {
                "Idt_titulo": 5,
                "titulo": "Introdução",
                "ordem": 2,
                "ordem_app": 3,
                "imagem": "https://sistema.primetimecd.com.br/imgsist/titulos/introducao.png",
                "imagem_app": null,
                "bac_cor": "#999999",
                "texto": null,
                "grafico": 0,
                "titulo_selected": null,
                "menu": 1,
                "objetivos": null,
                "conclusao": null,
                "ordem_objetivo": 1
            },
            {
                "Idt_titulo": 6,
                "titulo": "Considerações finais",
                "ordem": 7,
                "ordem_app": 4,
                "imagem": "https://sistema.primetimecd.com.br/imgsist/titulos/consideracoes.png",
                "imagem_app": null,
                "bac_cor": "#999999",
                "texto": null,
                "grafico": 0,
                "titulo_selected": null,
                "menu": 1,
                "objetivos": null,
                "conclusao": null,
                "ordem_objetivo": 1
            }
        ]
    }

}