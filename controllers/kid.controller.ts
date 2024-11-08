import { Kid, KidImage } from "@/entities/kid";
import { User } from "@/entities/user";
import api from "@/utils/axiosApi";
import { z } from 'zod'

export class KidController {
    private Id: number = 0;

    setId(id: number) {
        this.Id = id
    }

    getId(): number {
        return this.Id
    }

    async kidInformations(): Promise<Kid> {

        const userSchema = z.object({
            Idt_usuario: z.number(),
            Nom_usuario: z.string(),
            Nom_login: z.string().nullable(),
            Img_usuario: z.string().nullable()
        })

        const requestShape = z.object({
            crianca: z.object({
                Idt_Cri_Crianca: z.number(),
                Nome: z.string(),
                email: z.string().nullable(),
                data_nasc: z.string().refine((val) => !isNaN(Date.parse(val)), {
                    message: "Invalid date format"
                }),
                data_bercario: z.string().nullable(),
                data_maternal: z.string().nullable(),
                endereco: z.string(),
                numero: z.string(),
                complemento: z.string(),
                cep: z.string(),
                bairro: z.string(),
                cidade: z.string(),
                estado: z.string().nullable(),
                nome_ped: z.string().nullable(),
                email_ped: z.string().nullable(),
                telefone_ped: z.string().nullable(),
                endereco_ped: z.string().nullable(),
                numero_ped: z.string().nullable(),
                complemento_ped: z.string().nullable(),
                cep_ped: z.string().nullable(),
                bairro_ped: z.string().nullable(),
                cidade_ped: z.string().nullable(),
                estado_ped: z.string().nullable(),
                tipo_sala: z.string(),
                sala: z.string(),
                nom_pasta: z.string(),
                zip_foto: z.string().nullable(),
                Idt_site: z.string().nullable(),
                ativo: z.boolean().nullable(),
                ativo_sim: z.boolean().nullable(),
                titulos: z.string().nullable(),
                pais: z.string().nullable(),
                educadoras: z.array(userSchema),
                imagens: z.string().nullable(),
                reuniao: z.string().nullable(),
                agenda: z.string().nullable(),
                imagem: z.string().url(),
                data_formata: z.string(),
                imagem_crianca: z.string().nullable(),
                agora: z.string(),
                contratos: z.number(),
                contratos_m: z.number(),
            }),
        });

        const kid = new Kid();

        try {
            const response = await api.get('/Crianca_dados', {
                params: {
                    id: this.Id,
                    token: 'f0a625f7-e83b-4e20-8b40-03fb4606eaa8'
                }
            });

            const result = requestShape.safeParse(response.data);


            if (result.error) return kid;

            kid.populate(result.data.crianca)

            kid.educadoras = result.data.crianca.educadoras.map(edu => {
                const user = new User()

                user.id = edu.Idt_usuario;
                user.name = edu.Nom_usuario;

                return user;
            })
        } catch (error) {
            console.error('Erro na requisição', error);
        }

        return kid;

    }

    async getImagesGallery(): Promise<{ years: string[], images: KidImage[] }> {
        const imageShape = z.object({
            Idt_Cri_Imagem: z.number(),
            link: z.string(),
            link_media: z.string(),
            link_pequena: z.string(),
            ano: z.string(),
        })

        const requestShape = z.object({
            ano: z.array(z.string()),
            imagens: z.array(imageShape)
        })

        try {
            const response = await api.get('/Cri_imagem', {
                params: {
                    id: this.Id,
                    token: 'f0a625f7-e83b-4e20-8b40-03fb4606eaa8'
                }
            });

            const result = requestShape.safeParse(response.data);

            if (result.error) return { years: [], images: [] }

            const images = result.data.imagens.map(_img => {
                const image = new KidImage()

                image.id = _img.Idt_Cri_Imagem;
                image.link = _img.link;
                image.linkMedium = _img.link_media;
                image.linkSmall = _img.link_pequena;
                image.year = _img.ano;

                return image
            })

            const years = result.data.ano
            years.unshift('Todos')

            return {
                years,
                images
            }

        } catch (error) {
            console.error('Erro na requisição', error);
            return { years: [], images: [] }
        }

    }
}