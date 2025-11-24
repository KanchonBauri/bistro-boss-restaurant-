import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const Review = () => {
    const [formData, setFormData] = useState({
        name: "",
        rating: "",
        message: ""
    });

    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

    // ✅ Get all reviews from DB
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    });

    // ✅ Submit review
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user && user.email) {
            const reviewItem = {
                email: user.email,
                name: user.displayName || formData.name,
                rating: formData.rating,
                details: formData.message,
                photo: user.photoURL || "https://i.ibb.co/4Z1V1Zz/default-avatar.png",
                date: new Date()
            };

            try {
                const res = await axiosSecure.post('/reviews', reviewItem);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Review submitted!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setFormData({ name: "", rating: "", message: "" });
                    refetch();
                }
            } catch (error) {
                console.error("Review error:", error);
            }
        } else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please login to submit a review.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Login",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/reviews/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Your review has been deleted.", "success");
                    refetch(); // refresh review list
                }
            } catch (error) {
                console.error("Delete error:", error);
            }
        }
    };


    return (
        <div className="space-y-4 p-4">
            {/* ✅ Show all reviews */}
            {reviews.map((review, index) => {
                const isCurrentUser = review.email === user?.email;

                return (
                    <div key={index} className={`chat ${isCurrentUser ? 'chat-end' : 'chat-start'}`}>
                            <div className="chat-header flex items-center gap-2">
                                {review.name || 'Anonymous'}
                                <time className="text-xs opacity-50 ml-2">
                                    {new Date(review.date).toLocaleTimeString()}
                                </time>
                            </div>
                            <div className="chat-bubble">
                                {review.details}
                                <div className="text-xs mt-1 text-yellow-500">
                                    Rating: {review.rating} ⭐
                                </div>
                            </div>
                        {/* ✅ Show delete button only for logged-in user's review */}
                            {isCurrentUser && (
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="chat-footer text-red-500 text-sm ml-2 hover:underline"
                                >
                                    Delete
                                </button>
                            )}
                    </div>
                );
            })}


            {/* ✅ Review Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-10">

                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
                    <select
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    >
                        <option value="">Select a rating</option>
                        <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                        <option value="4">⭐⭐⭐⭐ (4)</option>
                        <option value="3">⭐⭐⭐ (3)</option>
                        <option value="2">⭐⭐ (2)</option>
                        <option value="1">⭐ (1)</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Review</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows="4"
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Write your review here..."
                    ></textarea>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Submit Review
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Review;
