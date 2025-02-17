import {  FaBook, FaCalculator, FaCalendar, FaEnvelope, FaHome, FaList, FaLock, FaShoppingCart, FaStar, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();

    // TODO: get isAdmin value from the database
    const isAdmin = useAdmin();

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                         <li>
                        <NavLink to="/dashboard/adminHome"><FaHome></FaHome>Admin Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addItems"><FaUtensils></FaUtensils>Add Item</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageItems"><FaList></FaList> Manage Items</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/bookings"><FaBook></FaBook> Manage Bookings</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/users"><FaUsers></FaUsers> All Users</NavLink>
                    </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome"><FaHome></FaHome>User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation"><FaCalendar></FaCalendar> Reservation</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory"><FaWallet></FaWallet> Payment History</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart>My Cart( {cart.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review"><FaStar></FaStar> Add Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/booking"><FaCalculator></FaCalculator> My Booking</NavLink>
                                </li>
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/"><FaHome></FaHome>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad"><FaList></FaList>Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/"><FaLock></FaLock>Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact"><FaEnvelope></FaEnvelope>Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;