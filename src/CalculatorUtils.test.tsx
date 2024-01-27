import { calculateAmountOfItemsFees, calculateCartValueFees, calculateDistanceFees, calculateTotalFees, isRushHour } from './CalculatorUtils'

describe('CalculationsUtils', () => {
  test('Test Cart Value that it returns correct value', () => {
    expect(calculateCartValueFees(1)).toBe(9)

    expect(calculateCartValueFees(8.90)).toBe(1.10)
    expect(calculateCartValueFees(10)).toBe(0)
    expect(calculateCartValueFees(11)).toBe(0)
  })
  test('Test Delivery Distance that it returns correct value', () => {
    expect(calculateDistanceFees(0)).toBe(1)
    expect(calculateDistanceFees(500)).toBe(1)
    expect(calculateDistanceFees(1000)).toBe(2)
    expect(calculateDistanceFees(1001)).toBe(3)
  })
  test('Test Amount Of Items that it returns correct value', () => {
    expect(calculateAmountOfItemsFees(0)).toBe(0)
    expect(calculateAmountOfItemsFees(4)).toBe(0)
    expect(calculateAmountOfItemsFees(5)).toBe(0.5)
    expect(calculateAmountOfItemsFees(12)).toBe(4)
    expect(calculateAmountOfItemsFees(13)).toBe(5.7)
    expect(calculateAmountOfItemsFees(14)).toBe(6.2)
  })

  test('Test is it rush hour', () => {
    expect(isRushHour(new Date('2024-01-12T15:00:00'))).toBe(true)
    expect(isRushHour(new Date('2024-01-12T17:00:00'))).toBe(true)
    expect(isRushHour(new Date('2024-01-12T19:00:00'))).toBe(true)
    expect(isRushHour(new Date('2024-01-12T19:0:01'))).toBe(false)
    expect(isRushHour(new Date('2024-01-11T15:00:00'))).toBe(false)
  })

  test('Test Cart Value less than 10€', () => {
    expect(calculateTotalFees(9, 499, 1, new Date('2024-01-20T00:00:00'))).toBe(2)
  })
  test('Test Cart Value equal 10€', () => {
    expect(calculateTotalFees(10, 499, 1, new Date('2024-01-20T00:00:00'))).toBe(1)
  })
  test('Test Cart Value more than 10€', () => {
    expect(calculateTotalFees(20, 1000, 1, new Date('2024-01-20T00:00:00'))).toBe(2)
  })
  test('Test Distance less than 1500 m', () => {
    expect(calculateTotalFees(20, 1499, 1, new Date('2024-01-20T00:00:00'))).toBe(3)
  })
  test('Test Distance = 1500 m', () => {
    expect(calculateTotalFees(20, 1500, 1, new Date('2024-01-20T00:00:00'))).toBe(3)
  })
  test('Test Distance more than 1500 m', () => {
    expect(calculateTotalFees(20, 1501, 1, new Date('2024-01-20T00:00:00'))).toBe(4)
  })
  test('Test Amount of items = 4 items', () => {
    expect(calculateTotalFees(20, 1501, 4, new Date('2024-01-20T00:00:00'))).toBe(4)
  })
  test('Test Amount of items = 5 items', () => {
    expect(calculateTotalFees(20, 1501, 5, new Date('2024-01-20T00:00:00'))).toBe(4.5)
  })
  test('Test Amount of items = 10 items', () => {
    expect(calculateTotalFees(20, 1501, 10, new Date('2024-01-20T00:00:00'))).toBe(7)
  })
  test('Test Amount of items = 13 items', () => {
    expect(calculateTotalFees(20, 1501, 13, new Date('2024-01-20T00:00:00'))).toBe(9.7)
  })
  test('Test Amount of items = 14 items', () => {
    expect(calculateTotalFees(20, 1501, 14, new Date('2024-01-20T00:00:00'))).toBe(10.2)
  })
  test('Test Delivery Fees can never be more than 15€, including possible surcharges', () => {
    expect(calculateTotalFees(20, 4500, 15, new Date('2024-01-20T00:00:00'))).toBe(15)
    expect(calculateTotalFees(20, 4500, 26, new Date('2024-01-20T00:00:00'))).toBe(15)
  })
  test('The delivery is free (0€) when the cart value is equal or more than 200€', () => {
    expect(calculateTotalFees(200, 4500, 26, new Date('2024-01-20T00:00:00'))).toBe(0)
    expect(calculateTotalFees(201, 4500, 26, new Date('2024-01-20T00:00:00'))).toBe(0)
  })
  test('During the Friday rush, 3PM, the delivery fee will be multiplied by 1.2x', () => {
    expect(calculateTotalFees(9, 499, 1, new Date('2024-01-12T15:00:00'))).toBe(2.4)
  })
  test('During the Friday rush, 5:30PM, the delivery fee will be multiplied by 1.2x', () => {
    expect(calculateTotalFees(20, 1499, 1, new Date('2024-01-12T17:30:00'))).toBe(3.6)
  })
  test('During the Friday rush, 7PM, the delivery fee will be multiplied by 1.2x', () => {
    expect(calculateTotalFees(20, 1501, 10, new Date('2024-01-12T19:00:00'))).toBe(8.4)
  })
  test('Test Delivery Fees can never be more than 15€ during the Friday rush, 7PM', () => {
    expect(calculateTotalFees(20, 4500, 26, new Date('2024-01-12T19:00:00'))).toBe(15)
  })
})
