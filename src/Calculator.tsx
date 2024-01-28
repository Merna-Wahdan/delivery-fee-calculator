import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { calculateTotalFees } from './CalculatorHandler'
import { Box, Button, FormControl, FormLabel, Text, Center, Flex } from '@chakra-ui/react'
import { FormNumberInput } from './component/NumberInput'
import { FeeDetails } from './component/DelivaryFeeDetails'
import { useIntl } from 'react-intl'

const Calculator = (): JSX.Element => {
  const [cartValue, setCartValue] = useState<string>('')
  const [deliveryDistance, setDelivaryDistance] = useState<number>(0)
  const [amountOfItems, setAmoutOfItems] = useState<number>(0)
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [deliveryPrice, setDelivaryPrice] = useState<number>(0)

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
    setDelivaryPrice(0)
    setStartDate(new Date())
  }

  const buttonStyle = {
    m: '10px',
    bg: 'blue.500',
    color: 'white',
    mb: '10px',
    _hover: {
      bg: 'white',
      color: 'blue.300'
    }
  }
  const intl = useIntl()

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
          value={parseFloat(cartValue) !== 0 ? cartValue : ''}
          onChange={e => { setCartValue(e) }}
          data-test-id="cartValue" placeholder="€"
          />

        <FormNumberInput
          label= {intl.formatMessage({ id: 'delivery_distance' })}
          min={0}
          step={1}
          value={deliveryDistance !== 0 ? deliveryDistance : ''}
          onChange={e => {
            const parsedValue = parseFloat(e)
            setDelivaryDistance(isNaN(parsedValue) ? 0 : parsedValue)
          }}
          data-test-id="deliveryDistance"
          placeholder="Distance in meters"
          />

        <FormNumberInput
          label= {intl.formatMessage({ id: 'amount_of_items' })}
          min={0}
          step={1}
          value={amountOfItems !== 0 ? amountOfItems : ''}
          onChange={e => {
            const parsedValue = parseFloat(e)
            setAmoutOfItems(isNaN(parsedValue) ? 0 : parsedValue)
          }}
          data-test-id="amountOfItems"
          placeholder="How many items"
          />

        <FormControl isRequired m="5px" >
          <FormLabel htmlFor="datepicker">{intl.formatMessage({ id: 'time' })}</FormLabel>
          <DatePicker
            id="datepicker"
            wrapperClassName="datePicker"
            showIcon
            icon="fa fa-calendar"
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
          <Button sx={buttonStyle} type="submit" onClick={clearForm}> {intl.formatMessage({ id: 'reset' })} </Button>
        </Center>

        <Flex align='center' justify="space-between">
          <Text fontWeight="bold" fontSize= 'xl' data-test-id="fee">
            {intl.formatMessage({ id: 'delivery_price' })}: {deliveryPrice}€
          </Text>
          <FeeDetails />
        </Flex>
      </form>
    </Box>
  )
}

export default Calculator
