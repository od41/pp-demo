import { verifyNewUser } from "@/api/user";
import { PaulPlaysLogo } from "@/components/icons/paul-logo";
import Seo from "@/shared/seo/seo";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const VerifyPage = () => {
  const router = useRouter();
  const { "": token } = router.query;
  const [error, setError] = useState<string | null>();
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (token) {
      const handleVerify = async () => {
        const result = await verifyNewUser(token as string);
        if (result.success) {
          setStatus(true);
          setError(null);
          router.push("/");
        } else {
          setStatus(false);
          setError(result.error);
        }
      };
      handleVerify();
    } else {
      setError("This token is empty or invalid");
    }
  }, [token]);

  return (
    <>
      <div className="h-full w-full flex flex-col relative">
        <Seo title="Verify" />
        <nav className="py-6 w-full mx-auto px-4 md:px-8 z-[200]">
          <div className="flex justify-between md:grid md:grid-cols-3 w-full items-center">
            {/* Logo */}
            <Link
              href={"/"}
              className="hover:opacity-80 mx-auto justify-center "
            >
              <PaulPlaysLogo isBeta />
            </Link>
          </div>
        </nav>
        <center className=" md:max-w-[500px] mx-auto w-full mt-8">
          {error && (
            <div
              className="mt-2 bg-danger text-sm text-white rounded-sm p-4 mb-4"
              role="alert"
            >
              <span className="font-bold">Error:</span> {error}
            </div>
          )}
          {status && (
            <div
              className="mt-2 bg-success text-sm text-white rounded-sm p-4 mb-4"
              role="alert"
            >
              <span className="font-bold">Great!</span>{" "}
              {status && "Your account has been activated, you can login now!"}
            </div>
          )}
          {/* {status && token} */}
        </center>
      </div>
    </>
  );
};
VerifyPage.layout = "GuestLayout";
export default VerifyPage;
