import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Redirect, withRouter, matchPath } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Button, Container } from '@material-ui/core';

// COMPONENT
import PageTitle from '../../custom/PageTitle';
import TextFieldInputWithHeader from '../../custom/TextFieldInputWithheader';
import Landing from '../../layout/Landing';

// ACTION
import { signupTeacher } from '../../../store/actions/auth';
import { GET_ERRORS } from '../../../store/actions/types';
const Signup = ({
  errors,
  auth: { isAuthenticated },
  history,
  signupTeacher,
}) => {
  const dispatch = useDispatch();
  // FORM DATA STATE
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullname: '',
    email: '',
  });

  const { username, password, email, fullname } = formData;

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  // Click button Login
  const onSubmit = (e) => {
    e.preventDefault();

    const error = {};

    Object.keys(formData).map((key) => {
      if (formData[key].trim() === '') {
        error[key] = 'This field is required';
      }

      if (!error[key] && key === 'email' && !validateEmail(formData[key])) {
        error[key] = 'Email is invalid';
      }
    });

    console.log(error);
    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === '{}') {
      signupTeacher(isAuthenticated, history, formData);
    }
  };

  // Save on change input value
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <Landing />
      <Grid container justify="center">
        <Grid item xs={12} sm={4}>
          <form onSubmit={(e) => onSubmit(e)}>
            <PageTitle title="Create an account" center="true" />
            <TextFieldInputWithHeader
              header="Username"
              name="username"
              className="mt-0"
              fullWidth
              value={username}
              onChange={onChange}
              error={errors.username}
              placeholder="Enter Username"
            />
            <TextFieldInputWithHeader
              header="Email"
              name="email"
              className="mt-0"
              fullWidth
              value={email}
              onChange={onChange}
              error={errors.email}
              placeholder="Enter Email"
            />

            <TextFieldInputWithHeader
              header="Fullname"
              name="fullname"
              className="mt-0"
              fullWidth
              value={fullname}
              onChange={onChange}
              error={errors.fullname}
              placeholder="Enter Fullname"
            />
            <TextFieldInputWithHeader
              header="Password"
              name="password"
              placeholder="Enter Password"
              type="password"
              value={password}
              error={errors.password}
              className="mt-0"
              fullWidth
              onChange={onChange}
            />
            <div className="text-center">
              <Button
                className="mt-3 mr-2"
                variant="contained"
                color="primary"
                type="submit"
              >
                Sign up
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});
export default connect(mapStateToProps, { signupTeacher })(withRouter(Signup));
