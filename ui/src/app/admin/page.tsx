"use client";

import React from "react";
import { useUserContext } from "../_context/user";
import Error from "next/error";
import { Tab } from "@headlessui/react";
import Button from "../_components/Button";
import { ManageProduct } from "../_components/ManageProduct";
import { ChartData } from "../_components/ChartData";
import { NewProductForm } from "../_components/NewProductForm";

const Admin = () => {
  const { user } = useUserContext();

  return user?.role === 1 ? (
    <div className="flex flex-col items-center justify-center mt-5">
      <Tab.Group>
        <Tab.List className="space-x-2 space-y-2">
          <Tab>
            <Button>Thống kê sản phẩm</Button>
          </Tab>
          <Tab>
            <Button>Quản lý sản phẩm</Button>
          </Tab>
          <Tab>
            <Button>Tạo sản phẩm</Button>
          </Tab>
        </Tab.List>
        <Tab.Panels className="my-10 focus:outline-none">
          <Tab.Panel>
            <ChartData />
          </Tab.Panel>
          <Tab.Panel className="focus:outline-none">
            <ManageProduct />
          </Tab.Panel>
          <Tab.Panel className="focus:outline-none">
            <NewProductForm />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  ) : (
    <Error statusCode={404} />
  );
};

export default Admin;
