import { GoalBottomTab, GroupedGoal } from "@/components/GoalBottomTab";
import { SingleViewPager } from "@/components/SingleViewPager";
import { useGoal } from "@/contexts/goal-context";
import { delay } from "@/utils/delay";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Image, Dimensions, StyleSheet } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo-prime.png"
import goalStyles from './goalStyle'
import globalStyles, { colors, fonts } from "../globalStyle"
import { useEffect, useRef, useState } from "react";
import { DI } from "@/controllers/DI";
import { Conclusion } from "@/entities/conclusion";
import { GoalTitle } from "@/entities/goal";
import { useChild } from "@/contexts/ChildContext";
import pdf from "../../assets/images/pdf.png"
import { Loading } from "@/components/Loading";
import LottieView from "lottie-react-native";
import booksAnimation from "../../assets/animations/books.json"
const { width, height } = Dimensions.get('screen');

export default function Ending() {
  const [stateload, setStateload] = useState<boolean>(true);
  const [stateloadPdf, setStateloadPdf] = useState<boolean>(false);
  const [conclusions, setConclusions] = useState<Conclusion[]>([])
  const [title, setTitle] = useState<GoalTitle>()
  const router = useRouter();
  const { goalVPRef } = useGoal();
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const animationRef = useRef<LottieView>(null);
  const childContext = useChild();
  const { childId } = childContext!;

  function handlePrevious() {
    router.back(); // volta (provavelmente para o inicio)
    router.push('/main'); // volta para o inicio dos passos
  }

  function handleGoToGoal(goal: GroupedGoal) {
    router.replace('/main');

    delay(200).then(() => {
      goalVPRef.current?.gotoPageWhere(g => g.color === goal.color);
    });
  }

  const fetchConclusions = async () => {
    setStateload(true)
    const ConclusionId = 6;
    try {
      const data = await DI.Conclusion.GetConclusions(ConclusionId, childId!);
      setConclusions(data.conclusions)
      setTitle(data.title)
    } catch (err) {
      console.error(err);
    } finally {
      setStateload(false)
    }
  };

  useEffect(() => {
    fetchConclusions();
  }, []);


  const handleDownloadPdf = async () => {
    setStateloadPdf(true)
    delay(10000).then(() => {
      setStateloadPdf(false)
    })
  }

  if (stateload) return <Loading />

  if (stateloadPdf) {
    return (
      <View style={{ flex: 1, justifyContent: "flex-start", alignItems: 'center', paddingTop: height * 0.11}}>
        
        <Image
          style={[styles.logoFullWidth, { width: width * 0.45 }]}
          resizeMode={'contain'}
          source={logo}
        />

        <LottieView
          source={booksAnimation}
          autoPlay
          loop={true}
          ref={animationRef}
          style={{ flex: 0, width: width, height: 400, marginTop: -120 }}
        />

        <Text style={styles.textLoad}>Gerando um PDF{'\n'}atualizado pra você</Text>
        <Text style={styles.textLoad2}>Isso pode demorar um pouquinho</Text>

      </View>
    )
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, gap: 32, paddingTop: 12 }}>

        <SingleViewPager
          onPrevious={handlePrevious}
          renderItem={() => (
            <View key={'intro'} style={{ flex: 1, alignItems: "center" }}>
              <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 40, paddingTop: 20, }}
                showsVerticalScrollIndicator={false}
              >

                <TouchableOpacity style={[globalStyles.logoContainer, { paddingBottom: 30 }]} onPress={() => { }}>
                  <Image source={logo} style={globalStyles.logo} resizeMode='contain' />
                </TouchableOpacity>

                <View
                  style={goalStyles.introContainer}
                >
                  <Text style={[goalStyles.titulo_dados, { paddingBottom: 10, fontWeight: '800' }]}>
                    {title?.titulo}
                  </Text>
                  <View style={{ paddingTop: 25, flex: 1 }}>
                    {conclusions.map(item => {
                      var x = new Date(item.dateLabel)
                      return (
                        <View key={item.id} style={{ paddingTop: 25 }}>
                          <Text style={[goalStyles.texto_dados, { marginBottom: 8 }]}>
                            {item.dateLabel.split("/")[0]} de {monthNames[parseInt(item.dateLabel.split("/")[1])]}
                          </Text>
                          <Text style={goalStyles.texto_dados}>
                            {item.text}
                          </Text>
                        </View>
                      )
                    })}

                    {conclusions.length == 0 && (
                      <View style={{ paddingTop: 25 }}>
                        <Text style={goalStyles.texto_dados}>
                          Ainda não temos nenhuma Conclusão
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <TouchableOpacity style={[styles.button_titulo, { backgroundColor: '#999999', alignItems: 'center', width: width * 0.9 }]} onPress={handleDownloadPdf}>
                  <Image style={[styles.imagem_titulo, { height: width * 0.08, width: width * 0.08 }]} source={pdf} resizeMode='contain' />
                  <Text style={[styles.texto_titulo, { fontSize: width * 0.04, flex: 1 }]}>
                    Download PDF
                  </Text>
                  <View style={{ width: width * 0.08 }}></View>
                </TouchableOpacity>

              </ScrollView>

              <View style={{ height: 70 }} />
            </View>
          )}
        />

        <GoalBottomTab onGotoPage={handleGoToGoal} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  button_titulo: {
    backgroundColor: '#505050',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    width: width * 0.42,
    marginTop: 25,
    flexDirection: 'row'
  },
  texto_titulo: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    width: width * 0.20
  },
  imagem_titulo: {
    width: width * 0.09
  },
  logoFullWidth: {
    flex: 0.5,
    width: width - 50,
    //height: screenHeight * 2,
  },
  textLoad: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: fonts.passoTitulo,
    //color: '#505050'
    color: colors.laranja
  },
  textLoad2: {
    fontSize: 16,
    textAlign: "center",    
    fontFamily: fonts.passo,
    //color: '#505050',
    color: colors.laranja,
    marginTop: 15
  }
})