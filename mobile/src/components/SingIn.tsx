import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { THEME } from "../style/theme";
import { Heder } from "./Heder";
import { ButtonUI } from "../UIcomponents/Button";
import { TextInputUI } from "../UIcomponents/Input";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { LoginSchemaUser, IUser } from "../type/userTypes";
import { useQueryClient } from "react-query";
import { userService } from "../serverAPI/serveAPI";
import { QUERY_KEYS, ROUTER_KEYS } from "../keys/keys";

import { asyncStoregeService } from "../asyncStorege/asyncStorege";

export const SignIn = ({ navigation }: { navigation: any }) => {
    const queryClient = useQueryClient();
    const mutation = useMutation((data: IUser) => userService.login(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(QUERY_KEYS.TODOS);
        },
        onError: (error: any) => {
            console.log(error);
            Alert.alert("Invalid email or password");
        },
    });
    const formik = useFormik({
        validationSchema: LoginSchemaUser,
        initialValues: {
            email: "test@u.u",
            password: "1234",
        },
        onSubmit: async (formik) => {
            const dataUser = {
                email: formik.email,
                password: formik.password,
            };
            const { data } = await mutation.mutateAsync(dataUser);

            await asyncStoregeService.setToken(data);

            navigation.navigate(ROUTER_KEYS.TODOS_MAIN_PAGE);
        },
    });
    return (
        <View style={styles.container}>
            <Heder title={"Login"} />

            <View style={styles.loginConteiner}>
                <TextInputUI
                    text={"Email"}
                    keyC={"email"}
                    value={formik.values.email}
                    formik={formik}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                />
                <View style={styles.inputConteiner}>
                    <TextInputUI
                        text={"Password"}
                        keyC={"password"}
                        value={formik.values.password}
                        formik={formik}
                        error={formik.errors.password}
                        touched={formik.touched.password}
                    />
                </View>

                <View style={styles.btnConteiner}>
                    <ButtonUI title={"Login"} onPress={formik.handleSubmit} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: `${THEME.Pixel.px100}%`,
        backgroundColor: THEME.Colors.mainbg,
        alignItems: "center",
    },
    loginConteiner: {
        alignItems: "center",
        marginTop: THEME.Pixel.px80,
    },
    inputConteiner: {
        marginTop: THEME.Pixel.px40,
    },
    btnConteiner: {
        marginTop: THEME.Pixel.px50,
    },
});
