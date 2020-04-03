import React, { useEffect, useState, Fragment } from 'react'

export const Radiobox = ({ prices, handleFilters }) => {
    const [value, setValues] = useState(0)

    const handleChange = (event) => {
        handleFilters(event.target.value)
        setValues(event.target.value)
    }

    return (
        prices.map((p, i) => (
            <div key={i}>
                <input onChange={handleChange} type="radio" value={`${p._id}`} name={p}
                    className="mr-2 ml-4" />
                <label className="form-check-label" >{p.name}</label>
            </div>
        ))
    )
}