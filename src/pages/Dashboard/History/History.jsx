import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const History = () => {
    const { user } = useAuth(); // Get logged in user
    const axiosSecure = useAxiosSecure();

    const { data: history = [] } = useQuery({
        queryKey: ['paymentHistory', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

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
            <SectionTitle subHeading="---My History---" heading="Order History"></SectionTitle>
            <tbody className="table w-full">
                {
                    history.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-6">
                                <p className="text-red-500 text-4xl mb-4">Please make an order first!</p>
                                <Link to="/menu">
                                    <button className="btn btn-primary px-8">Back</button>
                                </Link>
                            </td>
                        </tr>
                    ) : (
                        history.map((item, index) => (
                            <tr key={item._id} className={getRowBgClass(item.status)}>
                                <td>{index + 1}</td>
                                <td>{item.transactionId || 'N/A'}</td>
                                <td>{new Date(item.date).toLocaleString()}</td>
                                <td>${item.price}</td>
                                <td className="font-semibold">{item.status || 'Pending'}</td>
                            </tr>
                        ))
                    )
                }
            </tbody>

        </div >
    );
}

export default History;