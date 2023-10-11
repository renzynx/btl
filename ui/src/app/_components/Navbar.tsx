/* eslint-disable react/no-children-prop */
"use client";
import {
  IconShoppingCart,
  IconSearch,
  IconMenu2,
  IconLogout,
  IconChevronDown,
  IconEdit,
  IconEditOff,
  IconCopy,
  IconCopyOff,
  IconArchive,
  IconArchiveOff,
} from "@tabler/icons-react";
import Button from "./Button";
import Drawer from "./Drawer";
import Image from "next/image";
import axios from "axios";
import { API_URL } from "../_libs/constant";
import { Fragment, useEffect } from "react";
import { useUserContext } from "../_context/user";
import { AuthResponse } from "../_libs/interfaces";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";

const Navbar = () => {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    axios
      .get<AuthResponse>(API_URL + "/User/self", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data)
      .then(setUser)
      .catch(() => {});
  }, [setUser]);

  return (
    <nav className="flex justify-center items-center border-b-[.5px] border-b-zinc-800">
      <div className="container flex justify-between p-5">
        <div className="lg:hidden md:hidden p-2 ring-1 ring-zinc-700 shadow-sm cursor-pointer rounded-md flex justify-center items-center hover:bg-zinc-900 ease-out">
          <Drawer
            controller={<IconMenu2 />}
            children={
              <div className="flex flex-col gap-6">
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <IconSearch size={18} />
                  </span>
                  <input
                    placeholder="Tìm kiếm..."
                    className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400 focus:ring-2 focus:ring-zinc-800"
                  />
                </div>

                {user?.role === 1 && <Button>Quản lý sản phẩm</Button>}

                <Button
                  defaultStyle={false}
                  className="bg-rose-400 hover:bg-rose-500"
                >
                  Đăng xuất
                </Button>

                {user ? (
                  <div>{user.email}</div>
                ) : (
                  <Button>Đăng nhập / Đăng ký</Button>
                )}
              </div>
            }
          />
        </div>
        <Link href="/" passHref>
          <div className="flex justify-left items-center rounded-full gap-2 ring-1 ring-zinc-800">
            <Image
              src="/fridge.jpg"
              width={40}
              height={40}
              alt="logo"
              className="rounded-full"
            />
            <p className="pr-3 text-sm">renzynx</p>
          </div>
        </Link>
        <div className="relative min-w-[30%] lg:inline md:inline sm:hidden hidden">
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <IconSearch size={18} />
          </span>
          <input
            placeholder="Tìm kiếm..."
            className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400 focus:ring-2 focus:ring-zinc-800"
          />
        </div>
        <div>
          <ul className="flex justify-center items-center">
            <li className="lg:inline md:inline sm:hidden hidden">
              {user ? (
                <AccountMenu user={user} />
              ) : (
                <Link href="/auth/login" passHref>
                  <Button className="mx-2">Đăng nhập / Đăng ký</Button>
                </Link>
              )}
            </li>

            <li className="mx-2 rounded-md flex justify-center items-center p-2 ring-1 ring-zinc-700 shadow-sm cursor-pointer hover:bg-zinc-900 ease-out">
              <Drawer
                dir="right"
                children={<>Giỏ hàng của bạn đang trống</>}
                controller={<IconShoppingCart />}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const AccountMenu: React.FC<{ user: AuthResponse }> = ({ user }) => {
  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <Menu as="div" className="relative inline-block text-left z-50">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {user.email}
          <IconChevronDown
            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {user?.role === 1 && (
              <Menu.Item>
                {({ active }) => (
                  <Link href="/admin" passHref>
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <IconEdit className="mr-2 h-5 w-5" aria-hidden="true" />
                      ) : (
                        <IconEditOff
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Quản lý sản phẩm
                    </button>
                  </Link>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-slate-300 text-red-500" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={logout}
                >
                  <IconLogout className="mr-2 h-5 w-5" aria-hidden="true" />
                  Đăng xuất
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Navbar;
