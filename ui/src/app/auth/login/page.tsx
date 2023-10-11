"use client";

import Button from "@/app/_components/Button";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { API_URL } from "@/app/_libs/constant";
import { AuthResponse } from "@/app/_libs/interfaces";
import Input from "@/app/_components/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    const response = await axios.post<AuthResponse>(API_URL + "/User/login", {
      email,
      password,
    });

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
        <h1 className="text-2xl font-bold">Đăng nhập</h1>

        <Input onChange={handleEmail} label="Email" id="email" />

        <Input
          onChange={handlePassword}
          label="Mật khẩu"
          id="password"
          type="password"
        />

        <div className="w-full flex justify-between items-center">
          <Link href="/auth/register" passHref>
            <p className="text-sm underline cursor-pointer">
              Chưa có tài khoản?
            </p>
          </Link>
          <Button onClick={login} className="px-5 py-2">
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
