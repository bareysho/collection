import React, { Component } from 'react';
import { Button, Form, Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Wrapper from '../utils/wrapperAxios';
import fb_img from '../assets/fb.png';
import tw_img from '../assets/tw.png';
const api = process.env.REACT_APP_API_URL

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            role: 'user'
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    signupFacebook() {
        const wrapp = new Wrapper();
        let someElement = document.getElementById('textErrorSignin');
        wrapp.get('api/signup/facebook')
            .then(res => {
                console.log("response facebook", res.data);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("username", res.data.username);

                this.props.history.push("/Home");
            })
            .catch(err => {
                someElement.innerHTML = err;
            })
    }

    handleSubmit = event => {
        event.preventDefault();
        let someElement = document.getElementById('textErrorSignin');
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        };

        if (this.state.email.length > 0 && this.state.password.length > 0 && this.state.username.length > 0) {
            const wrapp = new Wrapper();
            wrapp.post('api/users/signup', user)
                .then(res => {
                    console.log("response ", res.data);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("username", res.data.username);
                    localStorage.setItem("id", res.data.id);

                    this.props.history.push(`/user/${res.data.id}`);
                })
                .catch(err => {
                    someElement.innerHTML = err;
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
                                <h1>Join</h1>
                                <Form.Text id="textErrorSignin" name="error" onChange={this.handleChange}></Form.Text>

                                <Form.Group>
                                    <div className="fb-login-button" data-width="" data-size="large" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false"></div>

                                    <a href={href}>
                                        <Button variant="primary" type="button" id="facebook" block  style={{marginBottom: 8 + 'px'}}>
                                            <img src={fb_img} alt="icon_fb" height="30" />
                                            Sign up with Facebook
                                        </Button>
                                    </a>

                                    <Button variant="primary" type="button" id="twitter" block>
                                        <img src={tw_img} alt="icon_tw" height="30" />
                                        Sign up with Twitter
                                    </Button>
                                </Form.Group>

                                <h6>or</h6>

                                <Form.Group controlId="formBasicUsername">
                                    <Form.Control type="text" placeholder="Username" name="username" onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Email" name="email" onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit" id="signUp" size="lg" block>
                                        Sign Up
                                    </Button>
                                    <div className="textSign">
                                        Have an account? <a href="/SignIn" className="linkSign" >Sign In</a>
                                    </div>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}