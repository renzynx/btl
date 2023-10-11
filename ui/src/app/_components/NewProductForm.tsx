"use client";
import React from "react";
import { Dialog } from "@headlessui/react";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import { API_URL } from "../_libs/constant";

export const NewProductForm = () => {
  const [pName, setPName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPName(e.target.value);
  };
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };
  const handleDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const submit = async () => {
    const response = await axios.post(
      API_URL + "/Product",
      {
        productName: pName,
        price,
        category,
        image,
        description: desc,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data) {
      setSuccess(true);
    } else {
    }
  };

  const closeModal = () => {
    setSuccess(false);
  };

  return (
    <>
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 place-items-center lg:min-w-[60rem] w-full z-1">
        <Input label="Tên sản phẩm" onChange={handleName} />

        <Input
          label="Giá sản phẩm"
          type="number"
          onKeyDown={(event) => {
            if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
              event.preventDefault();
            }
          }}
          onChange={handlePrice}
        />

        <Input onChange={handleCategory} label="Danh mục sản phẩm" />

        <Input onChange={handleImage} label="Ảnh sản phẩm" />

        <Input onChange={handleDesc} label="Mô tả sản phẩm" textarea />

        <Button onClick={submit}>Tạo sản phẩm</Button>
      </div>

      <Dialog
        as="div"
        open={success}
        onClose={closeModal}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999]"
      >
        <Dialog.Panel className="z-[999] w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Thành công
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Sản phẩm đã được thêm vào cơ sở dữ liệu.
            </p>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={closeModal}
            >
              Ok!
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
