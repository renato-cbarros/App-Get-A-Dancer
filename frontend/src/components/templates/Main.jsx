import './Main.css'
import React from 'react'
import Nav from './Nav'
import Logo from './Logo'
import Header from './Header'

export default props =>
    <React.Fragment>
        <Logo {...props}/>
        <Header {...props}/>
        <Nav {...props}/>
        <main className="content content-fluid">
            <div className="p-2 mt-2">
                {props.children}
            </div>
        </main>
    </React.Fragment>