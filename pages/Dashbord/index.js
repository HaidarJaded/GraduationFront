import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Cards } from "/components";
import { BasicPie } from "/components";
import { BasicBars } from "/components";
import MailIcon from "@mui/icons-material/Mail";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { GridChart } from "/components";
import { Title } from "/components";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("auth-token")) {
      router.push("/auth/login");
    }
  }, [router]);
  return (
    <>
      <div className="Devices">
        <Title title="الأجهزة" />
        <Cards />
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <GridChart title="الموارد البشرية">
            <BasicBars />
          </GridChart>

          <GridChart title="الموارد">
            <BasicPie />
          </GridChart>
        </Grid>
      </Box>
    </>
  );
}
