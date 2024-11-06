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

            {/*erro && (
            <View style={{ width: width, position: 'absolute', bottom: 40, justifyContent: 'center', alignItems: 'center', zIndex: 99999 }}>
                <View style={{ width: width * 0.9, height: 50, backgroundColor: '#505050', borderRadius: 15, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, flexDirection: 'row' }}>
                    <Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}>
                        Verifique a sua conexão
                    </Text>
                    <TouchableOpacity>
                        <Text onPress={() => _bootstrapAsync()} style={{ color: '#7fa8f5', fontWeight: '800', fontSize: 15 }}>
                            tente novamente
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )*/}

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