
import React from 'react'

import { useSearch } from '../context/search'
import Layout from '../components/Layout/Layout'

const Search = () => {
    const [values, setValues] = useSearch()
    return (
        <Layout title={"Search results"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Resuts</h1>
                    <h6>
                        {values?.results.length < 1
                            ? "No Products Found"
                            : `Found ${values?.results.length}`}
                    </h6>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map((p) => (
                            //single products ki details(slug) mention krne se unique link pr jaigi website

                            <div className="card m-2" style={{ width: '18rem' }}  >
                                <img
                                    src={`https://furniturefusion-mern.onrender.com/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}</p>
                                    <p className="card-text">̥₹ {p.price}</p>
                                    <button href="#" className="btn btn-primary ms-1">More details</button>
                                    <button href="#" className="btn btn-secondary ms-1">Add to Card</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search