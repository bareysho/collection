import React, { Component } from 'react';
import { Button, ButtonGroup, Table, Form, Navbar, Container, Nav } from 'react-bootstrap';
import Wrapper from '../utils/wrapperAxios';

function selectAll(param) {
    var items = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < items.length; i++) {
        items[i].checked = param;
    }
}

function findSelect(state) {
    let items = document.querySelectorAll('input[type="checkbox"]');
    let result = [];
    let i = 0;
    if (state) i = 1;
    for (i; i < items.length; i++) {
        if (items[i].checked == true) {
            let elem = document.querySelector(`td[id="${items[i].id}"]`);
            if (elem.textContent == null || elem.textContent == undefined) {
                continue;
            } else result.push(elem.textContent);
        }
    }
    return result;
}

export default class UsersPage extends Component {
    state = {
        users: [],
        isChecked: false
    }


    handleChecked() {
        if (this.state.isChecked) {
            selectAll(false);
            this.setState({ isChecked: false })
        } else {
            selectAll(true);
            this.setState({ isChecked: true })
        }
    }

    setUnlockStatus() {
        const items = findSelect(this.state.isChecked);
        for (let i = 0; i < items.length; i += 1) {
            const user = {
                _id: items[i],
                role: 'user'
            }
            const wrapp = new Wrapper();
            wrapp.put('api/users/user/role', user)
                .then(res => {
                    //wrapp.get('/users/me', user)
                       // .then(res => {
                            this.props.history.push("/users");
                       // })
                       // .catch(err => {
                        //    this.props.history.push("/SignIn");
                        //})
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.props.history.push("/SignIn");
                    }
                });
        }
    }

    setBlockStatus() {
        const items = findSelect(this.state.isChecked);
        for (let i = 0; i < items.length; i += 1) {

            const user = {
                _id: items[i],
                role: 'user_block'
            }
            const wrapp = new Wrapper();
            wrapp.put('api/users/user/role', user)
                .then(res => {
                    //wrapp.wrapperGet('/users/me', user)
                        //.then(res => {
                            this.props.history.push("/users");
                       //})
                        //.catch(err => {
                        //    this.props.history.push("/SignIn");
                        //})
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.props.history.push("/SignIn");
                    }
                });
        }
    }

    deleteUser() {
        const items = findSelect(this.state.isChecked);
        for (let i = 0; i < items.length; i += 1) {
            const user = {
                _id: items[i]
            }
            const wrapp = new Wrapper();
            wrapp.delete('api/users/user', user)
                .then(res => {
                    //wrapp.wrapperGet('/users/me', user)
                       // .then(res => {
                            this.props.history.push("/users");
                        //})
                        //.catch(err => {
                           // this.props.history.push("/SignIn");
                       // })
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.props.history.push("/SignIn");
                    }
                });
        }
    }

    setAdmin() {
        const items = findSelect(this.state.isChecked);
        for (let i = 0; i < items.length; i += 1) {

            const user = {
                _id: items[i],
                role: 'admin'
            }
            const wrapp = new Wrapper();
            wrapp.put('api/users/user/role', user)
                .then(res => {
                    //wrapp.wrapperGet('/users/me', user)
                        //.then(res => {
                            this.props.history.push("/users");
                       //})
                        //.catch(err => {
                        //    this.props.history.push("/SignIn");
                        //})
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.props.history.push("/SignIn");
                    }
                });
        }
    }

    
    componentDidMount() {
        const wrapp = new Wrapper();
        wrapp.get('api/users/')
            .then(res => {
                this.setState({ users: res.data });
            })
            .catch(err => {
                if (err.response.status === 401) {
                    this.props.history.push("/SignIn");
                }
            })
    }

    createLink(id){
        return `/user/${id}`
    }
    
    render() {
        return (
            <>
                <div >
                    <div className="tableM">
                        <div className="d-flex flex-column toolsBar">
                            <ButtonGroup aria-label="Basic example" onClick={this.getStatus}>
                                <Button variant="outline-dark" onClick={this.setBlockStatus.bind(this)}>Block</Button>
                                <Button variant="outline-dark" onClick={this.setUnlockStatus.bind(this)}>Unlock</Button>
                                <Button variant="outline-dark" onClick={this.deleteUser.bind(this)}>Delete</Button>
                                <Button variant="outline-dark" onClick={this.setAdmin.bind(this)}>Set admin</Button>
                                <Button variant="outline-dark" onClick={this.setUnlockStatus.bind(this)}>Remove admin</Button>
                            </ButtonGroup>
                        </div>
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th><Form.Check type="checkbox" className="check" id="checkAll" onChange={this.handleChecked.bind(this)} />Select all</th>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map(user => {
                                            return <tr key={user._id}>
                                                <td><Form.Check type="checkbox" className="check" id={user._id} /></td>
                                                <td id={user._id}>{user._id}</td>
                                                <td><a href={this.createLink(user._id)}>{user.username}</a></td>
                                                <td >{user.email}</td>
                                                <td>{user.role}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}