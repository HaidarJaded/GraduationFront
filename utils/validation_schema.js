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
                    result['cost_to_client'] = Yup.string().when(
                        [], // condition based on other fields could be added here
                        (cost_to_client, schema) => {
                            if (cost_to_client !== null) {
                                return schema.matches(/^\d+(\.\d+)?$/, 'Cost must contain only numbers and can be a decimal');
                            } else {
                                return schema.nullable().notRequired();
                            }
                        }
                    )

                break;
            case "time_required":
                result['time_required'] = Yup.string().required('Time required is required')
                    .matches(/^\d+days\s\d+hours$/, 'Time required must be in the format like "2days[space]4hours"')

                break;
            case "start_work":
                result['start_work'] =Yup.string()
                    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'Start work time must be in the format HH:mm:ss');
                break;
            case "end_work":
                result['end_work'] =Yup.string()
                    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'Start work time must be in the format HH:mm:ss');

                break;
            case "device_model":
                result['device_model'] = Yup.string()
                    .required('device_model is required');
                break;
            case "phone":
                result['phone'] = Yup.string()
                    .max(10, 'Phone number must not be greater than 10 characters');
                break;
            case "model":
                result['model'] = Yup.string()
                    .required('نوع الجهاز مطلوب')
                break;
            case "customer_complaint":
                result['customer_complaint'] = Yup.string()
                    .required('حقل الشكوى مطلوب')
                break;
            case "imei":
                result['imei'] = Yup.string()
                    .nullable()
                    .notRequired()
                    .test(
                        'len',
                        'يجب أن يحتوي على 15 رقم فقط و لا يمكن ادخال احرف',
                        value => !value || (value && value.length === 15 && /^\d+$/.test(value))
                    );
                break;

        }
    }

    return {resolver: yupResolver(Yup.object().shape(result))};
}