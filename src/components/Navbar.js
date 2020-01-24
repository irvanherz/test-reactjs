import React, {Component} from 'react';
import {Navbar,NavbarBrand,Nav,NavbarToggler,Collapse,NavItem,NavLink,NavbarText} from 'reactstrap'
import {withRouter, Link} from 'react-router-dom'

class NavbarEdited extends Component {
  state = {
    matches: window.matchMedia('(min-width:768px)').matches,
    collapsed: false,
    userData: []
  }

  componentDidMount() {
    const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 768px)").addListener(handler);
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  handleLogout = (event) => {
    event.preventDefault()
    try {
      localStorage.removeItem('dataAccount')
      this.props.history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  render(){
    console.log(this.state.matches)
    return (
      <div>
        {this.state.matches ? (
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Store</NavbarBrand>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link to="/order">Pesan</Link>
              </NavItem>
            </Nav>
            <NavbarText>{this.state.userData.username}</NavbarText>
            <NavLink onClick={(event) => {this.handleLogout(event)}}href="#">Logout</NavLink>
          </Navbar>
        ):(
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Store</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} />
            <Collapse isOpen={this.state.collapsed} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/components/">Components</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                </NavItem>
              </Nav>
              <NavbarText>{this.state.userData.username}</NavbarText>
              <NavLink onClick={(event) => {this.handleLogout(event)}}href="#">Logout</NavLink>
            </Collapse>
          </Navbar>
        )}
    </div>
    )
  }
} 
export default withRouter(NavbarEdited);
