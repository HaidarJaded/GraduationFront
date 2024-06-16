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
            case "name":
                result['name'] = Yup.string()
                    .required('name is required');
                break;
            case "last_name":
                result['last_name'] = Yup.string()
                    .required('last name is required');
                break;
            case "price":
                result['price'] = Yup.string()
                    .matches(/^\d+(\.\d+)?$/, 'price must contain only numbers and can be a decimal')
                    .required('price is required')
                break;
            case "quantity":
                result['quantity'] = Yup.number()
                    .typeError('quantity must be a number')
                    .integer('quantity must be an integer')
                    .required('quantity is required');
                break;
            case "cost_to_client":
                result['cost_to_client'] = Yup.string()
                    .matches(/^\d+(\.\d+)?$/, 'cost must contain only numbers and can be a decimal')

                break;
            case "time_required":
                result['time_required'] =  Yup.string()
                    .matches(/^\d+\sdays\s\d+\shour$/, "Time required must be in the format: 'number days number hour'")
                    .nullable()

                break;

        }
    }

    return {resolver: yupResolver(Yup.object().shape(result))};
}