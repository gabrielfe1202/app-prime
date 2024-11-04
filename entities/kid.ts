export class Kid {

    public Idt_Cri_Crianca: number | null;
    public Nome: string;
    public email: string | null;
    public data_nasc: string;
    public data_bercario: string | null;
    public data_maternal: string | null;
    public endereco: string;
    public numero: string;
    public complemento: string;
    public cep: string;
    public bairro: string;
    public cidade: string;
    public estado: string | null;
    public nome_ped: string | null;
    public email_ped: string | null;
    public telefone_ped: string | null;
    public endereco_ped: string | null;
    public numero_ped: string | null;
    public complemento_ped: string | null;
    public cep_ped: string | null;
    public bairro_ped: string | null;
    public cidade_ped: string | null;
    public estado_ped: string | null;
    public tipo_sala: string;
    public sala: string;
    public nom_pasta: string;
    public zip_foto: string | null;
    public Idt_site: string | null;
    public ativo: boolean | null;
    public ativo_sim: boolean | null;
    public titulos: string | null;
    public pais: string | null;
    public educadoras: any[]; // Ajuste conforme a estrutura de educadoras
    public imagens: string | null;
    public reuniao: string | null;
    public agenda: string | null;
    public imagem: string;
    public data_formata: string;
    public imagem_crianca: string | null;
    public agora: string;
    public contratos: number;
    public contratos_m: number;


    constructor() {
        // Inicializa as propriedades com valores padrão
        this.Idt_Cri_Crianca = null;
        this.Nome = '';
        this.email = null;
        this.data_nasc = '';
        this.data_bercario = null;
        this.data_maternal = null;
        this.endereco = '';
        this.numero = '';
        this.complemento = '';
        this.cep = '';
        this.bairro = '';
        this.cidade = '';
        this.estado = null;
        this.nome_ped = null;
        this.email_ped = null;
        this.telefone_ped = null;
        this.endereco_ped = null;
        this.numero_ped = null;
        this.complemento_ped = null;
        this.cep_ped = null;
        this.bairro_ped = null;
        this.cidade_ped = null;
        this.estado_ped = null;
        this.tipo_sala = '';
        this.sala = '';
        this.nom_pasta = '';
        this.zip_foto = null;
        this.Idt_site = null;
        this.ativo = null;
        this.ativo_sim = null;
        this.titulos = null;
        this.pais = null;
        this.educadoras = [];
        this.imagens = null;
        this.reuniao = null;
        this.agenda = null;
        this.imagem = '';
        this.data_formata = '';
        this.imagem_crianca = null;
        this.agora = '';
        this.contratos = 0;
        this.contratos_m = 0;
    }

    populate(validatedData: any) {
        this.Idt_Cri_Crianca = validatedData.Idt_Cri_Crianca;
        this.Nome = validatedData.Nome;
        this.email = validatedData.email;
        this.data_nasc = validatedData.data_nasc;
        this.data_bercario = validatedData.data_bercario;
        this.data_maternal = validatedData.data_maternal;
        this.endereco = validatedData.endereco;
        this.numero = validatedData.numero;
        this.complemento = validatedData.complemento;
        this.cep = validatedData.cep;
        this.bairro = validatedData.bairro;
        this.cidade = validatedData.cidade;
        this.estado = validatedData.estado;
        this.nome_ped = validatedData.nome_ped;
        this.email_ped = validatedData.email_ped;
        this.telefone_ped = validatedData.telefone_ped;
        this.endereco_ped = validatedData.endereco_ped;
        this.numero_ped = validatedData.numero_ped;
        this.complemento_ped = validatedData.complemento_ped;
        this.cep_ped = validatedData.cep_ped;
        this.bairro_ped = validatedData.bairro_ped;
        this.cidade_ped = validatedData.cidade_ped;
        this.estado_ped = validatedData.estado_ped;
        this.tipo_sala = validatedData.tipo_sala;
        this.sala = validatedData.sala;
        this.nom_pasta = validatedData.nom_pasta;
        this.zip_foto = validatedData.zip_foto;
        this.Idt_site = validatedData.Idt_site;
        this.ativo = validatedData.ativo;
        this.ativo_sim = validatedData.ativo_sim;
        this.titulos = validatedData.titulos;
        this.pais = validatedData.pais;
        this.educadoras = validatedData.educadoras;
        this.imagens = validatedData.imagens;
        this.reuniao = validatedData.reuniao;
        this.agenda = validatedData.agenda;
        this.imagem = validatedData.imagem;
        this.data_formata = validatedData.data_formata;
        this.imagem_crianca = validatedData.imagem_crianca;
        this.agora = validatedData.agora;
        this.contratos = validatedData.contratos;
        this.contratos_m = validatedData.contratos_m;
    }

  }
  