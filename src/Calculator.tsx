import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { calculateTotalFees } from './CalculatorHandler'
import { Box, Button, FormControl, FormLabel, Text, Center, Flex } from '@chakra-ui/react'
import { FormNumberInput } from './component/NumberInput'
import { FeeDetails } from './component/DelivaryFeeInfo'
import { useIntl } from 'react-intl'

const Calculator = (): JSX.Element => {
  const [cartValue, setCartValue] = useState<string>('')
  const [deliveryDistance, setDelivaryDistance] = useState<number>(0)
  const [amountOfItems, setAmoutOfItems] = useState<number>(0)
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [deliveryPrice, setDelivaryPrice] = useState<number | undefined>(undefined)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const price = calculateTotalFees(parseFloat(cartValue),
      deliveryDistance,
      amountOfItems,
      startDate)
    setDelivaryPrice(price)
  }

  const clearForm = (): void => {
    setCartValue('')
    setDelivaryDistance(0)
    setAmoutOfItems(0)
    setDelivaryPrice(undefined)
    setStartDate(new Date())
  }

  const buttonStyle = {
    m: '10px',
    bg: 'blue.700',
    color: 'white',
    mb: '10px',
    _hover: {
      bg: 'white',
      color: 'blue.700'
    }
  }
  const intl = useIntl()

  const formatNumber = (n: number): string | number => {
    return n === 0 ? '' : n
  }

  const getNumberOrZero = (n: string): number => {
    const parsedValue = parseFloat(n)
    return isNaN(parsedValue) ? 0 : parsedValue
  }

  return (
    <Box
      maxW="480px"
      maxHeight="480px"
      m="20px"
      >
      <form onSubmit={handleSubmit}>
        <FormNumberInput
          label= {intl.formatMessage({ id: 'cart_value' })}
          min={0}
          step={0.01}
          precision={2}
          value={cartValue}
          onChange={e => { setCartValue(e) }}
          data-test-id="cartValue"
          placeholder= {intl.formatMessage({ id: 'cart_value_placeholder' })}
          />

        <FormNumberInput
          label= {intl.formatMessage({ id: 'delivery_distance' })}
          min={0}
          step={1}
          value={formatNumber(deliveryDistance)}
          onChange={e => { setDelivaryDistance(getNumberOrZero(e)) }}
          data-test-id="deliveryDistance"
          placeholder= {intl.formatMessage({ id: 'distance_placeholder' })}
          />

        <FormNumberInput
          label= {intl.formatMessage({ id: 'amount_of_items' })}
          min={0}
          step={1}
          value={formatNumber(amountOfItems)}
          onChange={e => {
            setAmoutOfItems(getNumberOrZero(e))
          }}
          data-test-id="amountOfItems"
          placeholder= { intl.formatMessage({ id: 'amount_of_items_placeholder' })}
          />

        <FormControl isRequired m="5px" >
          <FormLabel htmlFor="datepicker">{intl.formatMessage({ id: 'time' })}</FormLabel>
          <DatePicker
            id="datepicker"
            showIcon
            selected={startDate}
            onChange={(date) => { setStartDate(date) }}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={1}
            timeCaption="time"
            dateFormat="dd/MM/yyyy h:mm aa"
            data-test-id="time"
            />
        </FormControl>

        <Center>
          <Button sx={buttonStyle} type="submit"> {intl.formatMessage({ id: 'calculate_delivery_price' })} </Button>
          <Button sx={buttonStyle} type="reset" onClick={clearForm}> {intl.formatMessage({ id: 'reset' })} </Button>
        </Center>

        <Flex align='center' justify="space-between">
          {
          (deliveryPrice != null) &&
          <Text fontWeight="bold" fontSize= 'xl' data-test-id="fee">
            {intl.formatMessage({ id: 'delivery_price' }, { value: deliveryPrice })}
          </Text>
          }
          <FeeDetails />
        </Flex>
      </form>
    </Box>
  )
}

export default Calculator
