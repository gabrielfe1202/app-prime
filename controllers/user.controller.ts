import { Kid } from "@/entities/kid";
import { User } from "@/entities/user";
import { z } from 'zod'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isNullOrEmpty } from "@/utils/stringFunctions";
import api from "@/utils/axiosApi";
import { Address } from "@/objectValues/address";
import { Phone } from "@/objectValues/phone";

type LoginResponse = {
    status: "SUCCESS",
    token: string
} | {
    status: "ERROR",
    msg: string
}

export class UserController {
    async getUserInformations(): Promise<User> {
        const userSchema = z.object({
            Idt_usuario: z.number(),
            Nom_usuario: z.string(),
            Nom_login: z.string(),
            Img_usuario: z.string().nullable(),
            End_endereco: z.string().nullable(),
            End_numero: z.string().nullable(),
            End_complemento: z.string().nullable(),
            End_cep: z.string().nullable(),
            End_bairro: z.string().nullable(),
            End_cidade: z.string().nullable(),
            End_estado: z.string().nullable(),
            nom_telefone: z.string().nullable(),
            nom_celular: z.string().nullable(),
        });

        const requestSchema = z.object({
            usuario: userSchema
        })

        const user = new User()

        try {
            const response = await api.get('/Dados');

            const result = requestSchema.safeParse(response.data);

            if (result.error) return user;

            user.id = result.data.usuario.Idt_usuario;
            user.name = result.data.usuario.Nom_usuario;
            user.email = result.data.usuario.Nom_login;
            user.imageUser = result.data.usuario.Img_usuario;
            user.phone = new Phone(result.data.usuario.nom_telefone)
            user.cellPhone = new Phone(result.data.usuario.nom_celular)

            const address = new Address()

            address.setAddress(result.data.usuario.End_endereco, result.data.usuario.End_numero, result.data.usuario.End_complemento, result.data.usuario.End_bairro, result.data.usuario.End_cidade, result.data.usuario.End_estado, result.data.usuario.End_cep)

            if (address.validateAddress()) {
                user.address = address;
            }

        } catch (error) {
            console.error(error)
        }

        return user;
    }

    async getToken(): Promise<string | null> {
        const token = await AsyncStorage.getItem('@Primeapp:usertoken');
        return token;
    }

    async isAuthenticated(): Promise<boolean> {
        const token = await this.getToken()
        return !isNullOrEmpty(token)
    }

    async login(user: string, password: string): Promise<LoginResponse> {

        try {
            const requestShape = z.object({
                token: z.string().optional(),
                errorMsg: z.string().optional()
            })

            const response = await api.post('/login/', {
                "login": user,
                "senha": password
            });

            const result = requestShape.safeParse(response.data)

            if (result.error) return {
                status: "ERROR",
                msg: "Erro ao efetuar login",
            }

            if (result.data.errorMsg !== undefined) {
                return {
                    status: "ERROR",
                    msg: result.data.errorMsg,
                }
            }

            if (result.data.token !== undefined) {
                await AsyncStorage.setItem('@Primeapp:usertoken', result.data.token)
                return {
                    status: "SUCCESS",
                    token: result.data.token
                }
            }

            return {
                status: "ERROR",
                msg: "Erro ao efetuar login",
            }
        } catch (error) {
            console.error('Erro na requisição', error);
            return {
                status: "ERROR",
                msg: "Erro ao efetuar login",
            }
        }
    }

    async logout(): Promise<void> {
        await AsyncStorage.removeItem('@Primeapp:usertoken')
    }

    async getUserChilds(): Promise<Kid[]> {
        const childShape = z.object({
            Idt_Cri_Crianca: z.number(),
            Nome: z.string(),
            email: z.string().nullable(),
            imagem: z.string().url().nullable(),
        });

        const requestShape = z.object({
            filhos: z.array(childShape)
        })

        try {
            const response = await api.get("/Filhos")

            const result = requestShape.safeParse(response.data)

            if (result.error) return []

            const childs = result.data.filhos.map(_filho => {
                const child = new Kid()

                child.Idt_Cri_Crianca = _filho.Idt_Cri_Crianca;
                child.Nome = _filho.Nome;
                child.imagem = _filho.imagem ?? 'https://sistema.primetimecd.com.br/images/logo-primetime2.png';

                return child
            })

            return childs

        } catch (error) {
            console.log(error)
            return []
        }
    }

    async ChangePassword(password: string, newPassword: string): Promise<{ success: boolean, msg: string, token?: string }> {
        const responseShape = z.object({
            success: z.boolean(),
            msg: z.string(),
            token: z.string().optional()
        })

        try {
            const response = await api.get("ChangePassword", {
                params: {
                    password,
                    newPassword
                }
            })

            const result = responseShape.safeParse(response.data)

            if (result.error) return {
                success: false,
                msg: "Erro ao alterar senha"
            }

            await AsyncStorage.removeItem('@Primeapp:usertoken')

            return result.data;

        } catch {
            return {
                success: false,
                msg: "Erro ao alterar senha"
            }
        }
    }

    async updateInformations(email: string, phone: string, cellPhone: string, address: Address) {

        const responseShape = z.object({
            success: z.boolean(),
            msg: z.string(),
        })

        try {

            const response = await api.post('/Dados', {
                email,
                phone,
                cellPhone,
                address
            })

            const result = responseShape.safeParse(response.data)

            if (result.error) {
                throw new Error("Ocorreu um erro ao alterar dados")
            }

            if(result.data.success){
                throw new Error(result.data.msg)
            }

            return result.data

        } catch {
            throw new Error("Erro ao alterar dados")
        }
    }
}