'use client'

import { useState } from "react";
import Image from "next/image";

import MainImg from "@/public/parcalesaIcon.png"
import { Button } from "@/components/ui/button"
import { useTranslation } from 'react-i18next';
import { Input } from "@/components/ui/input";
import { userLoggin } from "@/services/auth/functions";

export const Login: React.FC = () => {
    const [profile, setProfile] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { t } = useTranslation();

    const handleLoggin = async () => {
        await userLoggin(profile, password);
    }

    return (
        <div className="flex flex-col justify-center p-10 gap-0 shadow-md rounded-md">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl uppercase">{t("h1_txt")}</h1>
                <Image src={MainImg} width={300} height={300} alt="Парцалеса вход" />
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
                <Input 
                    type="text" 
                    className="max-w-[200px]" 
                    placeholder={t("profile_placeholder")}
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    max={50}
                />
                <Input 
                    type="password" 
                    className="max-w-[200px]" 
                    placeholder={t("password_placeholder")} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    max={150} 
                />
                <Button className="w-[200px] mt-4" onClick={handleLoggin}>{t("btn_txt")}</Button>
            </div>
        </div>
    )
}