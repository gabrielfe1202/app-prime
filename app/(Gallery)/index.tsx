import { DI } from '@/controllers/DI';
import { KidImage } from '@/entities/kid';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView, FlatList, TouchableOpacity, Animated, ScrollView, ActivityIndicator, ImageProps, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';
import PagerView from 'react-native-pager-view';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
} from 'react-native-popup-menu';
import { Loading } from '@/components/Loading';
const { width } = Dimensions.get('screen');

const Gallery = () => {
    const [stateload, setStateload] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
    const [kidImages, setKidImages] = useState<KidImage[]>([])
    const [filteredkidImages, setFilteredKidImages] = useState<KidImage[]>([])
    const [filters, setFilters] = useState<string[]>([])
    const [filterItem, setFilterItem] = useState<string>('Todos')
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
            setKidImages(data.images)
            setFilters(data.years)
        } catch (err) {
            console.error(err);
        } finally {
            setStateload(false)
        }
    };

    useEffect(() => {
        fetchKidImages();
    }, []);

    useEffect(() => {
        if (filterItem === "Todos") {
            setFilteredKidImages(kidImages)
        } else {
            setFilteredKidImages(kidImages.filter(x => x.year === filterItem))
        }
    }, [filterItem, kidImages])

    const renderGridView = () => {
        return (
            <ScrollView
                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                showsVerticalScrollIndicator={false}
            >
                {filteredkidImages.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setCurrentIndex(index);
                            setViewMode('carousel');
                            if (pagerRef.current) {
                                pagerRef.current.setPage(index);
                            }
                        }}
                        style={[
                            styles.gridItem,
                            currentIndex === index && { borderWidth: 2 }
                        ]}
                    >
                        <Image source={{ uri: item.linkMedium }} style={styles.gridImage} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        )
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

    if (stateload) return <Loading />

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
                    <View style={{ width: width * 0.33, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <TouchableOpacity onPress={toggleViewMode} style={{ padding: 5, borderRadius: 20 }} >
                            <FontAwesome name="th" size={27} color={'#000'} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push("/(Gallery)/Zips")} style={{ padding: 5, borderRadius: 20 }} >
                            <FontAwesome name="download" size={27} color={'#000'} />
                        </TouchableOpacity>

                        <Menu style={{ paddingLeft: 10, padding: 5 }}>
                            <MenuTrigger>
                                <Feather name="list" size={27} color="black" />
                            </MenuTrigger>
                            <MenuOptions>
                                {filters.map(item => (
                                    <MenuOption
                                        key={item}
                                        onSelect={() => setFilterItem(item)}
                                        text={item}
                                        customStyles={{ optionWrapper: { padding: 5, backgroundColor: filterItem === item ? "#000" : "#fff" }, optionText: { fontSize: 18, color: filterItem === item ? "#fff" : "#000" } }}
                                    />
                                ))}
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
                            {filteredkidImages.map((image, index) => (
                                <View key={image.id} style={styles.page}>
                                    <Animated.View
                                        style={[
                                            styles.imageWrapper,
                                        ]}
                                    >
                                        <ImageWithLoadingBackground
                                            source={{ uri: image.linkMedium }}
                                            style={[styles.image]}
                                            backgroundColor="#E0E0E0"
                                            indicatorColor="#9E9E9E" 
                                            resizeMode='contain'    
                                        />
                                    </Animated.View>
                                </View>
                            ))}
                        </PagerView>

                        <TouchableOpacity style={{ flexDirection: 'row', marginHorizontal: width * 0.05, paddingHorizontal: 15, paddingVertical: 5, borderWidth: 1, backgroundColor: '#ededed', width: width * 0.9, borderColor: "#c1c1c1", borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginBottom: 45 }}>
                            <Text style={{ fontSize: 16 }}>Compartilhar foto</Text>
                            <Entypo name="share" size={16} color="black" style={{ marginLeft: 10 }} />
                        </TouchableOpacity>

                        <FlatList
                            data={filteredkidImages}
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
                                        currentIndex === index && { borderWidth: 2 }
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
        paddingHorizontal: 30,
        gap: 10
    },
    thumbnailWrapper: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        backgroundColor: 'rgba(255, 164, 49,0.4)'
    },
    thumbnail: {
        width: 90,
        height: 90,
        resizeMode: 'cover',
        borderRadius: 5,
        backgroundColor: 'rgba(255, 164, 49,0.4)'
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


interface ImageWithLoadingBackgroundProps extends Omit<ImageProps, 'source' | 'style'> {
  source: ImageSourcePropType;
  style?: StyleProp<ViewStyle>; // Style for the container View
  imageStyle?: StyleProp<ImageProps['style']>; // Optional specific style for the Image itself
  backgroundColor?: string;
  indicatorColor?: string;
}

const ImageWithLoadingBackground = ({
  source,
  style,
  imageStyle,
  backgroundColor = '#E0E0E0',
  indicatorColor = '#9E9E9E',
  ...props
}: ImageWithLoadingBackgroundProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <View style={[stylesImage.container, style]}>
      {loading && (
        <View style={[stylesImage.background, { backgroundColor }]}>
          <ActivityIndicator size="small" color={indicatorColor} />
        </View>
      )}
      <Image
        source={source}
        style={[stylesImage.image, loading ? stylesImage.hidden : {}]} // Combine base image style, custom imageStyle, and hidden style
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)} // Handle potential loading errors
        {...props} // Pass remaining ImageProps like resizeMode, etc.
      />
    </View>
  );
};

const stylesImage = StyleSheet.create({
  container: {
    overflow: 'hidden', // Ensures background doesn't spill out if image has border radius
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Needed for absolute positioning of the background
  },
  background: {
    ...StyleSheet.absoluteFillObject, // Position the background absolutely to cover the container
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure background is behind the image, but visible when image is hidden
  },
  image: {
    width: '100%',
    height: '100%',
    zIndex: 0, // Ensure image is behind the background initially (when hidden)
  },
  hidden: {
    opacity: 0, // Hide the image component itself until loaded
  },
});
