import { FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';

interface CustomNumberInputProps {
    label: string;
    min: number;
    step: number;
    value: number | string;
    onChange: (value: string) => void;
    'data-test-id': string;
    placeholder: string;

}

export const CustomNumberInput = ({
    label,
    min,
    step,
    value,
    onChange, 
    'data-test-id': dataTestId,
    placeholder, 
}: CustomNumberInputProps): JSX.Element => {
    return (
        <FormControl 
          isRequired 
          >
          <FormLabel borderColor='blue.200'>{label}</FormLabel>
          <NumberInput 
            allowMouseWheel
            min={min} 
            step={step}
            value={value}
            onChange={onChange}             
            data-test-id={dataTestId}
          >
            <NumberInputField     
              borderWidth='2px' 
              borderColor='blue.200'
              placeholder={placeholder}/>
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
    )
}

