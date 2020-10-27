import './Nav.css'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Link } from 'react-router-dom'

import React from 'react'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" type="button" size="sm">
              <i class="fa fa-align-justify" aria-hidden="true"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item><Link to={`${props.navItemFirstLink}`}>{`${props.navItemFirst}`}</Link></Dropdown.Item>
              <Dropdown.Item><Link to={`${props.navItemSecondLink}`}>{`${props.navItemSecond}`}</Link></Dropdown.Item>
              <Dropdown.Item><Link to={`${props.navItemThirdLink}`}>{`${props.navItemThird}`}</Link></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </nav>
    </aside>