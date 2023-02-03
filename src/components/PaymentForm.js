import { AddressElement, CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'


const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

// export default function PaymentForm() {
const PaymentForm = () => {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const [couponValue, setCouponValue] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: 1000,
                    id
                })

                if (response.data.success) {
                    console.log("Successful payment")
                    setSuccess(true)
                }

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }


    const AddressElementOptions = {
        mode: "billing"
    }

    const couponButton = () => {
        const body = {
            coupon: couponValue
        }
        axios.post(`http://localhost:4000/coupon`, body)
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
    }

    return (
        <>
            {!success ?
                <form onSubmit={handleSubmit}>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                        <div  style={{ margin: "15px" }} >
                            <AddressElement options={AddressElementOptions} />
                        </div>
                        <div className="Coupon" style={{ marginLeft: "15px" }} >
                            <p style={{ color: "white" }} >Enter coupon code: </p>
                            <input
                                style={{ padding: "10px", borderRadius: "4px", border: "none" }}
                                placeholder="Enter coupon"
                                value={couponValue}
                                onChange={(e) => setCouponValue(e.target.value)}
                            />
                            <button style={{ padding: "10px", width: "140px", marginBottom: "10px", marginLeft:0 }} onClick={couponButton} >Add Coupon</button>
                        </div>
                    </fieldset>
                    <button type="submit" >Pay</button>
                </form>
                :
                <div>
                    <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
                </div>
            }

        </>
    )
}

export default PaymentForm;