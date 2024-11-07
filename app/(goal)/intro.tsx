import { GoalBottomTab, GroupedGoal } from "@/components/GoalBottomTab";
import { SingleViewPager } from "@/components/SingleViewPager";
import { useGoal } from "@/contexts/goal-context";
import { delay } from "@/utils/delay";
import { useRouter } from "expo-router";
import { Text, View, Image } from "react-native";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import goalStyles from "./goalStyle"
import globalStyles from "../globalStyle"
import logo from "../../assets/images/logo-prime.png"
import { withAuthCheck } from "@/utils/auth";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading";

function Intro() {
  const router = useRouter();
  const { goalVPRef } = useGoal();
  const [stateload, setStateload] = useState<boolean>(true);

  function handleNext() {
    router.push('/main');
  }

  function handleGoToGoal(goal: GroupedGoal) {
    router.replace('/main');

    delay(200).then(() => {
      goalVPRef.current?.gotoPageWhere(g => g.color === goal.color);
    });
  }

  useEffect(() => {
    delay(1500).then(() => {
      setStateload(false)
    })
  }, [])

  if(stateload) return <Loading />

  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={{ flex: 1, gap: 32, paddingTop: 32 }}
      >
        <TouchableOpacity style={globalStyles.logoContainer} onPress={() => { }}>
          <Image source={logo} style={globalStyles.logo} resizeMode='contain' />
        </TouchableOpacity>

        <SingleViewPager
          onNext={handleNext}
          renderItem={() => (
            <View key={'intro'} style={{ flex: 1, alignItems: "center" }}>
              <View
                style={goalStyles.introContainer}
              >
                  <Text style={[goalStyles.titulo_dados, { paddingBottom: 10, fontWeight: '800' }]}>
                    Introdução
                  </Text>
                  <View style={{ paddingTop: 25, flex: 1 }}>                    
                      <Text style={goalStyles.texto_dados}>
                        teste
                      </Text>                    
                  </View>                
              </View>
            </View>
          )}
        />

        <View style={{height: 70}} />

        <GoalBottomTab onGotoPage={handleGoToGoal} />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Intro;