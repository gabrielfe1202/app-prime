import api from "@/utils/axiosApi";
import { z } from "zod";

export class ForgotPasswordController {
    async sendCode(email: string): Promise<{success: boolean, msg: string}> {
        const responseShape = z.object({
            success: z.boolean(),
            msg: z.string()
        })

        try {
            const response = await api.get("forgotpassword", {
                params: {
                    email
                }
            })

            const result = responseShape.safeParse(response.data)

            if(result.error) return {
                success: false,
                msg: "Erro ao enviar código"
            }

            return result.data

        } catch {
            return {
                success: false,
                msg: "Erro ao enviar código"
            }
        }
    }

    async verifyCode(code: string): Promise<{success: boolean, token: string}> {

        const responseShape = z.object({
            success: z.boolean(),
            token: z.string()
        })

        try {
            const response = await api.get("forgotpassword/verifyCode", {
                params: {
                    code
                }
            })

            const result = responseShape.safeParse(response.data)

            if(result.error) return {
                success: false,
                token: ""
            }

            return result.data

        } catch {
            return {
                success: false,
                token: ""
            }
        }
    }

    async changePassword(userToken: string,password: string): Promise<{success: boolean, msg: string}> {
        const responseShape = z.object({
            success: z.boolean(),
            msg: z.string()
        })

        try {
            const response = await api.get("forgotpassword/reset", {
                params: {
                    userToken,
                    password
                }
            })

            const result = responseShape.safeParse(response.data)

            if(result.error) return {
                success: false,
                msg: "Erro ao alterar senha"
            }

            return result.data

        } catch {
            return {
                success: false,
                msg: "Erro ao alterar senha"
            }
        }
    }


}