import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51MX1UsSCrOz5l3dLO34AEAUgnAJs1AQleyqrlaXae2O3yvdqx0uNs4aMDOmCfBxAHEP6hSiZPjFJRQjL8dWIrXJx00BxDdZox5"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

const StripeContainer = () => {
    return (
        <Elements stripe={stripeTestPromise} >
            <PaymentForm />
        </Elements>
    )
}

export default StripeContainer
