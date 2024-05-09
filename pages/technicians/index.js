import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { TechniciansTable } from "../../components/Technicians/techniciansTable";

export default function TechniciansPage() {
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("auth-token")) {
      router.push("/auth/login");
    }
  }, [router]);
  return (
    <>
      <TechniciansTable />
    </>
  );
}