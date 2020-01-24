import React from 'react'
import axios from 'axios'
import qs from 'qs'
export default class Login extends React.Component {
    componentDidMount() {
        const data = localStorage.getItem('dataAccount')
        if(data){
            this.props.history.push('/home')
        }
    }
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    handleUsername(event){
        let localUsername = event.target.value
        this.setState({username: localUsername})
    }

    handlePassword(event){
        let localPassword = event.target.value
        this.setState({password: localPassword})
    }
    handleSubmitLogin(event){
        event.preventDefault()
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        if(this.state.username === "" && this.state.password === ""){
            alert("Username kosong!")
        } else {
            const body = qs.stringify(data)
            axios.post('http://127.0.0.1:3001/auth/signin', body)
            .then(res => {
                if(res.status === 200){
                    localStorage.setItem('dataAccount', JSON.stringify(res.data.data))
                    this.props.history.push('/home')
                }
            })
            .catch (err => {
                console.log(err)
            })
        }
    }
    render(){
        return(
            <div>
                <form>
                    <input type='input' placeholder='username' onChange={(event) => this.handleUsername(event)}></input>
                    <input type='input' placeholder='password' onChange={(event) => this.handlePassword(event)}></input>
                    <button type='submit' onClick={(event) => this.handleSubmitLogin(event)}>Login</button>
                </form>
            </div>
        )
    }
}