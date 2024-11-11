import { Goal, GoalStep, GoalStepAnswer } from '@/entities/goal';
import api from '@/utils/axiosApi';
import { randomID } from '@/utils/random-id';
import { z } from 'zod';

export class GoalController {
  private mapIdToGoal = new Map<string, Goal>();

  async GetGoals(): Promise<Goal[]> {
    // dados mocados, mas poderia executar busca 

    const requestShape = z.object({
      objetivos: z.array(
        z.object({
          Idt_objetivo: z.number(),
          Idt_titulo: z.number(),
          objetivo: z.string(),
          texto: z.string(),
          titulo: z.string(),
          bac_cor: z.string(),
          ultimaRespostaId: z.number().nullable(),
          des_passos: z.array(
            z.object({
              Idt_passo: z.number(),
              texto: z.string(),
              imagem: z.string().nullable(),
              ordem: z.number().nullable(),
              des_Passos_Respostas: z.array(
                z.object({
                  Idt_passo_resposta: z.number(),
                  texto: z.string(),
                  data_formatada: z.string(),
                  nom_usuario: z.string().nullable(),
                  semanas: z.string().nullable(),
                }),
              ),
            }),
          )
        }),
      ),
    });

    try {
      const response = await api.get("/ObjetivosLista", {
        params: {
          Idt_crianca: 69
        }
      })

      const result = requestShape.safeParse(response.data);

      if (result.error) return [];

      const goals = result.data.objetivos.map(_objetivo => {
        const goal = new Goal()

        goal.$clientId = randomID(16);
        goal.id = String(_objetivo.Idt_objetivo);
        goal.title = _objetivo.titulo;
        goal.text = _objetivo.texto;
        goal.title_id = String(_objetivo.Idt_titulo);
        goal.description = _objetivo.objetivo;
        goal.color = _objetivo.bac_cor;
        goal.last_goal_answered_id = _objetivo.ultimaRespostaId
          ? String(_objetivo.ultimaRespostaId)
          : null;

        goal.steps = _objetivo.des_passos.map(_passo => {
          const goalStep = new GoalStep();

          goalStep.$clientId = randomID(16);
          goalStep.id = String(_passo.Idt_passo);
          goalStep.description = _passo.texto;
          goalStep.order = _passo.ordem;
          goalStep.image = _passo.imagem;

          goalStep.asnwers = _passo.des_Passos_Respostas.map(_resposta => {
            const goalStepAsnwer = new GoalStepAnswer();

            goalStepAsnwer.$clientId = randomID(16);
            goalStepAsnwer.id = String(_resposta.Idt_passo_resposta);
            goalStepAsnwer.date_label = _resposta.data_formatada;
            goalStepAsnwer.description = _resposta.texto;
            goalStepAsnwer.userName = _resposta.nom_usuario;
            goalStepAsnwer.weeks = _resposta.semanas;

            return goalStepAsnwer;
          });

          return goalStep;
        });

        this.mapIdToGoal.set(goal.$clientId, goal);

        return goal;
      });

      return goals;

    } catch (error) {
      return []
    }


  };

  async FindGoalStep(goalClientId: string): Promise<Goal | undefined> {
    // atualmente buscando no map, mas existe possibilidade de buscar via id

    return this.mapIdToGoal.get(goalClientId);
  }



  async introGoal(): Promise<Goal> {
    const responseShape = z.object({
      objetivos: z.array(
        z.object({
          texto: z.string(),
        })
      )
    })

    const goal = new Goal()

    try{
      
      const response = await api.get("Objetivos",{
        params: {
          id: 5
        }
      })

      const result = responseShape.safeParse(response.data)

      if(result.error) return goal

      goal.text = result.data.objetivos[0].texto

    }catch (error){
      console.log(error)
    }

    return goal

  }
}