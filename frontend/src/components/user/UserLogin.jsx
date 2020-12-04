import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/Main'
import { Redirect } from 'react-router'

/*import 'bootstrap/dist/css/bootstrap.min.css'*/
import './UserLogin.css'

const baseUrl = 'http://localhost:8000/user'

const baseUrlSession = 'http://localhost:8000/session'

const initialState = {
    user: {
        nome_user: '', data_nascimento: '', email: '', telefone: '', genero: '',
        cpf: '', senha: ''
    },
    list: [],
    session: {
        id_user: ''
    },
}

export default class UserLogin extends Component {

    state = { ...initialState, redirect: false, idUser: '' }


    startSession() {
        const session = this.state.session
        const method = 'put'
        const url = `${baseUrlSession}/${1}`
        session.id_user > 0 ? (
            axios[method](url, session)
                .then(resp => {
                    const list = this.getUpdatedList(resp.data)

                    this.setState({ session: initialState.session, list })
                })
        ) : (
                alert("FALHA AO INICIAR SESSÃO!")
            )
        alert("SESSÃO INICIADA!")
        this.chamaLogin()

    }

    alertSucess() {
        /* window.location.href = "http://localhost:3000/userReg"*/
        this.startSession()
        alert("LOGIN REALIZADO COM SUCESSO!")

    }

    alertFail() {
        alert("CAMPOS EM BRANCO OU DADOS INCORRETOS!")
    }

    chamaLogin = () => {
        this.setState({
            redirect: true
        })
    }

    callAlert() {
        let verPas = this.validPass()
        let verEm = this.validLogEmail()
        verPas == true && verEm == true ? (
            this.alertSucess()
        ) : (
                this.alertFail()
            )

    }

    /*Atualiza a lista*/
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

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
    /*Valida o login */
    validPass() {
        let val = false
        const userCon = this.state.user
        this.componentWillMount()
        this.state.list.length > 0 && (
            this.state.list.map(user => {
                if (userCon.senha == user.senha) {
                    val = true
                }
            })
        )
        return val
    }
    /*Valida o login */
    validLogEmail() {
        let val = false
        const userCon = this.state.user
        this.componentWillMount()
        this.state.list.map(user => {
            if (userCon.email == user.email) (
                this.state.session.id_user = user.id
            )
        })
        if (this.state.session.id_user > 0) {
            val = true
        }
        return val
    }

    renderForm() {
        return (

            <div className="form-log">
                <div className="letter">
                    <form>
                        <h1>LOGAR</h1>
                        <hr />
                        <label>E-MAIL</label>
                        <div class="form-group d-flex justify-content-center">
                            <input type="text" className="form-control"
                                name="email" id="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="example@example.coom" />

                        </div>

                        <label>SENHA</label>
                        <div class="form-group d-flex justify-content-center">
                            <input type="password" className="form-control"
                                name="senha" id="senha"
                                value={this.state.user.senha}
                                onChange={e => this.updateField(e)}
                                placeholder="senha123" />
                        </div>

                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <button className="btn btn-dark" id="btnEntrarLog" name="btnEntrarLog"
                                    onClick={e => this.callAlert()}>
                                    ENTRAR
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


        )
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/userArea" />
        } else {
            return (
                <Main title="Enconter sxx parceirx de dança agora!" navItemFirst="Login" navItemFirstLink="/userLog"
                    navItemSecond="Esqueceu sua senha?" navItemSecondLink="/userReco" navItemThird="Cadastrar"
                    navItemThirdLink="/userReg" linkLogo="/">
                    {this.renderForm()}
                </Main>
            )
        }
    }

}
