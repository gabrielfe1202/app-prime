import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() { 
    const router = useRouter();
    
    
  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={{ flex: 1, gap: 32, paddingTop: 32 }}
      >
        <Text style={{ fontSize: 24, color: 'white', paddingHorizontal: 24 }}>Introdução---</Text>

        <TouchableOpacity onPress={() => {router.push('/intro')}}>
            <Text>Intro</Text>
        </TouchableOpacity>

  
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}