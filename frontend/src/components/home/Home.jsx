import React from 'react'
import Main from '../templates/Main'
import './Home.css'


export default props =>
    <Main title="Get A Dancer" navItemFirst="Login" navItemFirstLink="/userLog"
        navItemSecond="Esqueceu sua senha?" navItemSecondLink="/userReco" navItemThird="Cadastrar"
        navItemThirdLink="/userReg" linkLogo="/" >
        <div className="display-4">Procurando um alguém para dançar ?</div>
        <div className="text-home">
            <h1>Encontre pessoas ao redor do mundo para dançar em alguma ocasião especial,
            aprender um novo ritmo ou até mesmo treinar um já conhecido. Teste agora o Get A Dancer GRATUITAMENTE!</h1>
        </div>
    </Main>
