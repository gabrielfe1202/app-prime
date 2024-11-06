/*
  title              titulo
  goal               objetivo
  goal step          passos
  goal step asnwer   passos
*/

export class GoalTitle{
  Idt_titulo!: number;  
  titulo!: string; 
  ordem!: number;  
  ordem_app: number | null = null;
  imagem!: string;  
  imagem_app!: string;
  bac_cor!: string;  
  texto: string | null = null;  
  grafico!: number;  
  titulo_selected: string | null = null; 
  menu!: number;  
  objetivos: string | null = null;
  conclusao: string | null = null;
  ordem_objetivo!: number;
}

export class Goal {
  $clientId!: string;

  id!: string;

  title!: string;

  text!: string;

  title_id!: string;

  description!: string;

  last_goal_answered_id!: string | null;

  color!: string;

  steps: GoalStep[] = [];
}

export class GoalStep {
  $clientId!: string;

  id!: string;

  description!: string;

  image!: string | null;

  order!: number | null;

  asnwers: GoalStepAnswer[] = [];
}

export class GoalStepAnswer {
  $clientId!: string;

  id!: string;

  description!: string;

  date_label!: string;

  userName!: string | null;

  weeks!: string | null;
}

