import React, {Component} from 'react'
import axios from 'axios'
import {Spinner} from 'reactstrap'

class Order extends Component {
    state = {
        cart: [],
        dataProduct: [],
        isLoading: false
    }
    componentDidMount(){
        this.getListOrder()
    }

    getListOrder = () => {
        this.setState({isLoading: true})
        axios.get('http://127.0.0.1:3001/products/')
        .then(res => {
            if(res.status === 200){
                this.setState({dataProduct: res.data.data})
            }
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            setTimeout(() => {
                this.setState({isLoading: false})
            }, 3000)
        })
    }
    onSelectProduct = (event, item) => {
        this.setState({cart:[...this.state.cart, item]})
        console.log(this.state.cart)
    }
    render() {
        return (
            this.state.isLoading ? (
                <Spinner color='primary' />
            ) : (
                this.state.dataProduct.map((item, index) => {
                    return(
                        <a onClick={(event) => this.onSelectProduct(event,item)} href='javascript:void(0)'>
                            <p>{item.id}</p>
                            <img src={'http://localhost:3001/asset/' + item.image}></img>
                            <p>{item.name}</p>
                        </a>
                    )
                })
            )
        )
    }
}

export default Order