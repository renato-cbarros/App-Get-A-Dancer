import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/Main'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './UserRecovery.css'



const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3333/client'
const initialState = {
    client: { nomeCliente: '', dataNascimento: '', telefone: '', cpf: '' },
    list: []
}

export default class UserRecovery extends Component {

    state = { ...initialState }

    clear() {
        this.setState({ client: initialState.client })
    }

    save() {
        const client = this.state.client
        const method = client.id ? 'put' : 'post'
        const url = client.id ? `${baseUrl}/${client.id}` : baseUrl
        axios[method](url, client)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ client: initialState.client, list })
            })
    }

    getUpdatedList(client, add = true) {
        const list = this.state.list.filter(u => u.id !== client.id)
        if (add) list.unshift(client)
        return list
    }

    updateField(event) {
        const client = { ...this.state.client }
        client[event.target.name] = event.target.value
        this.setState({ client })
    }

    renderForm() {
        return (
            <div className="form-recovery">
                <div className="letter">
                    <form>
                        <h1>RECUPERAR SENHA</h1>
                        <hr />
                        <label>INFORME O E-EMAIL CADASTRADO</label>
                        <div class="form-group d-flex justify-content-center">
                            <input type="email" class="form-control" name="emailRec" id="emailRec"
                                aria-describedby="email" placeholder="exemplo@exemplo.com" />
                        </div>

                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <button className="btn btn-dark" name="btnRecovery" id="btnRecovery"
                            /*onClick={e => this.save(e)}*/>
                                    RECUPERAR
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
            <Main title="Esqueceu sua senha ?" navItemFirst="Login" navItemFirstLink="/userLog"
                navItemSecond="Esqueceu sua senha?" navItemSecondLink="/userReco" navItemThird="Cadastrar"
                navItemThirdLink="/userReg" linkLogo="/">
                {this.renderForm()}
            </Main>
        )
    }

}
