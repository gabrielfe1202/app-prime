import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');

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
    
});

export default styles;
