import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Cards } from "/components";
import { BasicPie } from "/components";
import { BasicBars } from "/components";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { GridChart } from "/components";
import { Title } from "/components";
import axiosInstance from "../../utils/auth/axiosInstance"
import { responseErrorHandlers } from "../../wrappers";
import getConfig from "next/config";
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("auth-token")) {
      router.push("/auth/login");
    }
    const getDashboardInfo = async () => {
      try {
          const { publicRuntimeConfig } = getConfig();
          const DASHBOARD_INFO_URL = "api/dashboard_info";
          const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

          const responseData = await axiosInstance
              .get(`${BASE_URL}${DASHBOARD_INFO_URL}`)
              .then(async (response) => {
                  return response?.data?.body;
              });

          setDashbardInfo(responseData);
      } catch (error) {
          responseErrorHandlers(error?.response);
      }
  };
  getDashboardInfo();
  }, [router]);
  const [dashbardInfo, setDashbardInfo] = useState({});

  return (
    <>
      <div className="Devices">
        <Title title="الأجهزة" />
        <Cards data={dashbardInfo}/>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <GridChart title="الموارد البشرية">
            <BasicBars data={dashbardInfo}/>
          </GridChart>

          <GridChart title="الموارد">
            <BasicPie data={dashbardInfo} />
          </GridChart>
        </Grid>
      </Box>
    </>
  );
}
