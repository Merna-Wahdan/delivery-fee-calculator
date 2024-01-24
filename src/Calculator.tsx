import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { calculateTotalFees } from "./CalculatorUtils";
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
// TODO
//1- check conditions
//2- write tests
//3- clean the code

//form validation, require all
//4- css
//5- check access..
//6- datepicker/click on a calendar-like
//7-check zero input
//8- read me


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
    <Box maxW="480px" maxHeight="480px" m="20px">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel> Cart Value </FormLabel>
          <Input
            type="number"
            value={cartValue}
            onChange={(e) => setCartValue(Number(e.target.value))}
            min="0"
            step="0.01"
            onBlur={handleOnBlur}
            data-test-id="cartValue"
            /> {" "}€
        </FormControl>
        <FormControl isRequired>
          <FormLabel> Delivary distance </FormLabel>
          <Input
            type="number"
            min="0"
            value={delivaryDistance}
            onChange={(e) => setDelivaryDistance(Number(e.target.value))}
            // onBlur={() => handleOnBlur("deliveryDistance")}
            data-test-id="delivaryDistance"
            ></Input>{" "}m
        </FormControl>
        <FormControl>
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
        </FormControl>
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
    </Box>
  );
};

export default Calculator;
