import handler from '../libs/lambdaHandler';
import calculateCost from '../libs/calculateCost';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.stripeSecretKey as string, {
  apiVersion: "2020-03-02",
  typescript: true
});

const makePayment = async (event: EventHandler, _context: any) => {
  const { storage, source } = JSON.parse(event.body);
  const paymentAmount = calculateCost(storage);
  const description = "Scratch charge";

  // Create a PaymentIntent with the order amount and currency.
  // And source is the Stripe token for the card that we are going to charge
  const params: Stripe.PaymentIntentCreateParams = {
    amount: paymentAmount,
    currency: 'usd',
    description,
    source
  };

  const result: Stripe.PaymentIntent = await stripe.paymentIntents.create(
    params
  );

  const response = result.status === 'succeeded' ? { status: true } : { status: false };

  return response
}

export const main = handler(makePayment);
