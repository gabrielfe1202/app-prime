import { colors, fonts } from '@/app/globalStyle';
import LottieView from 'lottie-react-native';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import checkAnimation from '../../../assets/animations/check.json'
import { LoginComponentProps } from '../index'
import { FontAwesome } from '@expo/vector-icons';
import { isNullOrEmpty } from '@/utils/stringFunctions';
import { ForgotPasswordController } from '@/controllers/ForgotPassword.cotroller';
import { useForgotPasswordStore } from '@/stores/forgotPasswordStore';
import { Loading } from '@/components/Loading';
const { width } = Dimensions.get("screen")

const ChangePasswordPage = ({onToggle}: LoginComponentProps) => {
    const [novaSenha, setNovaSenha] = useState<string>('');
    const [confirmarSenha, setConfirmarSenha] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const animationRef = useRef<LottieView>(null);
    const [animating, setAnimating] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const forgotPasswordController = new ForgotPasswordController()
    const token = useForgotPasswordStore(state => state.token);

    const validarSenha = (): boolean => {
        if (!novaSenha || !confirmarSenha) {            
            setError('Todos os campos são obrigatórios.')
            return false;
        }

        if (novaSenha !== confirmarSenha) {            
            setError('As senhas não coincidem.')
            return false;
        }

        if (novaSenha.length < 5) {
            setError('A nova senha deve ter pelo menos 5 caracteres.')
            return false;
        }

        return true;
    };

    const handleChangePassword = async () => {
        if (!validarSenha()) return;

        setLoading(true);

        const result = await forgotPasswordController.changePassword(token, novaSenha).finally(() => setLoading(false))

        if(result.success){
            setAnimating(true)
        }else{
            setError(result.msg)
        }

    }

    if (animating) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                    source={checkAnimation}
                    autoPlay
                    loop={false}
                    ref={animationRef}
                    style={{ flex: 0, width: width, height: 350, marginTop: -50 }}
                />
                <Text style={{ fontFamily: fonts.passo, fontSize: 22, textAlign: 'center' }}>Sua senha foi alterada{'\n'} com sucesso!</Text>

                <TouchableOpacity style={[styles.Button, { marginTop: 20 }]} onPress={() => onToggle('LOGIN')}>
                    <Text style={styles.ButtonText}>Login</Text>
                </TouchableOpacity>

            </View>
        )
    }

    if(loading) return <Loading />

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Alterar Senha</Text>

                <View style={{ position: "relative" }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nova senha"
                        value={novaSenha}
                        onChangeText={setNovaSenha}
                        secureTextEntry={!showPassword}
                        placeholderTextColor={'#505050'}
                        autoCapitalize='none'
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconeBotao}>
                        <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={24} color={"#505050"} />
                    </TouchableOpacity>
                </View>

                <View style={{ position: "relative" }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar nova senha"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                        placeholderTextColor={'#505050'}
                        autoCapitalize='none'
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.iconeBotao}>
                        <FontAwesome name={showConfirmPassword ? "eye-slash" : "eye"} size={24} color={"#505050"} />
                    </TouchableOpacity>
                </View>

                {!isNullOrEmpty(error) && (
                    <Text style={styles.error}>{error}</Text>
                )}

                <TouchableOpacity style={styles.Button} onPress={() => handleChangePassword()}>
                    <Text style={styles.ButtonText}>Alterar</Text>
                </TouchableOpacity>

            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 28,
        marginBottom: 24,
        textAlign: 'center',
        fontFamily: fonts.passoTitulo,
        color: colors.azul
    },
    input: {
        height: 50,
        borderColor: '#505050',
        color: '#505050',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 10,
        fontSize: 18,
        width: width * .85,
        fontFamily: fonts.passo,
        borderRadius: 8
    },
    Button: {
        borderRadius: 15,
        height: 60,
        backgroundColor: colors.azul,
        justifyContent: 'center',
        width: width * .85,
    },
    ButtonText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
    },
    iconeBotao: {
        position: "absolute",
        right: 10,
        top: 12,
    },
    error: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: fonts.passo,
        color: "#c70404"
    }
});

export default ChangePasswordPage;
