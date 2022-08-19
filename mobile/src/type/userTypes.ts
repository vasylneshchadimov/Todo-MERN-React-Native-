import * as Yup from "yup";

export interface IUser {
    email: string;
    password: string;
}

export const SignUpSchemaUser = Yup.object().shape({
    email: Yup.string()
        .email()
        .min(5, "Min 5 symbols")
        .max(30, "Max 30 symbols")
        .trim()
        .required("Required"),
    password: Yup.string()
        .min(3, "Min 5 symbols")
        .max(20, "Max 20 symbols")
        .trim()
        .required("Required"),
    passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "No verifay password"
    ),
});
export const LoginSchemaUser = Yup.object().shape({
    email: Yup.string()
        .email()
        .min(5, "Min 5 symbols")
        .max(30, "Max 30 symbols")
        .trim()
        .required("Required"),
    password: Yup.string()
        .min(3, "Min 5 symbols")
        .max(20, "Max 20 symbols")
        .trim()
        .required("Required"),
});
export interface IUserID {
    userID: string | null;
}
export interface IUserAndId extends IUser {
    _id: string;
}
