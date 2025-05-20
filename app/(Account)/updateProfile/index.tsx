import { colors, fonts } from "@/app/globalStyle";
import AlertModal from "@/components/AlertModal";
import { BottomTab } from "@/components/BottomTab";
import { Loading } from "@/components/Loading";
import { CustomInput, masks } from "@/components/CustomInput";
import { useAppUser } from "@/contexts/UserContext";
import React from "react";
import { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { Address } from "@/objectValues/address";
import { useRouter } from "expo-router";

export default function ChangePassword() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [cellphone, setCellphone] = useState<string>('');
    const [address, setAddress] = useState<Address>(new Address())    
    const [stateLoad, setStateload] = useState<boolean>(false)
    const [modalType, setModalType] = useState<"DANGER" | "SUCCESS">("DANGER")
    const [modalText, setModalText] = useState<string>("")
    const { userData, userController } = useAppUser();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        setEmail(userData?.email ?? '')
        setPhone(userData?.phone.number ?? '')
        setCellphone(userData?.cellPhone.number ?? '')
        setAddress(userData?.address ?? new Address())
    }, [])

    const handleSaveChanges = async () => {
        setStateload(true)
        userController.updateInformations(email, phone, cellphone, address)
            .then(() => {
                router.push("/(Account)")
            })
            .catch((e: Error) => {
                setModalType("DANGER")
                setModalText(e.message)
                setIsModalVisible(true)
            }).finally(() => {
                setStateload(false)
            })
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const handleChange = (key: keyof Address, value: string | null) => {
        const updated = new Address();
        Object.assign(updated, address, { [key]: value });
        setAddress(updated);
    };

    if (stateLoad) return <Loading />

    return (
        <GestureHandlerRootView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{paddingVertical: 100}}>
                        <View style={styles.container}>
                            <Text style={styles.titulo}>Meus dados</Text>

                            <View style={{ flexDirection: "column", gap: 15 }}>
                                <CustomInput
                                    placeholder="E-mail"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                />

                                <CustomInput
                                    placeholder="Telefone"
                                    value={phone}
                                    onChangeText={setPhone}
                                    mask={masks.phone}
                                    keyboardType="numeric"
                                />

                                <CustomInput
                                    placeholder="Celular"
                                    value={cellphone}
                                    onChangeText={setCellphone}
                                    mask={masks.cellphone}
                                    keyboardType="numeric"
                                />
                            </View>

                            <Text style={[styles.titulo,{marginTop: 35}]}>Endereço</Text>

                            <View style={{ flexDirection: "column", gap: 15 }}>
                                <CustomInput
                                    placeholder="CEP"
                                    value={address.postalCode ?? ''}
                                    onChangeText={(text) => handleChange('postalCode', text)}
                                    mask={masks.zipCode}
                                    keyboardType="numeric"
                                />
                                <CustomInput
                                    placeholder="Rua"
                                    value={address.street ?? ''}
                                    onChangeText={(text) => handleChange('street', text)}
                                />
                                <CustomInput
                                    placeholder="Número"
                                    value={address.number ?? ''}
                                    onChangeText={(text) => handleChange('number', text)}
                                    keyboardType="numeric"
                                />
                                <CustomInput
                                    placeholder="Complemento"
                                    value={address.complement ?? ''}
                                    onChangeText={(text) => handleChange('complement', text)}
                                />
                                <CustomInput
                                    placeholder="Bairro"
                                    value={address.neighborhood ?? ''}
                                    onChangeText={(text) => handleChange('neighborhood', text)}
                                />
                                <CustomInput
                                    placeholder="Cidade"
                                    value={address.city ?? ''}
                                    onChangeText={(text) => handleChange('city', text)}
                                />
                                <CustomInput
                                    placeholder="Estado"
                                    value={address.state ?? ''}
                                    onChangeText={(text) => handleChange('state', text)}
                                />                                
                            </View>

                            <TouchableOpacity onPress={handleSaveChanges} style={styles.botaoAlterar}>
                                <Text style={styles.textoBotao}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    {!keyboardVisible && (
                        <BottomTab />
                    )}

                    <AlertModal
                        isVisible={isModalVisible}
                        onClose={hideModal}
                        title={"Ops, Houve um erro"}
                        message={modalText}
                        type={modalType}
                    />
                </View>
            </TouchableWithoutFeedback>
        </GestureHandlerRootView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    titulo: {
        fontFamily: fonts.passoTitulo,
        fontSize: 28,      
        marginBottom: 20,
        textAlign: 'center',
        color: colors.azul
    },
    botaoAlterar: {
        backgroundColor: colors.azul,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 25
    },
    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: fonts.passo
    },
    input: {
        height: 50,
        borderColor: '#505050',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
        color: "#505050",
        fontFamily: fonts.passo
    },
});
