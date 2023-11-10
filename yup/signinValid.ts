import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password must be at least 6 characters, contain at least one letter, and one number')
    .required('Password is required'),
});

export default validationSchema;