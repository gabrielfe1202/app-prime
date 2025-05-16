import { colors } from "@/app/globalStyle";
import { Modal, View, Image, Text, Dimensions, TouchableOpacity, StyleSheet, Button } from "react-native"
import logo from "../assets/images/logo-prime.png"
import SideMenuItem from "./slideMenuItem";
import { useEffect, useState } from "react";
import Animated, { Easing, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { User } from "@/entities/user";
import { DI } from "@/controllers/DI";
import { useChild } from "@/contexts/ChildContext";
import { useAppUser } from "@/contexts/UserContext";
import { useRouter } from "expo-router";
import ConfirmationModal from "./ConfirmationModal";
import React from "react";
const { width, height } = Dimensions.get('screen');

interface SideBarProps {
    visible: boolean;
    onClose: () => void;
}

export function SideBarMenu({ visible, onClose }: SideBarProps) {
    const translateX = useSharedValue(-300);
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [modalConfirmVisible, setModalConfirmVisible] = useState<boolean>(false)
    const [user, setUser] = useState<User>()
    const [countChilds, setCountChilds] = useState<number>(0)
    const childContext = useChild();
    const { setChildId } = childContext!;
    const { userData, childCount, setUserToken, userController } = useAppUser();

    // const handleLogOut = async () => {
    //     setUserToken(null); // Remove o token
    // };

    const router = useRouter();

    useEffect(() => {
        if (visible) {
            setModalVisible(visible)
            translateX.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) });
        } else {
            setTimeout(() => {
                setModalVisible(visible)
            }, 300);
            translateX.value = withTiming(-600, { duration: 300, easing: Easing.out(Easing.ease) });
        }
    }, [visible]);


    const modalStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const handleLogOut = async () => {
        await userController.logout()
        setUserToken(null)
    }

    const handleCancel = (): void => {
        setModalConfirmVisible(false);
    };

    const handleShowConfirmModal = () => {
        setModalConfirmVisible(true);  // Exibir o modal de confirmação
    };

    return (
        <>
            <Modal visible={modalVisible} transparent={true} animationType="none" onRequestClose={onClose}>
                <View style={sideMenu.modalOverlay}>
                    <Animated.View style={[sideMenu.container, modalStyle, { height: height }]}>
                        <View style={sideMenu.inside}>
                            <View style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 130, height: 130, margin: 15 }}
                                    resizeMode={'contain'}
                                    source={logo}
                                />
                            </View>
                            <View style={sideMenu.headerBgTextContainer}>
                                <Text style={sideMenu.headerBgTextValue}>Olá, {userData?.getFirstName()}</Text>
                            </View>
                            <View style={sideMenu.buttonsContainer}>
                                {childCount > 1 && (
                                    <SideMenuItem
                                        iconName="child"
                                        text="Filhos"
                                        iconFamily="FontAwesome"
                                        callback={() => { setChildId(null) }}
                                    />
                                )}
                                <SideMenuItem
                                    iconName="cog"
                                    text=" Minha conta"
                                    iconFamily="FontAwesome"
                                    callback={() => router.push("/(Account)")}
                                />
                                <SideMenuItem
                                    iconName="logout"
                                    text="Sair"
                                    iconFamily="MaterialCommunityIcons"
                                    callback={handleShowConfirmModal}
                                />
                            </View>
                        </View>
                    </Animated.View>
                </View>
                <TouchableOpacity style={sideMenu.outside} onPress={onClose} />
            </Modal>
            <ConfirmationModal
                visible={modalConfirmVisible}
                tille="Logout"
                text="Tem certeza que deseja sair?"
                buttonText="Sair"
                buttonType="DANGER"
                onConfirm={handleLogOut}
                onCancel={handleCancel}
            />
        </>
    )
}

const sideMenuSize = 0.7;
const sideMenu = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    outside: {
        width: width * (1 - sideMenuSize),
        opacity: 0.6,
        position: "absolute",
        height: height,
        right: 0
    },
    inside: {
        width: width * sideMenuSize,
        backgroundColor: '#fff',
        justifyContent: "center",
        paddingBottom: height * 0.2
    },
    headerBgTextContainer: {
        justifyContent: 'center',
        marginHorizontal: width * 0.07,
        alignItems: 'center',
    },
    headerBgTextValue: {
        color: colors.laranja,
        fontWeight: 'bold',
        fontSize: 24,
    },
    buttonsContainer: {
        //flex: 1,
        marginTop: height * 0.15,
        justifyContent: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
});