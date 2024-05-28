import {useRouter} from "next/router";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {AccordionNotices} from "../../components";



export default function RulesPage(){
    const router = useRouter();

    useEffect(() => {
        if (!Cookies.get('auth-token')) {
            router.push('/auth/login');
        }
    }, [router]);
    return(
        <>
            <AccordionNotices/>
        </>
    );
}