import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaShoppingBag } from "react-icons/fa";
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import SearchInput from '../form/SearchInput';
import useCategory from "../../hooks/useCategory";
import { useCart } from '../../context/cart';
import { Badge } from 'antd'

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart()
    const categories = useCategory();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem('auth')
        toast.success("Logout Successfully")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"><FaShoppingBag /> Furniture Fusion :🛒  </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link " aria-current="page">Home</NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to={"/categories"}
                                    data-bs-toggle="dropdown"
                                >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={"/categories"}>
                                            All Categories
                                        </Link>
                                    </li>
                                    {categories?.map((c) => (
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to="/rejister" className="nav-link" >Register</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link" >Login</NavLink>
                                    </li>
                                </>) : (<>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"} `} className="dropdown-item" >DashBoard</NavLink>
                                            </li>
                                            <li>
                                                <NavLink onClick={handleLogout} to="/login" className="dropdown-item" >Logout</NavLink>
                                            </li>
                                        </ul>
                                    </li>


                                </>)
                            }

                            <li className="nav-item">
                                <Badge count={cart?.length} showZero>
                                    <NavLink to="/cart" className="nav-link">
                                        Cart
                                    </NavLink>
                                </Badge>
                            </li>


                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header