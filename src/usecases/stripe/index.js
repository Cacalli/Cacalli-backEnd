const config = require("../../lib/config");
const stripe = require("stripe")(config.stripe.privateKey);

const stripeWebhookEvent = async (body, signature) => {
  const webhookSecret = config.stripe.webhookSecret;
  let event;

  if(webhookSecret) {
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      return err;
    } 
    data = event.data;
    eventType = event.type;   
  } 
  const eventType = event.type;
  const data = event.data;
  
  console.log(event.data.object);

  switch (eventType) {
    case 'checkout.session.completed':

      break;
    case 'customer.created':
      const customerCreated = event.data.object;
      // Then define and call a function to handle the event customer.created
      break;
    case 'customer.subscription.created':
      const customerSubscriptionCreated = event.data.object;
      // Then define and call a function to handle the event customer.subscription.created
      break;
    case 'customer.subscription.deleted':
      const customerSubscriptionDeleted = event.data.object;
      // Then define and call a function to handle the event customer.subscription.deleted
      break;
    case 'customer.subscription.paused':
      const customerSubscriptionPaused = event.data.object;
      // Then define and call a fun     TU+ction to handle the event customer.subscription.paused
      break;
    case 'customer.subscription.pending_update_applied':
      const customerSubscriptionPendingUpdateApplied = event.data.object;
      // Then define and call a function to handle the event customer.subscription.pending_update_applied
      break;
    case 'customer.subscription.pending_update_expired':
      const customerSubscriptionPendingUpdateExpired = event.data.object;
      // Then define and call a function to handle the event customer.subscription.pending_update_expired
      break;
    case 'customer.subscription.resumed':
      const customerSubscriptionResumed = event.data.object;
      // Then define and call a function to handle the event customer.subscription.resumed
      break;
    case 'customer.subscription.trial_will_end':
      const customerSubscriptionTrialWillEnd = event.data.object;
      // Then define and call a function to handle the event customer.subscription.trial_will_end
      break;
    case 'customer.subscription.updated':
      const customerSubscriptionUpdated = event.data.object;
      // Then define and call a function to handle the event customer.subscription.updated
      break;
    case 'invoice.created':
      const invoiceCreated = event.data.object;
      // Then define and call a function to handle the event invoice.created
      break;
    case 'invoice.finalization_failed':
      const invoiceFinalizationFailed = event.data.object;
      // Then define and call a function to handle the event invoice.finalization_failed
      break;
    case 'invoice.finalized':
      const invoiceFinalized = event.data.object;
      // Then define and call a function to handle the event invoice.finalized
      break;
    case 'invoice.paid':
      const invoicePaid = event.data.object;
      // Then define and call a function to handle the event invoice.paid
      break;
    case 'invoice.payment_action_required':
      const invoicePaymentActionRequired = event.data.object;
      // Then define and call a function to handle the event invoice.payment_action_required
      break;
    case 'invoice.payment_failed':
      const invoicePaymentFailed = event.data.object;
      // Then define and call a function to handle the event invoice.payment_failed
      break;
    case 'invoice.payment_succeeded':
      const invoicePaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event invoice.payment_succeeded
      break;
    case 'invoice.upcoming':
      const invoiceUpcoming = event.data.object;
      // Then define and call a function to handle the event invoice.upcoming
      break;
    case 'invoice.updated':
      const invoiceUpdated = event.data.object;
      // Then define and call a function to handle the event invoice.updated
      break;
    case 'payment_intent.created':
      const paymentIntentCreated = event.data.object;
      // Then define and call a function to handle the event payment_intent.created
      break;
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

module.exports = {
  stripeWebhookEvent,
};