import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
    const location = useLocation();
    const trxID = new URLSearchParams(location.search).get('trxID');

    useEffect(() => {
        if (trxID) {
            console.log('Transaction Successful. trxID:', trxID);
        }
    }, [trxID]);

    return (
        <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-green-600">Payment Successful!</h2>
            <p>Your transaction ID: <strong>{trxID}</strong></p>
        </div>
    )
};

export default PaymentSuccess;
