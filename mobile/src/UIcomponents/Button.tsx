import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { THEME } from "../style/theme";

type PropsButton = {
    title: string;
    onPress: () => void;
};
export const ButtonUI: React.FC<PropsButton> = ({ title, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={onPress}
            activeOpacity={0.5}
        >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        width: THEME.Pixel.px130,
        height: THEME.Pixel.px40,
        backgroundColor: THEME.Colors.black,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: THEME.Colors.white,
        fontSize: THEME.Fonts.fs15,
    },
});
