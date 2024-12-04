import { GoalBottomTab, GroupedGoal } from "@/components/GoalBottomTab";
import { SingleViewPager } from "@/components/SingleViewPager";
import { useGoal } from "@/contexts/goal-context";
import { delay } from "@/utils/delay";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Image, Dimensions } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo-prime.png"
import goalStyles from '../(goal)/goalStyle'
import globalStyles from "../globalStyle"
import { useEffect, useState } from "react";
import { DI } from "@/controllers/DI";
import { Conclusion } from "@/entities/conclusion";
import { GoalTitle } from "@/entities/goal";
import { BottomTab } from "@/components/BottomTab";
import { Loading } from "@/components/Loading";
import { useChild } from "@/contexts/ChildContext";
import RenderHtml from 'react-native-render-html';
const { width, height } = Dimensions.get('screen');

type ConclusionParams = {
  conclusionId: string;
};

export default function ConclusionPage() {
  const [stateload, setStateload] = useState<boolean>(true);
  const [conclusions, setConclusions] = useState<Conclusion[]>([])
  const [title, setTitle] = useState<GoalTitle>()
  const router = useRouter();
  const { goalVPRef } = useGoal();
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const { conclusionId } = useLocalSearchParams<ConclusionParams>();
  const childContext = useChild();
  const { childId } = childContext!;

  const fetchConclusions = async () => {
    setStateload(true)
    try {
      const data = await DI.Conclusion.GetConclusions(parseInt(conclusionId), childId!);
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

  if (stateload) return <Loading />

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, gap: 32, paddingTop: 12 }}>

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
                      <RenderHtml
                          contentWidth={width}
                          source={{
                            html: item.text
                          }}
                          tagsStyles={{
                            p: goalStyles.texto_dados
                          }}
                          baseStyle={goalStyles.texto_dados}
                        />
                    </View>
                  )
                })}

                {conclusions.length == 0 && (
                  <View style={{ paddingTop: 25 }}>
                    <Text style={goalStyles.texto_dados}>
                      Ainda não temos nenhum(a) {title?.titulo} disponível
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>

          <View style={{ height: 70 }} />
        </View>

        <BottomTab />

      </SafeAreaView>
    </GestureHandlerRootView>
  );
}