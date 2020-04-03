import React, { useEffect, useState } from 'react'

const Checkbox = ({ categories, handleFilters }) => {

    const [checked, setChecked] = useState([])

    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c)     // if not found return -1 otherwise return first satisfied index
        const newCheckedCategoryId = [...checked]

        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        // console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }

    return (
        categories.map((c, i) => (
            <li key={i} className="list-unstyled">
                <input onChange={handleToggle(c._id)} type="checkbox" value={checked.indexOf(c._id) === -1}
                    className="form-check-input" />
                <label className="form-check-label" >{c.name}</label>
            </li>
        ))
    )
}

export default Checkbox