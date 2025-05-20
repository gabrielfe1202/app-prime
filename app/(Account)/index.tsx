import { BottomTab } from "@/components/BottomTab";
import { Loading } from "@/components/Loading";
import { useAppUser } from "@/contexts/UserContext";
import { User } from "@/entities/user";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors, fonts } from "../globalStyle";
import { useRouter } from "expo-router";
const { width, height } = Dimensions.get("screen")

export default function Account() {
    const [stateLoad, setStateload] = useState<boolean>(true)
    const [user, setUser] = useState<User>();
    const { userController } = useAppUser();
    const router = useRouter();

    async function loadUserInfos() {
        try {
            const data = await userController.getUserInformations();
            setUser(data)
        } finally {
            setStateload(false)
        }
    }

    useEffect(() => {
        loadUserInfos()
    }, [])

    if (stateLoad) return <Loading />

    return (
        <GestureHandlerRootView>
            <SafeAreaView style={styles.container}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <FontAwesome name="user-circle" size={120} color={colors.laranja} />
                    <Text style={styles.userName}>{user?.name}</Text>
                </View>

                <View style={styles.box}>
                    <View style={styles.boxTitle}>
                        <Text style={styles.boxTileText}>Meus dados</Text>
                    </View>

                    <View style={styles.boxData}>
                        <Text style={styles.boxDataText}>Email: {user?.email}</Text>
                        <Text style={styles.boxDataText}>Telefone: {user?.phone.formatNumber()}</Text>                    
                        <Text style={styles.boxDataText}>Celular: {user?.cellPhone.formatNumber()}</Text>                    
                        <Text style={styles.boxDataText}>Endereço: {user?.address?.formatAddress()}</Text>
                    </View>

                    <TouchableOpacity style={styles.boxButton} onPress={() => router.push("/(Account)/updateProfile")}>
                        <FontAwesome name="edit" size={22} color={"#000"} />
                        <Text style={styles.boxButtonText}>Alterar</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.box}>
                    <View style={[styles.boxTitle,{backgroundColor: colors.rosa}]}>
                        <Text style={styles.boxTileText}>Senha</Text>
                    </View>

                    <TouchableOpacity style={styles.boxButton} onPress={() => router.push("/(Account)/ChangePassword")}>
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
        marginTop: height * .15,        
        alignItems: "center"
    },
    userName: {
        fontFamily: fonts.passo,
        fontSize: 27,
        paddingTop: 10,
        paddingBottom: 20
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
        //backgroundColor: "#bababa",
        backgroundColor: colors.azul,
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    boxTileText: {
        fontSize: 18,
        fontFamily: fonts.passo,
        color: "#fff"
    },
    boxData: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        gap: 10,
    },
    boxDataText: {
        fontFamily: fonts.passo,
        fontSize: 16
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
        fontSize: 18,
        fontFamily: fonts.passo,
    }
})