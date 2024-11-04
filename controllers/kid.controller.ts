import { Kid } from "@/entities/kid";
import { z } from 'zod'

export class KidController {
    async kidInformations(): Promise<Kid> {
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
                educadoras: z.array(z.any()),
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

        return kid;

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
            "educadoras": [],
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
}