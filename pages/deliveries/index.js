import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { DeliveriesTable } from "../../components/Deliveries/DeliveriesTable";

export default function DeliveriesPage() {
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("auth-token")) {
      router.push("/auth/login");
    }
  }, [router]);
  return (
    <>
      <DeliveriesTable />
    </>
  );
}