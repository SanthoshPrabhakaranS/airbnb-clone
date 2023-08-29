import React from "react";

interface ButtonProps {
  step: number;
  nextStep: () => void;
  previousStep: () => void;
  disabled: boolean;
}

const SearchButton: React.FC<ButtonProps> = ({
  step,
  nextStep,
  previousStep,
  disabled,
}) => {
  return (
    <div className="w-full flex flex-row gap-2 mt-1">
      {step !== 0 ? (
        <button
          onClick={previousStep}
          className="p-3  w-full font-bold border-neutral-600 border rounded-md mt-1"
        >
          Back
        </button>
      ) : null}
      <button
        disabled={disabled}
        onClick={nextStep}
        className={`p-3 ${
          disabled ? "cursor-not-allowed" : null
        } w-full font-bold bg-rose-500 text-white rounded-md mt-1 hover:bg-rose-600/70`}
      >
        {step === 2 ? "Create" : "Next"}
      </button>
    </div>
  );
};

export default SearchButton;
