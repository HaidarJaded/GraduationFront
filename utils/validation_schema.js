import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


export function getValidationObject() {
    const validationArguments = arguments;
    let result = {};
    for (const validationArgument of validationArguments) {
        switch (validationArgument) {
            case "login":
                result['login'] = Yup.string()
                    .required('Email is required').email()
                break;
            case "email":
                result['email'] = Yup.string()
                    .required('Email is required').email()
                break;
            case "password":
                result['password'] = Yup.string()
                    .required('Password is required').matches(/^[^\u0600-\u06FF]*$/, 'Sorry, the password cannot contain Arabic characters.')
                    .max(128, 'Must not be greater than 128 characters').min(6, "Password must be at least 6 characters")
                break;
        }
    }

    return {resolver: yupResolver(Yup.object().shape(result))};
}