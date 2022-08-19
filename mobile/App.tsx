import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTER_KEYS } from "./src/keys/keys";
import { TodosMainPage } from "./src/components/TodosMainPage";
import { CreateTodo } from "./src/components/CreateTodo";
import { EditTodo } from "./src/components/EditTodo";
import { FirstPage } from "./src/components/FirstPage";
import { SignUp } from "./src/components/SignUp";
import { SignIn } from "./src/components/SingIn";
import { THEME } from "./src/style/theme";

export default function App() {
    const queryClient = new QueryClient();
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <QueryClientProvider client={queryClient}>
                <Stack.Navigator initialRouteName={ROUTER_KEYS.FIRS_PAGE}>
                    <Stack.Screen
                        name={ROUTER_KEYS.FIRS_PAGE}
                        component={FirstPage}
                    />
                    <Stack.Screen
                        name={ROUTER_KEYS.SIGNIN}
                        component={SignIn}
                    />
                    <Stack.Screen
                        name={ROUTER_KEYS.SIGNUP}
                        component={SignUp}
                    />
                    <Stack.Screen
                        name={ROUTER_KEYS.TODOS_MAIN_PAGE}
                        component={TodosMainPage}
                    />
                    <Stack.Screen
                        name={ROUTER_KEYS.CREATE_TODO}
                        component={CreateTodo}
                    />
                    <Stack.Screen
                        name={ROUTER_KEYS.EDIT_TODO}
                        component={EditTodo}
                    />
                </Stack.Navigator>
            </QueryClientProvider>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        height: `${THEME.Pixel.px100}%`,
        backgroundColor: THEME.Colors.mainbg,
    },
});
