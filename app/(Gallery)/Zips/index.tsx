import { colors, fonts } from "@/app/globalStyle";
import { useChild } from "@/contexts/ChildContext";
import { DI } from "@/controllers/DI";
import { ZipImage } from "@/entities/kid";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const { width, height } = Dimensions.get("screen")

export default function ZipsPage() {
    const router = useRouter()
    const [zips, setZips] = useState<ZipImage[]>([])

    async function getZips() {
        try {
            const data = await DI.kid.listZips()
            setZips(data)
        } catch {
            console.error("erro lista zip")
        }
    }

    useEffect(() => {
        getZips()
    }, [])

    const handleDownloadZip = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingVertical: 55, backgroundColor: 'rgba(0,0,0,.2)', justifyContent: "center", alignItems: "center" }}>
            <View style={{ backgroundColor: '#fff', flex: 1, width: width * 0.9, borderRadius: 25, padding: 20, alignItems: "flex-end" }}>
                <TouchableOpacity style={{/*backgroundColor: 'blue',*/ width: 40, height: 30, paddingRight: 5 }} onPress={() => router.back()}>
                    <Text style={{ textAlign: "right" }}>
                        <FontAwesome name="times" size={24} color="black" />
                    </Text>
                </TouchableOpacity>

                <View style={{ width: '100%' }}>
                    <Text style={styles.title}>Pacotes de fotos</Text>
                </View>

                <View style={[styles.zipsContainer,{width: width * 0.8}]}>
                    {zips.map(item => (
                        <View style={styles.zipItem} key={item.Id}>
                            <Text style={styles.zipData}>{item.date}</Text>
                            <TouchableOpacity onPress={() => handleDownloadZip(item.url)}>
                                <FontAwesome name="download" size={25} color={'#000'} />
                            </TouchableOpacity>
                        </View>
                    ))}
                    {zips.length == 0 && (                        
                        <Text style={[styles.zipData,{textAlign: "center"}]}>Ainda não temos nenhum pacote de fotos disponível</Text>                        
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        textAlign: "center",
        fontFamily: fonts.passo
    },
    zipsContainer: {
        flex: 1,
        alignItems: "center",
        marginTop: 40,
        gap: 15
    },
    zipItem: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingVertical: 4,
        paddingHorizontal: 15
    },
    zipData: {
        fontSize: 21,
        color: '#000'
    }
})