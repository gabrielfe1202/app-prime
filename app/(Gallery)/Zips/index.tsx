import { colors, fonts } from "@/app/globalStyle";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const { width, height } = Dimensions.get("screen")

export default function ZipsPage() {
    const router = useRouter()

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 55, backgroundColor: 'rgba(0,0,0,.2)', justifyContent: "center", alignItems: "center" }}>
            <View style={{ backgroundColor: '#fff', flex: 1, width: width * 0.9, borderRadius: 25, padding: 20, alignItems: "flex-end" }}>
                <TouchableOpacity style={{/*backgroundColor: 'blue',*/ width: 40, height: 30, paddingRight: 5 }} onPress={() => router.back()}>
                    <Text style={{ textAlign: "right" }}>
                        <FontAwesome name="times" size={24} color="black" />
                    </Text>
                </TouchableOpacity>

                <View style={{ width: '100%' }}>
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
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingVertical: 4,
        paddingHorizontal: 15
    },
    zipData: {
        fontSize: 21,
        color: '#000'
    }
})