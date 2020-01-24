import React from "react"
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from "./pages/Login"
import Main from "./pages/Main"
import Navbar from './components/Navbar';
import Home from "./pages/Home"
import Order from "./pages/Order"


export default class App extends React.Component {
    state = {
        isLogin: false
    }
    componentDidMount(){
        const data = JSON.parse(localStorage.getItem('dataAccount'))
        if(data){
            this.setState({isLogin:true})
        }
    }
    render(){
        return(
            <BrowserRouter>
                {this.state.isLogin && <Navbar {...this.props} />}
                <Switch>
                    <Route path='/' exact render={(props) => (<Main {...props} />)} />
                    <Route path='/login' exact render={(props) => (<Login {...props} />)} />
                    <Route path='/home' exact render={(props) => (<Home {...props} />)} />
                    <Route path='/order' exact render={(props) => (<Order {...props} />)} />
                </Switch>
            </BrowserRouter>
        )
    }
}