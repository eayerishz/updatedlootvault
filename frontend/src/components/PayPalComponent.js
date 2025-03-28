import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalComponent = () => {
  return (
    <div>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: props.amount,  // Use dynamic amount from props
              },
            }],

          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(function(details) {
          alert("Transaction completed by " + details.payer.name.given_name);
        }).catch((error) => {
          console.error("Payment Error: ", error);
          alert("There was an issue with your payment. Please try again.");

          });
        }}
      />
    </div>
  );
};

export default PayPalComponent;
