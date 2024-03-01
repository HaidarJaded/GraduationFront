import {Layout} from "../layouts";

export default function Home() {



    return (<>
      <Layout/>

    </>)
}


export function getServerSideProps(context) {
    const token = context.req.cookies['auth-token'];
    if (!token) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }
    return {
        props: {}, // will be passed to the page component as props
    };
}