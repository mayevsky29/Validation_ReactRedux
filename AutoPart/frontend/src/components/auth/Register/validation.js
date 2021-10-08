import * as Yup from 'yup';

const validationFields= () => {
    return Yup.object({
        email: Yup.string()
            .email('Не коректно вказана пошта')
            .required("Вкажіть пошту"),
        phone: Yup.string()
            .required("Вкажіть телефон"),
        secondName: Yup.string()
            .required("Вкажіть прізвище"),
        firstName: Yup.string()
            .required("Вкажіть ім'я"),
        password: Yup.string()
            .required('Вкажіть пароль.') 
            .min(5, 'Пароль має містить мінімум 5 символів.')
            .matches(/[a-zA-Z]/, 'Пароль має містить латинські символи.'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Паролі повинні збігатися')
            .required('Підтвердіть пароль'),
    });
}
export default validationFields;