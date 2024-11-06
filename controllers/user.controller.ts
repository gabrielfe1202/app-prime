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

    async isAuthenticated(): Promise<boolean> {
        return true
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

}