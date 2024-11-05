import { DI } from "@/controllers/DI";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View, Dimensions, Image, StyleSheet, ImageBackground } from "react-native";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from 'react-native-loading-spinner-overlay';
import logo from '../../assets/images/logo-prime.png'
import { useAsync } from "@/utils/use-async";
import { Kid } from "@/entities/kid";
import agendaImage from "../../assets/images/agenda.png"
import fotos from "../../assets/images/fotos.png"
import globalStyles from "../globalStyle"
import { delay } from "@/utils/delay";
import { GoalTitle } from "@/entities/goal";
const { width, height } = Dimensions.get('screen');

export default function Home() {
    const [stateload, setStateload] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [kidInfo, setKidInfo] = useState<Kid>();
    const [titles, setTitles] = useState<GoalTitle[]>()
    const router = useRouter();

    const fetchKidInformation = async () => {
        setStateload(true)
        try {
            const data = await DI.kid.kidInformations();
            const title = await DI.titles.GetTitles();
            setKidInfo(data);
            setTitles(title)
            console.log(title)
        } catch (err) {
            console.error(err);
        } finally {
            delay(1000).then(() => {
                setStateload(false)
            })
        }
    };

    useEffect(() => {
        fetchKidInformation();
    }, []);



    return (
        <GestureHandlerRootView>


            <SafeAreaView style={styles.container}>

                <Spinner
                    visible={stateload}
                    textContent="carregando..."
                    color={'#FFA431'}
                    textStyle={globalStyles.buttonText}
                    cancelable={false}
                    overlayColor={'#ffffff'}
                />

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 40, paddingTop: 20 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => { fetchKidInformation() }}
                            progressBackgroundColor={'#fff'}
                        />
                    }

                >

                    <View style={{ width: width, justifyContent: 'center', flexDirection: 'row' }}>
                        <Image source={logo} style={styles.logo} resizeMode='contain' />
                    </View>

                    <View style={styles.dados}>
                        {/*<Image source={{ uri: imagem }} style={[styles.imagem_dados, { backgroundColor: 'rgba(255,255,255,0.4)' }]} resizeMode='cover' />*/}
                        <View style={{ width: width * 0.8 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.texto_dados]}>
                                    Nome:
                                    <Text style={[styles.texto_dados, { color: '#fff', fontWeight: '800', paddingHorizontal: 8 }]}>
                                        {kidInfo?.Nome}
                                    </Text>
                                </Text>
                            </View>
                            <Text style={[styles.texto_dados, { fontWeight: '800' }]}>{kidInfo?.data_formata}</Text>
                            <Text style={[styles.texto_dados, {}]}>Educadoras:</Text>
                            {/*educadoras.map((item: any) => {
                                    return (
                                        <Text style={[styles.texto_dados, styles.educadora]}>{item.Nom_usuario}</Text>
                                    )
                                })*/}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.texto_dados]}>Supervisão: <Text style={[styles.texto_dados, { color: '#fff', fontWeight: '800', paddingHorizontal: 8 }]}>Christine Bruder</Text></Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: width * 0.9, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>

                        <TouchableOpacity style={[styles.button_titulo, { backgroundColor: '#FFC300', alignItems: 'center' }]} onPress={() => { }}>
                            <Image style={styles.imagem_titulo} source={agendaImage} resizeMode='contain' />
                            <Text style={[styles.texto_titulo, { textAlign: 'center' }]}>
                                age
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button_titulo, { padding: 0, paddingVertical: 0, overflow: 'hidden', flex: 1 }]} onPress={() => { }}>
                            <ImageBackground source={{ uri: kidInfo?.imagem }} resizeMode="cover" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            </ImageBackground>
                            <View style={styles.overlay} />
                            <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '100%', height: '100%' }}>
                                <Image style={styles.imagem_titulo} source={fotos} resizeMode='contain' />
                                <Text style={[styles.texto_titulo]}>
                                    Fotos
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {titles &&
                            titles
                                .filter(x => x.menu == 2)
                                .map((item: any) => {
                                    if (item.grafico != 1 && item.Idt_titulo != 5 && item.Idt_titulo != 6) {
                                        if (item.menu == 1) {
                                            return (
                                                <TouchableOpacity style={[styles.button_titulo, { backgroundColor: '#96989A', justifyContent: 'center', alignItems: 'center' }]} onPress={() => { }}>
                                                    <Text style={[styles.texto_titulo]}>
                                                        {item.titulo}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        } else {
                                            return (
                                                <TouchableOpacity key={item.Idt_titulo} style={[styles.button_titulo, { paddingVertical: 15 }]} onPress={() => { }}>
                                                    <Image style={styles.imagem_titulo} source={{ uri: item.imagem }} resizeMode='contain' />
                                                    <Text style={styles.texto_titulo}>
                                                        {item.titulo}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                    }
                                })}


                        <TouchableOpacity style={[styles.button_titulo, { backgroundColor: '#999999', alignItems: 'center', width: width * 0.9 }]} onPress={() => { router.push('/intro') }}>
                            <Text style={[styles.texto_titulo, { fontSize: width * 0.03 }]}>
                                Relatório semestral de desenvolvimento
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ height: height * 0.1 }}></View>

                </ScrollView>


            </SafeAreaView>

        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 0.32,
        height: width * 0.32,
        marginBottom: 25
    },
    dados: {
        width: width * 0.9,
        backgroundColor: '#96989A',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    texto_dados: {
        fontSize: width * 0.038,
        color: '#fff',
        //fontFamily: fonts.passo
    },
    educadora: {
        //marginLeft: width * 0.075,
        color: '#fff',
        fontWeight: '800'
    },
    imagem_dados: {
        width: '100%',
        height: width * 0.5,
        maxHeight: 800,
        borderRadius: 12
    },
    button_titulo: {
        backgroundColor: '#96989A',
        paddingHorizontal: 0,
        paddingVertical: 7,
        borderRadius: 12,
        width: width * 0.42,
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        minHeight: height * 0.05
    },
    button_titulo2: {
        width: width * 0.42,
        marginTop: 25,
        flexDirection: 'row'
    },
    texto_titulo: {
        textAlign: 'center',
        color: '#fff',
        fontSize: width * 0.03,
        flex: 0.7,
        //fontFamily: fonts.passo
    },
    imagem_titulo: {
        width: width * 0.09
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        opacity: 0.3
    }
})