"use client";
import { createClient } from "@/utils/supabase/client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


type UserInfosType = {
    email: string;
    id: string;
    fullname: string;
    isLoading: boolean;
}
const UserInfosContext = createContext<UserInfosType | null>(null);

export function UserInfosProvider({ children }: { children: ReactNode }){
    const [isLoading, setIsLoading] = useState(true);
    const [userInfos, setUserInfos] = useState({
        email: "",
        id: "",
        fullname: "",
    })
    const supabase = createClient();

    useEffect(() => {
        setIsLoading(true);
        const fetchUserInfos = async () => {
            await supabase.auth.getUser().then(({data: {user}}) => {
                if(user){
                    setUserInfos({
                        email: user.email || "",
                        id: user.id,
                        fullname: user.user_metadata.fullname || "",
                    })
                }
            })

        }
        fetchUserInfos().finally(() => setIsLoading(false));
    },[supabase])
    const contextValue = {
        ...userInfos,
        isLoading,
    }
    return (
        <UserInfosContext.Provider value={contextValue}>
            {children}
        </UserInfosContext.Provider>
    )
}

export function useUserInfos(){
    const context = useContext(UserInfosContext);
    if(!context){
        throw new Error("useUserInfos must be used within a UserInfosProvider");
    }
    return context;
}