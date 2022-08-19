import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    ScrollView,
    Alert,
} from "react-native";
import { useQueryClient } from "react-query";

import { Heder } from "./Heder";
import { THEME } from "../style/theme";
import { ListTodos } from "./ListTodos";
import { ButtonUI } from "../UIcomponents/Button";
import { QUERY_KEYS, ROUTER_KEYS } from "../keys/keys";
import { Filters } from "./Filters";
import { PaginationBtn } from "../UIcomponents/PaginationBtn";

export const TodosMainPage = ({ navigation }: { navigation: any }) => {
    const queryClient = useQueryClient();

    const [params, setParams] = useState<string>(
        `?search=""&compleated=false&privated=false`
    );
    queryClient.invalidateQueries(QUERY_KEYS.TODOS);
    const [limit, setLimit] = useState<number>(2);
    const [skip, setSkip] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [dataLength, setDataLength] = useState<number>(0);

    let disNext = false;
    let disPrev = false;
    if (dataLength < limit) {
        disNext = true;
    } else {
        disNext = false;
    }
    if (page === 1) {
        disPrev = true;
    } else disPrev = false;
    if (dataLength === 0 && skip !== 0) {
        setSkip((prev) => prev - limit);
        setPage((prev) => prev - 1);
    }

    let queris: string = `${params}&limit=${limit}&skip=${skip}`;

    const nextPage = () => {
        setSkip(skip + limit);
        setPage((prev) => prev + 1);
    };

    const previousPage = () => {
        setSkip(skip - limit);
        setPage((prev) => prev - 1);
    };
    const handlerLimit = (lim: any) => {
        if (isNaN(lim)) {
            Alert.alert("Write number or min 2");
        } else {
            setLimit(lim);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Heder title={"Todos"} />
            <View style={styles.btnContainerCreate}>
                <ButtonUI
                    title={"Create Todo"}
                    onPress={() => {
                        navigation.navigate(ROUTER_KEYS.CREATE_TODO);
                    }}
                />
            </View>
            <Filters setParams={setParams} dataLength={dataLength} />

            <ListTodos
                navigation={navigation}
                params={queris}
                setLength={setDataLength}
            />
            <View style={styles.inpContiner}>
                <Text style={styles.text}>Todos to show</Text>
                <TextInput
                    style={styles.input}
                    value={limit.toString()}
                    onChangeText={(text) => handlerLimit(text)}
                />
                <PaginationBtn
                    title={"prev page"}
                    onPres={previousPage}
                    dis={disPrev}
                />
                <PaginationBtn
                    title={"next page"}
                    onPres={nextPage}
                    dis={disNext}
                />
            </View>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.textPage}>Page {page}</Text>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        height: `${THEME.Pixel.px100}%`,
        backgroundColor: THEME.Colors.mainbg,
    },

    btnContainerCreate: {
        alignItems: "center",
        paddingTop: THEME.Pixel.px10,
    },
    input: {
        width: THEME.Pixel.px50,
        borderStyle: "solid",
        borderWidth: THEME.Pixel.px2,
        borderColor: THEME.Colors.black,
        padding: THEME.Pixel.px10,
        height: THEME.Pixel.px40,
    },
    inpContiner: {
        flexDirection: "row",

        marginBottom: THEME.Pixel.px30,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: THEME.Fonts.fs15,
        marginRight: THEME.Pixel.px10,
    },
    textPage: {
        fontSize: THEME.Fonts.fs15,
    },
});
