import { FC } from "react";
import Image from "next/image";
import { Product } from "../_libs/interfaces";

const Card: FC<{ product: Product }> = ({ product }) => {
  return (
    <a className="relative block aspect-square h-full w-full cursor-pointer">
      <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
        <Image
          className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
          src={product?.image}
          alt={product?.productName}
          width={300}
          height={300}
          sizes="(min-width: 768px) 66vw, 100vw"
        />
      </div>
      <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label lg:px-20 ">
        <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
          <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
            {product?.productName}
          </h3>
          <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
            {product?.price.toLocaleString()}
            <span className="ml-1 inline @[275px]/label:inline">VND</span>
          </p>
        </div>
      </div>
    </a>
  );
};

export default Card;
