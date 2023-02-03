const express = require("express")
const app = express()
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "INR",
			description: "Spatula company",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

// coupon code:
const COUPON_MAP = {
    "COUPON_1": "1emyAwkA"   // this is the coupon name and id which i created in stripe dashboard
}

app.post('/coupon', (req, res) => {
    let coupon = req.body.coupon;
    let coupon_name = coupon;

    if (COUPON_MAP.hasOwnProperty(coupon_name)) {
        return res.status(200).send({ message: "Coupon applied successfully" });
    }
    return res.status(400).send({ message: "Couldn't apply coupon" });

})

app.listen(process.env.PORT || 4000, () => {
	console.log("Sever is listening on port 4000")
})