import React, { Component } from 'react';
import { Button, Form, Navbar, Container, Nav } from 'react-bootstrap';
import Wrapper from '../utils/wrapperAxios';
import { LinkContainer } from 'react-router-bootstrap'
import AvatarChoose from '../components/avatarChoose'
import axios from 'axios';



export default class UserSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            avatar: '',
            file: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        const wrapp = new Wrapper();
        wrapp.get('api/users/user/' + localStorage.getItem("id"))
            .then(res => {
                this.setState({
                    username: res.data.username,
                    email: res.data.email,
                    avatar: res.data.avatar
                });
                //console.log("get user avatar", this.state.avatar)

            })
            .catch(err => {
                console.log(err);
            })
    }

    deleteAccount() {
        const wrapp = new Wrapper();
        //console.log("local storage ID: ", localStorage.getItem("id"));
        const userDelete = {
            _id: localStorage.getItem("id")
        }

        wrapp.delete('api/users/user', userDelete)
            .then(res => {
                this.props.history.push("/SignIn");
            })
            .catch(err => {
                if (err.response.status === 401) {
                    this.props.history.push("/SignIn");
                }
            });
    }

    setAvatar(url) {
        console.log("url ", url)
        this.setState({ avatar: url });
    }

    handleScanner = () => {
        const formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("tags", 'text_detection');
        formData.append("upload_preset", 'yczph1h5');
        formData.append("api_key", "246125568439137");
        formData.append("timestamp", (Date.now() / 1000) | 0);

        return axios.post(`https://api.cloudinary.com/v1_1/dvfmqld3v/image/upload`, formData, { headers: { "X-Requested-With": "XMLHttpRequest" } })
            .then(response => {
                //console.log("avatar new ", response.data.secure_url)
                this.setAvatar(response.data.secure_url);
            })
            .catch(err => console.log("error", err))
    }

    saveSettings() {

        let someElement = document.getElementById('textError');

        this.handleScanner().then(() => {
            console.log("state avatar", this.state.avatar);

            const user = {
                _id: localStorage.getItem('id'),
                username: this.state.username,
                email: this.state.email,
                avatar: this.state.avatar
            };

            if (this.state.email.length > 0 && this.state.username.length > 0) {
                if (this.state.password === this.state.passwordConfirm) {
                    const wrapp = new Wrapper();
                    if (this.state.password.length != 0) {
                        const userPassword = {
                            _id: localStorage.getItem('id'),
                            password: this.state.password
                        };

                        wrapp.put('api/users/user/password', userPassword)
                            .then(res => {

                            })
                            .catch(err => {
                                someElement.innerHTML = err;
                            })
                    }

                    wrapp.put('api/users/user', user)
                        .then(res => {
                            localStorage.setItem("username", this.state.username);
                            localStorage.setItem('avatar', this.state.avatar);

                            this.props.history.push(`/user/${localStorage.getItem('id')}`);
                        })
                        .catch(err => {
                            someElement.innerHTML = err;
                        })
                } else {
                    someElement.innerHTML = "Passwords do not match.";
                }
            } else {
                someElement.innerHTML = "Fill in all the fields.";
            }
        });

    }

    updateAvatar(file) {
        this.setState({ file });
    }


    render() {
        console.log("prev ", this.state.avatar);
        return (
            <>
                <div className="divSetting d-flex justify-content-start flex-column">
                    <div className="titleSetting" >
                        <h2> Edit Your Profile </h2>
                    </div>

                    <Form.Group name="avatar_form" >
                        <h5>Avatar</h5>
                        <div className="d-flex align-items-center flex-row">
                            <AvatarChoose src={this.state.avatar} updateAvatar={this.updateAvatar.bind(this)} />
                        </div>
                    </Form.Group>
                    <Form.Text id="textError" name="error" onChange={this.handleChange}></Form.Text>
                    <Form.Group name="data_form" >
                        <Form.Group controlId="formBasicUsername" >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" name="username" onChange={this.handleChange} value={this.state.username} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" >
                            <Form.Label>Password</Form.Label>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Label>Password Confirm</Form.Label>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password Confirm" name="passwordConfirm" onChange={this.handleChange} />
                            </Form.Group>

                        </Form.Group>

                        <Form.Group controlId="formBasicDelete" >
                            <Form.Label>Delete your account</Form.Label>

                            <div >
                                <Button variant="outline-danger" onClick={this.deleteAccount.bind(this)}>Delete your account (You can't undo this!)</Button>
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <div>
                                <Button variant="dark" type="button" id="save" size="lg" block onClick={this.saveSettings.bind(this)}>
                                    Save
                                </Button>

                                <LinkContainer to="/user">
                                    <Button variant="light" type="button" id="cancel" size="lg" block>
                                        Cancel
                                    </Button>
                                </LinkContainer>
                            </div>

                        </Form.Group>

                    </Form.Group>


                </div>
            </>
        )
    }
}