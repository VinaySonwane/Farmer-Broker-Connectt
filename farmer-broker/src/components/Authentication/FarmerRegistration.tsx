"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, ChangeEvent, useState } from "react";
import { PrimaryButton } from "../utility/ButtonsAll";
import { IoCall } from "react-icons/io5";
import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import axios from "axios";
import { PiCityLight } from "react-icons/pi";
import baseUrl from "@/config/baseURL";

interface UserData {
  gender: string;
  name: string;
  email: string;
  dob: string;
  phoneNo?: string;
  location: string;
}

const FarmerRegistration: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [userData, setUserData] = useState<UserData>({
    gender: "male",
    name: "",
    email: "",
    dob: "",
    location: "",
  });

  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const CreateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${baseUrl}/api/users/register`, {
        fullname: userData.name,
        email: userData.email,
        password: password,
        role: "farmer",
        location: userData.location,
        dateOfBirth: userData.dob,
        phoneNo: phoneNo,
      });

      if (res.status === 201) {
        alert("User created successfully!");
        router.push("/authentication/signIn");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Error creating user.");
      } else {
        alert("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-7/12 flex items-center justify-center overflow-hidden mt-0">
      <div className="floating-bg" />

      <div className="w-full max-w-2xl bg-white/40 backdrop-blur-lg rounded-3xl shadow-lg px-8 py-10 mx-4 animate-pop mt-0">
        <form
          onSubmit={CreateUser}
          method="POST"
          className="flex flex-col gap-5 w-full text-gray-800"
        >
          <h2 className="text-xl font-semibold text-red-300">
            Farmer Registration
          </h2>

          <div className="border flex gap-5 items-center rounded-md border-gray-200">
            <FaRegUser size={15} className="text-black ml-2" />
            <select
              required
              onChange={onChange}
              value={userData.gender}
              name="gender"
              className="bg-transparent"
            >
              <option value="male">Mr.</option>
              <option value="female">Miss.</option>
            </select>
            <input
              type="text"
              onChange={onChange}
              value={userData.name}
              name="name"
              placeholder="Full Name"
              className="w-full outline-none"
            />
          </div>

          <div className="border flex gap-5 items-center rounded-md border-gray-200">
            <MdOutlineMail size={20} className="text-black ml-2" />
            <input
              type="email"
              onChange={onChange}
              value={userData.email}
              name="email"
              placeholder="Email"
              className="w-full outline-none"
            />
          </div>

          <div className="border flex gap-5 items-center rounded-md border-gray-200">
            <FaRegCalendarAlt size={18} className="text-black ml-2" />
            <input
              type="date"
              onChange={onChange}
              value={userData.dob}
              name="dob"
              className="w-full outline-none"
            />
          </div>

          <div className="border flex gap-5 items-center rounded-md border-gray-200">
            <PiCityLight size={18} className="text-black ml-2" />
            <input
              type="text"
              onChange={onChange}
              value={userData.location}
              name="location"
              placeholder="Location"
              className="w-full outline-none"
              required
            />
          </div>

          <div className="border flex gap-5 items-center rounded-md border-gray-200">
            <IoCall className="ml-2" />
            <input
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPhoneNo(e.target.value)
              }
              name="phoneNo"
              value={phoneNo}
              placeholder="Phone No."
              className="w-full outline-none"
            />
          </div>

          <div className="border flex gap-5 items-center rounded-md border-gray-200">
            <TbLockPassword size={20} className="text-black ml-2" />
            <input
              type="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              value={password}
              required
              placeholder="Password"
              className="w-full outline-none"
            />
          </div>

          <PrimaryButton
            style="px-5 py-3 w-full rounded-md pBtn"
            name="Continue"
            loading={loading}
          />

          <div className="text-center text-gray-500 text-sm">
            By clicking Continue, I accept the <b>Terms & Conditions</b> &{" "}
            <b>Privacy Policy</b>
          </div>

          <div className="text-center text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              className="text-blue-800 font-semibold"
              onClick={() => router.push("/authentication/signIn")}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmerRegistration;
