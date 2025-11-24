
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const ManageBookings = () => {
    // const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axiosSecure.patch(`/payments/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                refetch(); // update UI
                alert('Status updated successfully!');
            }
        } catch (error) {
            console.error('Status update failed', error);
        }
    };

    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`)
            return res.data;
        }
    })

    const handleDelete = (id) => {
        // সতর্কবার্তা দেখাবে
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/payments/${id}`);
                if (res.data.deletedCount > 0) {
                    refetch(); // UI রিফ্রেশ
                    Swal.fire("Deleted!", "Payment has been deleted.", "success");
                }
            }
        });
    };




    return (
        <div>
            <SectionTitle subHeading="---Manage Booking---" heading="Castomer Orders"></SectionTitle>
            <div className="flex justify-evenly ny-4">
                <div className="text-3xl">All carts: {payments.length}</div>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Castomer Email</th>
                                <th>Price</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // cards.map((card, index) => <tr key={card._id}>
                                payments.map((payment, index) => <tr key={payment._id}>
                                    <th>{index + 1}</th>
                                    <td>{payment.email}</td>
                                    <td>{payment.price}</td>
                                    <td>{new Date(payment.date).toLocaleString()}</td>
                                    {/* <td>{payment.status}</td> */}
                                    <td>
                                        <select
                                            defaultValue={payment.status || "Pending"}
                                            disabled={payment.status === "Delivered"}
                                            onChange={(e) => handleStatusChange(payment._id, e.target.value)}
                                            className="p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 bg-white"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">Start Processing</option>
                                            <option value="Delivered">Deliver</option>
                                        </select>


                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(payment._id)}
                                            className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600" />
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBookings;