import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Calendar, DateData, LocaleConfig } from "react-native-calendars"
import { DayState } from "react-native-calendars/src/types"

import { Feather } from "@expo/vector-icons"

import { ptBR } from "../../../utils/localeCalendarConfig"
import { styles } from "./CalendarStyles"
import { colors } from "@/app/globalStyle"

LocaleConfig.locales["pt-br"] = ptBR
LocaleConfig.defaultLocale = "pt-br"

interface CalendarComponentProps {
    markedDates: string[];
    onDayPress: (day: DateData) => void;
    initDate: string;
}

export function CalendarComponent({ markedDates, onDayPress, initDate }: CalendarComponentProps) {
    const [day, setDay] = useState<DateData>()

    return (
        <View style={styles.container}>
            <Calendar
                style={[
                    styles.calendar,
                    {
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.36,
                        shadowRadius: 6.68,
                        elevation: 11,
                    },
                ]}
                initialDate={initDate}
                renderArrow={(direction: "right" | "left") => (
                    <Feather size={24} color="#515151" name={`chevron-${direction}`} />
                )}
                headerStyle={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#E8E8E8",
                    paddingBottom: 10,
                    marginBottom: 10,
                    color: "#515151"
                }}
                theme={{
                    textMonthFontSize: 18,
                    textSectionTitleColor: '#515151',
                    dayTextColor: '#515151',
                    monthTextColor: '#515151',
                    textDayHeaderFontWeight: 'bold',
                    textDayHeaderColor: 'purple',
                    arrowStyle: {
                        margin: 0,
                        padding: 0,
                    },
                }}
                minDate={new Date().toDateString()}
                dayComponent={({ date, state }: { date: DateData; state: DayState }) => {
                    const isMarked = markedDates.includes(date.dateString);
                    const isSelected = date.dateString === day?.dateString;

                    if (state === "inactive" || state === "disabled") {
                        return (
                            <View
                                key={date.dateString}
                                style={styles.day}
                            >
                                <Text style={styles.disabled}>
                                    {date.day}
                                </Text>
                            </View>
                        )
                    }

                    return (
                        <TouchableOpacity
                            key={date.dateString}
                            style={[
                                styles.day,
                                isSelected && styles.daySelected,
                            ]}
                            onPress={() => {
                                setDay(date)
                                onDayPress(date)
                            }}
                        >
                            <Text
                                style={[
                                    state === "today" && styles.today,
                                    isMarked && !isSelected && styles.makedDay,              
                                    isSelected && styles.daySelectedText,                      
                                ]}
                            >
                                {date.day}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    )
}