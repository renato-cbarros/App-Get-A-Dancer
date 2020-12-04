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
const baseUrlPerfilComb = 'http://localhost:8000/perfils_combinacoes'
const baseUrlPerfilMach = 'http://localhost:8000/perfils_matchs'
const baseUrlPerfil = 'http://localhost:8000/perfil'
const baseUrlUser = 'http://localhost:8000/user'
const baseUrlSession = 'http://localhost:8000/session'
const baseUrlAgenda = 'http://localhost:8000/agenda'
const baseUrlMostrarAgenda = 'http://localhost:8000/mostrar_agendas'
const baseUrlMostrarAgendaRec = 'http://localhost:8000/mostrar_agendas_rec'

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
    perfils_matchs_click: {
        id: '', id_user: '', url_img_perfil: 'branca.png', nick: '', bio: '', dancas_conhecidas: '',
        dancas_desconhecidas: '', distancia_matchs: '', hora_match: ''
    },
    listPerfilMatch: [],
    listPerfilAgendamento: [],
    list: [],
    user: {
        id: '', nome_user: '', data_nascimento: '', email: '', telefone: '', genero: '',
        cpf: '', senha: ''
    },
    userSession: {
        id: '', nome_user: '', data_nascimento: '', email: '', telefone: '', genero: '',
        cpf: '', senha: ''
    },
    listPerfilMatchClick: [],
    session: {
        id_user: ''
    },
    listSession: [],

    agenda: {
        id: '', id_user_recebe: '', id_user_envia: '', dia: '', horario: '', confirmacao: ''
    },
    listAgendamentos: [],
    listAgendamentosConf: [],
    mostrarAgenda: {
        url_img_perfil: 'branca.png', nick: '', dia: '', horario: '', confirmacao: ''
    },
    mostrarAgendaRec: {
        id_agenda: '', url_img_perfil: 'branca.png', nick: '', dia: '', horario: '', confirmacao: ''
    },
    listMostrarAgenda: [],
    listMostrarAgendaRec: [],

    agendar: false,
    verAgendas: false,
    verCombinacoes: false,
    verChat: false
}

export default class UserArea extends React.Component {

    state = { ...initialState }

    /*Atualiza a lista*/
    componentWillMount() {
        this.getPerfilComb();
        this.getPerfilMatch();
        this.getSession();
        this.getPerfilsAgendamento()
        this.getPerfilsAgendamentoRec()
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
    /* mostra a pg de agendamentos */
    handleAgendamentos() {
        this.exluiDadosMostrar()
        alert("Agendamentos!")
        this.state.verAgendas = true
        this.componentWillMount()
    }
    /*Buscar os agendamentos*/
    getPerfilsAgendamento() {
        axios(baseUrlMostrarAgenda).then(resp => {
            this.setState({ listMostrarAgenda: resp.data })
        })
    }
    /*Buscar os agendamentos*/
    getPerfilsAgendamentoRec() {
        axios(baseUrlMostrarAgendaRec).then(resp => {
            this.setState({ listMostrarAgendaRec: resp.data })
        })
    }
    /*Buscar os agendamentos*/
    setPerfilsAgendamento() {
        axios(baseUrlAgenda).then(resp => {
            this.setState({ listAgendamentos: resp.data })
            this.listaPerfilsAgendamento()
        })

    }
    /*Buscar os agendamentos para este user*/
    listaPerfilsAgendamento() {
        if (this.state.listAgendamentos.length > 0) (
            this.state.listAgendamentos.map(agenda => {
                if (agenda.id_user_envia == this.state.userSession.id) (
                    this.getAccountAgenda(agenda, agenda.id_user_recebe)
                )
                if (agenda.id_user_recebe == this.state.userSession.id) (
                    this.getAccountAgendaRecebe(agenda, agenda.id_user_envia)
                )
            })
        )

    }
    /*Agenda horario com o match escolhido*/
    handleAgendar() {
        this.state.agendar = true
        this.state.verAgendas = false
        this.componentWillMount()
    }
    /*Agenda horario com o match escolhido*/
    handleChat() {
        this.state.agendar = false
        this.state.verAgendas = false
        this.state.verChat = true
        this.componentWillMount()
    }
    /*Lista agendamentos*/
    handleVerAgendamentos() {
        alert("Agendamentos!")
        this.state.agendar = false
        this.state.verAgendas = true
        this.componentWillMount()
    }
    /*Mostra combinações*/
    handleVerCombinacoes() {
        this.state.agendar = false
        this.state.verAgendas = false
        this.state.perfils_matchs_click.nick = ''
        this.componentWillMount()
    }
    /*Buscar os dados do usuario com base na sessão atual*/
    getAccountAgenda(agenda, id_user_rec) {
        axios(baseUrlPerfil).then(resp => {
            let listPerfil = resp.data
            if (listPerfil.length > 0) (
                listPerfil.map(perfil => {
                    if (id_user_rec == perfil.id_user) (
                        this.setMostraAgenda(perfil, agenda)
                    )
                })
            )
        })
    }
    /*Buscar os dados do usuario com base na sessão atual*/
    getAccountAgendaRecebe(agenda, id_user_env) {
        axios(baseUrlPerfil).then(resp => {
            let listPerfil = resp.data
            if (listPerfil.length > 0) (
                listPerfil.map(perfil => {
                    if (id_user_env == perfil.id_user) (
                        this.setMostraAgendaRec(perfil, agenda)
                    )
                })
            )
        })
    }
    /*Monta agenda a ser exibida*/
    setMostraAgendaRec(perfil, agenda) {
        this.state.mostrarAgendaRec.id_agenda = agenda.id
        this.state.mostrarAgendaRec.url_img_perfil = perfil.url_img_perfil
        this.state.mostrarAgendaRec.nick = perfil.nick
        this.state.mostrarAgendaRec.dia = agenda.dia
        this.state.mostrarAgendaRec.horario = agenda.horario
        agenda.confirmacao == true ? (
            this.state.mostrarAgendaRec.confirmacao = "Você confirmou"
        ) : (
                this.state.mostrarAgendaRec.confirmacao = "Confirmar"
            )

        this.saveMostraAgendaRec(this.state.mostrarAgendaRec)
    }
    /*Monta agenda a ser exibida*/
    setMostraAgenda(perfil, agenda) {
        this.state.mostrarAgenda.url_img_perfil = perfil.url_img_perfil
        this.state.mostrarAgenda.nick = perfil.nick
        this.state.mostrarAgenda.dia = agenda.dia
        this.state.mostrarAgenda.horario = agenda.horario
        agenda.confirmacao == true ? (
            this.state.mostrarAgenda.confirmacao = "Confirmado"
        ) : (
                this.state.mostrarAgenda.confirmacao = "Aguardando confirmação"
            )

        this.saveMostraAgenda(this.state.mostrarAgenda)
    }
    /*Adiciona o perfil com like na tabela correta e deleta da tabela de combinações */
    saveMostraAgenda(mostrarAgendaSave) {
        const mostrarAgenda = mostrarAgendaSave
        const method = 'post'
        const url = baseUrlMostrarAgenda
        axios[method](url, mostrarAgenda)
            .then(resp => {
                this.getPerfilsAgendamento()
            })

    }
    /*Adiciona o perfil com like na tabela correta e deleta da tabela de combinações */
    saveMostraAgendaRec(mostrarAgendaSave) {
        const mostrarAgenda = mostrarAgendaSave
        const method = 'post'
        const url = baseUrlMostrarAgendaRec
        axios[method](url, mostrarAgenda)
            .then(resp => {
                this.getPerfilsAgendamentoRec()
            })

    }
    /*deleta dados tabela mostrarAgendas */
    exluiDadosMostrar() {
        this.setPerfilsAgendamento()

        if (this.state.listMostrarAgenda.length > 0) (
            this.state.listMostrarAgenda.map(mostrarAgenda => (
                axios.delete(`${baseUrlMostrarAgenda}/${mostrarAgenda.id}`).then(resp => {
                })
            )
            )
        )
        if (this.state.listMostrarAgendaRec.length > 0) (
            this.state.listMostrarAgendaRec.map(mostrarAgenda => (
                axios.delete(`${baseUrlMostrarAgendaRec}/${mostrarAgenda.id}`).then(resp => {
                })
            )
            )
        )


    }
    /*Buscar os dados do usuario com base na sessão atual*/
    getAccount(idUserSe) {
        const method = 'get'
        const url = `${baseUrlUser}/${idUserSe}`
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

                this.loadSession(user)
            })
    }
    /*Abre a tela para ver mais informações do match */
    handleVerMais(perfil) {
        this.state.agendar = false
        this.state.verAgendas = false
        this.state.verChat = false
        this.state.perfils_matchs_click = perfil
        alert(this.state.perfils_matchs_click.url_img_perfil)
        /*Buscar os dados do usuario*/
        const method = 'get'
        const url = `${baseUrlUser}/${perfil.id_user}`
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
        this.componentWillMount()
    }
    /*Recarrega o obj user*/
    loadSession(userSession) {
        this.setState({ userSession })
    }
    load(user) {
        this.setState({ user })
    }
    /*Adiciona o perfil com like na tabela correta e deleta da tabela de combinações */
    handleLike() {
        const perfil = this.state.listPerfilComb[0]
        const method = 'post'
        const url = baseUrlPerfilMach
        this.state.listPerfilComb.length > 0 ? (
            axios[method](url, perfil).then(resp => {
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
    /*Atualiza os campos da agenda*/
    updateField(event) {
        const agenda = { ...this.state.agenda }
        agenda[event.target.name] = event.target.value
        this.setState({ agenda })
    }
    /*Atualiza os dados no server json*/
    updateAgenda() {
        this.state.agenda.id_user_envia = this.state.userSession.id
        this.state.agenda.id_user_recebe = this.state.perfils_matchs_click.id_user
        this.state.agenda.confirmacao = false
        alert(this.state.userSession.id)
        const agenda = this.state.agenda
        const method = agenda.id ? 'put' : 'post'
        const url = agenda.id ? `${baseUrlAgenda}/${agenda.id}` : baseUrlAgenda
        agenda.dia != '' && agenda.horario != '' ? (
            axios[method](url, agenda)
                .then(resp => {
                    this.setState({ agenda: initialState.agenda })
                    alert("ENVIADO AGENDAMENTO AGUARDA A CONFIRMAÇÃO!")
                })
        ) : (
                alert("CAMPOS EM BRANCO!")
            )
    }
    /*Atualiza a listas daos matchs */
    getUpdatedListMatch(perfil, add = true) {
        const list = this.state.listPerfilMatch.filter(u => u.id !== perfil.id)
        if (add) list.unshift(perfil)
        return list
    }

    buscaAgenda() {
        axios(baseUrlAgenda).then(resp => {
            this.setState({ listAgendamentosConf: resp.data })
        })
        return this.state.listAgendamentosConf
    }

    handleConfirmarAgenda(idAgenda) {
        let agendaCon = undefined
        alert(this.buscaAgenda())

        if (this.buscaAgenda()) (
            this.buscaAgenda().map(agenda => (
                (agenda.id == idAgenda) ? (
                    agendaCon = agenda
                ) : (
                        agendaCon = undefined
                    )
            ))
        )

        if (agendaCon !== undefined) (
            agendaCon.confirmacao = true
        )

        const agenda = agendaCon
        const method = 'put'
        let url = ''
        if (agenda !== undefined) (
            url = `${baseUrlAgenda}/${agenda.id}`
        )
        agenda !== undefined && (
            axios[method](url, agenda)
                .then(resp => {
                    alert("AGENDA CONFIRMADA! atualize a pagina para ver as informações!")
                })
        )
    }

    renderForm() {
        return (
            <div className="area" /*Div de configuração para area total*/ >
                <div className="logoArea" /*Div de configuração para area onde ira ficar o logo*/ >
                    <img src={logo} alt="logo" />
                </div>


                <div className="chat" /*Div de configuração para area onde ira ficar o chat*/ >
                    <h3>Todos Matchs                     </h3>

                    <div class="btnAgendamentos">
                        <button type="button" onClick={e => this.handleAgendamentos(e)}>
                            <b>Agendamentos</b>
                        </button>
                        <button type="button" onClick={e => this.handleVerCombinacoes(e)}>
                            <b>Combinações</b>
                        </button>
                    </div>
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
                                                <div class="btnClickMatch">
                                                    <button type="button" onClick={e => this.handleVerMais(perfil)} >
                                                        <p>Ver mais informações</p>
                                                    </button>
                                                </div>
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
                            this.state.verChat == false ? (
                                this.state.verAgendas == false ? (
                                    this.state.agendar == false ? (
                                        this.state.perfils_matchs_click.nick == '' ? (
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
                                                )
                                        ) : (
                                                <div className="verMais">
                                                    <img src={require('../../assets/imgsPerfil/' + this.state.perfils_matchs_click.url_img_perfil)}
                                                        alt={this.state.perfils_matchs_click.nick} className="imgPerfil" />
                                                    <footer>
                                                        <strong>{this.state.perfils_matchs_click.nick}</strong>
                                                        <p>Bio:</p>
                                                        <p>{this.state.perfils_matchs_click.bio}</p>
                                                        <p>Danças conhecidas:</p>
                                                        <p>{this.state.perfils_matchs_click.dancas_conhecidas}</p>
                                                        <p>Interesse em aprender:</p>
                                                        <p>{this.state.perfils_matchs_click.dancas_desconhecidas}</p>
                                                        <p>Contato:</p>
                                                        <p>{this.state.user.telefone}</p>
                                                    </footer>

                                                    <button type="button" onClick={e => this.handleChat(e)} >
                                                        <h5>Iniciar conversa</h5>
                                                    </button>

                                                    <button type="button" onClick={e => this.handleAgendar(e)}>
                                                        <h5>Agendar horario</h5>
                                                    </button>
                                                </div>

                                            )
                                    ) : (
                                            <div className="divAgendar">
                                                <form>
                                                    <h1>AGENDAR HORARIO COM {this.state.user.nome_user}</h1>
                                                    <hr />
                                                    <label>DIA</label>
                                                    <div class="form-group d-flex justify-content-center">
                                                        <input type="date" className="form-control"
                                                            name="dia" id="dia"
                                                            value={this.state.agenda.dia}
                                                            onChange={e => this.updateField(e)} />
                                                    </div>

                                                    <label>HORARIO</label>
                                                    <div class="form-group d-flex justify-content-center">
                                                        <input type="hour" className="form-control"
                                                            name="horario" id="horario"
                                                            value={this.state.agenda.horario}
                                                            onChange={e => this.updateField(e)} />
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-12 d-flex justify-content-center">
                                                            <button className="btn btn-dark"
                                                                onClick={e => this.updateAgenda()}>
                                                                ALTERAR/SALVAR
                                                    </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        )
                                ) : (
                                        <div class="listaAgendamentos">
                                            <div class="enviarArea">
                                                <h3>Enviados</h3>
                                                {
                                                    this.state.listMostrarAgenda.length > 0 ? (
                                                        /*Repetidor para descarregar o vetor match*/
                                                        this.state.listMostrarAgenda.map(mostrarAgenda => (
                                                            <div class="ChatBarAgendamento">
                                                                <div class="alignmentBarAgendamento wdt15">
                                                                    <img src={require('../../assets/imgsPerfil/'
                                                                        + mostrarAgenda.url_img_perfil)} class="profPic" />
                                                                </div>
                                                                <div class="alignmentBarAgendamento wdt70">
                                                                    <h5><b>{mostrarAgenda.nick}</b></h5>
                                                                    <p>{mostrarAgenda.dia}</p>
                                                                    <p>{mostrarAgenda.horario}</p>
                                                                    <p>{mostrarAgenda.confirmacao}</p>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                            <div className="empty">
                                                                <strong>Sem agendas no momento!</strong>
                                                                <br />
                                                                <strong>Volte mais tarde!</strong>
                                                                <br />
                                                                <i class="fa fa-heart text-danger"></i>
                                                            </div>
                                                        )
                                                }
                                            </div>

                                            <div class="receberArea">
                                                <h3>Rebidos</h3>
                                                {
                                                    this.state.listMostrarAgendaRec.length > 0 ? (
                                                        /*Repetidor para descarregar o vetor match*/
                                                        this.state.listMostrarAgendaRec.map(mostrarAgenda => (
                                                            <div class="ChatBarAgendamento">
                                                                <div class="alignmentBarAgendamento wdt15">
                                                                    <img src={require('../../assets/imgsPerfil/'
                                                                        + mostrarAgenda.url_img_perfil)} class="profPic" />
                                                                </div>
                                                                <div class="alignmentBarAgendamento wdt70">
                                                                    <h5><b>{mostrarAgenda.nick}</b></h5>
                                                                    <p>{mostrarAgenda.dia}</p>
                                                                    <p>{mostrarAgenda.horario}</p>

                                                                    {
                                                                        mostrarAgenda.confirmacao == "Confirmar" ? (
                                                                            <div class="btnAgendamentos">
                                                                                <button type="button" onClick={e => this.handleConfirmarAgenda(mostrarAgenda.id_agenda)}>
                                                                                    <p>Confirmar</p>
                                                                                </button>
                                                                            </div>
                                                                        ) : (
                                                                                <p>Você confirmou este convite</p>
                                                                            )
                                                                    }
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                            <div className="empty">
                                                                <strong>Sem agendas no momento!</strong>
                                                                <br />
                                                                <strong>Volte mais tarde!</strong>
                                                                <br />
                                                                <i class="fa fa-heart text-danger"></i>
                                                            </div>
                                                        )
                                                }
                                            </div>

                                        </div>
                                    )
                            ) : (
                                    <div class="areaChatImg">
                                        <img src={require('../../assets/imgs/fakechat.png')} class="profPic" />
                                    </div>
                                )
                        }
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
