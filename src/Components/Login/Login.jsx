import React from 'react';
import "./Login.css"
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { auth, GoogleAuthProvider, signInWithPopup, sendEmailVerification, setDoc, doc, db } from '../../Config/fireBaseConfig';
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
let loginWithGoogle =()=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then(async(result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    await setDoc(doc(db, "Users", user.uid), {
      Name: user.displayName,
      Email: user.email,
      Phone_Number: user.phoneNumber,
      userId: user.uid
    });
    
    
    sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    // ...
  });
    console.log(user)
    // IdP data available using getAdditionalUserInfo(result)
    // ...displayName,email,phoneNumber,uid
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = errorCode.slice(5).toUpperCase();
    const errMessage = errorMessage.replace(/-/g, " ");
    console.log(errMessage)
  });

  console.log('hi')
}
const AppLogin = ({data}) => (
  <Form
    name="basic"
    initialValues={{
      remember: true,
    }}
    onFinish={data}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <div className="form">
    <h2>Login</h2>

<div className="inputs">
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
</div>

<div className="checkBox">
    <Form.Item
      name="remember"
      valuePropName="checked"
      >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>
</div>

    <div className="buttons">
    <div className="login">
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form.Item>
    </div>
    <div className="loginWithGoogle">
    <Form.Item>
      <Button onClick={loginWithGoogle}>
        Login with Google
      </Button>
    </Form.Item>
    </div>
    </div>

    <div className="para">
      <Form.Item>
        <p>I have no  account ? <Link to={'/signup'}>Signup</Link></p>
      </Form.Item>
    </div>
    </div>
  </Form>
);
export default AppLogin;