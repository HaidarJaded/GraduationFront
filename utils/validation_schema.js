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
                    .required('Email is required').email('Must be a valid email')
                    .matches(
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        'Email must be in a standard format with a domain like that example@example.com'
                    )
                break;
            case "password":
                result['password'] = Yup.string()
                    .required('Password is required').matches(/^[^\u0600-\u06FF]*$/, 'Sorry, the password cannot contain Arabic characters.')
                    .max(128, 'Must not be greater than 128 characters').min(8, "Password must be at least 8 characters")
                break;
            case "password_confirmation":
                result['password_confirmation'] = Yup.string()
                    .required('Password confirmation is required')
                    .oneOf([Yup.ref('password'), null], 'Password confirmation must match');
                break;
        }
    }

    return {resolver: yupResolver(Yup.object().shape(result))};
}