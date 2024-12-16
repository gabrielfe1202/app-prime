import { BottomTab } from "@/components/BottomTab";
import { FontAwesome } from "@expo/vector-icons";
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen")

export default function Account() {
    return (
        <GestureHandlerRootView>
            <SafeAreaView style={styles.container}>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <FontAwesome name="user-circle" size={80} color={"#000"} />                
                    <Text>Nome aqui</Text>
                </View>

                <View style={styles.box}>
                    <View style={styles.boxTitle}>
                        <Text style={styles.boxTileText}>Meus dados</Text>
                    </View>

                    <View style={styles.boxData}>
                        <Text>Email:  teste@teste.com</Text>
                        <Text>Telefone: 790497004040</Text>
                    </View>

                    <TouchableOpacity style={styles.boxButton}>
                        <FontAwesome name="edit" size={22} color={"#000"} />
                        <Text style={styles.boxButtonText}>Alterar</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.box}>
                    <View style={styles.boxTitle}>
                        <Text style={styles.boxTileText}>Senha</Text>
                    </View>

                    <TouchableOpacity style={styles.boxButton}>
                        <FontAwesome name="edit" size={22} color={"#000"} />
                        <Text style={styles.boxButtonText}>Alterar senha</Text>
                    </TouchableOpacity>

                </View>

                <BottomTab />

            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    box: {
        width: width * .85,
        borderWidth: 1,
        borderColor: "#a8a7a7",
        borderRadius: 15,
        overflow: "hidden",
        marginTop: 25
    },
    boxTitle: {
        backgroundColor: "#bababa",
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    boxTileText: {
        fontSize: 18
    },
    boxData: {
        paddingHorizontal: 30,
        paddingVertical: 5,
        gap: 10,
        paddingBottom: 10
    },
    boxButton: {
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,  
        borderTopColor: "#a8a7a7",        
        alignItems: "center"
    },
    boxButtonText: {
        fontSize: 18
    }
})