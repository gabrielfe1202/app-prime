import { SafeAreaView, Text, View, Dimensions, TouchableOpacity, Image, StyleSheet } from "react-native";
import { CalendarComponent } from "./Calendar";
import { DateData } from "react-native-calendars";
import { useEffect, useState } from "react";
import globalStyles, { colors, fonts } from "../globalStyle"
import logo from "../../assets/images/logo-prime.png"
import { DI } from "@/controllers/DI";
import { delay } from "@/utils/delay";
import { Loading } from "@/components/Loading";
import { ScheduleTimes } from "@/entities/schedule";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { BottomTab } from "@/components/BottomTab";
import { useChild } from "@/contexts/ChildContext";
const { width, height } = Dimensions.get('screen');

function Schedule() {
    const [markedDates, setMarkedDates] = useState<string[]>([])
    const [initDate, setInitDate] = useState<string>('')
    const [selectedDate, setSelectedDate] = useState<DateData>()
    const [stateload, setStateload] = useState<boolean>(true);
    const [dateTimes, setDateTimes] = useState<ScheduleTimes[]>([])
    const childContext = useChild();
    const { childId } = childContext!;

    const fetchScheduleInfos = async () => {
        setStateload(true)
        try {
            const data = await DI.schedule.getConfigSchedule(childId!);            
            setMarkedDates(data.datesAvailable)
            setInitDate(data.initialDate())
        } catch (err) {
            console.error(err);
        } finally {
            delay(1000).then(() => {
                setStateload(false)
            })
        }
    };

    useEffect(() => {
        fetchScheduleInfos();
    }, []);

    const handleDayPress = async (date: DateData) => {
        setSelectedDate(date);
        const times = await DI.schedule.getTimesFromDate(date,childId!);
        setDateTimes(times)
    }

    if (stateload) {
        return (
            <Loading />
        )
    }

    return (
        <GestureHandlerRootView>
            <SafeAreaView
                style={{ flex: 1, paddingTop: 32 }}
            >
                <TouchableOpacity style={globalStyles.logoContainer} onPress={() => { }}>
                    <Image source={logo} style={globalStyles.logo} resizeMode='contain' />
                </TouchableOpacity>

                <View style={{}}>
                    <CalendarComponent markedDates={markedDates} onDayPress={handleDayPress} initDate={initDate} />
                </View>

                <View style={styles.timesContainer}>

                    <Text style={styles.titleTimes}>Horários:</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ gap: 15, paddingBottom: 45 }}
                    >
                        {dateTimes.map((time, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.times,
                                    {
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 2,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.36,
                                        shadowRadius: 5.68,
                                        elevation: 3,
                                    },
                                ]}
                            >
                                <Text>{time.dateLabel}</Text>
                                <TouchableOpacity style={styles.timesBtn} onPress={() => { }}>
                                    <Text>Reservar</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View style={{ height: 60 }} />

                <BottomTab />

            </SafeAreaView>
        </GestureHandlerRootView>
    )
}


export default Schedule

const styles = StyleSheet.create({
    timesContainer: {
        flex: 1,
        alignItems: "center"
    },
    titleTimes: {
        width: width * 0.9,
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: fonts.passoTitulo,
        color: colors.laranja,
        paddingBottom: 15
    },
    times: {
        width: width * 0.9,
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#bfbfbf',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    timesBtn: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: colors.laranja,
        borderRadius: 7
    }
})