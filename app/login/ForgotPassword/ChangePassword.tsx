import { colors, fonts } from '@/app/globalStyle';
import LottieView from 'lottie-react-native';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity } from 'react-native';
import checkAnimation from '../../../assets/animations/check.json'
const { width, height } = Dimensions.get("screen")

const AlterarSenha: React.FC = () => {
    const [novaSenha, setNovaSenha] = useState<string>('');
    const [confirmarSenha, setConfirmarSenha] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const animationRef = useRef<LottieView>(null);
    const [animating, setAnimating] = useState<boolean>(false);

    const validarSenha = (): boolean => {
        if (!novaSenha || !confirmarSenha) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios.');
            return false;
        }

        if (novaSenha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return false;
        }

        if (novaSenha.length < 6) {
            Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres.');
            return false;
        }

        return true;
    };

    // Função para enviar a solicitação de alteração de senha
    const alterarSenha = async (): Promise<void> => {
        if (!validarSenha()) return;

        setLoading(true);

        try {

        } catch (error) {
            Alert.alert('Erro', 'Erro de rede ou servidor.');
        } finally {
            setLoading(false);
        }
    };

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

                <TouchableOpacity style={[styles.Button, {marginTop: 20}]} onPress={() => setAnimating(!animating)}>
                    <Text style={styles.ButtonText}>Login</Text>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Alterar Senha</Text>

            <TextInput
                style={styles.input}
                placeholder="Nova senha"
                secureTextEntry
                value={novaSenha}
                onChangeText={setNovaSenha}
                placeholderTextColor={'#505050'}
                autoCapitalize='none'
            />

            <TextInput
                style={styles.input}
                placeholder="Confirmar nova senha"
                secureTextEntry
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                placeholderTextColor={'#505050'}
                autoCapitalize='none'
            />

            <TouchableOpacity style={styles.Button} onPress={() => setAnimating(!animating)}>
                <Text style={styles.ButtonText}>Alterar</Text>
            </TouchableOpacity>

        </View>
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
});

export default AlterarSenha;
