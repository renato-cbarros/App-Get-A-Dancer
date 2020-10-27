import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserRegistration from '../components/user/UserRegistration'
import UserLogin from '../components/user/UserLogin'
import UserRecovery from '../components/user/UserRecovery'
import UserAccount from '../components/user/UserAccount'
import UserPerfil from '../components/user/UserPerfil'
import UserArea from '../components/user/UserArea'
import Teste from '../components/user/Teste'





//Mapeamento entre as URLs e os componentes

export default props => 
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/userLog' component={UserLogin}/>
        <Route path='/userReco' component={UserRecovery}/>
        <Route path='/userReg' component={UserRegistration}/>
        <Route path='/userArea' component={UserArea}/>
        <Route path='/userAccount' component={UserAccount}/>
        <Route path='/userPerfil' component={UserPerfil}/>
        <Route path='/teste' component={Teste}/>
        <Redirect from='*' to='/' />
    </Switch> 