import { fonts } from "@/app/globalStyle";
import { BottomTab } from "@/components/BottomTab";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ChangePassword() {
    const [senhaAtual, setSenhaAtual] = useState<string>('');
    const [novaSenha, setNovaSenha] = useState<string>('');
    const [confirmarSenha, setConfirmarSenha] = useState<string>('');

    const handleAlterarSenha = () => {
        if (novaSenha !== confirmarSenha) {
            return;
        }

        setSenhaAtual('');
        setNovaSenha('');
        setConfirmarSenha('');
    };

    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <Text style={styles.titulo}>Alterar Senha</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Senha Atual"
                    secureTextEntry
                    value={senhaAtual}
                    onChangeText={setSenhaAtual}
                    placeholderTextColor={"#505050"} 
                />

                <TextInput
                    style={styles.input}
                    placeholder="Nova Senha"
                    secureTextEntry
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                    placeholderTextColor={"#505050"}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Confirmar Nova Senha"
                    secureTextEntry
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    placeholderTextColor={"#505050"}
                />

                <TouchableOpacity onPress={handleAlterarSenha}>
                    <Text>Alterar senha</Text>
                </TouchableOpacity>

            </View>

            <BottomTab />

        </GestureHandlerRootView>
    )
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
        fontFamily: fonts.passo
    },
    input: {
        height: 50,
        borderColor: '#505050',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
        color: "#505050"
    },
});