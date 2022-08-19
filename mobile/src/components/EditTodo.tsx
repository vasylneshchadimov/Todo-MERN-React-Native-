import React from "react";

import { StyleSheet, View, Text } from "react-native";
import { TextInputUI } from "../UIcomponents/Input";
import { THEME } from "../style/theme";
import { TextAreaUI } from "../UIcomponents/TextArea";
import { CheckBoxUI } from "../UIcomponents/CheckBox";
import { ButtonUI } from "../UIcomponents/Button";
import { useFormik } from "formik";
import { NavigatorScreenParams } from "@react-navigation/native";
import { useMutation } from "react-query";
import { QUERY_KEYS, ROUTER_KEYS } from "../keys/keys";
import { todoService } from "../serverAPI/serveAPI";
import { useQueryClient } from "react-query";
import { ITodo, TodoSchema, ITodoAndID } from "../type/todoTypes";
import { RouteProp } from "@react-navigation/native";

export const EditTodo = ({
    navigation,
    route,
}: {
    navigation: any;
    route: RouteProp<{ params: { updateData: ITodoAndID } }, "params">;
}) => {
    const queryClient = useQueryClient();
    const { updateData } = route.params;

    const mutation = useMutation(
        async (data: ITodo) => todoService.updateTodo(updateData._id, data),

        {
            onSuccess: () => {
                navigation.navigate(ROUTER_KEYS.TODOS_MAIN_PAGE);
                queryClient.invalidateQueries(QUERY_KEYS.TODOS);
            },
            onError: (error: any) => {
                console.log(error);
            },
        }
    );

    const formik = useFormik({
        validationSchema: TodoSchema,
        initialValues: updateData,

        onSubmit: (formik) => {
            const data = {
                isCompleted: formik.isCompleted,
                isPublic: formik.isPublic,
                title: formik.title,
                description: formik.description,
                year: formik.year,
            };
            mutation.mutate(data);
        },
    });

    return (
        <View style={styles.continer}>
            <TextInputUI
                text={"Title"}
                formik={formik}
                keyC={"title"}
                value={formik.values.title}
                error={formik.errors.title}
                touched={formik.touched.title}
            />
            <TextAreaUI
                text={"Description"}
                formik={formik}
                keyC={"description"}
                value={formik.values.description}
                error={formik.errors.description}
                touched={formik.touched.description}
            />
            <View style={{ marginTop: THEME.Pixel.px160 }}>
                <TextInputUI
                    text={"Year"}
                    formik={formik}
                    keyC={"year"}
                    value={formik.values.year.toString()}
                    error={formik.errors.year}
                    touched={formik.touched.year}
                />
            </View>

            <View style={styles.checkConteiner}>
                <CheckBoxUI
                    text={"Complited"}
                    value={formik.values.isCompleted}
                    formik={formik}
                    keyC={"isCompleted"}
                />
                <CheckBoxUI
                    text={"Private"}
                    value={formik.values.isPublic}
                    formik={formik}
                    keyC={"isPublic"}
                />
            </View>
            <View style={styles.btnConteiner}>
                <ButtonUI title={"Edit"} onPress={formik.handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    continer: {
        height: `${THEME.Pixel.px100}%`,
        backgroundColor: THEME.Colors.mainbg,
    },
    checkConteiner: {
        marginTop: THEME.Pixel.px50,
        justifyConten: "center",
        alignItems: "center",
    },
    btnConteiner: {
        alignItems: "center",

        marginTop: THEME.Pixel.px50,
    },
});
