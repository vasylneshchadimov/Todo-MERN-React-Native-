import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { THEME } from "../style/theme";
interface ICheckBox {
    text: string;
    value: boolean;
    formik: any;
    keyC: string;
}

export const CheckBoxUI: React.FC<ICheckBox> = ({
    text,
    value,
    formik,
    keyC,
}) => {
    return (
        <View style={styles.checkboxContainer}>
            <Text style={styles.label}>{text}</Text>
            <BouncyCheckbox
                onPress={(checked) => formik?.setFieldValue(keyC, checked)}
                fillColor={THEME.Colors.black}
                isChecked={value}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: THEME.Pixel.px250,
        marginTop: THEME.Pixel.px10,
    },

    label: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: THEME.Pixel.px50,
    },
});
