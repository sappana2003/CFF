/// <reference path="../interfaces.d.ts"/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

var This;
class Paypal extends React.Component<IPaypalProps, IPaypalState> {
    constructor(props:any) {
        super(props);
        This = this;
    }

    payment(data, actions) {
        // Set up the payment here, when the buyer clicks on the button
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: { total: This.props.paymentInfo.total,
                            currency: This.props.paymentInfo.currency }
                    }
                ]
            }
        });
    }
    onAuthorize(data, actions) {
        // Call your server to execute the payment
        console.log('on authorize', data);
        /*
            intent
            :
            "sale"
            payerID
            :
            "JPASXUT2EQNXG"
            paymentID
            :
            "PAY-05425127NY099454ALI6C25I"
            paymentToken
            :
            "EC-1T341231Y05746040"
            returnUrl
            :
            "https://www.sandbox.paypal.com/?paymentId=PAY-05425127NY099454ALI6C25I&token=EC-1T341231Y05746040&PayerID=JPASXUT2EQNXG"

        */
        if (data.error === 'INSTRUMENT_DECLINED') {
            actions.restart();
        }
        return actions.payment.execute().then((payment) => {
            console.log("Done!", payment);
            This.props.onPaymentComplete(payment);
            // The payment is complete!
            // You can now show a confirmation message to the customer
        }).catch((e) => {
            console.log("Error", e);
            This.props.onPaymentError(e);
        });
    };
    onCancel(data, actions) {
        /* 
            * Buyer cancelled the payment 
            */
    }
    
    onError(err) {
        This.props.onPaymentError(err);
        /* 
            * An error occurred during the transaction 
            */
    }
    onClick() {

    }

 render() {
    if (this.props.isScriptLoaded && this.props.isScriptLoadSucceed) {
        let PayPalButton = window.paypal.Button.driver('react', { React, ReactDOM });

        let client = this.props.paymentMethodInfo.client;
        let env = this.props.paymentMethodInfo.env || "sandbox";
        
        return (
            <PayPalButton
            env={env}
            client={client}
            commit={true}
            payment={this.payment}
            onAuthorize={this.onAuthorize}
            onCancel={this.onCancel}
            onError={this.onError}
            onClick={this.onClick} />
        );
    }
    else {
        return (
            <div>PayPal loading...</div>
        )
    }
 }
    componentDidMount() {
        //return;
    }
}
export default scriptLoader(["https://www.paypalobjects.com/api/checkout.js"])(Paypal);