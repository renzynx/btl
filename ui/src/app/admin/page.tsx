"use client";

import React from "react";
import { useUserContext } from "../_context/user";
import Error from "next/error";
import { Tab } from "@headlessui/react";
import Button from "../_components/Button";
import axios from "axios";
import { API_URL } from "../_libs/constant";
import { Product } from "../_libs/interfaces";
import { ManageProduct } from "../_components/ManageProduct";
import { ChartData } from "../_components/ChartData";
import { NewProductForm } from "../_components/NewProductForm";

const Admin = () => {
  const { user } = useUserContext();
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    axios
      .get(API_URL + "/Product")
      .then((res) => res.data)
      .then(setProducts);
  }, []);

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
        <Tab.Panels className="my-10">
          <Tab.Panel>
            <ChartData products={products} />
          </Tab.Panel>
          <Tab.Panel>
            <ManageProduct />
          </Tab.Panel>
          <Tab.Panel>
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
