import { useRef } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';
import LoadAnimationJson from "../assets/animations/splash.json"
import logoPrime from "../assets/images/logo-prime.png"
const { width, height } = Dimensions.get('screen');

export function Loading() {
    const animationRef = useRef<LottieView>(null);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Image
                style={[styles.logoFullWidth, { width: width * 0.65 }]}
                resizeMode={'contain'}
                source={logoPrime}
            />
            <LottieView
                source={LoadAnimationJson}
                autoPlay
                loop={true}
                ref={animationRef}
                style={{ flex: 0, width: width, height: 150, marginTop: -50 }}
            />

        </View>
    )
}

export function Load(){
    const animationRef = useRef<LottieView>(null);
  
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.2 }}>          
            <LottieView
                source={LoadAnimationJson}
                autoPlay
                loop={true}
                ref={animationRef}
                style={{ flex: 0, width: width, height: 150, marginTop: -50 }}
            />
  
        </View>
    )
  }

const styles = StyleSheet.create({
    logoFullWidth: {
        flex: 0.5,
        width: width - 50,
        //height: screenHeight * 2,
    },
})