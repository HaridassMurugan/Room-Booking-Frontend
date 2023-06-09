import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import * as yup from 'yup';
import { useFormik } from 'formik';
import '../owner/signup.css';
import { Link } from 'react-router-dom';
import { REACT_APP_BASE_URL } from "../../URLData";

const Signin = () => {
  const { error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup
        .string('Enter your email')
        .required('* Required')
        .email('Enter a vaild Email'),

      password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('*Password is required'),
    }),
    onSubmit: async (values) => {
      dispatch({ type: 'LOGIN_START' });
      try {
        const res = await axios.post(`${REACT_APP_BASE_URL}/guestAuth/signin`, values);
        localStorage.setItem('guestauth', JSON.stringify(res.data.token));
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
        navigate('/');
      } catch (err) {
        dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
      }
    },
  });

  return (
    <div className='login'>
      <div className='design'>
        <form onSubmit={formik.handleSubmit} className='lContainer'>
          <div className='inpCont'>
            <input
              type='email'
              placeholder='Enter Email'
              id='email'
              name='email'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='lInput'
              style={{
                border: formik.errors.email
                  ? '1px solid red'
                  : formik.values.email !== '' && !formik.errors.email
                  ? '1px solid green'
                  : '',
              }}
            />
            {formik.touched.email && formik.errors.email ? (
              <small style={{ color: 'red' }}>{formik.errors.email}</small>
            ) : null}

            {formik.values.email !== '' && !formik.errors.email ? (
              <small style={{ color: 'green' }}>Looks good!</small>
            ) : null}
          </div>

          <div className='inpCont'>
            <input
              type='password'
              placeholder='Enter Password'
              id='password'
              name='password'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='lInput'
              style={{
                border: formik.errors.password
                  ? '1px solid red'
                  : formik.values.password !== '' && !formik.errors.password
                  ? '1px solid green'
                  : '',
              }}
            />
            {formik.touched.password && formik.errors.password ? (
              <small style={{ color: 'red' }}>{formik.errors.password}</small>
            ) : null}
            {formik.values.password.length >= 8 &&
            formik.values.password.length !== 0 ? (
              <small style={{ color: 'green' }}>Looks good!</small>
            ) : null}
          </div>
          <div className='button-div'>
          
            <button className='lButton' type='submit'
            
            >Sign In</button>
          </div>
          <div style={{ marginLeft: "70px" }}>
            Don't have an account?{' '}
            <Link to={'/guest-signup'} style={{ textDecoration: 'none' }}>
              Sign Up
            </Link>
          </div>
        </form>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Signin;
