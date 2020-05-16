import React, { useState } from "react";
import BmiCalculator from "./BmiCalculator";

const BMI = () => {
  const [bmiValue, setBmiValue] = useState(0);

  //get BMI category text
  const getBmiClass = (bmi) => {
    if (bmi >= 1 && bmi <= 18.5) return "Underweight";
    if (bmi > 18.5 && bmi <= 24.9) return "Normal Weight";
    if (bmi > 24.9 && bmi <= 29.9) return "Overweight";
    if (bmi > 29.9) return "Obese";
  };

  //set BMI category text
  const bmiCategory = getBmiClass(bmiValue);
  // console.log(bmiCategory);

  //Changing BMI Category Color based on category text, but converting text to match class name
  //Define var and set to empty string to allow check is it exists or has been blanked out.
  let bmiClass = "";
  // && bmiCategory check is it is NOT empty "" or undefined, because if it was
  // either of these then the value would be false, but as soon as the var holds
  // a value it would be true
  if (bmiValue > 1 && bmiCategory) {
    //split the string in BmI Category with space.  Will go into array, then
    //grab first index item at index 0 and convert to lowercase.  This will no
    //match te classname in the App.css
    bmiClass = bmiCategory.split(" ")[0].toLowerCase();
    console.log(bmiClass);
  }

  const bmiBackgroundColor = (bmi) => {
    if (bmi >= 1 && bmi <= 18.5) return "#FED88B";
    if (bmi > 18.5 && bmi <= 24.9) return "#80ff80";
    if (bmi > 24.9 && bmi <= 29.9) return "#FF7F50";
    if (bmi > 29.9) return "#FF5411";
  };

  return (
    <>
      <div
        className="calculator"
        style={{ backgroundColor: bmiBackgroundColor(bmiValue) }}
      >
        <h3>Body Mass Index Calculator</h3>
        <div className="bmi-result-container">
          <div className="bmi-result">
            <div className="bmi-result-number">
              <h4 style={{ color: bmiBackgroundColor(bmiValue) }}>
                Body Mass Index (BMI) = {bmiValue}{" "}
              </h4>
            </div>
            {/* below the {} converts the classname to code, which allows use of the back tics `` (template literals)
             and then with the $ allows insertion of dynamic classname */}
            <h5 className={`bmi-category ${bmiClass}`}>{bmiCategory}</h5>
          </div>
        </div>
        <BmiCalculator getBmiValue={setBmiValue} />
      </div>
    </>
  );
};

export default BMI;
