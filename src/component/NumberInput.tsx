import React from 'react'
import { FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react'

interface FormNumberInputProps {
  label: string
  step: number
  value: number | string
  onChange: (value: string) => void
  'data-test-id': string
  placeholder: string
}

export const FormNumberInput = ({
  label,
  step,
  value,
  onChange,
  'data-test-id': dataTestId,
  placeholder

}: FormNumberInputProps): JSX.Element => {
  return (
        <FormControl
          isRequired
          >
          <FormLabel borderColor='blue.200'>{label}</FormLabel>
          <NumberInput
            min={0}
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
