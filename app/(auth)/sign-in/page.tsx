"use client"; // This is a client component
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function SignIn() {
 
  const CreateUser = useMutation(api.users.CreateUser);
  const {user, setUser} = useContext(AuthContext);

  const router = useRouter();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      if (typeof window !== "undefined") {
        localStorage.setItem("user_token", tokenResponse.access_token);
      }

      const user = await GetAuthUserData(tokenResponse.access_token);

      console.log(user);

      const result = await CreateUser({
        name: user?.name,  // user?.name will give undefined if user is null where as user.name will give error 
        email: user?.email,
        picture: user?.picture,
      });

      console.log(result);
      setUser(result); 
      router.replace('/ai-assistants')// set user in context
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <div className="flex flex-col items-center gap-5 border rounded-2xl shadow-md p-10">
        <Image src={"/logo.svg"} alt="logo" height={100} width={100} />
        <h2 className="text-2xl">Sign In To AI Personal Assitant & Agent</h2>
        <Button onClick={() => googleLogin()}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default SignIn;
