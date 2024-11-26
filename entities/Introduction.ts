export class Introduction {
    id!: number;
    date!: string;
    text!: string;
    title!: string;

    dateFormated(): string{
        const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
        const date = new Date(this.date)
        return months[date.getMonth()] + " de " + date.getFullYear()
    }
}