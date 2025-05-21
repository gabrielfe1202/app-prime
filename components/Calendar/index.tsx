import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Calendar, DateData, LocaleConfig } from "react-native-calendars"
import { DayState } from "react-native-calendars/src/types"

import { Feather } from "@expo/vector-icons"
import { ptBR } from "../../utils/localeCalendarConfig"
import { styles } from "./CalendarStyles"

LocaleConfig.locales["pt-br"] = ptBR
LocaleConfig.defaultLocale = "pt-br"
interface CalendarComponentProps {
    markedDates: string[];
    onDayPress: (day: DateData) => void;
    initDate: string;
}

function getDayState(dateData: DateData): DayState {
  const today = new Date();
  const inputDate = new Date(dateData.year, dateData.month - 1, dateData.day);

  if (inputDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
    return 'disabled';
  }

  return '';
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
                    //color: "#515151"
                }}
                theme={{
                    textMonthFontSize: 18,
                    textSectionTitleColor: '#515151',
                    dayTextColor: '#515151',
                    monthTextColor: '#515151',
                    textDayHeaderFontWeight: 'bold',
                    //textSectionTitleColor: 'purple',
                    arrowStyle: {
                        margin: 0,
                        padding: 0,
                    },
                }}
                minDate={new Date().toDateString()}                
                dayComponent={(date) => {
                    const isMarked = markedDates.includes(date.date?.dateString ?? '');
                    const isSelected = date.date?.dateString === day?.dateString;
                    const state = getDayState(date.date!);
                    if (state === "inactive" || state === "disabled" || !isMarked) {
                        return (
                            <View
                                key={date.date?.dateString}
                                style={styles.day}
                            >
                                <Text style={styles.disabled}>
                                    {date.date?.day}
                                </Text>
                            </View>
                        )
                    }

                    return (
                        <TouchableOpacity
                            key={date.date?.dateString}
                            style={[
                                styles.day,
                                isSelected && styles.daySelected,
                            ]}
                            onPress={() => {
                                setDay(date.date)
                                onDayPress(date.date!)
                            }}
                        >
                            <Text
                                style={[
                                    state === "today" && styles.today,
                                    isMarked && !isSelected && styles.makedDay,              
                                    isSelected && styles.daySelectedText,                      
                                ]}
                            >
                                {date.date?.day}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    )
}