import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Card from './Card'
import { getAllCategories, getFilteredProducts } from './apiCore'
import Checkbox from './Checkbox'
import { prices } from './fixedPrice'
import { Radiobox } from './Radiobox'


const Shop = () => {

    const [myFilters, setFilters] = useState({
        filters: { category: [], price: [] }
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(3)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])

    const init = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setCategories(data)
            }
        })
    }
    useEffect(() => {
        init()
        loadFilteredResults(skip, limit, myFilters.filters)
    }, [])

    const handleFilters = (filters, filterBy) => {
        //console.log("SHOP: ", filters, filterBy)
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters

        if (filterBy == 'price') {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        loadFilteredResults(myFilters.filters)
        setFilters(newFilters)
    }

    const loadFilteredResults = (newFilters) => {
        // console.log(newFilters)
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMore = (newFilters) => {
        // console.log(newFilters)
        let toSkip = skip + limit

        getFilteredProducts(toSkip, limit, newFilters.filters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults([...filteredResults, ...data.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load more</button>
            )
        )
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array
    }

    return (
        <Layout title="Home Page" description="Node Js React Ecommerce App" className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <h4>filter by category</h4>
                    <ul>
                        <Checkbox categories={categories}
                            handleFilters={filters => {
                                return (
                                    handleFilters(filters, 'category')
                                )
                            }} />
                    </ul>
                    <h4>filter by price Range</h4>
                    <ul>
                        <Radiobox prices={prices}
                            handleFilters={filters => {
                                return (
                                    handleFilters(filters, 'price')
                                )
                            }} />
                    </ul>

                </div>
                <div className="col-9">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <Card key={i} product={product} />
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
}

export default Shop