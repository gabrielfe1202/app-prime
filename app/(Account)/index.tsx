import { BottomTab } from "@/components/BottomTab";
import { Loading } from "@/components/Loading";
import { useAppUser } from "@/contexts/UserContext";
import { User } from "@/entities/user";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { fonts } from "../globalStyle";
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
                    <FontAwesome name="user-circle" size={80} color={"#000"} />
                    <Text style={styles.userName}>{user?.name}</Text>
                </View>

                <View style={styles.box}>
                    <View style={styles.boxTitle}>
                        <Text style={styles.boxTileText}>Meus dados</Text>
                    </View>

                    <View style={styles.boxData}>
                        <Text style={styles.boxDataText}>Email: {user?.email}</Text>
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
        justifyContent: "center",
        alignItems: "center"
    },
    userName: {
        fontFamily: fonts.passo,
        fontSize: 22,
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
        backgroundColor: "#bababa",
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    boxTileText: {
        fontSize: 18,
        fontFamily: fonts.passo,
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