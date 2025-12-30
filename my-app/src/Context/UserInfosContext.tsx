"use client";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { error } from "console";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type UserInfosTypes = {
    user: User | null;
    isLoading: boolean;
}
const UserInfosContext = createContext<UserInfosTypes | null>(null);

export function UserInfosProvider({ children, serverUser }: { children: ReactNode; serverUser: User | null }){
    const [isLoading, setIsLoading] = useState(true);
    const [userInfos, setUserInfos] = useState<User | null>(serverUser);
    
    const supabase = createClient();

    useEffect(() => {
        setIsLoading(true);
        
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if(!session){
                setUserInfos(null);
            }else {
                setUserInfos(session?.user)
            }
        })
        setIsLoading(false);
        return () => listener.subscription.unsubscribe();
    },[supabase])

    const contextValue = {
        user: userInfos,
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