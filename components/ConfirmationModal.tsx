import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import globalStyles from "../app/globalStyle"
const { width, height } = Dimensions.get('screen');

interface LogoutConfirmationModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    tille: string,
    text: string,
    buttonText: string
    buttonType: "DANGER" | "SUCCESS"
}

const ConfirmationModal = ({ visible, onConfirm, onCancel, tille, text, buttonText, buttonType }: LogoutConfirmationModalProps) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.modalTitle}>{tille}</Text>
                        <TouchableOpacity onPress={onCancel} style={styles.closeButton}>                            
                            <FontAwesome name='times' styles={styles.closeButtonText} size={22} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingVertical: 20 }}>
                        <Text style={{ fontSize: 18 }}>{text}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={onCancel}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                buttonType == 'DANGER' ? globalStyles.buttonDanger : globalStyles.buttonSuccess
                            ]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.buttonText}>{buttonText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    logoutButton: {
        fontSize: 18,
        color: '#FF6347',
        fontWeight: 'bold',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: width * 0.8,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 0,
        borderBottomColor: '#ededed',
        borderBottomWidth: 2,
        paddingTop: 10
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        flex: 1,
        paddingLeft: 10
    },
    closeButton: {
        padding: 5,
    },
    closeButtonText: {
        fontSize: 40,
        color: '#505050',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
        paddingTop: 0
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#ccc',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
});
