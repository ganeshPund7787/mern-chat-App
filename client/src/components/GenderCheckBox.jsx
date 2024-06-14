import React from "react";

const GenderCheckBox = ({ handleCheckBoxCheck, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text text-cyan-500 ">Male</span>
          <input
            type="checkbox"
            className="checkbox checkbox-secondary"
            checked={selectedGender === "male"}
            onChange={() => handleCheckBoxCheck("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text text-cyan-500 ">Female</span>
          <input
            type="checkbox"
            className="checkbox checkbox-success"
            checked={selectedGender === "female"}
            onChange={() => handleCheckBoxCheck("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
