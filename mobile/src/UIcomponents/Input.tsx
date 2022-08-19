import React from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { THEME } from "../style/theme";
import { FormikTouched, FormikErrors } from "formik";

interface ITextInput {
    text: string;
    keyC: string;
    value: string;
    error:
        | string
        | FormikErrors<any>
        | FormikErrors<any>[]
        | string[]
        | undefined;
    formik: any;
    touched: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
}

export const TextInputUI: React.FC<ITextInput> = ({
    text,
    keyC,
    formik,
    value,
    error,
    touched,
}) => {
    return (
        <View style={styles.continer}>
            <View style={styles.textCont}>
                <Text style={styles.text}> {text}</Text>
                {touched && error ? (
                    <Text style={styles.textEror}>{error}</Text>
                ) : null}
            </View>

            <TextInput
                style={styles.input}
                value={value}
                onChangeText={formik.handleChange(keyC)}
                onBlur={formik.handleBlur(keyC)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    continer: {
        flexDirection: "column",
        alignItems: "center",
        height: THEME.Pixel.px30,
    },
    textCont: {
        flexDirection: "row",
        width: THEME.Pixel.px250,
        alignItems: "center",
    },

    text: {
        fontSize: THEME.Fonts.fs20,
        marginRight: THEME.Pixel.px10,
    },
    textEror: {
        color: THEME.Colors.red,
        fontSize: THEME.Fonts.fs15,
    },
    input: {
        width: THEME.Pixel.px250,
        borderStyle: "solid",
        borderWidth: THEME.Pixel.px2,
        borderColor: THEME.Colors.black,
        padding: THEME.Pixel.px10,
        height: THEME.Pixel.px40,
    },
});
