import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  useGoogleLogin,
  type UseGoogleLoginOptions,
} from "@react-oauth/google";
import GoogleIcon from "../icons/google-icon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type LoginProps = {
  toggleForm?: (e: any) => void;
  standalone?: boolean;
};

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(5, "Password is too short, use atleast 5 characters"),
});

export const LoginForm = ({ toggleForm, standalone = false }: LoginProps) => {
  const {
    setShowSignUpOrLogin,
    setShowAuthModal,
    handleLoginInUser,
    handleGoogleLogin,
    authenticatingUser,
    errorAuth,
    successAuth,
  } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });
  const { formState, handleSubmit, register } = form;
  const { isValid, isSubmitting, errors: formErrors } = formState;

  const options: UseGoogleLoginOptions = {
    onSuccess: async (tokenResponse: any) => {
      console.log("tokenedfakdj", tokenResponse);
      await handleGoogleLogin(tokenResponse.access_token);
    },
    onError: () => {
      console.log("Login Failed");
    },
    flow: "implicit",
  };
  const withGoogleLogin = useGoogleLogin(options);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { email, password } = data;
    if (!email || !password) return;
    await handleLoginInUser(email, password);
  };

  const FormContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
      {errorAuth && (
        <div
          className="mt-2 bg-danger text-sm text-white rounded-sm p-4 mb-4"
          role="alert"
        >
          <span className="font-bold">Error:</span> {errorAuth}
        </div>
      )}
      {successAuth && (
        <div
          className="mt-2 bg-success text-sm text-white rounded-sm p-4 mb-4"
          role="alert"
        >
          <span className="font-bold">Great!</span> {successAuth}
        </div>
      )}
      <div className="w-full">
        <Button
          className="w-full bg-white text-black_300 hover:bg-white/90 font-medium"
          onClick={() => withGoogleLogin()}
        >
          {" "}
          <GoogleIcon /> <span className="ml-2">Continue with Google</span>
        </Button>
        {/* <GoogleLogin
          text="continue_with"
          logo_alignment="center"
          onSuccess={async (credentialResponse) => {
            console.log("credential::::", credentialResponse);
            await handleGoogleLogin(credentialResponse.credential);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          width={"100%"}
          shape="rectangular"
          size="large"
        /> */}
      </div>

      <p className="text-center text-grey_50 text-base">or</p>

      <div>
        <input
          type="text"
          placeholder="hello@paulplays.ai"
          {...register("email")}
          disabled={isSubmitting}
          className="w-full bg-transparent border border-grey_100 rounded-md font-inter focus:outline-none h-12 px-4 text-white text-base placeholder-[#ACACAC]"
        />
        {formErrors.email && (
          <div className="text-sm mt-2 text-danger">
            {formErrors.email.message}
          </div>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          // disabled={isSubmitting}
          {...register("password")}
          className="w-full bg-transparent border border-grey_100 rounded-md font-inter focus:outline-none h-12 px-4 text-white text-base placeholder-[#ACACAC]"
        />
        {formErrors.password && (
          <div className="text-sm mt-2 text-danger">
            {formErrors.password.message}
          </div>
        )}
      </div>

      <Button
        variant="default"
        type="submit"
        className="w-full font-medium rounded-md flex items-center justify-center h-12"
        disabled={authenticatingUser || !isValid || isSubmitting}
      >
        {authenticatingUser || isSubmitting ? (
          <div
            className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <span className=" text-white font-bold text-[16px] leading-[12px]">
            Continue with email
          </span>
        )}
      </Button>
    </form>
  );

  const Content = (
    <>
      <h2 className="text-2xl text-left leading-[24px] mb-4">
        Login to PaulPlays
      </h2>
      <div className="h-[1px] w-full bg-[#3A3A3A] mb-6" />
      {FormContent}
      <p className="text-[#ACACAC] mt-6 text-center text-base">
        Don't have an account?{" "}
        <span
          className="text-white underline cursor-pointer"
          onClick={toggleForm}
        >
          Create One
        </span>
      </p>
    </>
  );

  if (standalone) {
    return (
      <>
        <Button
          variant="outline"
          className="border-none hover:text-white/90 hover:bg-transparent"
          onClick={() => {
            setShowSignUpOrLogin("login");
            setShowAuthModal(true);
          }}
        >
          Login
        </Button>
      </>
    );
  }

  return Content;
};
