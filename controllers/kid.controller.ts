import { Kid, KidImage } from "@/entities/kid";
import { User } from "@/entities/user";
import { number, z } from 'zod'

export class KidController {
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
        const result = requestShape.safeParse(this.data);

        if (result.error) return kid;

        kid.populate(result.data.crianca)

        kid.educadoras = result.data.crianca.educadoras.map(edu => {
            const user = new User()

            user.id = edu.Idt_usuario;
            user.name = edu.Nom_usuario;

            return user;
        })
        
        return kid;

    }

    async getImagesGallery(): Promise<KidImage[]> {
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

        const result = requestShape.safeParse(this.dataImages)

        if(result.error) return []

        const images = result.data.imagens.map(_img => {
            const image = new KidImage()

            image.id = _img.Idt_Cri_Imagem;
            image.link = _img.link;
            image.linkMedium = _img.link_media;
            image.linkSmall = _img.link_pequena;
            image.year = _img.ano;

            return image
        })

        return images

    }

    private data = {
        "crianca": {
            "Idt_Cri_Crianca": 69,
            "Nome": "IARA DONATO DIAS",
            "email": null,
            "data_nasc": "2014-08-20T00:00:00",
            "data_bercario": null,
            "data_maternal": null,
            "endereco": "rua vaz muniz",
            "numero": "222",
            "complemento": "casa",
            "cep": "02043-081",
            "bairro": "jd frança",
            "cidade": "são paulo2",
            "estado": null,
            "nome_ped": null,
            "email_ped": null,
            "telefone_ped": null,
            "endereco_ped": null,
            "numero_ped": null,
            "complemento_ped": null,
            "cep_ped": null,
            "bairro_ped": null,
            "cidade_ped": null,
            "estado_ped": null,
            "tipo_sala": "m",
            "sala": "teste sala",
            "nom_pasta": "69-16112023135122",
            "zip_foto": null,
            "Idt_site": null,
            "ativo": null,
            "ativo_sim": null,
            "titulos": null,
            "pais": null,
            "educadoras": [
                {
                    "Idt_usuario": 478,
                    "Idt_cliente": null,
                    "Nom_cliente": null,
                    "Idt_empresa": null,
                    "Nom_empresa": null,
                    "Idt_generico": null,
                    "Nom_usuario": "educadora",
                    "Nom_user": null,
                    "Nom_login": null,
                    "Nom_frase_senha": null,
                    "Nom_login_criador": null,
                    "Idc_usuario_ativo": null,
                    "Nom_usuario_ativo": null,
                    "Sal": "00000000-0000-0000-0000-000000000000",
                    "Idt_Programa": null,
                    "Nom_Programa": null,
                    "nom_telefone": null,
                    "nom_celular": null,
                    "nom_funcao": null,
                    "Tip_equipe": null,
                    "Ult_login": null,
                    "DataFormatada": null,
                    "Idt_tip_equipe": null,
                    "tip_equipe": null,
                    "Img_usuario": null,
                    "End_endereco": "  ",
                    "End_numero": null,
                    "End_complemento": null,
                    "End_cep": null,
                    "End_bairro": null,
                    "End_cidade": null,
                    "End_estado": null,
                    "End_comercial_endereco": "  ",
                    "End_comercial_numero": null,
                    "End_comercial_complemento": null,
                    "End_comercial_cep": null,
                    "End_comercial_bairro": null,
                    "End_comercial_cidade": null,
                    "End_comercial_estado": null,
                    "Cpf_usuario": null,
                    "Rg_usuario": null,
                    "responsavel_financeiro": null,
                    "equipe": "Educadora",
                    "filho_ativo": 0
                }
            ],
            "imagens": null,
            "reuniao": null,
            "agenda": null,
            "imagem": "https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140174.jpg",
            "data_formata": "20/08/2014",
            "imagem_crianca": null,
            "agora": "1032015114017",
            "contratos": 0,
            "contratos_m": 0
        }
    }

    private dataImages = {
        "ano": [
            "2018-02"
        ],
        "imagens": [
            {
                "Idt_Cri_Imagem": 102321,
                "Idt_Cri_Crianca": null,
                "ordem": null,
                "link": "https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/grande/10320151140174.jpg",
                "link_media": "https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140174.jpg",
                "link_pequena": "https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/pequena/10320151140174.jpg",
                "rotulo": null,
                "data": "2018-08-21T18:27:35",
                "ano": "2018-02",
                "publicar": null,
                "publicados": null,
                "nao_publi": null,
                "nom_pasta": null,
                "agora": null
            },
            {
                "Idt_Cri_Imagem": 102323,
                "Idt_Cri_Crianca": null,
                "ordem": null,
                "link": "https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/grande/10320151140173.jpg",
                "link_media": "https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140173.jpg",
                "link_pequena": "https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/pequena/10320151140173.jpg",
                "rotulo": null,
                "data": "2018-08-21T18:27:31",
                "ano": "2018-02",
                "publicar": null,
                "publicados": null,
                "nao_publi": null,
                "nom_pasta": null,
                "agora": null
            },
            {
                "Idt_Cri_Imagem": 102325,
                "Idt_Cri_Crianca": null,
                "ordem": null,
                "link": "https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/grande/10320151140176.jpg",
                "link_media": "https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140176.jpg",
                "link_pequena": "https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/pequena/10320151140176.jpg",
                "rotulo": null,
                "data": "2018-08-27T18:27:15",
                "ano": "2018-02",
                "publicar": null,
                "publicados": null,
                "nao_publi": null,
                "nom_pasta": null,
                "agora": null
            }
        ]
    }
}