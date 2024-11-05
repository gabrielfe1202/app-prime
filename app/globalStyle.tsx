import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');

const fonts = {
    passo: 'Futura-medium',
    passoTitulo: 'Futura',
    textoResposta: 'Futura-light'
}

const colors = {
    laranja: '#FFA431',
    azul: '#20B9EC',
    white: '#fff'
}

export { fonts, colors}

const styles = StyleSheet.create({
    logoContainer: {
        width: width, 
        justifyContent: 'center', 
        flexDirection: 'row'
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 5
    },
    buttonText: {
        textAlign: 'center',
        //fontFamily: fontFamilyBold,
        fontWeight: 'bold',
        color: colors.laranja,
        fontSize: 20,
    },
});

export default styles;
