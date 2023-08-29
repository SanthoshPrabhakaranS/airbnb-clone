import React from "react";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

//Schema fo validation
const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

//interface
interface ModalProps {
  setOpenLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal: React.FC<ModalProps> = ({
  setOpenLoginModal,
  setOpenRegisterModal,
}) => {
  const router = useRouter();

  //Yup form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  //Login User
  const onSubmit = (data: FormData, e: any) => {
    e.preventDefault();

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      console.log(callback, "callback");
      if (callback?.error == "Invalid credentials!") {
        toast.error("Invalid Credentials!");
      } else {
        toast.success("Logged In!");
        router.refresh();
        return setOpenLoginModal(false);
      }
    });
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative my-6 mx-auto w-full max-w-[700px]">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-bold">Login</h3>
              <button
                className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setOpenLoginModal(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none hover:scale-105 transition-all">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto flex flex-col gap-1">
              <h1 className="font-bold text-xl">Welcome to Airbnb</h1>
              <p className="text-gray-500">Login to your account!</p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 mt-1"
              >
                <input
                  {...register("email")}
                  className={`p-3 focus:outline-none ${
                    errors?.email ? "border-red-500" : null
                  } border-2 w-full rounded-md`}
                  type="text"
                  placeholder="Email"
                />
                <p className="-mt-2 text-red-500">
                  {errors?.email ? errors?.email.message : null}
                </p>
                <input
                  {...register("password")}
                  className={`p-3 focus:outline-none ${
                    errors?.password ? "border-red-500" : null
                  } border-2 w-full rounded-md`}
                  type="password"
                  placeholder="Password"
                />
                <p className="-mt-2 text-red-500">
                  {errors?.password ? errors?.password.message : null}
                </p>
                <button
                  type="submit"
                  className="p-3 bg-rose-500 text-white font-bold rounded-md hover:bg-rose-500/80 transition"
                >
                  Continue
                </button>
              </form>
              <Footer />
              <p className="text-center mt-2 text-gray-500 cursor-pointer">
                First time using Airbnb ?{" "}
                <span
                  onClick={() => {
                    setOpenRegisterModal(true);
                    setOpenLoginModal(false);
                  }}
                  className="hover:underline"
                >
                  Create an account
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default LoginModal;
