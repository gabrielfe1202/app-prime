import { User } from "./user";

export class Kid {

    public Idt_Cri_Crianca!: number | null;
    public Nome!: string;
    public data_nasc!: string;
    public tipo_sala!: string;
    public sala!: string;    
    public zip_foto!: string | null;    
    public titulos!: string | null;    
    public educadoras!: User[];            
    public imagem!: string;
    public data_formata!: string;
    public imagem_crianca!: string | null;    

    populate(validatedData: any) {
        this.Idt_Cri_Crianca = validatedData.Idt_Cri_Crianca;
        this.Nome = validatedData.Nome;
        this.data_nasc = validatedData.data_nasc;
        this.tipo_sala = validatedData.tipo_sala;
        this.sala = validatedData.sala;
        this.zip_foto = validatedData.zip_foto;
        this.titulos = validatedData.titulos;
        this.educadoras = validatedData.educadoras;
        this.imagem = validatedData.imagem;
        this.data_formata = validatedData.data_formata;
        this.imagem_crianca = validatedData.imagem_crianca;
    }
}

export class KidImage {
    id!: number;

    link!: string;

    linkMedium!: string;

    linkSmall!: string;

    year!: string;
}

export class ZipImage {
    Id!: number;
    IdChild!: number;
    date!: string;
    link!: string;
    createdAt!: string
    url!: string
}