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
import ConfirmationModal from "@/components/ConfirmationModal";
const { width, height } = Dimensions.get('screen');

function Schedule() {
    const [markedDates, setMarkedDates] = useState<string[]>([])
    const [initDate, setInitDate] = useState<string>('')
    const [selectedDate, setSelectedDate] = useState<DateData>()
    const [stateload, setStateload] = useState<boolean>(true);
    const [dateTimes, setDateTimes] = useState<ScheduleTimes[]>([])
    const [scheduled, setScheduled] = useState<boolean>(false)
    const [scheduledDate, setScheduledDate] = useState<string | null>(null)
    const [modalConfirmationVisible, setModalConfirmationVisible] = useState<boolean>(false)
    const [modalText,setModalText] = useState<string>('')
    const childContext = useChild();
    const { childId } = childContext!;

    const fetchScheduleInfos = async () => {
        setStateload(true)
        try {
            const data = await DI.schedule.getConfigSchedule(childId!);
            setMarkedDates(data.datesAvailable)
            setInitDate(data.initialDate())
            setScheduled(data.scheduled)
            setScheduledDate(data.scheduledDateLabel)
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
        const times = await DI.schedule.getTimesFromDate(date, childId!);
        setDateTimes(times)
    }    
    
    const handleCancel = (): void => {
        setModalConfirmationVisible(false);
    };

    const handleShowConfirmModal = (time: ScheduleTimes) => {
        setModalText(`Confirmar agendamento\n ${time.dateLabel}?`)
        setModalConfirmationVisible(true);
    };

    const handleScheduleTime = () => {

    }

    if (stateload) {
        return (
            <Loading />
        )
    }

    if (scheduled) {
        return (
            <GestureHandlerRootView>
                <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                    <TouchableOpacity style={globalStyles.logoContainer} onPress={() => { }}>
                        <Image source={logo} style={globalStyles.logo} resizeMode='contain' />
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.textScheduled}>
                            Você já possui uma reunião agendada para dia:{'\n\n' + scheduledDate}
                        </Text>
                    </View>

                    <BottomTab />

                </SafeAreaView>
            </GestureHandlerRootView>
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
                                <TouchableOpacity style={styles.timesBtn} onPress={() => handleShowConfirmModal(time)}>
                                    <Text>Reservar</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View style={{ height: 60 }} />

                <BottomTab />

            </SafeAreaView>

            <ConfirmationModal 
                visible={modalConfirmationVisible}
                onCancel={handleCancel}
                onConfirm={handleScheduleTime}
                tille="Agendar"
                text={modalText}
                buttonText="Agendar"
                buttonType="SUCCESS"
            />

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
    },
    textScheduled: {
        textAlign: "center",
        fontSize: 20,
        width: width * 0.7,
        fontWeight: "bold"
    }
})