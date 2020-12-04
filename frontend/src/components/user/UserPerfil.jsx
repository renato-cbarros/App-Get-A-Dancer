import React, { Component, useReducer } from 'react'
import axios from 'axios'
import Main from '../templates/Main'
import Logo from '../templates/Logo'
import { Link } from 'react-router-dom'
import './UserPerfil.css'

import logo from '../../assets/imgs/logo.png'

import like from '../../assets/imgs/like.svg'
import dislike from '../../assets/imgs/dislike.svg'
import next from '../../assets/imgs/next.svg'
import prev from '../../assets/imgs/prev.svg'
import itsamatch from '../../assets/imgs/itsamatch.png'

import chat from '../../assets/imgs/fundo1-576.jpg'
import match from '../../assets/imgs/fundo3.jpg'

/*urls do server json */
const baseUrlSession = 'http://localhost:8000/session'
const baseUrlPerfil = 'http://localhost:8000/perfil'
/*objs e listas */
const initialState = {
    perfil: {
        id: '', id_user: '', url_img_perfil: 'branca.png', nick: '', bio: '', dancas_conhecidas: '',
        dancas_desconhecidas: '', distancia_matchs: '', hora_match: ''
    },
    listPerfil: [],
    session: {
        id_user: ''
    },
    listSession: [],
    validaSession: false
}
let file = ''
let fileName = ''
export default class UserPerfil extends Component {

    state = { ...initialState, fileN: 'Escolha alguma imagem' }

    /*Monta o form assim que atualiza*/
    componentWillMount() {
        alert("INFORMAÇÕES DO PERFIL")
        this.getSession()
    }
   
    /*Recarrega o obj perfil*/
    load(perfil) {
        this.setState({ perfil })
    }
    /*Buscar a sessão atual*/
    getSession() {
        let idUserSe = 0
        const method = 'get'
        const urlSes = `${baseUrlSession}/${1}`
        const listSes = []
        axios[method](urlSes)
            .then(resp => {
                listSes.unshift(resp.data)
                this.setState({ listSession: listSes })
                idUserSe = this.state.listSession[0].id_user
                this.getIdPerfil(idUserSe)

            })
    }
    /*Busca o id do perfil a ser alterado */
    getIdPerfil(idUserSe) {
        axios(baseUrlPerfil).then(resp => {
            this.setState({ listPerfil: resp.data })
            const perfilCon = this.state.perfil
            perfilCon.id_user = idUserSe
            this.state.listPerfil.length > 0 && (
                this.state.listPerfil.map(perfil => {
                    if (perfilCon.id_user == perfil.id_user) (
                        this.getPerfil(perfil.id)
                    )
                })
            )
        })
    }
    /*Buscar os dados do usuario com base na sessão atual*/
    getPerfil(idPerfil) {
        const method = 'get'
        const url = `${baseUrlPerfil}/${idPerfil}`
        const list = []
        axios[method](url)
            .then(resp => {
                list.unshift(resp.data)
                this.setState({ listPerfil: list })
                const perfil = { ...this.state.perfil }

                perfil.id = this.state.listPerfil[0].id
                perfil.id_user = this.state.listPerfil[0].id_user
                perfil.url_img_perfil = this.state.listPerfil[0].url_img_perfil
                perfil.nick = this.state.listPerfil[0].nick
                perfil.bio = this.state.listPerfil[0].bio
                perfil.dancas_conhecidas = this.state.listPerfil[0].dancas_conhecidas
                perfil.dancas_desconhecidas = this.state.listPerfil[0].dancas_desconhecidas
                perfil.distancia_matchs = this.state.listPerfil[0].distancia_matchs
                perfil.hora_match = this.state.listPerfil[0].hora_match

                this.load(perfil)
            })
    }
    /*Atualiza a lista de usuarios*/
    getUpdatedList(perfil, add = true) {
        const list = this.state.listPerfil.filter(u => u.id !== perfil.id)
        if (add) list.unshift(perfil)
        return list
    }
    /*Atualiza os campos*/
    updateField(event) {
        const perfil = { ...this.state.perfil }
        perfil[event.target.name] = event.target.value
        this.setState({ perfil })
    }
    /*Atualiza os dados no server json*/
    update() {
        const perfil = this.state.perfil
        const method = 'put'
        const url = `${baseUrlPerfil}/${perfil.id}`
        perfil.nick != '' && perfil.bio != '' && perfil.dancas_conhecidas != ''
            && perfil.dancas_desconhecidas != '' && perfil.distancia_matchs != '' ? (
                axios[method](url, perfil)
                    .then(resp => {
                        const list = this.getUpdatedList(resp.data)
                        this.setState({ perfil: initialState.perfil, list })
                        alert("ALTERADO COM SUCESSO!")
                    })
            ) : (
                alert("CAMPOS EM BRANCO OU SENHAS NÃO CONFEREM!")
            )
    }
    /*Pega o nome, oarquivo de img e atualiza os campos*/
    onChangeHandler = e => {
        file = (e.target.files[0]); {/* o type file da 1 array como padrao, mas para pegar so o primeiro setamos como [0] */ }
        fileName = (e.target.files[0].name); {/* aí ta pegando o nome do target.files na posição 0(que seria a primeira posiçao) */ }
        this.setState({ fileN: fileName })

    }
    /*Salva a img no diretorio */
    onSubmitHandler = async e => {
        {/* define uma função assícrona, que retornará uma Promise(valor que pode estar disponível agora, no futuro
        ou nunca..) */}
        /*Salva o caminho da img de perfil */
        alert(this.state.perfil.id_user)
        this.state.perfil.url_img_perfil = 'imgPerfil' + this.state.perfil.id_user + '.png'
        e.preventDefault();
        const formData = new FormData(); {/* da a opção de compilar um valor de chaves para enviar usando o XMLHttpRequest. É usado geralmente para
            enviar dados de um form */}
        formData.append('file', file, 'imgPerfil' + this.state.perfil.id_user + '.png');
        try {
            {/* o await pausa a async e espera pela resolução da Promise, e depois retorna a execução
                da função async */}
            {/* content-type diz para o client qual é o tipo do conteúdo que a resposta(res) vai ter. */ }
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },

            }); {/* como ja configuramos o proxy, nao precisamos especificar o domínio(localhost/3000) no axios.post */ }
            alert('File uploaded');
            alert('CLIQUE EM ALTERAR PARA IMAGEM SER ATUALIZADA!');
        } catch (err) {
            if (err.response.status === 500) {
                alert('There was a problem with the server');
            } else {
                alert(err.response.data.msg);
            }
        }
    }
    /*Html do form*/
    renderForm() {
        return (
            <div className="areaAccount" /*Div de configuração para area total*/ >
                <div className="logoAreaAccount" /*Div de configuração para area onde ira ficar o chat*/ >
                    <img src={logo} alt="logoAreaPerfil" />
                </div>

                <div className="contentAccount" /*Div de configuração para area onde ira ficar o chat*/ >

                    <div className="formAccount">
                        <div className="letter">
                            <form>
                                <h1>INFORMAÇÕES DE PERFIL</h1>
                                <hr />
                                {
                                    this.state.perfil.url_img_perfil == ('imgPerfil' + this.state.perfil.id_user + '.png') ? (
                                        <div class="alignmentBarPerfil wdtPerfil">
                                            <img src={require('../../assets/imgsPerfil/' + this.state.perfil.url_img_perfil)}
                                                alt={this.state.perfil.nick} class="profPicPerfil" />
                                        </div>
                                    ) : (
                                            <div className="col-12 d-flex justify-content-center mt-2 mb-4">
                                                <label>ATUALIZE SUA FOTO DE PERFIL!</label>
                                            </div>
                                        )
                                }

                                <label for="exampleFormControlFile1">CARREGAR FOTO DE PERFIL</label>
                                <div className="row ml-5">
                                    <div class="form-group d-flex justify-content-center ml-5">
                                        <div class="form-group d-flex justify-content-center ml-5">
                                            <input type="file" class="form-control-file ml-5"
                                                name="file" id="file"
                                                onChange={e => this.onChangeHandler(e)} />
                                        </div>
                                    </div>
                                </div>

                                {this.state.fileN != 'Escolha alguma imagem' ? (
                                    <div>
                                        <div className="col-12 d-flex justify-content-center mt-2 mb-4">
                                            {<label>{"Arquivo: " + this.state.fileN}</label>}
                                        </div>
                                        <div className="col-12 d-flex justify-content-center mt-2 mb-4">
                                            <button className="btn btn-dark" name="btnAlterarBioPerfil" id="btnAlterarBioPerfil"
                                                onClick={e => this.onSubmitHandler(e)}>
                                                REALIZAR UPLOAD
                                                </button>
                                        </div>
                                    </div>
                                ) : (
                                        <div className="col-12 d-flex justify-content-center mt-2 mb-4">
                                            <label>{"Arquivo: " + this.state.fileN}</label>
                                        </div>
                                    )}


                                <label>NOME VISIVEL PARA OUTROS USUARIOS</label>
                                <div class="form-group d-flex justify-content-center">
                                    <input type="text" className="form-control"
                                        name="nick" id="nick"
                                        value={this.state.perfil.nick}
                                        onChange={e => this.updateField(e)}
                                        placeholder="Exemplinho" />
                                </div>

                                <label>BIOGRAFIA</label>
                                <div class="form-group d-flex justify-content-center">
                                    <textarea type="text" className="form-control"
                                        name="bio" id="bio" rows="3"
                                        value={this.state.perfil.bio}
                                        onChange={e => this.updateField(e)}
                                        placeholder="Descreva você :)" />
                                </div>

                                <label>DISTANCIA MAXIMA ENTRE AS COMBINAÇÕES (KM)</label>
                                <div class="form-group d-flex justify-content-center">
                                    <input type="text" className="form-control"
                                        name="distancia_matchs" id="distancia_matchs"
                                        value={this.state.perfil.distancia_matchs}
                                        onChange={e => this.updateField(e)}
                                        placeholder="85" />
                                </div>

                                <label>DANÇAS QUE CONHECE</label>
                                <div class="form-group d-flex justify-content-center">
                                    <input type="text" className="form-control"
                                        name="dancas_conhecidas" id="dancas_conhecidas"
                                        value={this.state.perfil.dancas_conhecidas}
                                        onChange={e => this.updateField(e)}
                                        placeholder="Samba, Forró e Tango" />
                                </div>

                                <label>DANÇAS QUE GOSTARIA DE APRENDER</label>
                                <div class="form-group d-flex justify-content-center">
                                    <input type="text" className="form-control"
                                        name="dancas_desconhecidas" id="dancas_desconhecidas"
                                        value={this.state.perfil.dancas_desconhecidas}
                                        onChange={e => this.updateField(e)}
                                        placeholder="Samba, Forró e Tango" />
                                </div>

                                <div className="row">
                                    <div className="col-12 d-flex justify-content-center mt-4">
                                        <button className="btn btn-dark" name="btnAlterarBioPerfil" id="btnAlterarBioPerfil"
                                            onClick={e => this.update(e)}>
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

            <Main title="Area usuario" navItemFirst="Conta" navItemFirstLink="/userAccount"
                navItemSecond="Área do usuario" navItemSecondLink="/userArea" navItemThird="Sair"
                navItemThirdLink="/" linkLogo="/">
                {this.renderForm()}
            </Main >

        )
    }


}