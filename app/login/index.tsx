import { GoalBottomTab, GroupedGoal } from "@/components/GoalBottomTab";
import { SingleViewPager } from "@/components/SingleViewPager";
import { useGoal } from "@/contexts/goal-context";
import { delay } from "@/utils/delay";
import { useRouter } from "expo-router";
import { Text, View, Image, TextInput, StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import goalStyles from "../(goal)/goalStyle"
import globalStyles, { colors } from "../globalStyle"
import logo from "../../assets/images/logo-prime.png"
import { useState } from "react";
import { useAppUser } from "@/contexts/UserContext";
const { width, height } = Dimensions.get('screen');

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('')
  const [emailFocus, setEmailFocus] = useState<boolean>(false)
  const [senha, setSenha] = useState<string>('')
  const [senhaFocus, setSenhaFocus] = useState<boolean>(false)
  const [erro, setErro] = useState<string>('');
  const { setUserToken, userController } = useAppUser() || {}

  function handleLogin() {
    userController?.login()
    setUserToken!('aaaaa')
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>

        <Image source={logo} style={styles.logo} resizeMode='contain' />

        <TextInput
          value={email}
          placeholder='E-mail/usuario'
          onChangeText={val => setEmail(val)}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => { setEmailFocus(false) }}
          style={[styles.input, { borderBottomColor: emailFocus ? colors.laranja : "#96989A" }]}
          autoCapitalize='none'
        />

        <TextInput
          value={senha}
          placeholder='Senha'
          onChangeText={val => setSenha(val)}
          onFocus={() => setSenhaFocus(true)}
          onBlur={() => setSenhaFocus(false)}
          secureTextEntry
          style={[styles.input, { marginTop: 15, borderBottomColor: senhaFocus ? colors.laranja : "#96989A" }]}
          autoCapitalize='none'
        />

        <Text style={[styles.errorMessage, { display: erro == "" ? 'none' : 'flex' }]}>
          {erro}
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.textButton}>
            Entrar
          </Text>
        </TouchableOpacity>

      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  input: {
      borderBottomWidth: 2,
      borderBottomColor: "#96989A",
      width: width * 0.8,
      fontSize: 25
  },
  button: {
      backgroundColor: colors.laranja,
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 15,
      marginTop: 30
  },
  textButton: {
      color: '#fff',
      fontSize: 25
  },
  logo: {
      width: 200,
      height: 200,
      marginBottom: 25
  },
  buttonText: {
      textAlign: 'center',
      //fontFamily: fontFamilyBold,
      fontWeight: 'bold',
      color: colors.laranja,
      fontSize: 20,
  },
  errorMessage: {
      marginTop: height * 0.01,
      color: '#ff0000',
      //fontFamily: fontFamilyBold,
      fontSize: 18,
      marginBottom: height * 0.01,
      textAlign: 'center'
  }
})