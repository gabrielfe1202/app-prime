import { SafeAreaView, Text, View, Dimensions, TouchableOpacity, Image, StyleSheet } from "react-native";
import { CalendarComponent } from "./Calendar";
import { DateData } from "react-native-calendars";
import { useEffect, useRef, useState } from "react";
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
import AlertModal from "@/components/AlertModal";
import LottieView from "lottie-react-native";
import scheduleAnimation from "../../assets/animations/schedule.json"
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
    const [modalText, setModalText] = useState<string>('')
    const [timeSelectedId, setTimeSelectedId] = useState<number>(0)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [alertModalTitle, setAlertModalTitle] = useState<string>('')
    const [alertModalMessage, setAlertModalMessage] = useState<string>('')
    const [alertModalType, setAlertModalType] = useState<"SUCCESS" | "DANGER" | "WARNING">('SUCCESS')
    const [scheduledResponse, setScheduledResponse] = useState<{ success: boolean, msg: string }>({ success: false, msg: '' })
    const animationRef = useRef<LottieView>(null);
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
            setStateload(false)
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
        setScheduledDate(time.dateLabel)
        setTimeSelectedId(time.id)
        setModalConfirmationVisible(true);
    };

    const handleScheduleTime = async () => {
        try {
            setStateload(true)
            const data = await DI.schedule.scheduleTime(timeSelectedId, childId!);
            setScheduledResponse(data)
            showModal(data)
        } catch (error) {
            console.log(error)
        } finally {
            handleCancel()
            setStateload(false)
        }
    }

    const showModal = (data: { success: boolean, msg: string }) => {
        if (data.success) {
            setAlertModalTitle("Confirmado")
        } else {
            setAlertModalTitle("Ops, ocoreu um erro")
            setAlertModalType("DANGER")
        }
        setAlertModalMessage(data.msg)
        setIsModalVisible(true);
    };

    const hideModal = () => {
        if (scheduledResponse.success) {
            setScheduled(true)
        }
        setIsModalVisible(false);
    };

    if (stateload) {
        return (
            <Loading />
        )
    }

    if (scheduled) {
        return (
            <GestureHandlerRootView>
                <SafeAreaView style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", paddingTop: height * 0.11 }}>

                    <TouchableOpacity
                        style={[
                            globalStyles.logoContainer,                         
                        ]}
                        onPress={() => { }}
                    >
                        <Image
                            source={logo} style={[
                                globalStyles.logo,
                                { width: 150, height: 150 }
                            ]}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>

                    <LottieView
                        source={scheduleAnimation}
                        autoPlay
                        loop={true}
                        ref={animationRef}
                        style={{ flex: 0, width: width, height: 290, marginTop: 10 }}
                    />


                    <View>
                        <Text style={styles.textScheduled}>
                            Você já possui uma reunião agendada para dia:
                        </Text>
                        <Text style={styles.scheduledDate}>
                            {scheduledDate}
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

            <AlertModal
                isVisible={isModalVisible}
                onClose={hideModal}
                title={alertModalTitle}
                message={alertModalMessage}
                type={alertModalType}
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
        fontSize: 22,
        width: width * 0.7,
        fontWeight: "bold",        
        color: "#505050"
    },
    scheduledDate: {        
        textAlign: "center",
        fontSize: 23,
        width: width * 0.7,
        fontWeight: "bold",        
        marginTop: 20,
        textDecorationLine: "underline",
        color: "#505050"
    }
})