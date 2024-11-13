// SelectChildScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useChild } from '../contexts/ChildContext';
import { DI } from '@/controllers/DI';
import { User } from '@/entities/user';
import { Kid } from '@/entities/kid';
import logo from '../assets/images/logo-prime.png'
import { colors } from '@/app/globalStyle';
import { Loading } from './Loading';
import { useRouter } from 'expo-router';
import { useAppUser } from '@/contexts/UserContext';
const { width, height } = Dimensions.get('screen');

export default function SelectChildScreen() {
    const childContext = useChild();
    const [user, setUser] = useState<User>()
    const [childs, setChilds] = useState<Kid[]>([])
    const [stateload, setStateload] = useState<boolean>(true);
    const router = useRouter();
    const { userToken, setUserToken, userController } = useAppUser(); 

    if (!childContext) return null;
    const { setChildId } = childContext;

    const handleSelectChild = (id: number) => {        
        setChildId(id);       
    };

    const fetchuserInformation = async () => {
        setStateload(true)
        try {
            const data = await userController.getUserInformations();
            const childs = await userController.getUserChilds()
            setUser(data)
            setChilds(childs)
            if(childs.length == 1){
                setChildId(childs[0].Idt_Cri_Crianca)
            }
        } catch (err) {
            console.error(err);
        }finally{
            setStateload(false)
        }
    };

    useEffect(() => {
        fetchuserInformation()
    }, [])

    if(stateload) return <Loading />

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 40, paddingTop: 20 }}
                showsVerticalScrollIndicator={false}>
                <Image source={logo} style={styles.logo} resizeMode='contain' />
                
                <Text style={styles.texto}>Seja bem-vindo!</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 0.9, flexWrap: 'wrap' }}>
                    {childs.map((item, index) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity style={styles.button} onPress={() => handleSelectChild(item.Idt_Cri_Crianca!)}>
                                    <ImageBackground source={{ uri: item.imagem }} resizeMode='cover' style={[styles.image_filho,{}]}
                                        imageStyle={{ borderRadius: 15,backgroundColor: 'rgba(0,0,0,0.4)' }}>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <Text style={styles.nome_filho}>{item.Nome}</Text>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F1F1'
    },
    button: {
        borderRadius: 15,
        marginTop: 15
    },
    textButton: {
        color: '#fff',
        fontSize: 25
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 25
    },
    texto: {
        fontSize: 25,
        color: '#96989A'
    },
    image_filho: {
        width: width * 0.43,
        height: 130,
        borderRadius: 15
    },
    nome_filho: {
        textAlign: 'center',
        fontSize: 15,
        color: colors.laranja,
        maxWidth: width * 0.4,
        fontFamily: 'Inter_900Black'
    }
});
