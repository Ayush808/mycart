import React, { useState, useEffect } from 'react'
import Layout from '../cores/Layout'
import { isAuthenticated } from '../auth'
import { getProduct, getAllCategories, updateProduct } from './apiAdmin'
import { Link, Redirect } from 'react-router-dom'

const UpdateProduct = (props) => {

    const { user, token } = isAuthenticated()



    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        quantity: "",
        shipping: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: '',
        redirectToProfile: false,
        formData: ""
    })

    const {
        name,
        description,
        price,
        categories,
        category,
        quantity,
        shipping,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData } = values

    const init = (productId) => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                })
            }
        })
    }

    //load categories and set form data
    const initCategories = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }
            else {
                setValues({ categories: data, formData: new FormData() })
            }
        })
    }
    useEffect(() => {
        init(props.match.params.productId)
    }, [])

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>)
    )

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: "", loading: true })
        updateProduct(props.match.params.productId, user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        photo: "",
                        price: "",
                        quantity: "",
                        loading: false,
                        redirectToProfile: true,
                        createdProduct: data.name
                    })
                }
            })
    }

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />
            }
        }
    }

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-outline-secondary">
                    <input type="file" onChange={handleChange('photo')} name="photo" accept="image/*" />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea type="text" onChange={handleChange('description')} className="form-control" value={description} />
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number" onChange={handleChange('price')} className="form-control" value={price} />
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please Select</option>
                    {
                        categories && categories.map((c, i) => (
                            <option key={i} value={c._id}>{c.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="text" onChange={handleChange('quantity')} className="form-control" value={quantity} />
            </div>
            <button className="btn btn-outline-primary">Update Product</button>
        </form>
    )

    return (
        <Layout title="Add a new Product" description={`Good Day! ${user.name}, ready to add a new Product?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showError()}
                    {showSuccess()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct