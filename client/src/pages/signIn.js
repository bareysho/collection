import React, { Component } from 'react';
import { Button, Form, Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import fb_img from '../assets/fb.png';
import tw_img from '../assets/tw.png';
import Wrapper from '../utils/wrapperAxios';
import getStore from '../store/configureStore';
import { loggedIn, toggleTheme, toggleLanguage } from '../action/index';
const api = process.env.REACT_APP_API_URL


export default class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        //console.log('env ', process.env.REACT_APP_API_URL)
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    handleSubmit = event => {
        event.preventDefault();
        let someElement = document.getElementById('textErrorSignin');
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        if (this.state.password.length > 0 && this.state.email.length > 0) {
            const wrapp = new Wrapper();
            wrapp.post('api/users/login', user)
                .then(res => {
                    //console.log("res data: ", res.data);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem("username", res.data.username);
                    localStorage.setItem("id", res.data.id);
                    localStorage.setItem('role', res.data.role);
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('avatar', res.data.avatar);

                    
                    const store = getStore();
                    store.dispatch(loggedIn({username: res.data.username, role: res.data.role, id:res.data.id, isLoggedInStatus: true, avatar:res.data.avatar}));
                    //console.log("Store redux login:  ", store.getState());

                    this.props.history.push(`/user/${res.data.id}`);
                })
                .catch(err => {
                    someElement.innerHTML = err.response.data;
                })
        } else {
            someElement.innerHTML = "Fill in all the fields.";
        }
    }

    render() {
        const href = `${api}/api/signup/facebook` 
        return (
            <>
                <div className="bgSign">
                    <div className="d-flex justify-content-center ">
                        <div className="bgSignInForm" >
                            <Form onSubmit={this.handleSubmit}>
                                <h1>Welcome Back</h1>
                                <Form.Text id="textErrorSignin" name="error" onChange={this.handleChange}></Form.Text>

                                <Form.Group>
                                    <a href={href}>
                                        <Button variant="primary" type="button" id="facebook" block style={{ marginBottom: 8 + 'px' }}>
                                            <img src={fb_img} alt="icon_fb" height="30" />
                                            Sign in with Facebook
                                        </Button>
                                    </a>
                                    <Button variant="primary" type="button" id="twitter" block >
                                        <img src={tw_img} alt="icon_tw" height="30" />
                                        Sign in with Twitter
                                    </Button>
                                </Form.Group>

                                <h5>or</h5>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Email" name="email" onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit" id="login" size="lg" block >
                                        Login
                                    </Button>
                                    <Button href="/SignUp" variant="light" type="button" size="lg" block>
                                        Sign Up
                                    </Button>
                                </Form.Group>

                            </Form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}