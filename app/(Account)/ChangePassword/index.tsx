import { fonts } from "@/app/globalStyle";
import AlertModal from "@/components/AlertModal";
import { BottomTab } from "@/components/BottomTab";
import { Loading } from "@/components/Loading";
import { useAppUser } from "@/contexts/UserContext";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ChangePassword() {
    const [senhaAtual, setSenhaAtual] = useState<string>('');
    const [novaSenha, setNovaSenha] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmarSenha, setConfirmarSenha] = useState<string>('');
    const [showSenhaAtual, setShowSenhaAtual] = useState<boolean>(false);
    const [showNovaSenha, setShowNovaSenha] = useState<boolean>(false);
    const [showConfirmarSenha, setShowConfirmarSenha] = useState<boolean>(false);
    const [textError, setTextError] = useState<string>('')
    const [stateLoad, setStateload] = useState<boolean>(false)
    const [modalType, setModalType] = useState<"DANGER" | "SUCCESS">("DANGER")
    const [modalText, setModalText] = useState<string>("")
    const { userController, setUserToken } = useAppUser();

    const handleAlterarSenha = async () => {
        if (novaSenha.length == 0 || confirmarSenha.length == 0 || senhaAtual.length == 0) {
            setTextError("Prencha os campos corretamente")
            return;
        }

        if (novaSenha.length < 5) {
            setTextError("Senha deve conter pelo menos 5 caracteres")
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setTextError("As senhas não coincidem")
            return;
        }

        setStateload(true)

        try {
            const result = await userController.ChangePassword(senhaAtual, novaSenha)
            console.log(result)
            setIsModalVisible(true)
            setModalText(result.msg)
            if (result.success) {
                setModalType("SUCCESS")
                setUserToken(null)

                setSenhaAtual('');
                setNovaSenha('');
                setConfirmarSenha('');
            } else {
                setModalType("DANGER")
            }
        } finally {
            setStateload(false)
        }

    };

    const hideModal = () => {
        setIsModalVisible(false);
    };


    if (stateLoad) return <Loading />

    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <Text style={styles.titulo}>Alterar Senha</Text>

                <View style={{ position: "relative" }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha Atual"
                        secureTextEntry={!showSenhaAtual}
                        value={senhaAtual}
                        onChangeText={setSenhaAtual}
                        placeholderTextColor={"#505050"}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setShowSenhaAtual(!showSenhaAtual)} style={styles.iconeBotao}>
                        <Text>{showSenhaAtual ? "Ocultar" : "Ver"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ position: "relative" }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nova Senha"
                        secureTextEntry={!showNovaSenha}
                        value={novaSenha}
                        onChangeText={setNovaSenha}
                        placeholderTextColor={"#505050"}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setShowNovaSenha(!showNovaSenha)} style={styles.iconeBotao}>
                        <Text>{showNovaSenha ? "Ocultar" : "Ver"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ position: "relative" }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar Nova Senha"
                        secureTextEntry={!showConfirmarSenha}
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                        placeholderTextColor={"#505050"}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setShowConfirmarSenha(!showConfirmarSenha)} style={styles.iconeBotao}>
                        <Text>{showConfirmarSenha ? "Ocultar" : "Ver"}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.mensagemErro}>{textError}</Text>

                <TouchableOpacity onPress={handleAlterarSenha} style={styles.botaoAlterar}>
                    <Text style={styles.textoBotao}>Alterar senha</Text>
                </TouchableOpacity>
            </View>

            <BottomTab />
            <AlertModal
                isVisible={isModalVisible}
                onClose={hideModal}
                title={"Ops, Houve um erro"}
                message={modalText}
                type={modalType}
            />

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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: fonts.passo,
    },
    input: {
        height: 50,
        borderColor: '#505050',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
        color: "#505050",
    },
    iconeBotao: {
        position: "absolute",
        right: 10,
        top: 12,
    },
    mensagemErro: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    botaoAlterar: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
