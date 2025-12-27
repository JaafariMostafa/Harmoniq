"use client";
import { useMemo } from "react"




export const getFollowersCount = (FollowersCount: number) => {
    const formatFollowers = useMemo(() => {
        if(FollowersCount >= 1_000_000_000){
            return `${(FollowersCount / 1_000_000_000).toFixed(2)}B`
        }else if (FollowersCount >= 1_000_000){
            return `${(FollowersCount / 1_000_000).toFixed(2)}M`
        }else if (FollowersCount >= 1_000){
            return `${(FollowersCount / 1_000).toFixed(2)}K`
        }
        return FollowersCount.toString();
    },[FollowersCount])
    return formatFollowers;
}