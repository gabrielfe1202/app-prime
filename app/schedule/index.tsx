import { SafeAreaView, Text, View, Dimensions, TouchableOpacity, Image } from "react-native";
import { CalendarComponent } from "./Calendar";
import { withAuthCheck } from "@/utils/auth";
import { DateData } from "react-native-calendars";
import { useState } from "react";
import globalStyles from "../globalStyle"
import logo from "../../assets/images/logo-prime.png"
const { width, height } = Dimensions.get('screen');

function Schedule() {
    const markedDates = ['2024-11-07', '2024-11-08', '2024-11-09'];
    const [selectedDate, setSelectedDate] = useState<DateData>()

    const handleDayPress = (date: DateData) => {
        setSelectedDate(date)
    }

    return (
        <SafeAreaView
            style={{ flex: 1, paddingTop: 32 }}
        >
            <TouchableOpacity style={globalStyles.logoContainer} onPress={() => { }}>
                <Image source={logo} style={globalStyles.logo} resizeMode='contain' />
            </TouchableOpacity>

            <View style={{}}>
                <CalendarComponent markedDates={markedDates} onDayPress={handleDayPress} />
            </View>

            <View>
                <Text>data: {selectedDate?.dateString}</Text>
            </View>

        </SafeAreaView>
    )
}


export default withAuthCheck(Schedule)