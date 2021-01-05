import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
var RazorpayCheckout = require('com.razorpay.cordova/www/RazorpayCheckout');
const Home = () => {

  const processPlaceOrder = () => {
    //Create order and show success page
    // alert(JSON.stringify(preOrder));
    processRazorPayPayment();

  }

  const processRazorPayPayment = async () => {
    // alert(transaction.providerData);
    // alert("RazorPay not supported");
    // const providerData = JSON.parse(transaction.providerData);
    // const orderId = providerData.order.id;
    // const razorPayKey = providerData.key;
    // const amount = providerData.order.amount;
    // alert(orderId+" "+razorPayKey+" "+amount);
    // alert(orderId);

    //Create order
    var path = 'https://api.razorpay.com/v1/orders';
    const authHeaderBase64Value = btoa('rzp_test_gtgk7x1URhgpBg:zBAj3JsDT1WnrHf37WiofB8I');
    const loginHeaders = new Headers();
    loginHeaders.append("Content-Type", "application/json");
    loginHeaders.append("Authorization","Basic "+authHeaderBase64Value);  
    var response = await fetch(path, {
      method: 'POST',
      mode: "no-cors",
      body: JSON.stringify({
        "amount": 100,
        "currency": "INR",
        "receipt": "tran_101"
      }),
      headers: loginHeaders
    });

    alert(JSON.stringify(response));

    var order = await response.json();
    alert(JSON.stringify(order));
        var options = {
            description: 'Payment towards Vegit order',
            order_id: 'orderId',
            currency: 'INR',
            key: order.id,
            amount: `100`,
            name: 'The Vegit Club',
            theme: {
                color: '#3399cc'
                }
        };
        RazorpayCheckout.on('payment.success', razorPaySuccessCallback);
        RazorpayCheckout.on('payment.cancel', razorPayFailCallback);
        RazorpayCheckout.open(options);
  }

  const razorPaySuccessCallback = (success) => {
    console.log("Successful payment");
  }

  const razorPayFailCallback = (error) => {
    console.log("Failed payment");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonButton onClick={processPlaceOrder} className="ion-no-margin">
                                    Pay
                                </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Home;
