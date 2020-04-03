import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../cores/Layout'
import signup from '../auth'

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const { name, email, password, success, error } = values

    // higher order function is the function that return the another function
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = e => {
        e.preventDefault()
        signup({ name, email, password }) // here key and value are same so dont need of name: name , password: password , etc: etc
            .then(data => {

                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }

            })
    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" value={email} className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">password</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                {error}
            </div>
        )
    }

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
                New Account is created. Please SignIn : <Link to='/signin'>SignIn</Link>
            </div>
        )
    }

    return (
        <Layout title="Sign up Page" description="Node Js React Ecommerce App" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    )
}

export default Signup