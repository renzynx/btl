import React from "react";

type InputProps = {
  label: string;
  textarea?: boolean;
  defaultStyle?: boolean;
} & React.ComponentPropsWithoutRef<"input">;

const Input: React.FC<InputProps> = ({ defaultStyle = true, ...props }) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={props.id}>{props.label}</label>
      {props.textarea ? (
        // @ts-ignore
        <textarea
          {...props}
          className={`w-full rounded-lg border px-4 py-2 text-sm ${
            defaultStyle &&
            "border-neutral-800 bg-transparent placeholder:text-neutral-400 focus:ring-2 focus:ring-zinc-800"
          } ${props.className}`}
        />
      ) : (
        <input
          {...props}
          className={`w-full rounded-lg border px-4 py-2 text-sm ${
            defaultStyle &&
            "border-neutral-800 bg-transparent placeholder:text-neutral-400 focus:ring-2 focus:ring-zinc-800"
          } ${props.className}`}
        />
      )}
    </div>
  );
};

export default Input;
