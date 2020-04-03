import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { read, listRelated } from './apiCore'
import Card from './Card'


const Product = props => {
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error, setError] = useState(false)

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props])  // when there is change in the url the useEffect also chnages

    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid">

            <div class="row">
                <div class="col-8">
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
                </div>
                <div class="col-4">
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <Card key={i} product={p} related={true} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Product