// forgotPasswordStore.ts
import { create } from 'zustand';
import api from '@/utils/axiosApi';
import { z } from 'zod';

type ForgotPasswordState = {
  email: string;
  token: string;
  setEmail: (email: string) => void;
  setToken: (token: string) => void;

  sendCode: (email: string) => Promise<{ success: boolean; msg: string }>;
  verifyCode: (code: string) => Promise<{ success: boolean; token: string; msg: string }>;
  changePassword: (userToken: string, password: string) => Promise<{ success: boolean; msg: string }>;
};

export const useForgotPasswordStore = create<ForgotPasswordState>((set) => ({
  email: '',
  token: '',

  setEmail: (email) => set({ email }),
  setToken: (token) => set({ token }),

  sendCode: async (email) => {
    const responseShape = z.object({
      success: z.boolean(),
      msg: z.string(),
    });

    try {
      const response = await api.get('forgotpassword', {
        params: { email },
      });

      const result = responseShape.safeParse(response.data);

      if (!result.success) return { success: false, msg: 'Erro ao enviar código' };
      return result.data;
    } catch {
      return { success: false, msg: 'Erro ao enviar código' };
    }
  },

  verifyCode: async (code) => {
    const responseShape = z.object({
      success: z.boolean(),
      msg: z.string(),
      token: z.string(),
    });

    try {
      const response = await api.get('forgotpassword/verifyCode', {
        params: { code },
      });

      const result = responseShape.safeParse(response.data);

      if (!result.success) return { success: false, token: '', msg: 'Código inválido' };
      return result.data;
    } catch {
      return { success: false, token: '', msg: 'Código inválido' };
    }
  },

  changePassword: async (userToken, password) => {
    const responseShape = z.object({
      success: z.boolean(),
      msg: z.string(),
    });

    try {
      const response = await api.get('forgotpassword/reset', {
        params: { userToken, password },
      });

      const result = responseShape.safeParse(response.data);

      if (!result.success) return { success: false, msg: 'Erro ao alterar senha' };
      return result.data;
    } catch {
      return { success: false, msg: 'Erro ao alterar senha' };
    }
  },
}));
