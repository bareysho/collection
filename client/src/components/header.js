import React, { Component } from 'react';
import { Button, ButtonGroup, Table, Form, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import getStore from '../store/configureStore';
import { loggedIn, toggleTheme, toggleLanguage } from '../action/index';
import { LinkContainer } from 'react-router-bootstrap'

const store = getStore().getState();

function AdminPanel(props) {
    if (props.user.role === 'admin') {
        return (
            < LinkContainer to="/users" >
                <Navbar.Brand >
                    All users
                </Navbar.Brand>
            </LinkContainer >)
    } else {
        return null;
    }
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        }
    }

    logout() {
        localStorage.setItem('token', '');
        localStorage.setItem("username", '');
        localStorage.setItem("id", '');
        localStorage.setItem('role', '');
        localStorage.setItem('isLoggedIn', false);
        localStorage.setItem('avatar', '');
    }



    render() {
        //console.log(" this.props.user store", this.props.user)
        
        if (this.props.user.isLoggedInStatus && this.props.user.isLoggedInStatus != "false") {
            let link = `/user/${localStorage.getItem('id')}`;
            return (
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand >
                                Home
                            </Navbar.Brand>
                        </LinkContainer>
                        <AdminPanel user={this.props.user}></AdminPanel>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            </Nav>
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            </form>
                            <form className="form-inline">
                                <img className="roundImg" src={this.props.user.avatar} alt="Avatar User" height="30"  />
                            </form>
                            <Form inline>
                                <NavDropdown title={this.props.user.username} variant="Secondary">
                                    <NavDropdown.Divider />
                                    <LinkContainer to={link}>
                                        <NavDropdown.Item >
                                            Your profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to={link}>
                                        <NavDropdown.Item >
                                            Your collection
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item href="/SignIn" onClick={this.logout.bind(this)}>
                                        Logout
                                    </NavDropdown.Item>

                                    <NavDropdown.Divider />
                                </NavDropdown>

                                <LinkContainer to={link}>
                                    <Button variant="outline-info" style={{ marginLeft: 25 + 'px' }}>
                                        Upload
                                    </Button>
                                </LinkContainer>


                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )
        }
        return (
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >
                            Home
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                        <Form inline>
                            <LinkContainer to="/SignIn">
                                <Button variant="outline-info" style={{ marginLeft: 30 + 'px' }}>
                                    Sign In
                                </Button>
                            </LinkContainer>
                        </Form>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        )

    }
}

export default Header;