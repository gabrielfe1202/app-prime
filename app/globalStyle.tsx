import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');

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
});

export default styles;
