import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
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
    <h1>Sign up</h1>
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
    <Form.Item
      name="remember"
      valuePropName="checked"
      >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item>
    <div className="signup">
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </div>
    </Form.Item>
    <Form.Item>
      <div className="signupWithGoogle"></div>
      <Button>
        Sign up with Google
      </Button>
    </Form.Item>
    <Form.Item>
      <div className="para">
        <p>I have already an account ? <Link to={'/'}>Login</Link></p>
      </div>
    </Form.Item>
  </Form>
);
export default AppSignup;