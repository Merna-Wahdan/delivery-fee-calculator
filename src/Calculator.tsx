import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { calculateTotalFees } from "./CalculatorUtils";
import { Box, Button, FormControl, FormLabel, Text, Image, Heading, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Center, Flex, useToast } from "@chakra-ui/react";
import { CustomNumberInput } from "./component/NumberInput";
import { FeeDetails } from "./component/DelivaryFeeDetails";
// TODO
//1- check conditions
//2- write tests
//3- clean the code
//delivery price = 1 when reset
//form validation, require all
//4- css
//5- check access..
//6- datepicker/click on a calendar-like
//7-check zero input
//scroll up and down with mouse wheel is opposite 

//add . in the values
//correct delivery typo
//8- read me



const Calculator = (): JSX.Element => {
  const [cartValue, setCartValue] = useState<string>("");
  const [delivaryDistance, setDelivaryDistance] = useState<number>(0);
  const [amountOfItems, setAmoutOfItems] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date()); 
  const [delivaryPrice, setDelivaryPrice] = useState<number>(0);
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const price = calculateTotalFees(parseFloat(cartValue),
      delivaryDistance,
      amountOfItems,
      startDate)
      setDelivaryPrice(price)
    
  };

  const clearForm = (): void => {
    setCartValue("");
    setDelivaryDistance(0)
    setAmoutOfItems(0)
    setDelivaryPrice(0);
    setStartDate(new Date());
  };

  // const handleOnBlur = (): void => {
  //   const newValue = cartValue.toString() !== "" ? parseFloat(cartValue.toString()) : cartValue
  //   setCartValue(newValue || 0)
  // };

  // const toast = useToast()
  // const showToast = (): void => {
  //   toast({
  //     title: 'How delivery fee is calculated:',
  //     description: "We've created your account for you.",
  //     // status: 'success',
  //     duration: 9000,
  //     isClosable: true,
  //   })
  // }

  // const handleChangeCartValue = (valueAsString: string) => {
  //   setCartValue(Number(valueAsString));
  // };
  

  const buttonStyle = {
    m: "10px",
    bg: "blue.500",
    color: "white",
    mb: "10px",
    _hover: {
    bg: "white",
    color: "blue.300"
  }
  }

  return (
    <Box 
      maxW="480px" 
      maxHeight="480px" 
      m="20px" 
      >
      <form onSubmit={handleSubmit}>
        <CustomNumberInput
        
         label="Cart Value" 
          // min={0}
          step={0.01} 
          value={parseFloat(cartValue) !== 0 ? cartValue : ''} 
          onChange={e => {setCartValue((e) || "0")}} 
          // onChange={(valueAsString: string) => {
          //   // Parse the string value as a float and update the cartValue state
          //   setCartValue(parseFloat(valueAsString) || 0); // Fallback to 0 if parseFloat returns NaN
          // }}
          data-test-id="cartValue" placeholder="€"
          clampValueOnBlur={true}
          />

        <CustomNumberInput 
          label="Delivary distance" 
          // min={0} 
          step={0.1} 
          value={delivaryDistance !== 0 ? delivaryDistance : ''} 
          onChange={e => {setDelivaryDistance(parseFloat(e) || 0)}} 
          data-test-id="delivaryDistance" 
          placeholder="Distance in meters"
          clampValueOnBlur={false}
          />

        <CustomNumberInput 
          label="Amount of items" 
          // min={0} 
          step={1} 
          value={amountOfItems !== 0 ? amountOfItems : ''} 
          onChange={e => {setAmoutOfItems(parseFloat(e) || 0)}} 
          data-test-id="amountOfItems" 
          placeholder="How many items"
          clampValueOnBlur={false}
          />

        <FormControl isRequired m="5px" >
          <FormLabel htmlFor="datepicker">Time</FormLabel>
          <DatePicker
            id="datepicker"
            wrapperClassName="datePicker" 
            showIcon
            icon="fa fa-calendar"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={1}
            timeCaption="time"
            dateFormat="dd/MM/yyyy h:mm aa"
            data-test-id="time"
            />
        </FormControl>

        <Center>
          <Button sx={buttonStyle} type="submit"> Calculate Delivary Price </Button>
          <Button sx={buttonStyle} type="submit" onClick={clearForm}> Reset </Button>
        </Center>

        <Flex align='center' justify="space-between">
          <Text fontWeight="bold" fontSize= 'xl' data-test-id="fee">
            Delivary Price: {delivaryPrice}€
          </Text>
          <FeeDetails />
        </Flex>
      </form>
    </Box>
  );
};

export default Calculator;

