import { StyleSheet, Dimensions } from "react-native";
import { fonts } from "../globalStyle";
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    title: {
        color: '#505050',
        fontSize: 24, 
        paddingHorizontal: 24 
    },
    introContainer: {
        width: width * 0.9,
        backgroundColor: '#96989A',
        paddingHorizontal: 20,
        paddingVertical: 25,
        borderRadius: 20,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1
    },
    titulo_dados: {
        fontSize: 25,
        color: '#fff',
        textAlign: 'center',
        fontFamily: fonts.passo
    },
    texto_dados: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },
});

export default styles;
