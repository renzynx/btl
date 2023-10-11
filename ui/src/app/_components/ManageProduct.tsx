"use client";
import React from "react";
import { Dialog } from "@headlessui/react";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import { API_URL } from "../_libs/constant";
import { Product } from "../_libs/interfaces";
import Image from "next/image";
import usePagination from "../_libs/usePagination";
import {
  IconAlertCircle,
  IconChevronLeft,
  IconChevronRight,
  IconEdit,
  IconTrash,
  IconX,
} from "@tabler/icons-react";

export const ManageProduct = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [search, setSearch] = React.useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [pName, setPName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState("");
  const [error, setError] = React.useState("");

  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );
  const [desc, setDesc] = React.useState(selectedProduct?.description);
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 10,
    count: products.length,
  });

  React.useEffect(() => {
    axios
      .get(API_URL + "/Product")
      .then((res) => res.data)
      .then(setProducts);
  }, []);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const update = () => {
    axios
      .put(
        API_URL + "/Product/" + selectedProduct?.id,
        {
          productName: pName || selectedProduct?.productName,
          price: price || selectedProduct?.price,
          category: category || selectedProduct?.category,
          image: image || selectedProduct?.image,
          description: desc || selectedProduct?.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setProducts((prev) => {
          const index = prev.findIndex(
            (product) => product.id === selectedProduct?.id
          );
          prev[index] = {
            ...prev[index],
            productName: pName || selectedProduct?.productName!,
            price: Number(price) || selectedProduct?.price || 0,
            category: category || selectedProduct?.category!,
            image: image || selectedProduct?.image!,
            description: desc || selectedProduct?.description!,
          };
          return prev;
        });
        setOpenEdit(false);
      })
      .catch(() => {
        setError("Đã có lỗi xảy ra, xin vui lòng thử lại sau 1 ít phút.");
      });
  };

  const deleteProduct = async () => {
    await axios
      .delete(API_URL + "/Product/" + selectedProduct?.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setProducts(
          products.filter((product) => product.id !== selectedProduct?.id)
        );
        setOpenDelete(false);
      });
  };

  return (
    <>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <Dialog.Panel className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-800 text-white p-5">
          <Dialog.Title as="h3" className="text-lg">
            Xóa sản phẩm
          </Dialog.Title>

          <p className="my-2">Bạn có chắc muốn xóa sản phẩm này không?</p>

          <div className="flex gap-2 justify-end mt-4">
            <Button
              defaultStyle={false}
              className="bg-rose-400 hover:bg-rose-500"
              onClick={deleteProduct}
            >
              Xác nhận
            </Button>
            <Button
              defaultStyle={false}
              className="bg-gray-400 hover:bg-gray-500"
              onClick={() => setOpenDelete(false)}
            >
              Hủy
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <Dialog.Panel className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-900 text-white p-5">
          <Dialog.Title as="h3" className="text-lg font-bold">
            Chỉnh sửa
          </Dialog.Title>

          <div className="mt-2 gap-6 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 place-items-center lg:min-w-[60rem] w-full z-1">
            <Input
              defaultValue={selectedProduct?.productName}
              label="Tên sản phẩm"
              onChange={handleName}
            />

            <Input
              defaultValue={selectedProduct?.price}
              label="Giá sản phẩm"
              type="number"
              onKeyDown={(event) => {
                if (
                  !/[0-9]/.test(event.key) &&
                  event.key !== "Backspace" &&
                  event.key !== "Tab"
                ) {
                  event.preventDefault();
                }
              }}
              onChange={handlePrice}
            />

            <Input
              defaultValue={selectedProduct?.category}
              onChange={handleCategory}
              label="Danh mục sản phẩm"
            />

            <Input
              defaultValue={selectedProduct?.image}
              onChange={handleImage}
              label="Ảnh sản phẩm"
            />

            <Input
              defaultValue={selectedProduct?.description}
              onChange={handleDesc}
              label="Mô tả sản phẩm"
              textarea
            />
          </div>

          {error && (
            <div className="bg-red-500 max-w-md mx-auto p-5 my-5">
              <div className="flex items-center justify-between">
                <div className="flex gap-2 mb-2 items-center">
                  <IconAlertCircle />
                  <h4 className="text-lg">Lỗi</h4>
                </div>

                <button
                  onClick={() => setError("")}
                  className="cursor-pointer rounded-full p-2 focus:outline-none text-black"
                >
                  <IconX size={25} />
                </button>
              </div>
              <p>{error}</p>
            </div>
          )}

          <div className="flex justify-end mt-2 gap-2">
            <Button
              onClick={update}
              defaultStyle={false}
              className="bg-purple-400 hover:bg-purple-500 text-black"
            >
              Cập nhật
            </Button>
            <Button
              defaultStyle={false}
              className="bg-rose-400 hover:bg-rose-500 text-black"
              onClick={() => setOpenEdit(false)}
            >
              Đóng
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      <div className="p-5 ring-1 rounded-md shadow-slate-600">
        <div className="my-2">
          <Input label="Tìm kiếm" onChange={handleSearch} />
        </div>
        <div className="flex flex-col overflow-x-auto min-w-[90vw] p-2">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Tên sản phẩm
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Giá sản phẩm (VND)
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Danh mục sản phẩm
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Mô tả sản phẩm
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Ảnh sản phẩm
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter((product) =>
                        product.productName.toLowerCase().includes(search)
                      )
                      .slice(firstContentIndex, lastContentIndex)
                      .map((product, i) => (
                        <tr
                          key={i}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {firstContentIndex + i + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {product.productName.length > 50 ? (
                              <p className="text-sm">
                                {product.productName.slice(0, 50) + "..."}
                              </p>
                            ) : (
                              product.productName
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {product.price.toLocaleString("en-US")}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {product.category === "phone"
                              ? "Điện thoại"
                              : product.category === "laptop"
                              ? "Laptop"
                              : "Máy tính bảng"}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {product.description.slice(0, 10) + "..."}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Image
                              src={product.image}
                              alt={product.productName}
                              width={50}
                              height={50}
                            />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="space-x-2">
                              <Button
                                defaultStyle={false}
                                className="hover:bg-purple-400 bg-white text-black"
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setOpenEdit(true);
                                }}
                              >
                                <IconEdit />
                              </Button>
                              <Button
                                defaultStyle={false}
                                className="bg-rose-400 hover:bg-rose-500 text-black"
                                onClick={() => setOpenDelete(true)}
                              >
                                <IconTrash />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-2">
          <p className="my-2">
            Trang {page} / {totalPages}
          </p>

          <div className="flex gap-1">
            <Button
              onClick={prevPage}
              disabled={page === 1}
              className="h-10 w-10 flex justify-center items-center disabled:bg-gray-500"
            >
              <IconChevronLeft />
            </Button>

            {/* @ts-ignore */}
            {[...Array(totalPages).keys()].map((el) => (
              <Button
                onClick={() => setPage(el + 1)}
                className="h-10 w-10 flex justify-center items-center"
                key={el}
              >
                {el + 1}
              </Button>
            ))}
            <Button
              className="h-10 w-10 flex justify-center items-center disabled:bg-gray-500"
              onClick={nextPage}
              disabled={page === totalPages}
            >
              <IconChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
