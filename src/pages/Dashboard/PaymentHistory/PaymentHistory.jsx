import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })

    // ✅ Status-based row background class
    const getRowBgClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-blue-300'; // light sky blue
            case 'In Progress':
                return 'bg-yellow-200'; // light yellow
            case 'Delivered':
                return 'bg-green-500'; // light green
            default:
                return '';
        }
    };


    return (
        <div>
            <SectionTitle heading="PAYMENT HISTORY" subHeading="What's new?" ></SectionTitle>
            {
                payments.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-red-500 text-4xl mb-6">No payment history found!</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-3xl mb-6">Total Payments: {payments.length}</h2>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Price</th>
                                        <th>Transaction Id</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment, index) => (
                                        <tr key={payment._id} className={getRowBgClass(payment.status)}>
                                            <th>{index + 1}</th>
                                            <td>${payment.price}</td>
                                            <td>{payment.transactionId}</td>
                                            <td>{payment.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
            {/* <div>
                <h2 className="text3-xl">Total Payments: {payments.length}</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>price</th>
                                <th>Transaction Id</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => <tr key={payment._id} className={getRowBgClass(payment.status)}>
                                <th>{index + 1}</th>
                                <td>${payment.price}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.status}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div> */}
        </div>
    );
};

export default PaymentHistory;