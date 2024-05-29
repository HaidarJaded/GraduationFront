import {useRouter} from "next/router";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {RecipeReviewCard} from "../../components/Services";
import {Box} from "@mui/material";

export default function TechniciansPage() {
    const router = useRouter();

    useEffect(() => {
        if (!Cookies.get("auth-token")) {
            router.push("/auth/login");
        }
    }, [router]);
    return (
        <Box sx={{
             display: "flex",
            flexWrap: 'wrap',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
            alignItems: 'space-between'
        }}>
            <RecipeReviewCard/>
            <RecipeReviewCard/>
            <RecipeReviewCard/>
            <RecipeReviewCard/>
        </Box>
    );
}