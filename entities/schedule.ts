export class ScheduleConfigs {
    id!: number;
    
    startTime!: string;

    endTime!: string;

    avable!: boolean;

    avableDate!: string;

    month!: string;

    year!: string;

    scheduled!: boolean;

    scheduledDateLabel!: string | null;

    datesAvailable: string[] = []

    public initialDate(): string {
        return this.year + "-" + this.month + "-01"
    }

    public timeSclice(){
        const dataRecebidaObj = new Date(this.avableDate);
        const dataAtual = new Date();    
        const diferencaMs = dataRecebidaObj.getTime() - dataAtual.getTime();    
        return diferencaMs / 1000;
    }
    
}

export class ScheduleTimes {
    id!:  number

    date!: string;

    dateLabel!: string
}