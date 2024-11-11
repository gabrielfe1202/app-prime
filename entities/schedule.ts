export class ScheduleConfigs {
    id!: number;
    
    startTime!: string;

    endTime!: string;

    month!: string;

    year!: string;

    scheduled!: boolean;

    scheduledDateLabel!: string | null;

    datesAvailable: string[] = []

    public initialDate(): string {
        return this.year + "-" + this.month + "-01"
    }
}

export class ScheduleTimes {
    id!:  number

    date!: string;

    dateLabel!: string
}