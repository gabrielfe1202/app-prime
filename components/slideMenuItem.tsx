import React, { useEffect, useState } from 'react';
import { View, Text, ViewProps, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons, Octicons, FontAwesome } from '@expo/vector-icons';
import { colors } from '@/app/globalStyle';
const { width, height } = Dimensions.get('screen');

interface SlideMenuItemProps extends ViewProps {
    iconName?: any;
    iconFamily?: any;
    text?: any;
    callback?: any;
}

const SideMenuItem = ({ iconName, iconFamily, text, callback, ...rest }: SlideMenuItemProps) => {
    function iconFamilyFunction() {
        switch (iconFamily) {
            case 'FontAwesome':
                return <FontAwesome style={sideMenu.MenuItemIcon} name={iconName} />;
            case 'MaterialCommunityIcons':
                return (
                    <MaterialCommunityIcons
                        style={sideMenu.MenuItemIcon}
                        name={iconName}
                    />
                );
            case 'Octicons':
                return <Octicons style={sideMenu.MenuItemIcon} name={iconName} />;
            default:
                return (
                    <MaterialCommunityIcons
                        style={sideMenu.MenuItemIcon}
                        name={iconName}
                    />
                );
        }
    }

    const icon = iconFamilyFunction();

    return (
        <View style={sideMenu.MenuItemContainer}>
            <TouchableOpacity onPress={callback} style={sideMenu.MenuItem}>
                {icon}
                <Text style={sideMenu.MenuItemText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );

};

export default SideMenuItem;

const sideMenuSize = 0.7;
const sideMenu = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    MenuItemContainer: {

    },
    outside: {
        width: width * (1 - sideMenuSize),
        backgroundColor: '#000',
        opacity: 0.6
    },
    inside: {
        width: width * sideMenuSize,
        backgroundColor: '#fff',
    },
    headerBg: {
        marginTop: height * 0.03,
        width: '80%',
        alignSelf: 'center',
    },
    headerBgTextContainer: {
        justifyContent: 'center',
        marginTop: height * 0.02,
        marginHorizontal: width * 0.07,
        alignItems: 'center',
    },
    headerBgTextValue: {
        color: colors.laranja,
        fontWeight: 'bold',
        fontSize: 18,
    },
    headerBgTextValueSecondary: {
        color: colors.azul,
        fontSize: 15,
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    MenuItem: {
        marginLeft: '10%',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'baseline',
        marginBottom: '8%',
    },
    MenuItemIcon: {
        color: colors.laranja,
        fontSize: 48,
    },
    MenuItemText: {
        fontSize: 24,
        marginLeft: '1%',
    },
});
