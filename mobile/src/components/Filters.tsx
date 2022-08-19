import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { THEME } from "../style/theme";

import BouncyCheckbox from "react-native-bouncy-checkbox";

import useDebounce from "../hook/useDebounse";
import { PaginationBtn } from "../UIcomponents/PaginationBtn";

type PropsType = {
    setParams: React.Dispatch<React.SetStateAction<string>>;
    dataLength: number;
};

export const Filters = ({ setParams, dataLength }: PropsType) => {
    const [titleFilter, setTitleFilter] = useState<string>("");
    const [isCopletedFilter, setIsCompletedFilter] = useState<boolean>(false);
    const [isPublicFilter, setIsPublicFilter] = useState<boolean>(false);
    let titleDebounce = useDebounce(titleFilter, 500);
    useEffect(
        () =>
            setParams(
                `?search=${titleDebounce}&compleated=${isCopletedFilter}&privated=${isPublicFilter}`
            ),
        [titleDebounce, isCopletedFilter, isPublicFilter]
    );

    return (
        <View style={styles.container}>
            <View style={styles.midle}>
                <Text style={styles.text}>Filters</Text>
            </View>

            <Text style={{ fontSize: THEME.Fonts.fs15 }}>
                Write a name of title to search
            </Text>
            <TextInput
                placeholder={"name of title "}
                style={styles.input}
                value={titleFilter}
                onChangeText={(text) => setTitleFilter(text)}
            />
            <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                    fillColor={THEME.Colors.black}
                    textStyle={{ color: THEME.Colors.white }}
                    isChecked={isCopletedFilter}
                    onPress={() => {
                        setIsCompletedFilter(!isCopletedFilter);
                    }}
                    disableBuiltInState
                />
                <Text style={styles.label}>
                    {isCopletedFilter
                        ? "Hide complited tasks"
                        : "Show complited tasks"}
                </Text>
            </View>
            <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                    fillColor={THEME.Colors.black}
                    textStyle={{ color: THEME.Colors.white }}
                    isChecked={isPublicFilter}
                    onPress={() => {
                        setIsPublicFilter(!isPublicFilter);
                    }}
                    disableBuiltInState
                />
                <Text style={styles.label}>
                    {isPublicFilter ? "Show public tasks" : "Hide public tasks"}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: THEME.Pixel.px10,
        margin: 10,
        borderStyle: "solid",
        borderWidth: THEME.Pixel.px2,
        borderColor: THEME.Colors.liteGreen,
    },
    input: {
        width: THEME.Pixel.px250,
        borderStyle: "solid",
        borderWidth: THEME.Pixel.px2,
        borderColor: THEME.Colors.black,
        padding: THEME.Pixel.px10,
        height: THEME.Pixel.px40,
    },
    text: {
        fontSize: THEME.Fonts.fs20,
    },
    midle: {
        width: `${THEME.Pixel.px100}%`,
        alignItems: "center",
        marginBottom: THEME.Pixel.px10,
    },
    checkboxContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: THEME.Pixel.px250,
        marginTop: THEME.Pixel.px10,
        marginBottom: THEME.Pixel.px20,
    },

    label: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: THEME.Pixel.px50,
    },
});
