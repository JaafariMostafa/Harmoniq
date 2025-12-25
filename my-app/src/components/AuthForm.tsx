"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { FormEvent, useState } from "react";


export default function AuthForm() {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("");
    const supabase = createClient();
    const HandleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!inputs.email || !inputs.password) {
            setError("Please fill in all fields.");
            return;
        }

        const t = supabase.auth.signInWithPassword({
            email: inputs.email,
            password: inputs.password
        }).then(({error}) => {
            if(error) {
                setError(error.message);
            }
        })
    }
    return (
        <div
            className="w-full text-center bg-neutral-900/40 px-3 py-12 rounded-2xl border border-neutral-800"
        >
            <h1
                className="text-2xl font-semibold mb-1.5"
            >
                Welcome Back
            </h1>
            <p className="text-neutral-500 mb-6">
                Please login to your account
            </p>
            <form
                onSubmit={HandleSubmitForm}
                className='w-full flex flex-col gap-4'
            >
                <input 
                    type="email"
                    placeholder="Email"
                    value={inputs.email}
                    onChange={(e) => {setInputs({...inputs, email: e.target.value}); setError("")}}
                    className='w-full p-3 rounded-lg bg-neutral-900 border border-neutral-800 focus:border-neutral-700 outline-none'
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={inputs.password}
                    onChange={(e) => {setInputs({...inputs, password: e.target.value}); setError("")}}
                    className='w-full p-3 rounded-lg bg-neutral-900 border border-neutral-800 focus:border-neutral-700 outline-none'
                />
                {error !== "" && (
                    <span
                        className='text-red-500 text-center w-full'
                    >
                        {error}
                    </span>
                )}
                <button
                    type="submit"
                    disabled={!inputs.email || !inputs.password || error !== ""}
                    className='cursor-pointer w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-neutral-200 transition border border-transparent disabled:border-neutral-700 disabled:bg-neutral-800 disabled:text-neutral-700 disabled:cursor-not-allowed'
                >
                    Login
                </button>
            </form>
            <div>
                <p
                    className='text-sm text-neutral-500 mt-4'
                >
                    Don't have an account?{' '}
                    <Link
                        href="/auth/register"
                        className='mr-1 text-white hover:underline'
                    >
                        Register
                    </Link>
                    here
                </p>
            </div>
        </div>
    )
}
