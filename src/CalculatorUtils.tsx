
export const calculateCartValueFees = (cartValue: number): number => {
    let surcharge: number = 0;
    const minCartValue: number = 10
    if (0 < cartValue && cartValue < minCartValue) {
        surcharge = minCartValue - cartValue;
      }
      return Number(surcharge.toFixed(2))
  }

export const calculateDistanceFees = (deliveryDistance: number) : number => {
  if(deliveryDistance === 0){
    return 1
  }
    const minDelivaryDistance: number = 500;
    return Math.ceil(deliveryDistance / minDelivaryDistance);
  }

export const calculateAmountOfItemsFees = (amountOfItems: number): number => {
    const additionalSurcharge: number = 0.5;
    const bulkFees = 1.2
    const minAmountOfItems = 4
    const minBulkFeesAmountOfItems = 12
    let surchargeItems: number = 0;

    if(amountOfItems >= minAmountOfItems){        
      surchargeItems = (amountOfItems - minAmountOfItems) * additionalSurcharge;    
    } 
     if(amountOfItems > minBulkFeesAmountOfItems){

         surchargeItems = surchargeItems + bulkFees
    }
      return  Number(surchargeItems.toFixed(2))
  }

export const isRushHour = (startDate: Date | null): boolean => {
    return (
    startDate?.getDay() === 5 &&
    startDate.getHours() >= 15 &&
    startDate.getHours() <= 19
    )
     
  }

export const calculateTotalFees = (cartValue: number,
    deliveryDistance: number,
    amountOfItems: number,
    startDate: Date | null): number => {
    let totalPrice: number = 0;
    const maxTotalPrice: number = 15
    const maxCartValue: number = 200

    const cartValueFees = calculateCartValueFees(cartValue)
    const distanceFees = calculateDistanceFees(deliveryDistance)
    const amountOfItemsFees = calculateAmountOfItemsFees(amountOfItems)

    
    if (cartValue && cartValue >= maxCartValue ) {
      totalPrice = 0;
    } else {
      totalPrice = cartValueFees + distanceFees + amountOfItemsFees;
    }

    if (isRushHour(startDate)) {
        let surgeRate = 1.2
        totalPrice =  totalPrice * surgeRate;
    } 
        totalPrice = Math.min(totalPrice, maxTotalPrice)
        return Number(totalPrice.toFixed(2))
    
}