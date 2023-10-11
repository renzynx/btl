"use client";
import React from "react";
import { Product } from "../_libs/interfaces";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { API_URL } from "../_libs/constant";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartData = () => {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    axios
      .get(API_URL + "/Product")
      .then((res) => res.data)
      .then(setProducts);
  }, []);

  const data = {
    labels: ["Điện thoại", "Laptop", "Máy tính bảng"],
    datasets: [
      {
        label: "Số lượng sản phẩm",
        data: [
          products.filter((product) => product.category === "phone").length,
          products.filter((product) => product.category === "laptop").length,
          products.filter((product) => product.category === "tablet").length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};
