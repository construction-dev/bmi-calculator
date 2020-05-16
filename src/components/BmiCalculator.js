import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";

const BmiCalculator = (props) => {
  //can destructor the props like below so that in the rest of the method/function the props. does not need to be used, but the props. does make it clearer so not destructored here.
  //const { getBmiValue } = props;

  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [unit, setUnit] = useState("Metric");

  //A way of setting defaults, but setting the default in the useState seems to be be better/
  // useEffect(() => {
  //   if (unit === "") {
  //     setUnit("Metric");
  //     setHeightUnit("cm");
  //     setWeightUnit("kg");
  //   }
  //   console.log(unit);
  // }, [unit]);

  const [count, setCount] = useState({
    heightCount: "0",
    inchesCount: "0",
    weightCount: "0",
  });

  //Below is object destructuring so that weightCount etc can be used without
  //the count. in front, although I don't see the problem with using the count.
  //in front as it makes it clear.
  const { heightCount, inchesCount, weightCount } = count;

  useEffect(() => {
    metricBMI(heightCount, weightCount);
    imperialBMI(heightCount, weightCount, inchesCount);
    // eslint-disable-next-line
  }, [heightCount, weightCount, inchesCount]);

  const onChangeInput = (event) => {
    //destructure the name and value from the target object within the event object
    const { name, value } = event.target;
    setCount((prevState) => ({
      //The prevstate is used to fix the controlled to uncontrolled error, by
      //passing the previous default values before setting the new values
      ...prevState,
      
      //gets value from the input with the name property set in its name.  So if
      //the inputs names is inchesCount then this would be inchesCount: value as
      //the value is destructured from event.target.  could also write
      //event.target.name without destructuring.
      [name]: value,
    }));
  };

  const onSelectTag = (event) => {
    setUnit(event.target.value);
    if (event.target.value === "Metric") {
      setHeightUnit("cm");
      setWeightUnit("kg");
    } else {
      setHeightUnit("ft");
      setWeightUnit("lbs");
    }
  };

  const metricBMI = (height, weight) => {
    if (height > 0 && weight > 0) {
      const bmi = weight / Math.pow(height / 100, 2);
      console.log(bmi);
      props.getBmiValue(Math.round(bmi));
    }
  };

  const imperialBMI = (height, weight, inches) => {
    if (height > 0 && weight > 0 && inches > 0) {
      //converting height in ft to inches value
      const bmi = (weight / Math.pow(height * 12 + parseInt(inches), 2)) * 703;
      props.getBmiValue(Math.round(bmi));
    }
  };

  const resetData = (event) => {
    event.preventDefault();
    props.getBmiValue(0);
    setUnit("Metric");
    setCount({
      heightCount: "0",
      inchesCount: "0",
      weightCount: "0",
    });
    setHeightUnit("cm");
    setWeightUnit("kg");
  };

  return (
    <>
      <div className="bmi-inputs">
        <div className="inputs-fields">
          <div>
            <span className="label-unit">Unit</span>
            <div className="unit">
              <select
                name="unit"
                id=""
                value={unit}
                className="form-control form-control-sm"
                onChange={onSelectTag}
              >
                <option value="Metric">Metric</option>
                <option value="Imperial">Imperial</option>
              </select>
            </div>
          </div>
          <FormInput
            type="text"
            name="heightCount"
            title={`Height (${heightUnit})`}
            value={heightCount}
            onChange={onChangeInput}
          />
          {unit === "Imperial" ? (
            <FormInput
              type="text"
              name="inchesCount"
              title={`Height (inch)`}
              value={inchesCount}
              onChange={onChangeInput}
            />
          ) : (
            ""
          )}
          <FormInput
            type="text"
            name="weightCount"
            title={`Weight (${weightUnit})`}
            value={weightCount}
            onChange={onChangeInput}
          />
        </div>
        <button className="button" type="submit" onClick={resetData}>
          Reset
        </button>
      </div>
    </>
  );
};

export default BmiCalculator;
