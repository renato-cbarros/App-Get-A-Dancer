import './Header.css'
import React from 'react'

export default props =>
    <header className="header d-none d-sm-flex flex-collum">
            <h1 className="mt-4">
                {props.title}
            </h1>
    </header>