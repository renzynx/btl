import axios from "axios";
import { Product } from "./_libs/interfaces";
import Card from "./_components/Card";

export default async function Home() {
  const res = await axios.get<Product[]>("http://localhost:5295/api/Product");

  const products = res.data;

  return (
    <main className="p-2">
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
        <div className="md:col-span-4 md:row-span-2">
          <Card product={products[0]} />
        </div>
        <div className="md:col-span-2 md:row-span-1">
          <Card product={products[1]} />
        </div>
        <div className="md:col-span-2 md:row-span-1">
          <Card product={products[2]} />
        </div>
      </section>

      <div className="w-full overflow-x-auto pb-6 pt-1">
        <ul className="flex animate-carousel gap-4">
          {products.slice(0, 10).map((product) => (
            <li
              className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
              key={product.id}
            >
              <Card product={product} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
