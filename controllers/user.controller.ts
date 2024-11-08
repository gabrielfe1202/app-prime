import { Kid } from "@/entities/kid";
import { User } from "@/entities/user";
import { z } from 'zod'

export class UserController {
    async getUserInformations(): Promise<User> {
        const userSchema = z.object({
            Idt_usuario: z.number(),
            Nom_usuario: z.string(),
            Nom_login: z.string(),
            Img_usuario: z.string().nullable()
        });

        const requestSchema = z.object({
            usuario: userSchema
        })

        const result = requestSchema.safeParse(this.data);

        const user = new User()

        if (result.error) return user;

        user.id = result.data.usuario.Idt_usuario;
        user.name = result.data.usuario.Nom_usuario;
        user.email = result.data.usuario.Nom_login;
        user.imageUser = result.data.usuario.Img_usuario;

        return user;
    }

    private authtenticated: boolean = false;

    async isAuthenticated(): Promise<boolean> {
        return this.authtenticated
    }

    async login() {
        this.authtenticated = true;
    }

    async logout(){
        this.authtenticated = false;
    }

    async getUserChilds(): Promise<Kid[]> {
        const childShape = z.object({
            Idt_Cri_Crianca: z.number(),
            Nome: z.string(),
            email: z.string().nullable(),
            imagem: z.string().url(),
        });

        const requestShape = z.object({
            filhos: z.array(childShape)
        })

        const result = requestShape.safeParse(this.dataChild)

        if (result.error) return []

        const childs = result.data.filhos.map(_filho => {
            const child = new Kid()

            child.Idt_Cri_Crianca = _filho.Idt_Cri_Crianca;
            child.Nome = _filho.Nome;
            child.imagem = _filho.imagem;

            return child
        })

        return childs

    }

    private data = {
        "usuario": {
            "Idt_usuario": 3,
            "Idt_cliente": null,
            "Nom_cliente": null,
            "Idt_empresa": null,
            "Nom_empresa": null,
            "Idt_generico": null,
            "Nom_usuario": "André Dias",
            "Nom_user": null,
            "Nom_login": "andre@o2ew.com.br",
            "Nom_frase_senha": "",
            "Nom_login_criador": null,
            "Idc_usuario_ativo": true,
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
            "Idt_tip_equipe": 6,
            "tip_equipe": null,
            "Img_usuario": "https://sistema.primetimecd.com.br/imgsist/criancas/1411202200435669iaradonatodias.jpg",
            "End_endereco": null,
            "End_numero": null,
            "End_complemento": null,
            "End_cep": null,
            "End_bairro": null,
            "End_cidade": null,
            "End_estado": null,
            "End_comercial_endereco": null,
            "End_comercial_numero": null,
            "End_comercial_complemento": null,
            "End_comercial_cep": null,
            "End_comercial_bairro": null,
            "End_comercial_cidade": null,
            "End_comercial_estado": null,
            "Cpf_usuario": null,
            "Rg_usuario": null,
            "responsavel_financeiro": null,
            "equipe": null,
            "filho_ativo": 0
        }
    }

    private dataChild = {
        "filhos": [
            {
                "Idt_Cri_Crianca": 69,
                "Nome": "IARA DONATO DIAS",
                "email": null,
                "data_nasc": null,
                "data_bercario": null,
                "data_maternal": null,
                "endereco": null,
                "numero": null,
                "complemento": null,
                "cep": null,
                "bairro": null,
                "cidade": null,
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
                "tipo_sala": null,
                "sala": null,
                "nom_pasta": "69-16112023135122",
                "zip_foto": null,
                "Idt_site": null,
                "ativo": null,
                "ativo_sim": null,
                "titulos": null,
                "pais": null,
                "educadoras": null,
                "imagens": null,
                "reuniao": null,
                "agenda": null,
                "imagem": "https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140174.jpg",
                "data_formata": null,
                "imagem_crianca": null,
                "agora": "1032015114017",
                "contratos": 0,
                "contratos_m": 0
            },
            {
                "Idt_Cri_Crianca": 295,
                "Nome": "Criança para teste",
                "email": null,
                "data_nasc": null,
                "data_bercario": null,
                "data_maternal": null,
                "endereco": null,
                "numero": null,
                "complemento": null,
                "cep": null,
                "bairro": null,
                "cidade": null,
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
                "tipo_sala": null,
                "sala": null,
                "nom_pasta": "295-29082024111312",
                "zip_foto": null,
                "Idt_site": null,
                "ativo": null,
                "ativo_sim": null,
                "titulos": null,
                "pais": null,
                "educadoras": null,
                "imagens": null,
                "reuniao": null,
                "agenda": null,
                "imagem": "https://o2sistema.blob.core.windows.net/o2sistema/Primetime/295-29082024111312/media/295-290820241526251.jpg",
                "data_formata": null,
                "imagem_crianca": null,
                "agora": "29082024135742",
                "contratos": 0,
                "contratos_m": 0
            }
        ]
    }

}