"use client";

import { IconX } from "@tabler/icons-react";
import { FC, ReactNode, useState } from "react";

type Direction = "left" | "right";

const Drawer: FC<{
  controller: ReactNode;
  children: ReactNode;
  dir?: Direction;
}> = ({ controller, children, dir = "left" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);

  return (
    <div className="flex flex-col">
      <a onClick={toggleDrawer}>{controller}</a>
      <div
        className={`z-50 absolute top-0 ${dir}-0 ${
          isOpen ? "sm:w-72 w-full" : "w-0"
        }  h-screen bg-white dark:bg-neutral-900 shadow-lg transition-all duration-500 ease-out`}
      >
        {isOpen && (
          <>
            <div
              className={`flex ${
                dir === "left" ? "justify-end" : "justify-start"
              } items-center p-5`}
            >
              <a
                className="p-2 ring-1 ring-zinc-700 shadow-sm cursor-pointer rounded-md"
                onClick={closeDrawer}
              >
                <IconX />
              </a>
            </div>
            <div className="px-5 py-2">{children}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Drawer;
