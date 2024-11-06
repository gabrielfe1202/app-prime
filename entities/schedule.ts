export class ScheduleConfigs {
    id!: number;
    
    startTime!: string;

    endTime!: string;

    datesAvailable: string[] = []
}

export class ScheduleTimes {
    id!:  number

    date!: string;

    dateLabel!: string
}