"use client";
import { useState } from 'react';
import { signupFields } from "@src/app/components/form/loginForm";
import Input from "@src/app/components/form/Input";
import FormAction from '@src/app/components/form/formAction';
import postData from '@src/utils/helpers/postData';

const fields = signupFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value })
    console.log(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    authenticateUser()
  }

  const authenticateUser = async () => {
    const res = await postData(`/api/auth/signup`, {signupState: signupState})
  }


  return (
    <main className="flex min-h-screen flex-col items-start justify-left grid items-center">
      <div className="mx-auto bg-white w-1/3 border bg-violet-950 rounded-lg shadow drop-shadow-lg">
        <div className="flex grid justify-center items-center w-full h-full">
          <h5 className="mb-2 text-2xl tracking-tight text-black truncate text-center  mt-10">Sign Up</h5>

          <form className="m-10 mt-0" onSubmit={handleSubmit}>
            <div className="text-sm text-center pt-2">
              <a className="font-medium text-end text-gray-600 0 mr-2">
                Have an account?
              </a>
              <a href="./login" className="font-medium text-purple-600 hover:text-purple-500 underline">
                Log In
              </a>
            </div>
            <div className="-space-y-px mt-5">
              <div className='grid grid-cols-2 gap-4'>
                {
                  fields.map(field =>
                   
                    <Input
                      key={field.id}
                      handleChange={handleChange}
                      value={signupState[field.id]}
                      labelText={field.labelText}
                      labelFor={field.labelFor}
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      isRequired={field.isRequired}
                      placeholder={field.placeholder}
                    />
                  )
                }

              </div>
              <div className='my-2'>
              <FormAction handleSubmit={handleSubmit} text="Sign Up" />
              </div>
              
            </div>

          </form>
        </div>
      </div>
    </main>
  )
}