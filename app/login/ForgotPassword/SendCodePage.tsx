import { colors, fonts } from "@/app/globalStyle";
import { Loading } from "@/components/Loading";
import { isNullOrEmpty, validEmail } from "@/utils/stringFunctions";
import { FontAwesome } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Dimensions, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { ForgotPasswordController } from "@/controllers/ForgotPassword.cotroller";
import LottieView from "lottie-react-native";
import sendAnimation from "../../../assets/animations/send.json"
import { LoginComponentProps } from "..";
import { useForgotPasswordStore } from "@/stores/forgotPasswordStore";
const { width } = Dimensions.get("screen")

export default function SendCodePage({ onToggle }: LoginComponentProps) {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [textError, setTextError] = useState<string>("")
    const [aniamationShow, setAnimationShow] = useState<boolean>(false)
    const forgotPasswordController = new ForgotPasswordController()
    const animationRef = useRef<LottieView>(null);
    const setEmailStore = useForgotPasswordStore.getState().setEmail

    const handleRecoverPassword = async () => {
        var valid = validEmail(email)

        if (valid) {
            setTextError("")

            setLoading(true)
            const result = await forgotPasswordController.sendCode(email).finally(() => {
                setLoading(false)
            })
            if (result.success) {
                setAnimationShow(true)
                setEmailStore(email)
            } else {
                setTextError(result.msg)
            }
        } else {
            setTextError("Email inválido")
        }
    }

    if (loading) return <Loading />

    if (aniamationShow) return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <LottieView
                source={sendAnimation}
                autoPlay
                loop={false}
                ref={animationRef}
                onAnimationFinish={() => {
                    onToggle('CODE')
                }}
                style={{ flex: 0, width: width, height: 350, marginTop: -50 }}
            />
        </View>
    )

    return (
        <GestureHandlerRootView>

            <TouchableOpacity onPress={() => onToggle('LOGIN')} style={{ position: "absolute", top: 60, left: 15, flexDirection: "row", gap: 10 }}>
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
        height: 55,
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5,
        width: width * .85,
        fontFamily: fonts.passo,
        fontSize: 18,
    },
    button: {
        borderRadius: 15,
        height: 60,
        backgroundColor: colors.azul,
        justifyContent: 'center',
        width: width * .85,
        marginTop: 15
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
    },
    error: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: fonts.passo,
        color: "#c70404"
    }
})