import { useEffect, useMemo, useState } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useGoal } from "@/contexts/goal-context";
import { Goal, GoalTitle } from "@/entities/goal";
import { asyncArrayToState } from "@/utils/use-async";
import { router } from "expo-router";
import homeImage from "../assets/images/home.png"
import menuImage from "../assets/images/menu.png"
import { SideBarMenu } from "./SideBarMenu";

const { width, height } = Dimensions.get('screen');

export function BottomTab() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const openModal = () => setModalVisible(true);
  
    const closeModal = () => setModalVisible(false);

    return (
        <>

            <SideBarMenu visible={modalVisible} onClose={closeModal} />

            <View style={footerStyles.container} >
                <TouchableOpacity onPress={() => { router.push('/(home)') }} >
                    <Image source={homeImage} style={footerStyles.icones} resizeMode='contain' />
                </TouchableOpacity>

                <View style={{ flexDirection: "row" }}>

                </View>

                <TouchableOpacity onPress={() => setModalVisible(true)} >
                    <Image source={menuImage} style={footerStyles.icones} resizeMode='contain' />
                </TouchableOpacity>
            </View>
        </>
    )
}

const footerStyles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: 0,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        shadowColor: '#000',
        elevation: 40,
        borderTopColor: '#505050',
        borderWidth: 0,
        paddingHorizontal: 18,
        paddingVertical: 5
    },
    icones: {
        width: width * 0.136,
        height: width * 0.136
    }
});