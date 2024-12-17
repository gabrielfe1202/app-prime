import { colors, fonts } from "@/app/globalStyle";
import { Loading } from "@/components/Loading";
import { isNullOrEmpty, validEmail } from "@/utils/stringFunctions";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import PassCodePage from "./PassCode";
const { width, height } = Dimensions.get("screen")

interface ForgotPasswordPageProps {
    onBack: () => void;
}

export default function ForgotPasswordPage({ onBack }: ForgotPasswordPageProps) {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [textError, setTextError] = useState<string>("")
    const [passCodeShow, setPassCodeShow] = useState<boolean>(false)

    const handleRecoverPassword = async () => {
        var valid = validEmail(email)
        setPassCodeShow(true)
        if (valid) {
            setTextError("")
            setPassCodeShow(true)
        } else {
            setTextError("Email inválido")
        }
    }

    if (loading) return <Loading />

    if (passCodeShow) return <PassCodePage />

    return (
        <GestureHandlerRootView>

            <TouchableOpacity onPress={onBack} style={{ position: "absolute", top: 60, left: 15, flexDirection: "row", gap: 10 }}>
                <FontAwesome name="arrow-left" size={20} color={colors.azul} />
                <Text style={{ fontSize: 15, color: colors.azul }}>Voltar</Text>
            </TouchableOpacity>

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Text style={styles.title}>Recuperar Senha</Text>

                    <Text style={[styles.infoText, { color: "#505050" }]}>
                        Insira seu e-mail abaixo. Você receberá um código de recuperação para redefinir sua senha.
                    </Text>

                    <TextInput
                        style={[styles.input, { borderColor: "#505050" }]}
                        placeholder="Digite seu e-mail"
                        placeholderTextColor={"#505050"}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {!isNullOrEmpty(textError) && (
                        <Text style={styles.error}>{textError}</Text>
                    )}

                    <TouchableOpacity style={styles.button} onPress={handleRecoverPassword}>
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: fonts.passoTitulo,
        color: colors.azul
    },
    infoText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#6e6e6e',
        fontFamily: fonts.passo,
        paddingHorizontal: 30
    },
    input: {
        height: 50,
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5,
        width: width * .85,
        fontFamily: fonts.passo
    },
    button: {
        backgroundColor: colors.azul,
        width: width * .85,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 20
    },
    buttonText: {
        fontSize: 17,
        fontFamily: fonts.passo,
        color: "#fff"
    },
    error: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: fonts.passo,
        color: "#c70404"
    }
})