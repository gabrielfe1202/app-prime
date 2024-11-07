import { DI } from '@/controllers/DI';
import { KidImage } from '@/entities/kid';
import { delay } from '@/utils/delay';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView, FlatList, TouchableOpacity, Button, Animated } from 'react-native';
import PagerView, { PagerViewProps } from 'react-native-pager-view';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
} from 'react-native-popup-menu';
const { width, height } = Dimensions.get('screen');

const images = [
    { id: '1', uri: 'https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140174.jpg' },
    { id: '2', uri: 'https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140174.jpg' },
    { id: '3', uri: 'https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140173.jpg' },
    { id: '4', uri: 'https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140174.jpg' },
    { id: '5', uri: 'https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140173.jpg' },
    { id: '6', uri: 'https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140174.jpg' },
];


const Gallery = () => {
    const [stateload, setStateload] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
    const [kidImages, setKidImages] = useState<KidImage[]>([])
    const pagerRef = useRef<PagerView | null>(null);
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const router = useRouter();
    const toggleViewMode = () => {
        setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel');
    };


    const fetchKidImages = async () => {
        setStateload(true)
        try {
            const data = await DI.kid.getImagesGallery();
            setKidImages(data)
        } catch (err) {
            console.error(err);
        } finally {
            delay(1000).then(() => {
                setStateload(false)
            })
        }
    };

    useEffect(() => {
        fetchKidImages();
    }, []);

    const renderThumbnail = ({ item, index }: { item: { id: string, uri: string }, index: number }) => (
        <TouchableOpacity
            onPress={() => {
                setCurrentIndex(index);
                setViewMode('carousel');
                if (pagerRef.current) {
                    pagerRef.current.setPage(index);
                }
            }}
            style={styles.thumbnailWrapper}
        >
            <Image source={{ uri: item.uri }} style={styles.thumbnail} />
        </TouchableOpacity>
    );

    const renderGridView = () => {
        return (
            <FlatList
                data={kidImages}
                renderItem={({ item, index }: { item: KidImage, index: number }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setCurrentIndex(index);
                            setViewMode('carousel');
                            if (pagerRef.current) {
                                pagerRef.current.setPage(index);
                            }
                        }}
                        style={[
                            styles.gridItem,
                            currentIndex == index && { borderWidth: 2 }
                        ]}
                    >
                        <Image source={{ uri: item.linkMedium }} style={styles.gridImage} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.link + "grid"}
                numColumns={3}
                columnWrapperStyle={styles.gridRow}
                contentContainerStyle={styles.gridContainer}
            />
        );
    };

    const handlePageScroll = (e: { nativeEvent: { offset: number } }) => {
        const offsetX = e.nativeEvent.offset;

        const newScale = 1 - Math.abs(offsetX) * 0.2;
        const newOpacity = 1 - Math.abs(offsetX) * 0.5;

        scale.setValue(newScale);
        opacity.setValue(newOpacity);
    };

    const onPageSelected = (e: { nativeEvent: { position: number } }) => {
        const newIndex = e.nativeEvent.position;
        setCurrentIndex(newIndex);
        scale.setValue(1);
        opacity.setValue(1);
    };

    return (
        <SafeAreaView style={styles.container}>
            <MenuProvider>
                <View
                    style={[
                        styles.menuContainer,
                        {
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.36,
                            shadowRadius: 5.68,
                            elevation: 1,
                        },
                    ]}
                >
                    <View style={{ width: width * 0.55 }}>
                        <TouchableOpacity onPress={() => { router.replace('/(home)') }} style={{ width: '50%' }}>
                            <Feather name="chevron-left" style={{ fontSize: 27, color: '#000', marginLeft: 15 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: width * 0.3, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <TouchableOpacity onPress={toggleViewMode} style={{ padding: 5, borderRadius: 20 }} >
                            <FontAwesome name="th" size={27} color={'#000'} />
                        </TouchableOpacity>
                        <Menu style={{ paddingLeft: 15, padding: 5 }}>
                            <MenuTrigger>
                                <Feather name="list" size={27} color="black" />
                            </MenuTrigger>
                            <MenuOptions>
                                {/*filters.map((item: any) => (
                                <MenuOption
                                    onSelect={() => {}}
                                    text={item}
                                    customStyles={{ optionWrapper: { padding: 5, backgroundColor: filterItem == item ? "#000" : "#fff" }, optionText: { fontSize: 18, color: filterItem == item ? "#fff" : "#000" } }}
                                />
                            ))*/}
                                <MenuOption
                                    onSelect={() => { }}
                                    text={'000'}
                                    customStyles={{ optionWrapper: { padding: 5, backgroundColor: "#fff" }, optionText: { fontSize: 18, color: "#000" } }}
                                />

                            </MenuOptions>
                        </Menu>
                    </View>
                </View>

                {viewMode === 'carousel' && (
                    <>
                        <PagerView
                            style={styles.pagerView}
                            initialPage={currentIndex}
                            onPageSelected={onPageSelected}
                            onPageScroll={handlePageScroll} 
                            ref={pagerRef} 
                        >
                            {kidImages.map((image, index) => (
                                <View key={image.id} style={styles.page}>
                                    <Animated.View
                                        style={[
                                            styles.imageWrapper,
                                            {
                                                transform: [{ scale: scale }],
                                                opacity: opacity,
                                            },
                                        ]}
                                    >
                                        <Image source={{ uri: image.linkMedium }} style={styles.image} />
                                    </Animated.View>
                                </View>
                            ))}
                        </PagerView>

                        <FlatList
                            data={kidImages}
                            renderItem={({ item, index }: { item: KidImage, index: number }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setCurrentIndex(index);
                                        setViewMode('carousel');
                                        if (pagerRef.current) {
                                            pagerRef.current.setPage(index);
                                        }
                                    }}
                                    style={[
                                        styles.thumbnailWrapper,
                                        currentIndex == index && { borderWidth: 2 }                           
                                    ]}
                                >
                                    <Image source={{ uri: item.linkSmall }} style={styles.thumbnail} />
                                </TouchableOpacity>
                            )}
                            horizontal
                            keyExtractor={(item) => item.link}
                            style={styles.thumbnailList}
                            contentContainerStyle={styles.thumbnailListContainer}
                            showsHorizontalScrollIndicator={false}
                        />
                    </>
                )}

                {viewMode === 'grid' && renderGridView()}
            </MenuProvider>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    pagerView: {
        flex: 1,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageWrapper: {
        width: Dimensions.get('window').width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        flex: 1,
        resizeMode: 'contain',
    },
    indicator: {
        alignItems: 'center',
    },
    indicatorText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    toggleButton: {
        padding: 10,
        backgroundColor: 'white',
    },
    gridContainer: {
        flex: 1,
        width: width
    },
    gridRow: {
        justifyContent: 'space-between',
        marginBottom: 1,
    },
    thumbnailList: {        
        maxHeight: 125,
        marginBottom: 35
    },
    thumbnailListContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 10
    },
    thumbnailWrapper: {        
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
    },
    thumbnail: {
        width: 90,
        height: 90,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    menuContainer: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#f2f2f2',
    },
    gridItem: {
        width: (width / 3) - 1,
        height: (width / 3) - 1,
        borderWidth: 1,
        borderColor: '#000'
    },
    gridImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
});

export default Gallery;
