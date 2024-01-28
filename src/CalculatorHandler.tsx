export const calculateCartValueFees = (cartValue: number): number => {
  let surcharge = 0
  const minCartValue = 10
  if (cartValue < minCartValue) {
    surcharge = minCartValue - cartValue
  }
  return parseFloat(surcharge.toFixed(2))
}

export const calculateDistanceFees = (delivaryDistance: number): number => {
  const baseFee = 2
  const baseDistance = 1000
  const minDelivaryDistance = 500

  if (delivaryDistance <= baseDistance) {
    return baseFee
  } else {
    const extraDistance = delivaryDistance - baseDistance
    return baseFee + Math.ceil(extraDistance / minDelivaryDistance)
  }
}

export const calculateAmountOfItemsFees = (amountOfItems: number): number => {
  const additionalSurcharge = 0.5
  const bulkFees = 1.2
  const minAmountOfItems = 4
  const minBulkFeesAmountOfItems = 12
  let surchargeItems = 0

  if (amountOfItems > minAmountOfItems) {
    surchargeItems = (amountOfItems - minAmountOfItems) * additionalSurcharge
  }
  if (amountOfItems > minBulkFeesAmountOfItems) {
    surchargeItems = surchargeItems + bulkFees
  }
  return parseFloat(surchargeItems.toFixed(2))
}

export const isRushHour = (startDate: Date | null): boolean => {
  return (
    startDate?.getDay() === 5 &&
    startDate.getHours() >= 15 &&
    startDate.getHours() < 19)
}

export const calculateTotalFees = (cartValue: number,
  delivaryDistance: number,
  amountOfItems: number,
  startDate: Date | null): number => {
  let totalPrice = 0
  const maxTotalPrice = 15
  const maxCartValue = 200

  const cartValueFees = calculateCartValueFees(cartValue)
  const distanceFees = calculateDistanceFees(delivaryDistance)
  const amountOfItemsFees = calculateAmountOfItemsFees(amountOfItems)

  if (cartValue >= maxCartValue) {
    totalPrice = 0
  } else {
    totalPrice = cartValueFees + distanceFees + amountOfItemsFees
  }

  if (isRushHour(startDate)) {
    const surgeRate = 1.2
    totalPrice = totalPrice * surgeRate
  }
  totalPrice = Math.min(totalPrice, maxTotalPrice)
  return parseFloat(totalPrice.toFixed(2))
}
