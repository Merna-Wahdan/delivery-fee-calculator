import React from 'react'
import { FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, type NumberInputProps, NumberInputStepper } from '@chakra-ui/react'

interface FormNumberInputProps extends NumberInputProps {
  label: string
  placeholder: string
}

export const FormNumberInput = ({
  label,
  placeholder,
  ...numberInputProps

}: FormNumberInputProps): JSX.Element => {
  return (
        <FormControl isRequired>
          <FormLabel borderColor='blue.200'>{label}</FormLabel>
          <NumberInput {...numberInputProps} >
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
