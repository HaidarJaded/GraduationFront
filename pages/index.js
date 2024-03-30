import {useRouter} from "next/router";
import {useEffect} from "react";
import Cookies from "js-cookie";


export default function Home() {
    const router = useRouter();

    useEffect(() => {
        if (!Cookies.get('auth-token')) {
            router.push('/auth/login');
        }
    }, [router]);

    return (<>


    </>)
}


// export function getServerSideProps(context) {
//     const token = context.req.cookies['auth-token'];
//     if (!token) {
//         return {
//             redirect: {
//                 destination: '/auth/login',
//                 permanent: false,
//             },
//         };
//     }
//     return {
//         props: {}, // will be passed to the page component as props
//     };
// }