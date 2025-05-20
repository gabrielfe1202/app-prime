import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get('screen');

const fonts = {
    passo: 'Futura-medium',
    passoTitulo: 'Futura',
    textoResposta: 'Futura-light'
}

const colors = {
    laranja: '#FFA431',
    azul: '#20B9EC',
    white: '#fff',
    cinza: '#96989A'
}

export { fonts, colors}

const styles = StyleSheet.create({
    logoContainer: {
        width: width, 
        justifyContent: 'center', 
        flexDirection: 'row'
    },
    logo: {
        width: 115,
        height: 115,
        marginBottom: 5
    },
    buttonText: {
        textAlign: 'center',
        //fontFamily: fontFamilyBold,
        fontWeight: 'bold',
        color: colors.laranja,
        fontSize: 20,
    },
    buttonDanger: {
        backgroundColor: '#DC3545',
        borderColor: '#9a0007',
        borderWidth: 2
    },
    buttonSuccess: {
        backgroundColor: '#28A745',
        borderColor: '#33822c',
        borderWidth: 2
    },
});

export default styles;
