import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
} from "react-native";
import { THEME } from "../style/theme";
export const PaginationBtn = ({
    title,
    onPres,
    dis,
}: {
    title: string;
    onPres: () => void;
    dis: boolean;
}) => {
    return (
        <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.5}
            onPress={onPres}
            disabled={dis}
        >
            <Text style={styles.textBtn}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        width: THEME.Pixel.px70,
        height: THEME.Pixel.px40,
        backgroundColor: THEME.Colors.black,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: THEME.Pixel.px30,
    },
    textBtn: {
        fontSize: THEME.Fonts.fs15,
        color: THEME.Colors.white,
    },
});
