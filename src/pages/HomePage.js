import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { toast } from 'react-toastify'
import { Prices } from '../components/Prices'
import { useCart } from '../context/cart'
import "../styles/Homepage.css"

const HomePage = () => {
    const navigate = useNavigate()
    const [cart, setCart] = useCart()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])//category filter m display k lie
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])// prices filter
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLaoding] = useState(false)


    //get all category--filter
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("https://ff-backend-jojs.onrender.com/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllCategory();
        getTotal()
    }, [])

    //get filtered products 
    const filteredProduct = async () => {
        try {
            //api calll
            const { data } = await axios.post('https://ff-backend-jojs.onrender.com/api/v1/product/product-filters', { checked, radio })
            setProducts(data?.products)//we are getting products from product controller
            //since we are passing the values ..so post req

        } catch (error) {
            console.log(error)

        }
    }

    //get products
    const getAllProducts = async () => {
        try {
            setLaoding(true)
            const { data } = await axios.get(`https://ff-backend-jojs.onrender.com/api/v1/product/product-list/${page}`)
            setLaoding(false)
            setProducts(data.products)
        } catch (error) {
            setLaoding(false)

            console.log(error)

        }
    }
    //initial time pr
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();

    }, [checked.length, radio.length])


    //check or radio k base pr fetch karaigai
    useEffect(() => {
        if (checked.length || radio.length) filteredProduct()
    }, [checked, radio])


    //get total
    const getTotal = async () => {
        try {
            const { data } = await axios.get('https://ff-backend-jojs.onrender.com/api/v1/product/product-count')
            setTotal(data?.total)

        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        //ifpage change then on run
        if (page === 1) return;
        loadMore()

    }, [page])

    //load more
    const loadMore = async () => {
        try {
            setLaoding(true)
            const { data } = await axios.get(`https://ff-backend-jojs.onrender.com/api/v1/product/product-list/${page}`)
            setLaoding(false)
            setProducts([...products, ...data?.products])

        } catch (error) {
            console.log(error)
            setLaoding(false)

        }
    }



    //filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked]//jo bhi values checked hogi idhar store hojaigi
        if (value) {
            all.push(id)//push in array

        } else {
            all = all.filter((c) => c !== id)//jo jo id check hogi

        }
        setChecked(all)
    }


    return (
        <Layout title={"All product - Best Offers"}>
            <div className="row">
                <div className="col-md-2 ml-2">
                    <h4 className='text-center' >Filter by category</h4>
                    <div className="d-flex flex-column">
                        {categories?.map(c => (
                            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
                        ))}
                    </div>
                    {/* Price filter */}
                    <h4 className='text-center mt-4 ' >Filter by Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={e => setRadio(e.target.value)} >
                            {Prices?.map(p => (
                                <div key={p._id}>
                                    <Radio value={p.array} >{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column">
                        <button className='btn btn-danger' onClick={() => window.location.reload()} >Reset Filters</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            //single products ki details(slug) mention krne se unique link pr jaigi website

                            <div className="card m-2" style={{ width: '18rem' }}  >
                                <img
                                    src={`https://ff-backend-jojs.onrender.com/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}</p>
                                    <p className="card-text">₹ {p.price}</p>
                                    <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)} >More details</button>
                                    <button className="btn btn-secondary ms-1 " onClick={() => {
                                        setCart([...cart, p]);
                                        localStorage.setItem(
                                            "cart",
                                            JSON.stringify([...cart, p])
                                        );
                                        toast.success("Item Added to cart");
                                    }} >Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='m-2 p-2'>{
                        products && products.length < total && (
                            <button className='btn btn-warning' onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1)
                            }} >{loading ? "Loading ..." : "Loadmore"}</button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage