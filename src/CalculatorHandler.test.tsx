import { calculateAmountOfItemsFees, calculateCartValueFees, calculateDistanceFees, calculateTotalFees, isRushHour } from './CalculatorHandler'

describe('CalculationsUtils', () => {
  test.each([
    [1, 9],
    [8.90, 1.10],
    [10, 0],
    [11, 0]
  ])('Test Cart Value that it returns correct value', (value, expectedFee) => {
    expect(calculateCartValueFees(value)).toBe(expectedFee)
  })

  test.each([
    [0, 2],
    [500, 2],
    [1000, 2],
    [1001, 3],
    [1499, 3],
    [1500, 3],
    [1501, 4]
  ])('Test Delivery Distance that it returns correct value', (value, expectedFee) => {
    expect(calculateDistanceFees(value)).toBe(expectedFee)
  })

  test.each([
    [0, 0],
    [4, 0],
    [5, 0.5],
    [12, 4],
    [13, 5.7],
    [14, 6.2]
  ])('Test Amount Of Items that it returns correct value', (value, expectedFee) => {
    expect(calculateAmountOfItemsFees(value)).toBe(expectedFee)
  })

  test.each([
    [new Date('2024-01-12T15:00:00'), true],
    [new Date('2024-01-12T17:00:00'), true],
    [new Date('2024-01-12T19:00:00'), false],
    [new Date('2024-01-12T19:10:00'), false],
    [new Date('2024-01-11T15:00:00'), false]
  ])('Test is it rush hour', (value, expected) => {
    expect(isRushHour(new Date(value))).toBe(expected)
  })

  test('Test Cart Value less than 10€', () => {
    expect(calculateTotalFees(9, 499, 1, new Date('2024-01-20T00:00:00'))).toBe(3)
  })
  test('Test Cart Value equal 10€', () => {
    expect(calculateTotalFees(10, 499, 1, new Date('2024-01-20T00:00:00'))).toBe(2)
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
    expect(calculateTotalFees(9, 499, 1, new Date('2024-01-12T15:00:00'))).toBe(3.6)
  })
  test('During the Friday rush, 5:30PM, the delivery fee will be multiplied by 1.2x', () => {
    expect(calculateTotalFees(20, 1499, 1, new Date('2024-01-12T17:30:00'))).toBe(3.6)
  })
  test('During the Friday rush, exact 7PM, the delivery fee will not be multiplied by 1.2x', () => {
    expect(calculateTotalFees(20, 1501, 10, new Date('2024-01-12T19:00:00'))).toBe(7)
  })
  test('Test Delivery Fees can never be more than 15€ during the Friday rush, 7PM', () => {
    expect(calculateTotalFees(20, 4500, 26, new Date('2024-01-12T19:00:00'))).toBe(15)
  })
})
