import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getProducts } from './apiCore'
import Card from './Card'
import style from '../styles.css'
import Search from './Search'

const Home = () => {

    const [productBySell, setProductBySell] = useState([])
    const [productByArrival, setProductByArrival] = useState([])
    const [error, setError] = useState([])

    const loadProductBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductBySell(data)
            }
        })
    }

    const loadProductByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductByArrival(data)
            }
        })
    }

    useEffect(() => {
        loadProductByArrival()
        loadProductBySell()
    }, [])

    return (
        <Layout title="Home Page" description="Node Js React Ecommerce App" className="container-fluid">

            <Search />

            <h2 className="mb-4">Best Seller</h2>
            <div className="row">
                {productBySell.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
            </div>
            <h2 className="mb-4">New Arrival</h2>
            <div className="row">
                {productByArrival.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
            </div>
        </Layout>
    )
}

export default Home