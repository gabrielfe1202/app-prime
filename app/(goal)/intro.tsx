import { GoalBottomTab, GroupedGoal } from "@/components/GoalBottomTab";
import { SingleViewPager } from "@/components/SingleViewPager";
import { useGoal } from "@/contexts/goal-context";
import { delay } from "@/utils/delay";
import { useRouter } from "expo-router";
import { Text, View, Image, ScrollView, Dimensions } from "react-native";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import goalStyles from "./goalStyle"
import globalStyles from "../globalStyle"
import logo from "../../assets/images/logo-prime.png"
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading";
import { DI } from "@/controllers/DI";
import { useChild } from "@/contexts/ChildContext";
import { Introduction } from "@/entities/Introduction";
import RenderHtml from 'react-native-render-html';
const { width } = Dimensions.get('screen');

function Intro() {
  const router = useRouter();
  const { goalVPRef, setGoals } = useGoal();
  const childContext = useChild();
  const { childId } = childContext!;
  const [stateload, setStateload] = useState<boolean>(true);
  const [introductions, setIntroductions] = useState<Introduction[]>([])

  const fetchGoalIntro = async () => {
    setStateload(true)
    try {
      const introductions = await DI.Introduction.GetIntros(childId!)
      setIntroductions(introductions)
    } catch (err) {
      console.error(err);
    } finally {
      setStateload(false)
    }
  };

  useEffect(() => {
    fetchGoalIntro();
  }, []);

  async function changeGoals() {
    const data = await DI.goal.GetGoals(childId!)
    setGoals(data)
  }

  useEffect(() => {
    changeGoals()
  }, [childId])

  function handleNext() {
    router.push('/main');
  }

  function handleGoToGoal(goal: GroupedGoal) {
    router.replace('/main');

    delay(200).then(() => {
      goalVPRef.current?.gotoPageWhere(g => g.color === goal.color);
    });
  }


  if (stateload) return <Loading />

  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={{ flex: 1, gap: 32, }}
      >
        <SingleViewPager
          onNext={handleNext}
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
                    Introdução
                  </Text>
                  <View style={{ paddingTop: 25, flex: 1, gap: 35 }}>
                    {introductions.map(intro => (
                      <View key={intro.id}>
                        <Text style={[goalStyles.texto_dados, {marginBottom: 15}]}>
                          {intro.dateFormated()}
                        </Text>
                        <RenderHtml
                          contentWidth={width}
                          source={{
                            html: intro.text
                          }}
                          tagsStyles={{
                            p: goalStyles.texto_dados
                          }}
                          baseStyle={goalStyles.texto_dados}
                        />
                      </View>
                    ))}
                  </View>
                </View>

                <View style={{ height: 70 }} />

              </ScrollView>

            </View>
          )}
        />


        <GoalBottomTab onGotoPage={handleGoToGoal} />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Intro;