import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { THEME } from "../style/theme";
import { ButtonUI } from "../UIcomponents/Button";
import { TextInputUI } from "../UIcomponents/Input";
import { Heder } from "./Heder";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { SignUpSchemaUser, IUser } from "../type/userTypes";
import { useQueryClient } from "react-query";
import { userService } from "../serverAPI/serveAPI";
import { ROUTER_KEYS, QUERY_KEYS } from "../keys/keys";

import { asyncStoregeService } from "../asyncStorege/asyncStorege";

export const SignUp = ({ navigation }: { navigation: any }) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        async (data: IUser) => userService.register(data),

        {
            onSuccess: () => {
                navigation.navigate(ROUTER_KEYS.TODOS_MAIN_PAGE);
                queryClient.invalidateQueries(QUERY_KEYS.TODOS);
            },
            onError: (error: any) => {
                Alert.alert("User was exist");
                console.log(error);
            },
        }
    );

    const formik = useFormik({
        validationSchema: SignUpSchemaUser,
        initialValues: {
            email: "",
            password: "",
            passwordConfirmation: "",
        },
        onSubmit: async (formik) => {
            const dataUser = {
                email: formik.email,
                password: formik.password,
            };

            const { data } = await mutation.mutateAsync(dataUser);
            // await setToken(data);
            await asyncStoregeService.setToken(data);
        },
    });

    return (
        <View style={styles.container}>
            <Heder title={"Register"} />
            <View style={styles.registrationConteiner}>
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
                <View style={styles.inputConteiner}>
                    <TextInputUI
                        text={"Verify password"}
                        keyC={"passwordConfirmation"}
                        value={formik.values.passwordConfirmation}
                        formik={formik}
                        error={formik.errors.passwordConfirmation}
                        touched={formik.touched.passwordConfirmation}
                    />
                </View>
                <View style={styles.btnConteiner}>
                    <ButtonUI
                        title={"Registration"}
                        onPress={formik.handleSubmit}
                    />
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
    registrationConteiner: {
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
