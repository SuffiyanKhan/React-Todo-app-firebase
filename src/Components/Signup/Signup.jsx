import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { auth, GoogleAuthProvider, signInWithPopup, sendEmailVerification, setDoc, doc, db } from '../../Config/fireBaseConfig';
import './Signup.css'
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
let signupWithGoogle =()=>{
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
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Email Verification is successfully"
    });
  });
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = errorCode.slice(5).toUpperCase();
    const errMessage = errorMessage.replace(/-/g, " ");
    Swal.fire({
      title: "Error!",
      text: errMessage + " " + "!",
      icon: "error"
    });
  });
}
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
      <Button onClick={signupWithGoogle} >
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