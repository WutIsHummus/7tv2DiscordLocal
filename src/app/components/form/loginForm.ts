"use client";
const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address",
        customClass: ""  
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password",
        customClass: "" 
    }
]

const signupFields=[
    {
        labelText:"First Name",
        labelFor:"first-name",
        id:"first-name",
        name:"first-name",
        type:"text",
        autoComplete:"name",
        isRequired:true,
        placeholder:"First Name",
        customClass: "" 
    },
    {
        labelText:"Last Name",
        labelFor:"Last-name",
        id:"last-name",
        name:"last-name",
        type:"text",
        autoComplete:"name",
        isRequired:true,
        placeholder:"Last  Name",
        customClass: "" 
    },
    {
        labelText:"Username",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Username",
        customClass: ""  
    },
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address",
        customClass: "" 
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password",
        customClass: ""    
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Confirm Password",
        customClass: ""    
    }
]

export {loginFields,signupFields}