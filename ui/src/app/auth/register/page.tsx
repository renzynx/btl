"use client";
import Button from "@/app/_components/Button";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { API_URL } from "@/app/_libs/constant";
import { AuthResponse } from "@/app/_libs/interfaces";
import Router from "next/router";
import Input from "@/app/_components/Input";

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const register = async () => {
    const response = await axios.post<AuthResponse>(
      API_URL + "/User/register",
      {
        email,
        password,
      }
    );

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      window.location.href = "/";
    } else {
      console.log(response.status);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col mt-20">
      <div className="mt-4 flex flex-col items-center justify-center p-5 gap-5 max-w-md w-full rounded-md shadow-md">
        <h1 className="text-2xl font-bold">Đăng ký</h1>

        <Input onChange={handleEmailChange} label="Email" id="email" />

        <Input
          onChange={handlePasswordChange}
          label="Mật khẩu"
          id="password"
          type="password"
        />

        <div className="w-full flex justify-between items-center">
          <Link href="/auth/login" passHref>
            <p className="text-sm underline cursor-pointer">Đã có tài khoản?</p>
          </Link>
          <Button className="px-5 py-2" onClick={register}>
            Đăng ký
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
