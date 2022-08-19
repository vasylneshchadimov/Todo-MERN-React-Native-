import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { useQuery } from "react-query";
import { ButtonUI } from "../UIcomponents/Button";
import { THEME } from "../style/theme";
import { Todo } from "./Todo";
import { todoService } from "../serverAPI/serveAPI";
import { QUERY_KEYS } from "../keys/keys";

interface ITodoFlat {
    _id: string;
    title: string;
    description: string;
    year: number;
    isPublic: boolean;
    isCompleted: boolean;
}

export const ListTodos = ({
    navigation,
    params,
    setLength,
}: {
    navigation: any;
    params: string;
    setLength: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const { data, isLoading, isSuccess, refetch } = useQuery(
        QUERY_KEYS.TODOS,
        async () => await todoService.getTodos(params)
    );
    if (isSuccess) {
        setLength(data.length);
        if (data.length === 0) {
            refetch();
        }
    }

    useEffect(() => {
        refetch();
    }, [params]);

    if (isLoading) return <Text>Loading</Text>;

    if (!isSuccess) return <Text>Error</Text>;

    const renderItem: React.ElementType = ({ item }: { item: ITodoFlat }) => (
        <Todo
            _id={item._id}
            title={item.title}
            year={item.year}
            description={item.description}
            isCompleted={item.isCompleted}
            isPublic={item.isPublic}
            navigation={navigation}
        />
    );

    return (
        <View
            style={{
                height: THEME.Pixel.px250,
                marginBottom: THEME.Pixel.px50,
            }}
        >
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                refreshing={true}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    btnContainerCreate: {
        alignItems: "center",
        paddingTop: THEME.Pixel.px10,
    },
});
