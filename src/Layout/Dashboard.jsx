import {FaBook, FaEnvelope, FaHome, FaList, FaSearch, FaUsers, FaUtensils} from "react-icons/fa";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useCart from "../hooks/useCart";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [cart] = useCart();
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu uppercase">
                    {
                        isAdmin ? <>
                    <li><NavLink to="/dashboard/adminHome"><FaHome></FaHome> Admin Home</NavLink></li>
                    <li><NavLink to="/dashboard/addItems"><FaUtensils></FaUtensils>Add Items</NavLink></li>
                    <li><NavLink to="/dashboard/manageItems"><FaList></FaList>Manage Items</NavLink></li>
                    <li><NavLink to="/dashboard/bookings"><FaBook></FaBook>Manage Bookings</NavLink></li>
                    <li><NavLink to="/dashboard/users"><FaUsers></FaUsers>All Users</NavLink></li>
                        </>:
                        <>
                    <li><NavLink to="/dashboard/userHome"><FaHome></FaHome> User Home</NavLink></li>
                    <li><NavLink to="/dashboard/payment"><PiShoppingCartSimpleLight></PiShoppingCartSimpleLight> Payment</NavLink></li>
                    <li><NavLink to="/dashboard/cart"><PiShoppingCartSimpleLight></PiShoppingCartSimpleLight> My Cart({cart.length})</NavLink></li>
                    <li><NavLink to="/dashboard/review"><PiShoppingCartSimpleLight></PiShoppingCartSimpleLight> Add Review</NavLink></li>
                    <li><NavLink to="/dashboard/paymentHistory"><FaList></FaList>Payment Real History</NavLink></li>
                        </>
                    }
                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to="/menu"><FaSearch></FaSearch>Menu</NavLink></li>
                    <li><NavLink to="/dashboard/userHome"><FaHome></FaHome>Shop</NavLink></li>
                    <li><NavLink to="/dashboard/userHome"><FaEnvelope></FaEnvelope>contact</NavLink></li>
                </ul>

            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;