import React, { useState } from 'react';
import { Animated, Image, SafeAreaView, Text, View, Platform, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import padlock from '../../../assets/images/padlock.png'
import { colors, fonts } from '@/app/globalStyle';

const { width, height } = Dimensions.get("screen")
const { Value, Text: AnimatedText } = Animated;
const CELL_COUNT = 4;
const animationsColor = Array(CELL_COUNT).fill(null).map(() => new Value(0));
const animationsScale = Array(CELL_COUNT).fill(null).map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }: { hasValue: boolean, index: number, isFocused: boolean }) => {
    Animated.parallel([
        Animated.timing(animationsColor[index], {
            useNativeDriver: false,
            toValue: isFocused ? 1 : 0,
            duration: 250,
        }),
        Animated.spring(animationsScale[index], {
            useNativeDriver: false,
            toValue: hasValue ? 0 : 1,
            damping: 8,
            stiffness: 120,
            mass: 1,
        }),
    ]).start();
};

const CodeInput = () => {
    const [value, setValue] = useState<string>('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });
    const [stateLoad, setStateload] = useState<boolean>(false)

    const renderCell = ({ index, symbol, isFocused }: { index: number, symbol: string, isFocused: boolean }) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [colors.azul, ACTIVE_CELL_BG_COLOR],
                })
                : animationsColor[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                }),
            borderRadius: animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                    }),
                },
            ],
        };

        setTimeout(() => {
            animateCell({ hasValue, index, isFocused });
        }, 0);

        return (
            <AnimatedText
                key={index}
                style={[styles.cell, animatedCellStyle]}
                onLayout={getCellOnLayoutHandler(index)}
            >
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        );
    };

    function verifyCode() {
        setStateload(true)
    }

    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.title}>Codigo de verificação</Text>
            <Image style={styles.icon} source={padlock} />
            <Text style={styles.subTitle}>
                Insira o código de verificação{'\n'}
                enviamos para seu endereço de e-mail
            </Text>

            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}                
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
            />

            <TouchableOpacity style={styles.nextButton} onPress={verifyCode} disabled={stateLoad}>
                {!stateLoad ? (
                    <Text style={styles.nextButtonText}>Verificar</Text>
                ) : (
                    <ActivityIndicator size="large" color="rgba(255,255,255,.8)" />
                )}
            </TouchableOpacity>



        </SafeAreaView>
    );
};

export default CodeInput;

const CELL_SIZE = 70;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = '#fff';
const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const styles = StyleSheet.create({
    codeFieldRoot: {
        height: CELL_SIZE,
        marginTop: 30,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    cell: {
        marginHorizontal: 8,
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: CELL_SIZE - 5,
        fontSize: 30,
        textAlign: 'center',
        borderRadius: CELL_BORDER_RADIUS,
        color: colors.azul,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5,
    },
    root: {        
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        paddingTop: 50,
        color: '#505050',
        fontSize: 25,
        textAlign: 'center',
        paddingBottom: 40,
        fontFamily: fonts.passo
    },
    icon: {
        width: width * .7,
        height: width * .55,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    subTitle: {
        paddingTop: 30,
        color: '#505050',
        textAlign: 'center',
        fontFamily: fonts.passo,
        fontSize: 16
    },
    nextButton: {
        marginTop: 30,
        borderRadius: 15,
        height: 60,
        backgroundColor: colors.azul,
        justifyContent: 'center',
        width: width * .82,
        marginBottom: 100,
    },
    nextButtonText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
    },
});