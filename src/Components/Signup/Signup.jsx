import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import './Signup.css'
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const AppSignup = ({data}) => (
  <Form
    name="basic"
    initialValues={{
      remember: true,
    }}
    onFinish={data}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <div className="signupForm">

    <h2>Sign up</h2>
    <div className="signupInputs">
    <Form.Item
      label="Full Name"
      name="full name"
      rules={[
        {
          required: true,
          message: 'Please input your full name!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="Phone  Number"
      name="phone number"
      rules={[
        {
          required: true,
          message: 'Please input your phone number!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    </div>
<div className="signupButtons">

    <div className="signup">
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Sign up
      </Button>
    </Form.Item>
    </div>
      <div className="signupWithGoogle">
    <Form.Item>
      <Button>
        Sign up with Google
      </Button>
    </Form.Item>
      </div>
</div>
      <div className="paras">
    <Form.Item>
        <p>I have already an account ? <Link to={'/'}>Login</Link></p>
    </Form.Item>
      </div>
    </div>
  </Form>
);
export default AppSignup;