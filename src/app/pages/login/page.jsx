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
          <h5 className="mb-2 text-2xl tracking-tight text-black truncate text-center  mt-10">Log In</h5>

          <form className="m-10 mt-0" onSubmit={handleSubmit}>
            <div className="text-sm pt-2">
              <a className="font-medium text-gray-600 0 mr-2">
                Dont have an account yet?
              </a>
              <a href="./signup" className="font-medium text-purple-600 hover:text-purple-500 underline">
                Sign Up
              </a>
              

            </div>
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
              <div className="text-sm pb-2 text-end underline">
                <a href="./forgot-password" className="font-medium text-purple-600 hover:text-purple-500">
                  Forgot your password?
                </a>
              </div>
              <div className='my-5'>
                <Input
                  key="password"
                  handleChange={handleChange}
                  value={loginState["password"]}
                  labelText="Password"
                  labelFor="password"
                  id="password"
                  name="password"
                  type="password"
                  isRequired={true}
                  placeholder="Password"
                />
              </div>


              <div className="grid grid-rows-2 grid-cols-1 justify-start py-5">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-900 focus:ring-purple-900 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>


              </div>

              <FormAction handleSubmit={handleSubmit} text="Login" />
            </div>

          </form>
        </div>
      </div>
    </main>
  )
}