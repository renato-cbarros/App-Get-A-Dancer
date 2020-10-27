import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/Main'
import Logo from '../templates/Logo'
import { Link } from 'react-router-dom'
import './UserAccount.css'

import logo from '../../assets/imgs/logo.png'

import like from '../../assets/imgs/like.svg'
import dislike from '../../assets/imgs/dislike.svg'
import next from '../../assets/imgs/next.svg'
import prev from '../../assets/imgs/prev.svg'
import itsamatch from '../../assets/imgs/itsamatch.png'

import chat from '../../assets/imgs/fundo1-576.jpg'
import match from '../../assets/imgs/fundo3.jpg'
import ReactDOM from 'react-dom';


function tick() {
    const element = (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
  }
  
  export default props =>

  setInterval(tick, 1000);

  