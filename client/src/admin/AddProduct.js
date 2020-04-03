import React, { useState, useEffect } from 'react'
import Layout from '../cores/Layout'
import { isAuthenticated } from '../auth'
import { createProduct, getAllCategories } from './apiAdmin'
import { Link } from 'react-router-dom'

const AddProduct = () => {

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

    //load categories and set form data
    const init = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }
            else {
                setValues({ ...values, categories: data, formData: new FormData() })
            }
        })
    }
    useEffect(() => {
        init()
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
            <h2>{`${createdProduct}`} is created!</h2>
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
        createProduct(user._id, token, formData)
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
                        createdProduct: data.name
                    })
                }
            })
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
            <button className="btn btn-outline-primary">Create Product</button>
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
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct