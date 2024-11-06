import { GoalBottomTab, GroupedGoal } from "@/components/GoalBottomTab";
import { SingleViewPager } from "@/components/SingleViewPager";
import { useGoal } from "@/contexts/goal-context";
import { delay } from "@/utils/delay";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo-prime.png"
import goalStyles from './goalStyle'
import globalStyles from "../globalStyle"

export default function Ending() {
  const router = useRouter();
  const { goalVPRef } = useGoal();

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



  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, gap: 32, paddingTop: 32 }}>

        <TouchableOpacity style={globalStyles.logoContainer} onPress={() => { }}>
          <Image source={logo} style={globalStyles.logo} resizeMode='contain' />
        </TouchableOpacity>

        <SingleViewPager
          onPrevious={handlePrevious}
          renderItem={() => (
            <View key={'intro'} style={{ flex: 1, alignItems: "center" }}>
              <View
                style={goalStyles.introContainer}
              >
                <Text style={[goalStyles.titulo_dados, { paddingBottom: 10, fontWeight: '800' }]}>
                  Considerações finais
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

        <View style={{ height: 70 }} />

        <GoalBottomTab onGotoPage={handleGoToGoal} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}