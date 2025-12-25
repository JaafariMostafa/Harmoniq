import AuthForm from '@/components/AuthForm'
import React from 'react'

export default function page() {
  return (
    <div
        className='w-full flex flex-col justify-center items-center'
    >
        <div
            className='w-full px-6 md:w-1/3'
        >
            <AuthForm />
        </div>
    </div>
  )
}
