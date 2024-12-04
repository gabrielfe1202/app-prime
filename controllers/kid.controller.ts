import { Kid, KidImage, ZipImage } from "@/entities/kid";
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
                data_nasc: z.string().refine((val) => !isNaN(Date.parse(val)), {
                    message: "Invalid date format"
                }),                
                tipo_sala: z.string(),
                sala: z.string().nullable(),                
                zip_foto: z.string().nullable(),                                
                educadoras: z.array(userSchema),
                imagem: z.string().nullable(),
                data_formata: z.string(),
                imagem_crianca: z.string().nullable(),
            }),
        });

        const kid = new Kid();

        try {
            const response = await api.get('/Crianca_dados', {
                params: {
                    id: this.Id                  
                }
            });

            const result = requestShape.safeParse(response.data)

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
                    id: this.Id
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

    async listZips(): Promise<ZipImage[]> {
        const zipSchema = z.object({
            Idt_cri_zip: z.number(),
            Idt_Cri_Crianca: z.number(),
            ano: z.string(),
            link: z.string(),
            data_gerado: z.string()
        })

        const requestShape = z.object({
            zips: z.array(zipSchema)
        })

        try{
            const response = await api.get('/ZipFotos', {
                params: {
                    idt_crianca: this.Id
                }
            });

            const result = requestShape.safeParse(response.data);

            if (result.error) return []

            const zips = result.data.zips.map(_zip => {
                const zip = new ZipImage()

                zip.Id = _zip.Idt_cri_zip;
                zip.IdChild = _zip.Idt_Cri_Crianca;
                zip.date = _zip.ano;
                zip.link = _zip.link;
                zip.createdAt = _zip.data_gerado

                return zip
            })

            return zips

        }catch{
            return []
        }

        return []
    }
}