"use client";
import { useState } from 'react';
import { loginFields } from "@src/app/components/form/loginForm";
import Input from "@src/app/components/form/Input";
import FormAction from '@src/app/components/form/formAction';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    authenticateUser()
  }

  //Handle Login API Integration here
  const authenticateUser = () => {

  }


  return (
    <main className="flex min-h-screen flex-col items-start justify-left grid items-center">
      <div className="mx-auto bg-white w-1/3 border bg-violet-950 rounded-lg shadow drop-shadow-lg">
        <div className="flex grid justify-center items-center w-full h-full">
          <h5 className="mb-2 text-2xl tracking-tight text-black truncate text-center  mt-10">Forgot Password</h5>

          <form className="m-10 mt-4" onSubmit={handleSubmit}>
            
            <a className="font-medium text-sm text-center text-gray-600">
                Enter the email address associated with your account and we'll send you a link to reset your password.
              </a>
            <div className="-space-y-px">
              <div className='my-5'>
                <Input
                  key="email-address"
                  handleChange={handleChange}
                  value={loginState["email-address"]}
                  labelText="Email Address"
                  labelFor="email-address"
                  id="email-address"
                  name="email"
                  type="email"
                  isRequired={true}
                  placeholder="Email Address"
                />
              </div>
              <FormAction handleSubmit={handleSubmit} text="Continue" />
            </div>
            <div className="text-sm m-2 pt-2">
              <a className="font-medium text-gray-600 0 mr-2">
                Dont have an account yet?
              </a>
              <a href="./signup" className="font-medium text-purple-600 hover:text-purple-500 underline">
                Sign Up
              </a>
              

            </div>

          </form>
        </div>
      </div>
    </main>
  )
}