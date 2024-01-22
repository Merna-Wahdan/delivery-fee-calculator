import { fireEvent, render, screen } from '@testing-library/react';
import Calculator from './Calculator';

describe("Delivery Fee Calculator", () => {
    test("User enters Cart Value less than 10, a small order surcharge is added to the delivery price which is equal the difference between the cart value and 10€ ", () => {
        const cartValue = "9"
        const deliveryDistance = "499"
        const amountOfItems = "2"
        const date = new Date("2024-01-20T00:00:00")
        render(<Calculator />)
        const cartValueInput = screen.getByLabelText(/Cart Value/)
        fireEvent.change(cartValueInput, {target: {value: cartValue}})

        const deliveryDistanceInput = screen.getByLabelText(/Delivary distance/)
        fireEvent.change(deliveryDistanceInput, {target: {value: deliveryDistance}})

        const amountOfItemsInput = screen.getByLabelText(/Amount of items/)
        fireEvent.change(amountOfItemsInput, {target: {value: amountOfItems}})

        const timeInput = screen.getByLabelText(/Time/)
        fireEvent.change(timeInput, { target: {value: date} })

        // const deliveryPriceOutput = screen.getByText(/Delivary Price:/)
        

        const submitButton = screen.getByText(/Calculate Delivary Price/)
        fireEvent.click(submitButton)

        expect(screen.getByText("Delivary Price: 2")).toBeInTheDocument()

    })

})

