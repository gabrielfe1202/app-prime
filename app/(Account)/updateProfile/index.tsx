import { colors, fonts } from "@/app/globalStyle";
import AlertModal from "@/components/AlertModal";
import { BottomTab } from "@/components/BottomTab";
import { Loading } from "@/components/Loading";
import { useAppUser } from "@/contexts/UserContext";
import { User } from "@/entities/user";
import { isNullOrEmpty } from "@/utils/stringFunctions";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ChangePassword() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [textError, setTextError] = useState<string>('')
    const [stateLoad, setStateload] = useState<boolean>(false)
    const [modalType, setModalType] = useState<"DANGER" | "SUCCESS">("DANGER")
    const [modalText, setModalText] = useState<string>("")
    const { userController, setUserToken } = useAppUser();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [user, setUser] = useState<User>();

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

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleAlterarSenha = async () => {


    };

    const hideModal = () => {
        setIsModalVisible(false);
    };


    if (stateLoad) return <Loading />

    return (
        <GestureHandlerRootView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Text style={styles.titulo}>Meus dados</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor={"#505050"}
                            autoCapitalize="none"
                        />

                        <TouchableOpacity onPress={handleAlterarSenha} style={styles.botaoAlterar}>
                            <Text style={styles.textoBotao}>Alterar senha</Text>
                        </TouchableOpacity>
                    </View>

                    {!keyboardVisible && (
                        <BottomTab />
                    )}

                    <AlertModal
                        isVisible={isModalVisible}
                        onClose={hideModal}
                        title={"Ops, Houve um erro"}
                        message={modalText}
                        type={modalType}
                    />
                </View>
            </TouchableWithoutFeedback>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    titulo: {
        fontFamily: fonts.passo,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    botaoAlterar: {
        backgroundColor: colors.laranja,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: fonts.passo
    },
    input: {
        height: 50,
        borderColor: '#505050',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
        color: "#505050",
        fontFamily: fonts.passo
    },
});
