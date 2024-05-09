import {useRouter} from "next/router";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {Devices} from "../../components/Devices";


export default function DevicesPage(){
    const router = useRouter();

    useEffect(() => {
        if (!Cookies.get('auth-token')) {
            router.push('/auth/login');
        }
    }, [router]);
    return(
        <>
           <Devices/>
        </>
    );
}