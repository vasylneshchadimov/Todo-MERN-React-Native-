import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { THEME } from "../style/theme";

export const Heder = ({ title }: { title: string }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: THEME.Pixel.px50,
        backgroundColor: THEME.Colors.red,
        alignItems: "center",
        justifyContent: "center",
        width: `${THEME.Pixel.px100}%`,
    },
    text: {
        color: THEME.Colors.white,
        paddingBottom: THEME.Pixel.px10,
        fontSize: THEME.Fonts.fs20,
    },
});
