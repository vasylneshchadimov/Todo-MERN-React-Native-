import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { EditAndDeletePanel } from "./EditAndDeletePanel";
import { THEME } from "../style/theme";

interface IProps {
    _id: string;
    title: string;
    description: string;
    year: number;
    isPublic: boolean;
    isCompleted: boolean;
    navigation: any;
}

export const Todo: React.FC<IProps> = ({
    _id,
    title,
    description,
    year,
    isCompleted,
    isPublic,
    navigation,
}) => {
    const data = { _id, title, description, year, isCompleted, isPublic };

    return (
        <View style={styles.conteiner}>
            <View>
                <View style={styles.wraper}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.title}>{year}</Text>
                </View>
                <View style={styles.description}>
                    <Text>{description}</Text>
                </View>
                <View style={styles.wraper}>
                    <Text style={styles.title}>
                        {isCompleted ? "Completed" : "Not completed"}
                    </Text>
                    <Text style={styles.title}>
                        {isPublic ? "Private" : "Public"}
                    </Text>
                </View>
            </View>
            <View>
                <EditAndDeletePanel data={data} navigation={navigation} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    conteiner: {
        padding: THEME.Pixel.px10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    wraper: {
        flexDirection: "row",
    },
    description: {
        width: THEME.Pixel.px250,
    },
    title: {
        fontSize: THEME.Fonts.fs20,
        marginRight: THEME.Pixel.px10,
    },
});
