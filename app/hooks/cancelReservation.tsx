"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

const cancelReservation = () => {
  const { mutate } = useMutation({
    mutationKey: ["cancelReservation"],
    mutationFn: async (id) => {
      await axios.delete(`/api/reservations/${id}`);
    },
    onSuccess: () => {
      toast.success("Reservation cancelled!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
  return mutate;
};

export default cancelReservation;
