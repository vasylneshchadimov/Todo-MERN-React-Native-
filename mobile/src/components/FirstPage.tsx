import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ROUTER_KEYS } from "../keys/keys";
import { THEME } from "../style/theme";
import { ButtonUI } from "../UIcomponents/Button";

export const FirstPage = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>
            <View style={styles.btnContainer}>
                <ButtonUI
                    title={"Login"}
                    onPress={() => {
                        navigation.navigate(ROUTER_KEYS.SIGNIN);
                    }}
                />
            </View>

            <ButtonUI
                title={"Register"}
                onPress={() => {
                    navigation.navigate(ROUTER_KEYS.SIGNUP);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: `${THEME.Pixel.px100}%`,
        backgroundColor: THEME.Colors.mainbg,
        alignItems: "center",
        justifyContent: "center",
    },

    btnContainer: {
        marginBottom: THEME.Pixel.px30,
    },
});
