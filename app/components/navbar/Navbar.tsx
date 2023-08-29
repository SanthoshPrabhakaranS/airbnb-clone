"use client";

import React, { useCallback, useMemo, useState } from "react";
import Container from "../Container";
import Image from "next/image";
import LogoImg from "../../../public/images/logo.png";
import Search from "./Search";
import UserMenu from "./UserMenu";
import RegisterModal from "../modals/RegisterModal";
import LoginModal from "../modals/LoginModal";
import { Toaster, toast } from "react-hot-toast";
import { SafeUser } from "@/app/types";
import Categories, { categoryList } from "./Categories";
import { useRouter, useSearchParams } from "next/navigation";
import RentModal from "../modals/RentModal";
import Heading from "../inputs/Heading";
import CategoryInput from "../inputs/CategoryInput";
import Button from "../inputs/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountriesInput, { CountrySelectValue } from "../inputs/CountriesInput";
import dynamic from "next/dynamic";
import CounterInput from "../inputs/CounterInput";
import ImageUploadInput from "../inputs/ImageUploadInput";
import { useMutation } from "react-query";
import axios from "axios";
import { Range } from "react-date-range";
import qs from "query-string";
import { formatISO } from "date-fns";
import SearchModal from "../modals/SearchModal";
import SearchButton from "../inputs/SearchButton";
import Calendar from "../inputs/Calendar";

interface SessionProps {
  currentUser: SafeUser | null;
}

//enum for rent modal steps
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

//enum for Search Modal steps
enum SEARCH_STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const Navbar: React.FC<SessionProps> = ({ currentUser }) => {
  const router = useRouter();
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRentModal, setOpenRentModal] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  //For Searching
  const [searchStep, setSearchStep] = useState(SEARCH_STEPS.LOCATION);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const params = useSearchParams();
  const [searchLocation, setSearchLocation] = useState<CountrySelectValue>();
  const [searchGuestCount, setSearchGuestCount] = useState(1);
  const [searchRoomCount, setSearchRoomCount] = useState(1);
  const [searchBathroomCount, setSearchBathroomCount] = useState(1);
  const [searchDateRange, setSearchDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  //Listing form
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      price: 1,
      location: null,
      category: "",
      imageSrc: "",
      roomCount: 1,
      guestCount: 1,
      bathroomCount: 1,
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const title = watch("title");
  const description = watch("description");
  const price = watch("price");

  //To render Map
  const Map = useMemo(
    () =>
      dynamic(() => import("../inputs/Map"), {
        ssr: false,
      }),
    [location]
  );

  const customSetValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  //Next step
  const _nextStep = () => {
    if (step === STEPS.PRICE) return;
    setStep((prev) => prev + 1);
  };

  //Previous step
  const _previousStep = () => {
    setStep((prev) => prev - 1);
  };

  //Create Listing
  const { mutate, isLoading } = useMutation({
    mutationKey: ["createListing"],
    mutationFn: async (data: any) => {
      await axios.post("/api/listings", data);
    },
    onSuccess: () => {
      toast.success("Listing Created!");
      reset();
      router.refresh();
      setStep(STEPS.CATEGORY);
      setOpenRentModal(false);
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return _nextStep();
    mutate(data);
  };

  //Step 1
  let bodyContent = (
    <div className="h-full flex flex-col gap-2">
      <Heading
        title="Which of these best describes your place?"
        desc="Pick a category"
      />
      <div className="overflow-y-auto h-full max-h-[60vh] grid grid-cols-1 md:grid-cols-2 gap-2">
        {categoryList.map((item, Idx) => {
          return (
            <CategoryInput
              key={Idx}
              label={item.label}
              icon={item.icon}
              onClick={(category) => customSetValue("category", category)}
              selected={category === item.label}
            />
          );
        })}
      </div>
      <Button
        disabled={category === ""}
        nextStep={handleSubmit(onSubmit)}
        previousStep={_previousStep}
        step={step}
      />
    </div>
  );

  //step 2
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="h-full flex flex-col gap-2">
        <Heading
          title="Where is your place located?"
          desc="Help guests find you"
        />
        <div className="flex flex-col gap-2">
          <CountriesInput
            value={location}
            onChange={(location) => customSetValue("location", location)}
          />
          <Map center={location?.latlng} />
        </div>
        <Button
          disabled={location === null}
          nextStep={handleSubmit(onSubmit)}
          previousStep={_previousStep}
          step={step}
        />
      </div>
    );
  }

  //step 3
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="h-full flex flex-col gap-2">
        <Heading
          title="Share some basics about your place"
          desc="What amenities do you have?"
        />
        <div className="flex flex-col gap-8">
          <CounterInput
            heading="Guests"
            subtitle="How many guests do you allow?"
            value={guestCount}
            onChange={(guestCount) => customSetValue("guestCount", guestCount)}
          />
          <CounterInput
            heading="Rooms"
            subtitle="How many rooms do you have?"
            value={roomCount}
            onChange={(roomCount) => customSetValue("roomCount", roomCount)}
          />
          <CounterInput
            heading="Bathrooms"
            subtitle="How many bathrooms do you have?"
            value={bathroomCount}
            onChange={(bathroomCount) =>
              customSetValue("bathroomCount", bathroomCount)
            }
          />
        </div>
        <Button
          disabled={
            guestCount === "" || roomCount === "" || bathroomCount === ""
          }
          nextStep={handleSubmit(onSubmit)}
          previousStep={_previousStep}
          step={step}
        />
      </div>
    );
  }

  //step 4
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="h-full flex flex-col gap-2">
        <Heading
          title="Add a photo of your place"
          desc="Show your guests what your place looks like!"
        />
        <ImageUploadInput
          value={imageSrc}
          onChange={(imageSrc) => customSetValue("imageSrc", imageSrc)}
        />
        <Button
          disabled={imageSrc === ""}
          nextStep={handleSubmit(onSubmit)}
          previousStep={_previousStep}
          step={step}
        />
      </div>
    );
  }

  //step 5
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="h-full flex flex-col gap-2">
        <Heading
          title="How would you describe your place?"
          desc="Short and sweet works best!"
        />
        <input
          value={title}
          onChange={(e) => customSetValue("title", e.target.value)}
          className={`p-3 focus:outline-none border-2 w-full rounded-md`}
          type="text"
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => customSetValue("description", e.target.value)}
          className={`p-3 focus:outline-none border-2 w-full rounded-md`}
          placeholder="Description"
        />
        <Button
          disabled={title === "" || description === ""}
          nextStep={handleSubmit(onSubmit)}
          previousStep={_previousStep}
          step={step}
        />
      </div>
    );
  }

  //step 6
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="h-full flex flex-col gap-2">
        <Heading
          title="Now, set your price"
          desc="How much do you charge per night?"
        />
        <div className="flex flex-row items-center border-2 px-2">
          <span className="text-neutral-400">$</span>
          <input
            value={price}
            onChange={(e) => customSetValue("price", e.target.value)}
            className={`p-3 focus:outline-none w-full rounded-md`}
            type="number"
            placeholder="Price"
          />
        </div>
        <Button
          disabled={price === ""}
          nextStep={handleSubmit(onSubmit)}
          previousStep={_previousStep}
          step={step}
        />
      </div>
    );
  }

  //================================================

  //For Search Modal
  const onBack = () => {
    setSearchStep((value) => value - 1);
  };

  const onNext = () => {
    setSearchStep((value) => value + 1);
  };

  const onSubmitSearch = useCallback(async () => {
    if (searchStep !== SEARCH_STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: searchLocation?.value,
      searchGuestCount,
      searchRoomCount,
      searchBathroomCount,
    };

    if (searchDateRange.startDate) {
      updatedQuery.startDate = formatISO(searchDateRange.startDate);
    }

    if (searchDateRange.endDate) {
      updatedQuery.endDate = formatISO(searchDateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    setSearchStep(SEARCH_STEPS.LOCATION);
    setOpenSearchModal(false);
    router.push(url);
  }, [
    searchStep,
    openSearchModal,
    searchLocation,
    searchGuestCount,
    searchBathroomCount,
    searchRoomCount,
    searchDateRange,
    params,
    onNext,
  ]);

  // Step 1
  let searchBodyContent = (
    <div className="h-full flex flex-col gap-3">
      <Heading
        title="Where do you wanna go?"
        desc="Find the perfect location!"
      />
      <div className="flex flex-col gap-3">
        <CountriesInput
          value={searchLocation}
          onChange={(value) => setSearchLocation(value as CountrySelectValue)}
        />
        <Map center={searchLocation?.latlng} />
      </div>
      <SearchButton
        disabled={searchLocation?.value === ""}
        nextStep={onSubmitSearch}
        previousStep={onBack}
        step={searchStep}
      />
    </div>
  );

  if (searchStep === SEARCH_STEPS.DATE) {
    searchBodyContent = (
      <div className="h-full flex flex-col gap-3">
        <Heading
          title="When do you plan to go?"
          desc="Make sure everyone is free!"
        />
        <div className="">
          <Calendar
            value={searchDateRange}
            onChange={(value) => setSearchDateRange(value.selection)}
          />
        </div>
        <SearchButton
          disabled={(searchDateRange as any) === ""}
          nextStep={onSubmitSearch}
          previousStep={onBack}
          step={searchStep}
        />
      </div>
    );
  }

  if (searchStep === SEARCH_STEPS.INFO) {
    searchBodyContent = (
      <div className="h-full flex flex-col gap-3">
        <Heading title="More information" desc="Find your perfect place!" />
        <div className="flex flex-col gap-3">
          <CounterInput
            heading="Guests"
            subtitle="How many guests are coming?"
            value={searchGuestCount}
            onChange={(value) => setSearchGuestCount(value)}
          />
          <CounterInput
            heading="Rooms"
            subtitle="How many rooms do you need?"
            value={searchRoomCount}
            onChange={(value) => setSearchRoomCount(value)}
          />
          <CounterInput
            heading="Bathrooms"
            subtitle="How many bathrooms do you need?"
            value={searchBathroomCount}
            onChange={(value) => setSearchBathroomCount(value)}
          />
        </div>
        <SearchButton
          disabled={(searchDateRange as any) === ""}
          nextStep={onSubmitSearch}
          previousStep={onBack}
          step={searchStep}
        />
      </div>
    );
  }

  return (
    <>
      <div className=" fixed w-full bg-white z-20">
        <Toaster />
        {openRegisterModal ? (
          <RegisterModal
            setOpenRegisterModal={setOpenRegisterModal}
            setOpenLoginModal={setOpenLoginModal}
          />
        ) : null}
        {openLoginModal ? (
          <LoginModal
            setOpenLoginModal={setOpenLoginModal}
            setOpenRegisterModal={setOpenRegisterModal}
          />
        ) : null}
        {openRentModal ? (
          <RentModal setOpnRentModal={setOpenRentModal} body={bodyContent} />
        ) : null}
        {openSearchModal ? (
          <SearchModal
            setOpenSearchModal={setOpenSearchModal}
            body={searchBodyContent}
          />
        ) : null}
        <div className="shadow-sm border-b-[1px] py-3">
          <Container>
            <div className="flex flow-row items-center justify-between gap-2">
              <Image
                onClick={() => router.push("/")}
                className="h-6 w-20 cursor-pointer"
                src={LogoImg}
                alt="logo"
              />
              <Search setOpenSearchModal={setOpenSearchModal} />
              <UserMenu
                currentUser={currentUser}
                openRegisterModal={openRegisterModal}
                setOpenRegisterModal={setOpenRegisterModal}
                setOpenLoginModal={setOpenLoginModal}
                setOpnRentModal={setOpenRentModal}
              />
            </div>
          </Container>
        </div>
        <Categories />
      </div>
    </>
  );
};

export default Navbar;
