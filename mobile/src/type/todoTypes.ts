import * as Yup from "yup";

export interface ITodo {
    title: string;
    description: string;
    year: number | string;
    isCompleted: boolean;
    isPublic: boolean;
}

export const TodoSchema = Yup.object().shape({
    title: Yup.string()
        .min(5, "Min 5 symbols")
        .max(30, "Max 30 symbols")
        .required("Required"),
    year: Yup.number()
        .integer()
        .min(2022, "Min 2022 year")
        .max(2070, "Max 2070 year")
        .required("Required"),
    description: Yup.string()
        .min(5, "Min 5 symbols")
        .max(100, "Max 100 symbols")
        .required("Required"),
});

export interface ITodoAndID extends ITodo {
    _id: string;
}
export interface ITodoAndUserID extends ITodo {
    userID: string;
}
