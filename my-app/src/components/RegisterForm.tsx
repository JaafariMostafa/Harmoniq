"use client";

import { createClient } from "@/utils/supabase/client";
import { Loader, Router } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";


export default function RegisterForm() {
    const supabase = createClient();
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        confirmpassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const HandleRegisterForm = async (e: FormEvent) => {
        e.preventDefault();
        if(inputs.email.trim() === "" || inputs.password.trim() === "" || inputs.confirmpassword.trim() === "") {
            setError("All fields are required");
            setIsLoading(false);
            return;
        }

        if (inputs.password !== inputs.confirmpassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try{
            const { data, error } = await supabase.auth.signUp({
                email: inputs.email,
                password: inputs.password,
            })

            if(error){
                setError(error.message);
                setIsLoading(false);
                return;
            }
            
            setIsLoading(false);
            router.push('/auth/login');
        }catch (err){
            setError("An unexpected error occurred. Please try again.");
            setIsLoading(false);
        }
    }
    return (
        <div
            className="w-full bg-neutral-900 px-3 py-6 rounded-2xl border border-neutral-800/80"
        >
            <h1
                className="text-2xl font-semibold mb-1 text-center"
            >
                Create an Account
            </h1>
            <p className="text-sm text-neutral-500 mb-6 text-center">
                Please register to get started
            </p>
            <form 
                onSubmit={HandleRegisterForm}
                className="w-full flex flex-col gap-3"
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={inputs.email}
                    onChange={(e) => {
                        setInputs({ ...inputs, email: e.target.value })
                        setError("")}
                    }
                    className="text-white bg-neutral-900/20 py-2 px-3 rounded-lg ring ring-neutral-800 outline-none border border-transparent focus:border-white focus:shadow-sm"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={inputs.password}
                    onChange={(e) => {
                        setInputs({ ...inputs, password: e.target.value })
                        setError("")}
                    }
                    className="text-white bg-neutral-900/20 py-2 px-3 rounded-lg ring ring-neutral-800 outline-none border border-transparent focus:border-white focus:shadow-sm"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={inputs.confirmpassword}
                    onChange={(e) => {
                        setInputs({ ...inputs, confirmpassword: e.target.value })
                        setError("")}
                    }
                    className="text-white bg-neutral-900/20 py-2 px-3 rounded-lg ring ring-neutral-800 outline-none border border-transparent focus:border-white focus:shadow-sm"
                />
                {error && <p className="w-full text-sm text-center text-red-500">{error}</p>}
                <button 
                    type="submit"
                    disabled={isLoading || error !== "" || inputs.email.trim() === "" || inputs.password.trim() === "" || inputs.confirmpassword.trim() === ""}
                    className="transition border border-transparent disabled:border-neutral-700 
                        disabled:bg-neutral-800 disabled:text-neutral-700 disabled:cursor-not-allowed 
                        w-full bg-white hover:bg-white/80 py-2 rounded-lg text-neutral-900 font-semibold 
                        text-sm cursor-pointer flex items-center justify-center"
                >
                    {isLoading ? (<Loader className="animate-spin" size={20}/>) : "Register"}
                </button>
            </form>
            <div>
                <p
                    className='text-sm text-neutral-500 mt-4 text-center'
                >
                    Already have an account ?{' '}
                    <Link
                        href="/auth/login"
                        className='mr-1 text-white hover:underline'
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}
