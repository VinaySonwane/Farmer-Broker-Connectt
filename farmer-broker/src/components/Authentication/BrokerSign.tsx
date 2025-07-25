"use client";
import React, { FormEvent, useState } from "react";
import { PrimaryButton } from "../utility/ButtonsAll";
import { useRouter } from "next/navigation";

import { TbLockPassword } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";
import Loader from "../utility/Loader";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setUser } from "@/store/userSlice";
import baseUrl from "@/config/baseURL";

// interface BrokerSignProps {
//   setisLoginState: (val: boolean) => void;
// }
// const BrokerSign: React.FC<BrokerSignProps> = ({ setisLoginState }) => {

const BrokerSign = () => {
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);

    try {
      if (email.length === 0 || password.length === 0) {
        toast.error("Fill the Fields");
        return setloading(false);
      }

      const response = await axios.post(
        `${baseUrl}/api/users/login`,
        {
          email,
          password,
          role: "broker",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Extract token and user from response
      const { token, user } = response.data;

      // Store token in localStorage (or cookie)
      localStorage.setItem("token", token);
      //localStorage.setItem("user", user);

      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Dispatch to Redux
      dispatch(setUser(user));
      toast.success("Login successful!");

      // Optional: Redirect or update user context

      // ✅ Redirect to broker dashboard
      router.push("/dashboard/broker");
      //console.log("User:", user);
    } catch (err: unknown) {
      const errorMsg = "Login failed. Try again.";
      toast.error(errorMsg);
    } finally {
      setloading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-5 flex-col w-full ">
      <div>
        <h2 className="text-xl font-semibold text-red-300">Broker SignIn</h2>
      </div>{" "}
      <div className="border flex gap-5 items-center  rounded-md  border-gray-200 ">
        <FaRegUser size={18} className="text-black ml-2" />
        <input
          type="email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
          value={email}
          name="email"
          required={true}
          placeholder="Username"
          className=" w-[100%] outline-none  text-gray-800 "
        />
      </div>
      <div className="border flex gap-5 items-center  rounded-md  border-gray-200 ">
        <TbLockPassword size={20} className="text-black ml-2" />
        <input
          type="password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          value={password}
          name="password"
          required={true}
          placeholder="Password"
          className=" w-[100%] outline-none   text-gray-800"
        />
      </div>
      <div className="text-right text-blue-800 font-semibold ">
        Forgot Password ?
      </div>
      <PrimaryButton name="Sign In" style="px-5 py-3" loading={loading} />
      <div className="text-gray-500 text-center">
        If you Dont have an account ?{" "}
        <button
          className="text-blue-800 font-semibold"
          onClick={() => {
            router.push("/authentication/registration");
          }}
        >
          Create an Account
        </button>
      </div>
      {loading && <Loader />}
    </form>
  );
};

export default BrokerSign;
