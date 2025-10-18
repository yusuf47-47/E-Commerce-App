import React from 'react'
import { RegisterForm } from './_Component/RegisterForm'

export default function Register() {
    return <>
        <div className="min-h-[60vh] flex flex-col justify-center items-center gap-8" >
            <h1 className='text-4xl font-bold'>Register</h1>
            <RegisterForm />
        </div>
    </>
}
