import { colors, fonts } from "@/app/globalStyle";
import { Loading } from "@/components/Loading";
import { isNullOrEmpty, validEmail } from "@/utils/stringFunctions";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import PassCodePage from "./PassCode";
import SendCodePage from "./SendCodePage";
const { width, height } = Dimensions.get("screen")

interface ForgotPasswordPageProps {
    onBack: () => void;
}

export default function ForgotPasswordPage({ onBack }: ForgotPasswordPageProps) {
    return(
        <SendCodePage onBack={onBack}/>
    )
}