import { fonts } from "@/app/globalStyle";
import { FontAwesome } from "@expo/vector-icons";
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const { width, height } = Dimensions.get("screen")

export default function ZipsPage() {
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 55 }}>
            <View>
                <Text style={styles.title}>Pacotes de fotos</Text>
            </View>

            <View style={styles.zipsContainer}>
                <View style={styles.zipItem}>
                    <Text style={styles.zipData}>2024-02</Text>
                    <TouchableOpacity>
                        <FontAwesome name="download" size={25} color={'#000'} />
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        textAlign: "center",
        fontFamily: fonts.passo
    },
    zipsContainer: {
        flex: 1,
        alignItems: "center",
        marginTop: 40
    },
    zipItem: {
        width: width * 0.9,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#c0c0c0",
        paddingVertical: 4,
        paddingHorizontal: 15
    },
    zipData: {
        fontSize: 21
    }
})