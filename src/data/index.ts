import { RegisterFormFields , LoginFormFields} from "../interfaces";

export const REGISTER_FORM_FIELDS: RegisterFormFields[] = [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
    },
    {
        name: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'Enter your username',
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
    },
];



export const LOGIN_FORM_FIELDS: LoginFormFields[] = [
    {
        name: 'identifier',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
    },
]
