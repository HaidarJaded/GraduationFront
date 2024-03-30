import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { UsersTable } from "/components";
export default function UsersPage() {
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("auth-token")) {
      router.push("/auth/login");
    }
  }, [router]);
  return (
    <>
      <UsersTable />
    </>
  );
}