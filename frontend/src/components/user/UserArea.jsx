import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/Main'
import Home from '../home/Home'

import Logo from '../templates/Logo'
import { Link } from 'react-router-dom'
import './UserArea.css'
import './UserAreaChat.css'
import './UserAreaMatch.css'

import logo from '../../assets/imgs/logo.png'

import like from '../../assets/imgs/like.svg'
import dislike from '../../assets/imgs/dislike.svg'
import next from '../../assets/imgs/next.svg'
import prev from '../../assets/imgs/prev.svg'
import itsamatch from '../../assets/imgs/itsamatch.png'

import chat from '../../assets/imgs/fundo1-576.jpg'
import match from '../../assets/imgs/fundo3.jpg'

import ReactDOM from 'react-dom';


/*urls do server json */
const baseUrlPerfilComb = 'http://localhost:3333/perfils_combinacoes'
const baseUrlPerfilMach = 'http://localhost:3333/perfils_matchs'
/*objs e listas */
const initialState = {
    perfils_combinacoes: {
        id: '', id_user: '', url_img_perfil: 'branca.png', nick: '', bio: '', dancas_conhecidas: '',
        dancas_desconhecidas: '', distancia_matchs: '', hora_match: ''
    },
    listPerfilComb: [],
    perfils_matchs: {
        id: '', id_user: '', url_img_perfil: 'branca.png', nick: '', bio: '', dancas_conhecidas: '',
        dancas_desconhecidas: '', distancia_matchs: '', hora_match: ''
    },
    listPerfilMatch: []
}

export default class UserArea extends React.Component {

    state = { ...initialState }

    redirect = false

    /*Atualiza a lista*/
    componentWillMount() {
        this.getPerfilComb();
        this.getPerfilMatch();
    }
    /*Buscar os perfils com possiveis combinações*/
    getPerfilComb() {
        axios(baseUrlPerfilComb).then(resp => {
            this.setState({ listPerfilComb: resp.data })
        })
    }
    /*Buscar os perfils com match*/
    getPerfilMatch() {
        axios(baseUrlPerfilMach).then(resp => {
            this.setState({ listPerfilMatch: resp.data })
        })
    }
    /*Adiciona o perfil com like na tabela correta e deleta da tabela de combinações */
    handleLike() {
        const perfil = this.state.listPerfilComb[0]
        const method = 'post'
        const url = baseUrlPerfilMach
        this.state.listPerfilComb.length > 0 ? (
            axios[method](url, perfil)
                .then(resp => {
                    alert("Match aplicado com sucesso!")
                    this.handleDislike()
                })
        ) : (
                alert("Falha ao aplicar o match!")
            )
    }
    /*Remove o perfil com dislike */
    handleDislike() {
        axios.delete(`${baseUrlPerfilComb}/${this.state.listPerfilComb[0].id}`).then(resp => {
            const list = this.getUpdatedListComb(resp.data)
            this.componentWillMount()
        })
    }
    /*Atualiza a listas das possiveis combinações */
    getUpdatedListComb(perfil, add = true) {
        const list = this.state.listPerfilComb.filter(u => u.id !== perfil.id)
        if (add) list.unshift(perfil)
        return list
    }
    /*Atualiza a listas daos matchs */
    getUpdatedListMatch(perfil, add = true) {
        const list = this.state.listPerfilMatch.filter(u => u.id !== perfil.id)
        if (add) list.unshift(perfil)
        return list
    }

    renderForm() {
        return (
            <div className="area" /*Div de configuração para area total*/ >
                <div className="logoArea" /*Div de configuração para area onde ira ficar o logo*/ >
                    <img src={logo} alt="logo" />
                </div>


                <div className="chat" /*Div de configuração para area onde ira ficar o chat*/ >
                    <h3>Todos Matchs</h3>
                    {
                        /*Condição para verificar se há match*/
                        this.state.listPerfilMatch.length > 0 ? (
                            <div class="listaMatchs">
                                {
                                    /*Repetidor para descarregar o vetor match*/
                                    this.state.listPerfilMatch.map(perfil => (
                                        <div class="ChatBar">
                                            <div class="alignmentBar wdt15">
                                                <img src={require('../../assets/imgsPerfil/'
                                                    + perfil.url_img_perfil)} class="profPic" />
                                            </div>
                                            <div class="alignmentBar wdt70">
                                                <h5><b>{perfil.nick}</b></h5>
                                                <p>{perfil.bio}</p>
                                                <p>(11) 9 7246-5874</p>
                                            </div>
                                            <div class="alignmentBar wdt10">
                                                <p>{perfil.horaMatch}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            /*Caso não exista match */
                        ) : (
                                <div className="emptyChat">
                                    <strong>Sem matchs no momento!</strong>
                                    <br />
                                    <strong>Continue procurando!</strong>
                                    <br />
                                    <i class="fa fa-heart text-danger"></i>
                                </div>
                            )
                    }
                </div>

                <div className="match" /*Div de configuração para area onde ira ficar o match*/ >

                    <div className="match-main-container">
                        {
                            this.state.listPerfilComb.length > 0 ? (
                                < ul >
                                    <li /*key={perfil.id}*/ >
                                        <img src={require('../../assets/imgsPerfil/' + this.state.listPerfilComb[0].url_img_perfil)}
                                            alt={this.state.listPerfilComb[0].nick} className="imgPerfil" />
                                        <footer>
                                            <strong>{this.state.listPerfilComb[0].nick}</strong>
                                            <p>Bio:</p>
                                            <p>{this.state.listPerfilComb[0].bio}</p>
                                            <p>Danças conhecidas:</p>
                                            <p>{this.state.listPerfilComb[0].dancas_conhecidas}</p>
                                            <p>Interesse em aprender:</p>
                                            <p>{this.state.listPerfilComb[0].dancas_desconhecidas}</p>
                                        </footer>

                                        <div className="buttons">
                                            <button type="button" onClick={e => this.handleDislike(e)} >
                                                <img src={dislike} alt="Dislike" className="imgButtons" />
                                            </button>

                                            <button type="button" onClick={e => this.handleLike(e)} >
                                                <img src={like} alt="Like" className="imgButtons" />
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            ) : (
                                    <div className="empty">
                                        <strong>Sem combinações no momento!</strong>
                                        <br />
                                        <strong>Volte mais tarde!</strong>
                                        <br />
                                        <i class="fa fa-heart text-danger"></i>
                                    </div>
                                )}
                        {/*matchDev && (
                            <div className="match-container">
                                <img src={itsamatch} alt="" />

                                <img className="avatar" src={matchDev.avatar} alt="" />
                                <strong>{matchDev.name}</strong>
                                <p>{matchDev.bio}</p>

                                <button type="button" onClick={() => setMatchDev(false)}>Fechar</button>
                            </div>

                        )*/}
                    </div>
                </div>
            </div >
        )
    }

    render() {
        return (
            <Main title="Area usuario" navItemFirst="Conta" navItemFirstLink="/userAccount"
                navItemSecond="Perfil" navItemSecondLink="/userPerfil" navItemThird="Sair"
                navItemThirdLink="/" linkLogo="/" >
                {this.renderForm()}
            </Main >

        )
    }


}
