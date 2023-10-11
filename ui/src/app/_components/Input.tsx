import React from "react";

type InputProps = {
  label: string;
  textarea?: boolean;
} & React.ComponentPropsWithoutRef<"input">;

const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={props.id}>{props.label}</label>
      {props.textarea ? (
        // @ts-ignore
        <textarea
          {...props}
          className="w-full rounded-lg border  px-4 py-2 text-sm   dark:border-neutral-800 dark:bg-transparent  dark:placeholder:text-neutral-400 focus:ring-2 focus:ring-zinc-800"
        />
      ) : (
        <input
          {...props}
          className={`w-full rounded-lg border  px-4 py-2 text-sm   border-neutral-800 bg-transparent  placeholder:text-neutral-400 focus:ring-2 focus:ring-zinc-800 ${props.className}`}
        />
      )}
    </div>
  );
};

export default Input;
