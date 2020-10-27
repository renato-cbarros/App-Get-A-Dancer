import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/Main'
import { Link } from 'react-router-dom'
import './UserRegistration.css'
import Alert from 'react-bootstrap/Alert'
import { Redirect } from 'react-router'

/*urls do server json */
const baseUrl = 'http://localhost:3333/user'
const baseUrlSession = 'http://localhost:3333/session'
const baseUrlPerfil = 'http://localhost:3333/perfil'
/*objs e listas */
const initialState = {
    user: {
        nome_user: '', data_nascimento: '', email: '', telefone: '', genero: '',
        cpf: '', senha: ''
    },
    list: [],
    session: {
        id_user: ''
    },
    listSession: []
    ,
    perfil: {
        id_user: '', url_img_perfil: '', nick: '', bio: '', dancas_conhecidas: '',
        dancas_desconhecidas: '', distancia_matchs: '', hora_match: ''
    },
    listPerfil: []
}


export default class UserRegistration extends Component {

    state = { ...initialState }

    componentWillMount() {
        alert("CADASTRO")
    }

    next = () => {
        window.location.href = "http://localhost:3000/userPerfil"
    }
    /*Limpa o obj user*/
    clear() {
        this.setState({ user: initialState.user })
    }
    /*Limpa verifica se id existe no bd e insere caso contrario altera*/
    save() {
        const user = this.state.user
        const method = 'post'
        const url = baseUrl
        var senhaConf = document.getElementById('senhaCon').value
        user.senha == senhaConf && user.nome_user != '' && user.data_nascimento != ''
            && user.email != '' && user.telefone != '' && user.genero != '' && user.cpf != ''
            && user.senha != '' ? (
                axios[method](url, user)
                    .then(resp => {
                        const list = this.getUpdatedList(resp.data)
                        let idUser = resp.data.id
                        this.setState({ user: initialState.user, list })
                        alert("CADASTRO REALIZADO COM SUCESSO!" + idUser)
                        this.startSession(idUser)
                        this.createPerfil(idUser)
                        this.next();
                    })
            ) : (
                alert("FALHA AO CADASTRAR!")
            )
    }
    /*Inicia sessão*/
    startSession(idUser) {
        const session = this.state.session
        session.id_user = idUser
        const method = 'put'
        const url = `${baseUrlSession}/${1}`
        alert("SESSÃO INICIADA!")
        session.id_user > 0 ? (
            axios[method](url, session)
                .then(resp => {
                    const list = this.getUpdatedList(resp.data)
                    this.setState({ session: initialState.session, list })
                    this.createPerfil(idUser)
                })
        ) : (
                alert("FALHA AO INICIAR SESSÃO!")
            )
    }
    /*Cria o perfil*/
    createPerfil(idUser) {
        const perfil = this.state.perfil
        perfil.id_user = idUser
        perfil.url_img_perfil = "branca.png"
        const method = 'post'
        const url = baseUrlPerfil
        alert("CRIE SEU PERFIL AGORA!")
        perfil.id_user > 0 ? (
            axios[method](url, perfil)
                .then(resp => {
                    const list = this.getUpdatedList(resp.data)
                    this.setState({ perfil: initialState.perfil, list })
                })
        ) : (
                alert("FALHA AO CRIAR PERFIL!")
            )
    }
    /*Atualiza a lista*/
    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if (add) list.unshift(user)
        return list
    }
    /*Atualiza o campo*/
    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form-reg">
                <div className="letter">
                    <form>
                        <h1>CADASTRAR</h1>
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
                                name="senhaCon" id="senhaCon"
                                placeholder="password123" />
                        </div>

                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <button className="btn btn-dark"
                                    onClick={e => this.save()}>
                                    CADASTRAR
                                </button>
                                <button className="btn btn-dark ml-2" name="btnCanReg" id="btnCanReg"
                                    onClick={e => this.clear(e)}>
                                    LIMPAR
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }

    render() {

        return (
            <Main title="Começe a usar o Get A Dancer agora!" navItemFirst="Login" navItemFirstLink="/userLog"
                navItemSecond="Esqueceu sua senha?" navItemSecondLink="/userReco" navItemThird="Cadastrar"
                navItemThirdLink="/userReg" linkLogo="/">
                {this.renderForm()}
            </Main>
        )
    }

}
