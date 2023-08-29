"use client";

import Calendar from "@/app/components/inputs/Calendar";
import React from "react";
import { Range } from "react-date-range";

interface ReservationProps {
  price: number | undefined;
  totalPrice: number | undefined;
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ReservationProps> = ({
  dateRange,
  disabled,
  disabledDates,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
}) => {
  return (
    <div className="border-[1px] rounded-lg p-3">
      <div className="flex flex-row items-baseline gap-1 font-bold pb-1 border-b">
        <h1 className=" text-lg">$ {price}</h1>
        <span className="text-sm text-neutral-500">night</span>
      </div>
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <button
        disabled={disabled}
        onClick={onSubmit}
        className={`p-2 w-full bg-rose-500 text-white rounded-md font-bold transition hover:bg-rose-500/70 ${
          disabled ? "cursor-not-allowed" : null
        }}`}
      >
        Reserve
      </button>
      <div className="flex flex-row justify-between items-center font-bold mt-2">
        <h1>Total</h1>
        <p>$ {totalPrice}</p>
      </div>
    </div>
  );
};

export default ListingReservation;
