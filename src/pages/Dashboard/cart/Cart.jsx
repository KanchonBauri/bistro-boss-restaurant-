import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div>
                <SectionTitle subHeading="---My Cart---" heading="WANNA ADD MORE"></SectionTitle>
            </div>
            {
                cart.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-red-500 text-4xl mb-6">Please make an order first!</p>
                        <Link to="/">
                            <button className="btn btn-primary px-8">Back</button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-evenly pb-10">
                            <h2 className="text-4xl">Item: {cart.length}</h2>
                            <h2 className="text-4xl">Total Price: ${totalPrice}</h2>
                            <Link to="/dashboard/payment">
                                <button className="btn btn-primary">Pay</button>
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map((item, index) => (
                                            <tr key={item._id}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle h-12 w-12">
                                                                <img src={item.image} alt="Item" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>${item.price}</td>
                                                <td>
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="btn btn-ghost btn-sm"
                                                    >
                                                        <span className="text-red-600">Order Cancel</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            }

        </div>
    );
};

export default Cart;