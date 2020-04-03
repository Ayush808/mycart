import { API } from '../config'
require('dotenv').config()

export const createCategory = (userId, token, category) => {
    //console.log(name, email, password)
    return fetch(`${process.env.REACT_APP_API_URL}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(response => {

        return response.json()
    })
        .catch(err => {
            console.log(err)
        })
}


export const createProduct = (userId, token, product) => {
    return fetch(`${process.env.REACT_APP_API_URL}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product // form data bcz content type is form
    }).then(response => { return response.json() })
        .catch(err => { console.log(err) })

}

export const getAllCategories = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/categories`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const listOrders = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/order/list/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}


export const getStatusValues = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/order/status-values/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${process.env.REACT_APP_API_URL}/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

/**
 * to perform CRUD
 * get all products
 * get a single product
 * update a single product
 * delete single product
 */

export const getProducts = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/products?limit=undefined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const getProduct = productId => {
    return fetch(`${process.env.REACT_APP_API_URL}/product/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${process.env.REACT_APP_API_URL}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
