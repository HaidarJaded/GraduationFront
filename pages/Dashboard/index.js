import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {Cards, DashboardComponent} from "/components";
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
  }, [router]);

  return (
    <DashboardComponent/>
  );
}
