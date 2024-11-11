import { GoalBottomTab, GroupedGoal } from "@/components/GoalBottomTab";
import { SingleViewPager } from "@/components/SingleViewPager";
import { useGoal } from "@/contexts/goal-context";
import { delay } from "@/utils/delay";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Image, Dimensions } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo-prime.png"
import goalStyles from './goalStyle'
import globalStyles from "../globalStyle"
import { useEffect, useState } from "react";
import { DI } from "@/controllers/DI";
import { Conclusion } from "@/entities/conclusion";
import { GoalTitle } from "@/entities/goal";
import { useChild } from "@/contexts/ChildContext";
const { width, height } = Dimensions.get('screen');

export default function Ending() {
  const [stateload, setStateload] = useState<boolean>(true);
  const [conclusions, setConclusions] = useState<Conclusion[]>([])
  const [title, setTitle] = useState<GoalTitle>()
  const router = useRouter();
  const { goalVPRef } = useGoal();
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
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
      const data = await DI.Conclusion.GetConclusions(ConclusionId,childId!);
      setConclusions(data.conclusions)
      setTitle(data.title)
    } catch (err) {
      console.error(err);
    } finally {
      delay(1000).then(() => {
        setStateload(false)
      })
    }
  };

  useEffect(() => {
    fetchConclusions();
  }, []);

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

                <TouchableOpacity style={[globalStyles.logoContainer,{paddingBottom: 30}]} onPress={() => { }}>
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
                          Ainda não temos nenhum {/*titulo*/}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
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