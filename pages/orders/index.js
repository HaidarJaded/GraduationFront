import {useRouter} from "next/router";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {AccordionNotices} from "../../components";

export default function orders(){
    const router= useRouter();
   useEffect(()=>{
       if (!Cookies.get('auth_token')){
           router.push('/auth/login');
       }
   },[router]);

   return(
       <>
           <AccordionNotices/>
       </>
   )
}