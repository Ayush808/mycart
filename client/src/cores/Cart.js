import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getCarts, removeItem } from './CartHelpers'
import Card from './Card'
import style from '../styles.css'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'

const Cart = () => {
    const [item, setItem] = useState([])
    const [run, setRun] = useState(false)

    useEffect(() => {
        console.log('MAX DEPTH ...')
        setItem(getCarts())
    }, [run])

    const showItems = items => {
        return (
            <div>
                <h2>Your Bag has {`${items.length}`} item</h2>
                {items.map((product, i) => (
                    <Card key={i}
                        product={product}
                        related={true}
                        showAddtoCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run} />
                ))}
            </div>
        )
    }

    const noItemMessage = () => {
        return (
            <h1>Plz Add Item in Cart first. Happy Shopping :) <Link to='/shop' >Continue Shopping</Link> </h1>

        )
    }

    return (
        <Layout title="SHOPPING BAG" description="Node Js React Ecommerce App" className="container-fluid">

            <div className="row">

                <div className="col-6">
                    {item.length !== 0 ? showItems(item) : noItemMessage()}
                </div>
                <div className="col-4">
                    <h2 className="mb-4">Your Cart summary</h2>
                    <hr />
                    <Checkout products={item} />
                </div>

            </div>

        </Layout>
    )

}

export default Cart