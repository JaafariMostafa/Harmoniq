"use client";

import { createClient } from "@/utils/supabase/client";
import { Loader } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";


export default function AuthForm() {
    const supabase = createClient();
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const HandleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!inputs.email || !inputs.password) {
            setError("Please fill in all fields.");
            setIsLoading(false)
            return;
        }

        setIsLoading(true);
        try{
            supabase.auth.signInWithPassword({
                email: inputs.email,
                password: inputs.password
            }).then(({error}) => {
                if(error) {
                    setError(error.message);
                }
            })
            setIsLoading(false);
            redirect('/');
        }catch (err){
            setError("An unexpected error occurred. Please try again.");
            setIsLoading(false);
        }
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
                    className="text-white bg-neutral-900/20 py-2 px-3 rounded-lg ring ring-neutral-800 outline-none border border-transparent focus:border-white focus:shadow-sm"
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={inputs.password}
                    onChange={(e) => {setInputs({...inputs, password: e.target.value}); setError("")}}
                    className="text-white bg-neutral-900/20 py-2 px-3 rounded-lg ring ring-neutral-800 outline-none border border-transparent focus:border-white focus:shadow-sm"
                />
                {error !== "" && (
                    <span
                        className='text-sm text-red-500 text-center w-full'
                    >
                        {error}
                    </span>
                )}
                <button
                    type="submit"
                    disabled={isLoading || !inputs.email || !inputs.password || error !== ""}
                    className="transition border border-transparent disabled:border-neutral-700 
                        disabled:bg-neutral-800 disabled:text-neutral-700 disabled:cursor-not-allowed 
                        w-full bg-white hover:bg-white/80 py-2 rounded-lg text-neutral-900 font-semibold 
                        text-sm cursor-pointer flex items-center justify-center"
                >
                    {isLoading ? (<Loader className="animate-spin"/>) : "Login"}
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
                </p>
            </div>
        </div>
    )
}
