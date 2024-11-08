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
                    token: 'f0a625f7-e83b-4e20-8b40-03fb4606eaa8',
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

    private data = {
        "conclusao": [
            {
                "Idt_conclusao": 82,
                "Idt_titulo": null,
                "Idt_Cri_Crianca": null,
                "data": "2017-09-12T00:00:00",
                "ordem": null,
                "texto": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lorem nunc, blandit sit amet lectus quis, congue pulvinar elit. Mauris egestas erat sed magna ornare pretium. Praesent augue eros, aliquam eget commodo in, tempus id nulla. In feugiat ornare massa, nec tincidunt massa accumsan sit amet. Morbi aliquet tellus justo, id imperdiet enim tempor eget. Maecenas tincidunt viverra mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam convallis viverra orci quis pellentesque. Nulla non ligula pellentesque, posuere elit rutrum, convallis mi. Cras justo magna, sodales a finibus vel, lobortis sed ex. Aenean sit amet ex non ipsum dapibus tincidunt. Morbi gravida vel mauris ac finibus. Nunc sed consequat tellus. Nunc sit amet volutpat cras amet.",
                "publicar": 1,
                "autorizar": 1,
                "revisado": 1,
                "Idt_usuario_criacao": 1,
                "Idt_usuario_alteracao": null,
                "Idt_usuario_liberacao": 10,
                "bac_cor": "#999999",
                "data_formatada": "12/09/2017"
            },
            {
                "Idt_conclusao": 83,
                "Idt_titulo": null,
                "Idt_Cri_Crianca": null,
                "data": "2017-09-12T00:00:00",
                "ordem": null,
                "texto": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lorem nunc, blandit sit amet lectus quis, congue pulvinar elit. Mauris egestas erat sed magna ornare pretium. Praesent augue eros, aliquam eget commodo in, tempus id nulla. In feugiat ornare massa, nec tincidunt massa accumsan sit amet. Morbi aliquet tellus justo, id imperdiet enim tempor eget. Maecenas tincidunt viverra mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam convallis viverra orci quis pellentesque. Nulla non ligula pellentesque, posuere elit rutrum, convallis mi. Cras justo magna, sodales a finibus vel, lobortis sed ex. Aenean sit amet ex non ipsum dapibus tincidunt. Morbi gravida vel mauris ac finibus. Nunc sed consequat tellus. Nunc sit amet volutpat cras amet.",
                "publicar": 1,
                "autorizar": 1,
                "revisado": 1,
                "Idt_usuario_criacao": 1,
                "Idt_usuario_alteracao": null,
                "Idt_usuario_liberacao": 10,
                "bac_cor": "#999999",
                "data_formatada": "12/09/2017"
            },
            {
                "Idt_conclusao": 366,
                "Idt_titulo": null,
                "Idt_Cri_Crianca": null,
                "data": "2019-11-27T00:00:00",
                "ordem": null,
                "texto": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "publicar": 1,
                "autorizar": 1,
                "revisado": 1,
                "Idt_usuario_criacao": 1,
                "Idt_usuario_alteracao": null,
                "Idt_usuario_liberacao": 69,
                "bac_cor": "#999999",
                "data_formatada": "27/11/2019"
            },
            {
                "Idt_conclusao": 801,
                "Idt_titulo": null,
                "Idt_Cri_Crianca": null,
                "data": "2023-08-09T00:00:00",
                "ordem": null,
                "texto": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.  The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
                "publicar": 1,
                "autorizar": 1,
                "revisado": 1,
                "Idt_usuario_criacao": 1,
                "Idt_usuario_alteracao": null,
                "Idt_usuario_liberacao": 1,
                "bac_cor": "#999999",
                "data_formatada": "09/08/2023"
            }
        ],
        "titulo": {
            "Idt_titulo": 6,
            "titulo": "Considerações finais",
            "ordem": 7,
            "ordem_app": null,
            "imagem": "https://sistema.primetimecd.com.br/imgsist/titulos/consideracoes.png",
            "imagem_app": null,
            "bac_cor": "#999999",
            "texto": null,
            "grafico": 0,
            "titulo_selected": null,
            "menu": null,
            "objetivos": null,
            "conclusao": null,
            "ordem_objetivo": null
        }
    }

}