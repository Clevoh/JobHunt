// src/pages/SignUp.js
import React from 'react';
import { Box, TextField, Button, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { userSignUpAction } from '../redux/actions/userAction'; // Import your signup action

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const SignUp = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(userSignUpAction(values)); // Dispatch signup action
    },
  });

  return (
    <Box
      sx={{ height: '81vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box component="form" onSubmit={formik.handleSubmit} className="form_style border-style">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', mb: 3 }}>
            <LockOutlinedIcon />
          </Avatar>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mb: 3 }}
          />
          <Button fullWidth variant="contained" type="submit">
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
