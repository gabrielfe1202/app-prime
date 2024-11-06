import { SafeAreaView, Text, View, Dimensions, TouchableOpacity, Image } from "react-native";
import { CalendarComponent } from "./Calendar";
import { withAuthCheck } from "@/utils/auth";
import { DateData } from "react-native-calendars";
import { useEffect, useState } from "react";
import globalStyles from "../globalStyle"
import logo from "../../assets/images/logo-prime.png"
import { DI } from "@/controllers/DI";
import { delay } from "@/utils/delay";
import { Loading } from "@/components/Loading";
const { width, height } = Dimensions.get('screen');

function Schedule() {
    const markedDates1 = ['2024-11-07', '2024-11-08', '2024-11-09'];
    const [ markedDates, setMarkedDates ] = useState<string[]>([])
    const initDate = "2024-11-01";
    const [selectedDate, setSelectedDate] = useState<DateData>()
    const [stateload, setStateload] = useState<boolean>(true);

    const fetchScheduleInfos = async () => {
        setStateload(true)
        try {
            const data = await DI.schedule.getConfigSchedule();
            console.log(data.datesAvailable)
            setMarkedDates(data.datesAvailable)
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

    const handleDayPress = (date: DateData) => {
        setSelectedDate(date)
    }

    if(stateload){
        return(
            <Loading />
        )
    }

    return (
        <SafeAreaView
            style={{ flex: 1, paddingTop: 32 }}
        >
            <TouchableOpacity style={globalStyles.logoContainer} onPress={() => { }}>
                <Image source={logo} style={globalStyles.logo} resizeMode='contain' />
            </TouchableOpacity>

            <View style={{}}>
                <CalendarComponent markedDates={markedDates} onDayPress={handleDayPress} initDate={initDate} />
            </View>

            <View>
                <Text>data: {selectedDate?.dateString}</Text>
            </View>

        </SafeAreaView>
    )
}


export default withAuthCheck(Schedule)