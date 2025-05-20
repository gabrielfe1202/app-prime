import { Text, Image, TextInput, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fonts } from "../globalStyle"
import logo from "../../assets/images/logo-prime.png"
import { useState } from "react";
import { useAppUser } from "@/contexts/UserContext";
import { Loading } from "@/components/Loading";
import SendCodePage from "./ForgotPassword/SendCodePage";
import PassCode from "./ForgotPassword/PassCode"
import ChangePasswordPage from './ForgotPassword/ChangePassword';
const { width, height } = Dimensions.get('screen');

type LoginPageType = 'LOGIN' | 'FORGOT' | 'CODE' | 'CHANGEPASS';

export type LoginComponentProps = {
  onToggle: (page: LoginPageType) => void;
};

export default function Login() {
  const [activePage, setActivePage] = useState<LoginPageType>('LOGIN');

  const handleToggle = (page: LoginPageType) => {
    setActivePage(page);
  };

  const pages = {
    LOGIN: <LoginPage onToggle={handleToggle} />,
    FORGOT: <SendCodePage onToggle={handleToggle} />,
    CODE: <PassCode onToggle={handleToggle} />,
    CHANGEPASS: <ChangePasswordPage onToggle={handleToggle} />
  };

  return pages[activePage];
}

export function LoginPage({ onToggle }: LoginComponentProps) {
  const [stateload, setStateload] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('')
  const [emailFocus, setEmailFocus] = useState<boolean>(false)
  const [senha, setSenha] = useState<string>('')
  const [senhaFocus, setSenhaFocus] = useState<boolean>(false)
  const [erro, setErro] = useState<string>('');  
  const { setUserToken, userController } = useAppUser()

  async function handleLogin() {
    setStateload(true)
    try {

      if (email === '' || senha === '') {
        setErro('Prencha os campos corretamente')
        return null
      }

      const response = await userController.login(email, senha)
      if (response.status === "ERROR") {
        setErro(response.msg)
      } else {
        setUserToken(response.token)
      }
    } catch (error) {
      console.error(error)
      setErro("Erro ao efetuar o login")
    } finally {
      setStateload(false)
    }
  }

  const handleEmailChange = (val: string) => {
    setEmail(val);    
    setErro('');
  };

  if (stateload) return <Loading />

  return (
    <GestureHandlerRootView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <Image source={logo} style={styles.logo} resizeMode='contain' />

          <TextInput
            value={email}
            placeholder='E-mail/usuario'
            onChangeText={handleEmailChange}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => { setEmailFocus(false) }}
            style={[
              styles.input,
              {
                borderBottomColor: emailFocus ? colors.laranja : "#96989A"                    
              },
            ]}
            autoCapitalize='none'
            keyboardType="email-address"
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

          <Text style={[styles.errorMessage, { display: erro === "" ? 'none' : 'flex' }]}>
            {erro}
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
            <Text style={styles.textButton}>
              Entrar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onToggle('FORGOT')}>
            <Text style={styles.recSenha}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

        </SafeAreaView>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1'
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
    fontWeight: 'bold',
    color: colors.laranja,
    fontSize: 20,
  },
  errorMessage: {
    marginTop: height * 0.01,
    color: '#ff0000',
    fontSize: 18,
    marginBottom: height * 0.01,
    textAlign: 'center'
  },
  emailError: {
    color: '#ff0000',
    fontSize: 15,
    marginBottom: 0,
    textAlign: "right",
    width: width * 0.8
  },
  recSenha: {
    textAlign: "center",
    width: width * 0.8,
    paddingTop: 50,
    fontSize: 20,
    color: colors.laranja,
    fontFamily: fonts.passoTitulo
  }
})