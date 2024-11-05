import { GoalBottomTab, GroupedGoal } from "@/components/GoalBottomTab";
import { SingleViewPager } from "@/components/SingleViewPager";
import { useGoal } from "@/contexts/goal-context";
import { delay } from "@/utils/delay";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { Text, View, Dimensions } from "react-native";
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import goalStyles from "./goalStyle"
import globalStyles from "../globalStyle"
import { FontAwesome } from "@expo/vector-icons";
const { width, height } = Dimensions.get('screen');

type GoalModalParams = {
    goal: string;
    goalText: string;
    goalColor: string;
};

export default function GoalModal() {
    const router = useRouter();
    const { goal, goalText, goalColor } = useGlobalSearchParams<GoalModalParams>()

    function handleDimisModal(){
        if(router.canGoBack()){
            router.back()
        }
    }

    return (
        <GestureHandlerRootView>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}
                
            >

        	    

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 92, paddingBottom: 60,  }}
                    showsVerticalScrollIndicator={false}
                >

                    <TouchableOpacity style={{position: "absolute",width: width * 2, height: height * 2, /*backgroundColor: 'red',*/ left: -width/2,top: -height/9}} onPress={handleDimisModal} />

                    <View style={{ flex: 1, alignItems: "center" }}>
                        <View
                            style={[goalStyles.introContainer, { backgroundColor: goalColor, position: "relative" }]}
                        >
                            <TouchableOpacity style={{ position: "absolute", top: -10, right: 0 }} onPress={handleDimisModal}>
                                <Text>
                                    <FontAwesome name="times" size={24} color="white" />
                                </Text>
                            </TouchableOpacity>

                            <Text style={[goalStyles.titulo_dados, { paddingBottom: 10, fontWeight: '800', paddingTop: 25 }]}>
                                {goal}
                            </Text>
                            <View style={{ paddingTop: 25, flex: 1 }}>
                                <Text style={goalStyles.texto_dados}>
                                    {goalText} 
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}