import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView, FlatList, TouchableOpacity, Button } from 'react-native';
import PagerView from 'react-native-pager-view';

const images = [
    { id: '1', uri: 'https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140174.jpg' },
    { id: '2', uri: 'https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140174.jpg' },
    { id: '3', uri: 'https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140173.jpg' },
    { id: '4', uri: 'https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140174.jpg' },
    { id: '5', uri: 'https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140173.jpg' },
    { id: '6', uri: 'https://o2sistema.blob.core.windows.net/o2sistema/Primetime/69-16112023135122/media/10320151140174.jpg' },
];


const Gallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewMode, setViewMode] = useState('carousel'); // 'carousel' ou 'grid'

    // Referência para o PagerView
    const pagerRef = useRef(null);

    // Alterna entre as visualizações
    const toggleViewMode = () => {
        setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel');
    };

    // Função para renderizar as miniaturas no modo grade
    const renderThumbnail = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => {
                setCurrentIndex(index); // Atualiza o índice da imagem
                setViewMode('carousel');
                if (pagerRef.current) { // Verifica se a referência está disponível
                    pagerRef.current.setPage(index); // Muda a página do PagerView para a imagem selecionada
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
                data={images}
                renderItem={({ item, index }) => (
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
                )}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={styles.gridRow}
                contentContainerStyle={styles.gridContainer}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.toggleButton}>
                <Button title="Alternar Visão" onPress={toggleViewMode} />
            </View>

            {viewMode === 'carousel' && (
                <PagerView
                    style={styles.pagerView}
                    initialPage={currentIndex}
                    onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
                    ref={pagerRef} 
                >
                    {images.map((image) => (
                        <View key={image.id} style={styles.page}>
                            <Image source={{ uri: image.uri }} style={styles.image} />
                        </View>
                    ))}
                </PagerView>
            )}

            {viewMode === 'carousel' && (
                <View style={styles.indicator}>
                    <Text style={styles.indicatorText}>
                        {currentIndex + 1} / {images.length}
                    </Text>
                </View>
            )}

            {viewMode === 'carousel' && (
                <FlatList
                    data={images}
                    renderItem={renderThumbnail}
                    horizontal
                    keyExtractor={(item) => item.id}
                    style={styles.thumbnailList}
                    contentContainerStyle={styles.thumbnailListContainer}
                />
            )}

            {viewMode === 'grid' && renderGridView()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    pagerView: {
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'contain',
    },
    indicator: {
        position: 'absolute',
        bottom: 60, // Ajuste para ficar acima da lista de miniaturas
        left: 0,
        right: 0,
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
        padding: 10,
    },
    gridRow: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    thumbnailList: {
        position: 'absolute',
        bottom: 10, // Fica abaixo do carrossel
        left: 0,
        right: 0,
    },
    thumbnailListContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    thumbnailWrapper: {
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
    },
    thumbnail: {
        width: 70,
        height: 70,
        resizeMode: 'cover',
        borderRadius: 5,
    },
});

export default Gallery;
