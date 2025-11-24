import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const CheckoutForm = ({ item = {} }) => {
    const { name, image, price, recipe, _id } = item;
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [cart, refetch] = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for the taka paisa",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/paymentHistory')
                }

                // payment er pore deleted cards gulu database add korte hobe
                if (user && user.email) {
                    // send cart item to the database
                    const cartItem = {
                        menuId: _id,
                        email: user.email,
                        name: user.name,
                        // name,
                        image,
                        price
                    }
                    axiosSecure.post('/cards', cartItem)
                        .then(res => {
                            console.log(res.data)
                            if (res.data.insertedId) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `${name} added to your cart`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                //   refetch cart to update the cart items count
                                refetch();
                            }
                        })
                }

            }
        }


    }

    const handleBkashPayment = async () => {
        try {
            // Get token (optional, if not already fetched)
            // await axios.post('/bkash-token');

            // Create payment
            const res = await axios.post('https://bistro-boss-server-ruddy-sigma.vercel.app/bkash-create-payment', {
                amount: totalPrice,
                invoice: `INV-${Date.now()}`
            });

            const paymentUrl = res.data.bkashURL;
            const paymentID = res.data.paymentID;

            // Save paymentID to localStorage for later execute
            localStorage.setItem('bkashPaymentID', paymentID);

            // Redirect user to bKash payment page
            window.location.href = paymentUrl;

        } catch (error) {
            console.error("bKash payment failed", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <button
                className="btn btn-sm btn-warning"
                onClick={handleBkashPayment}
                type="button"
            >
                Pay with bKash
            </button>

            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;