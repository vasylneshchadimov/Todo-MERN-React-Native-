import React from "react";
import { View, StyleSheet } from "react-native";
import { QUERY_KEYS, ROUTER_KEYS } from "../keys/keys";
import { THEME } from "../style/theme";
import { ButtonUI } from "../UIcomponents/Button";
import { ITodoAndID } from "../type/todoTypes";
import { useMutation, useQueryClient } from "react-query";
import { todoService } from "../serverAPI/serveAPI";

interface IProps {
    data: ITodoAndID;
    navigation: any;
}
export const EditAndDeletePanel: React.FC<IProps> = ({ data, navigation }) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        async (id: string) => todoService.deleteTodo(id),

        {
            onSuccess: () => {
                queryClient.invalidateQueries(QUERY_KEYS.TODOS);
            },
            onError: (error: any) => {
                console.log(error);
            },
        }
    );
    return (
        <View>
            <ButtonUI
                title={"Edit"}
                onPress={() => {
                    navigation.navigate(ROUTER_KEYS.EDIT_TODO, {
                        updateData: data,
                    });
                }}
            />
            <View style={styles.btnDel}>
                <ButtonUI
                    title={"Delete"}
                    onPress={() => mutation.mutate(data._id)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    btnDel: {
        marginTop: THEME.Pixel.px10,
    },
});
