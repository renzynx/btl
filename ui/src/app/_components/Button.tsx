import { ButtonHTMLAttributes, ComponentPropsWithoutRef, FC } from "react";

type ButtonProps = {
  defaultStyle?: boolean;
} & ComponentPropsWithoutRef<"button">;

const Button: FC<ButtonProps> = ({ defaultStyle = true, ...props }) => {
  return (
    <button
      {...props}
      className={`${props.className} px-3 py-2 rounded-md ${
        defaultStyle &&
        "bg-white text-black hover:bg-white/95 hover:text-black/95"
      } shadow-lg ease-in-out`}
    >
      {props.children}
    </button>
  );
};

export default Button;
