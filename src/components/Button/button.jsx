import React from 'react'
import s from './button.module.css'

const Button = ({loadMore}) => {
    return (
        <>
            <button className={s.Button} onClick={loadMore}>Load more</button>
        </>
    )
}

export default Button