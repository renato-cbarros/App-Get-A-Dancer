import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/Main'

import './UserAccount.css'

import logo from '../../assets/imgs/logo.png'

/*urls do server json */
const baseUrl = 'http://localhost:3333/user'
const baseUrlSession = 'http://localhost:3333/session'
/*objs e listas */
const initialState = {
    user: {
        id: '', nome_user: '', data_nascimento: '', email: '', telefone: '', genero: '',
        cpf: '', senha: ''
    },
    list: [],
    session: {
        id_user: ''
    },
    listSession: []
}

export default class UserAccount extends Component {

    state = { ...initialState }

    /*Monta o form assim que atualiza*/
    componentWillMount() {
        alert("INFORMAÇÕES DA CONTA")
        this.getSession()
    }
    /*Recarrega o obj user*/
    load(user) {
        this.setState({ user })
    }
    /*Buscar a sessão atual*/
    getSession() {
        const method = 'get'
        const urlSes = `${baseUrlSession}/${1}`
        const listSes = []
        axios[method](urlSes)
            .then(resp => {
                listSes.unshift(resp.data)
                this.setState({ listSession: listSes })
                let idUserSe = this.state.listSession[0].id_user
                this.getAccount(idUserSe)
            })
    }
    /*Buscar os dados do usuario com base na sessão atual*/
    getAccount(idUserSe) {
        const method = 'get'
        const url = `${baseUrl}/${idUserSe}`
        const list = []
        axios[method](url)
            .then(resp => {
                list.unshift(resp.data)
                this.setState({ list: list })
                const user = { ...this.state.user }

                user.id = this.state.list[0].id
                user.nome_user = this.state.list[0].nome_user
                user.data_nascimento = this.state.list[0].data_nascimento
                user.email = this.state.list[0].email
                user.telefone = this.state.list[0].telefone
                user.genero = this.state.list[0].genero
                user.cpf = this.state.list[0].cpf
                user.senha = this.state.list[0].senha

                this.load(user)
            })
    }
    /*Atualiza os dados no server json*/
    update() {
        const user = this.state.user
        const method = 'put'
        const url = `${baseUrl}/${user.id}`
        var senhaConf = document.getElementById('senhaConAcc').value
        user.senha == senhaConf && user.nome_user != '' && user.data_nascimento != ''
            && user.email != '' && user.telefone != '' && user.genero != '' && user.cpf != ''
            && user.senha != '' && user.id != '' ? (
                axios[method](url, user)
                    .then(resp => {
                        const list = this.getUpdatedList(resp.data)
                        this.setState({ user: initialState.user, list })
                        alert("ALTERADO COM SUCESSO!")
                    })
            ) : (
                alert("CAMPOS EM BRANCO OU SENHAS NÃO CONFEREM!")
                )
    }

    /*Atualiza a lista de usuarios*/
    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if (add) list.unshift(user)
        return list
    }

    /*Atualiza os campos*/
    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }
    /*Html do form*/
    renderForm() {
        return (
            <div className="areaAccount" /*Div de configuração para area total*/ >
                <div className="logoAreaAccount" /*Div de configuração para area onde ira ficar o chat*/ >
                    <img src={logo} alt="logoAreaAccount" />
                </div>

                <div className="contentAccount" /*Div de configuração para area onde ira ficar o chat*/ >

                    <div className="formAccount">
                        <div className="letter">
                            <form>
                                <h1>INFORMAÇÕES DA CONTA</h1>
                                <hr />
                                <label>NOME COMPLETO</label>
                                <div class="form-group d-flex justify-content-center">
                                    <input type="text" className="form-control"
                                        name="nome_user" id="nome_user"
                                        value={this.state.user.nome_user}
                                        onChange={e => this.updateField(e)}
                                        placeholder="Nome Sobrenome" />

                                </div>

                                <label>DATA DE NASCIMENTO</label>
                                <div class="form-group d-flex justify-content-center">
                                    <input type="date" className="form-control"
                                        name="data_nascimento" id="data_nascimento"
                                        value={this.state.user.data_nascimento}
                                        onChange={e => this.updateField(e)} />
                                </div>

                                <label>E-MAIL</label>
                                <div class="form-group d-flex justify-content-center">
                                    <input type="text" className="form-control"
                                        name="email" id="email"
                                        value={this.state.user.email}
                                        onChange={e => this.updateField(e)}
                                        placeholder="example@example.com" />
                                </div>

                                <label>NUMERO PARA CONTATO</label>
                                <div class="form-group d-flex justify-content-center">
                                    <input type="number" className="form-control"
                                        name="telefone" id="telefone"
                                        value={this.state.user.telefone}
                                        onChange={e => this.updateField(e)}
                                        placeholder="11995555555" />
                                </div>

                                <label class="my-1 mr-2" for="inlineFormCustomSelectPref">GÊNERO</label>
                                <select class="custom-select my-1 mr-sm-2" id="genero"
                                    name="genero" value={this.state.user.genero} onChange={e => this.updateField(e)}>
                                    <option value='' selected>Escolha...</option>
                                    <option value="M">MASCULINO</option>
                                    <option value="F">FEMININO</option>
                                    <option value="O">OUTROS</option>
                                </select>

                                <label>CPF</label>
                                <div class="form-group d-flex justify-content-center">
                                    <input type="number" className="form-control"
                                        name="cpf" id="cpf"
                                        value={this.state.user.cpf}
                                        onChange={e => this.updateField(e)}
                                        placeholder="44444444444" />
                                </div>

                                <label>SENHA</label>
                                <div class="form-group d-flex justify-content-center">
                                    <input type="password" className="form-control"
                                        name="senha" id="senha"
                                        value={this.state.user.senha}
                                        onChange={e => this.updateField(e)}
                                        placeholder="password123" />
                                </div>

                                <label>REPITA A SENHA</label>
                                <div class="form-group d-flex justify-content-center">
                                    <input type="password" className="form-control"
                                        name="senhaConAcc" id="senhaConAcc"
                                        placeholder="password123" />
                                </div>

                                <div className="row">
                                    <div className="col-12 d-flex justify-content-center">
                                        <button className="btn btn-dark"
                                            onClick={e => this.update()}>
                                            ALTERAR
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    render() {
        return (
            /*Carrega o main da pagina e envia as prorpriedades do nav */
            <Main title="Area usuario" navItemFirst="Área do usuario" navItemFirstLink="/UserArea"
                navItemSecond="Perfil" navItemSecondLink="/userPerfil" navItemThird="Sair"
                navItemThirdLink="/" linkLogo="/">
                {this.renderForm()}
            </Main >

        )
    }


}