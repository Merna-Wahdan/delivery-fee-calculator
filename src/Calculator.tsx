import React, { ReactElement, startTransition, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { calculateTotalFees } from "./CalculatorUtils";
// TODO
//1- check conditions
//2- write tests
//3- clean the code

//4- css
//5- check access..
//6- datepicker/click on a calendar-like
//7-check zero input


const Calculator = (): JSX.Element => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [delivaryDistance, setDelivaryDistance] = useState<number>(0);
  const [amountOfItems, setAmoutOfItems] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date()); 
  const [delivaryPrice, setDelivaryPrice] = useState<number>(0);
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const totalFees = calculateTotalFees(cartValue,
      delivaryDistance,
      amountOfItems,
      startDate)
      setDelivaryPrice(totalFees)
    
  };

  const clearForm = (): void => {
    setCartValue(0);
    setDelivaryDistance(0)
    setAmoutOfItems(0)
    setDelivaryPrice(0);
    setStartDate(new Date());
  };


  const handleOnBlur = (): void => {
    setCartValue(cartValue);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Cart Value
          <input
            type="number"
            value={cartValue}
            onChange={(e) => setCartValue(Number(e.target.value))}
            min="0"
            step="0.01"
            onBlur={handleOnBlur}
            data-test-id="cartValue"
          ></input>{" "}
          €
        </label>
        <br />

        <label>
          Delivary distance
          <input
            type="number"
            min="0"
            value={delivaryDistance}
            onChange={(e) => setDelivaryDistance(Number(e.target.value))}
            // onBlur={() => handleOnBlur("deliveryDistance")}
            data-test-id="delivaryDistance"
          ></input>{" "}
          m
        </label>
        <br />
        <label>
          Amount of items
          <input
            type="number"
            min="0"
            value={amountOfItems}
            onChange={(e) => setAmoutOfItems(Number(e.target.value))}
            // onBlur={() => handleOnBlur("amountOfItems")}
            data-test-id="amountOfItems"

          ></input>
        </label>
        <br />

        <label>
          Time
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={1}
            timeCaption="time"
            dateFormat="dd/MM/yyyy h:mm aa"
            data-test-id="time"
          />
        </label>
        <br />

        <button type="submit">
          Calculate Delivary Price
        </button>
        <button type="button" onClick={clearForm}>
          Reset
        </button>

        <h4 data-test-id="fee">Delivary Price: {delivaryPrice}</h4>
      </form>
    </>
  );
};

export default Calculator;
