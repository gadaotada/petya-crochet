'use client'
import { Button } from "@/components/ui/button"

import { useTranslation } from 'react-i18next';

export const Login: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="">
            <Button
                type="button"
                onClick={() => console.log('click me')}
                variant="destructive"
                
            > 
                {t('btn_txt')}
            </Button>
        </div>
    )
}