import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Image, Dimensions } from 'react-native';
import danger from "../assets/images/danger.png"
import success from "../assets/images/success.png"
import warning from "../assets/images/warning.png"
import { fonts } from '@/app/globalStyle';
import globalStyles from "../app/globalStyle"
const { width, height } = Dimensions.get('screen');

interface AlertModalProps {
    isVisible: boolean;
    title: string;
    message: string;
    onClose: () => void;
    type: "SUCCESS" | "DANGER" | "WARNING"
}

const AlertModal = ({ isVisible, title, message, onClose, type }: AlertModalProps) => {
    const [slideAnim] = useState(new Animated.Value(300));
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    useEffect(() => {
        if (isVisible) {
            setModalVisible(isVisible)
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => {
                setModalVisible(isVisible)
            }, 400);
            Animated.timing(slideAnim, {
                toValue: 600,
                duration: 400,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <Animated.View
                    style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}
                >
                    <Image
                        source={
                            type == "DANGER" ? danger :
                                type == "SUCCESS" ? success :
                                    type == "WARNING" && warning
                        }
                        style={styles.image}
                    />

                    <Text style={styles.modalTitle}>{title}</Text>
                    <Text style={styles.modalBody}>{message}</Text>
                    <TouchableOpacity
                        onPress={onClose}
                        style={[
                            styles.closeButton,
                            type == "DANGER" ? globalStyles.buttonDanger :
                                type == "SUCCESS" ? globalStyles.buttonSuccess :
                                    type == "WARNING" && {}
                        ]}
                    >
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 20,
        width: width * 0.75,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 15
    },
    modalBody: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },
    closeButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 20,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: fonts.passoTitulo,
    },
    image: {
        marginTop: -55,
        height: 85,
        width: 85
    }
});

export default AlertModal;
