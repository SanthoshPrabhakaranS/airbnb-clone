"use client";

import React from "react";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";

interface CounterInputProps {
  heading: string;
  subtitle: string;
  onChange: (value: number) => void;
  value: number;
}

const CounterInput: React.FC<CounterInputProps> = ({
  heading,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = () => {
    onChange(value + 1);
  };

  const onReduce = () => {
    if (value === 1) return;
    onChange(value - 1);
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <div>
        <h1 className="font-bold">{heading}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <div
          onClick={onReduce}
          className="h-8 w-8 flex justify-center items-center border border-neutral-300 rounded-full cursor-pointer"
        >
          <BiMinus />
        </div>
        <div>{value}</div>
        <div
          onClick={onAdd}
          className="h-8 w-8 flex justify-center items-center border border-neutral-300 rounded-full cursor-pointer"
        >
          <BiPlus />
        </div>
      </div>
    </div>
  );
};

export default CounterInput;
