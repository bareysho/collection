import React, { Component } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import getStore from '../store/configureStore';
import Wrapper from '../utils/wrapperAxios';
import { LinkContainer } from 'react-router-bootstrap';
import ReactMarkdown from 'react-markdown';
import CardItem from '../components/cardItem';
import ModalItem from '../components/modalItem'
import { truncate } from 'fs';

let item = {};

export default class Collection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            initialItems: [],
            title: '',
            description: '',
            topic: '',
            fields: [],
            author: '',
            authorId: '',
            idCollection: this.props.match.params.idCollection,

            update: false,
            show: false,
            headerModal: '',
            typeModal: '',

            filters: [],
        }
        //console.log("Store redux home:  ", store.getState());
    }

    clearItemModel() {
        item = {
            title: '',
            img: '',
            fields: this.state.fields,
            tags: [],
            author: this.state.author,
            authorId: this.state.authorId
        };
    }

    changeStateUpdate() {
        this.setState({ update: !this.state.update })
    }

    handleShow() {
        this.setState({
            show: !this.state.show
        });
        this.changeStateUpdate();
    }

    handleShowNewItem() {
        this.setState({
            show: !this.state.show,
            headerModal: 'New Item',
            typeModal: 'new'
        });
        // console.log('state ', this.state.fields)
        this.changeStateUpdate();
        this.clearItemModel();
    }


    deleteItem(id) {
        const req = { _idCollection: this.state.idCollection, idItem: id };
        const wrapp = new Wrapper();
        wrapp.put(`api/collections/collection/${this.state.idCollection}/delete/${id}`, req)
            .then(res => {
                this.changeStateUpdate();
            })
            .catch(err => {
                console.log(err);
            });
    }

    editItem(_id) {
        const wrapp = new Wrapper();
        wrapp.get(`api/collections/${this.state.idCollection}/${_id}`)
            .then(res => {
                console.log("item ", res.data)
                item.title = res.data.title;
                item.topic = res.data.topic;
                item.img = res.data.img;
                item.fields = res.data.fields;
                item.tags = res.data.tags;
                item.id = res.data._id;

                this.setState({
                    show: !this.state.show,
                    headerModal: 'Edit Item',
                    typeModal: 'edit',
                    fields: res.data.fields
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    showItems() {
        const wrapp = new Wrapper();
        wrapp.get(`api/collections/${this.state.idCollection}`)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    topic: res.data.topic,
                    fields: res.data.fields,
                    author: res.data.author,
                    authorId: res.data.authorId,
                    items: res.data.items || [],
                    initialItems: res.data.items || [],

                });
                this.refresh();

            })
            .catch(err => {
                console.log(err);
            });

    }


    componentDidMount() {
        this.showItems();
        this.clearItemModel();

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.update !== prevState.update) {
            this.showItems();
        }
    }

    showButtonAdd() {
        if (this.state.author === localStorage.getItem("username") || localStorage.getItem("role") === 'admin') {
            return <Button variant="outline-dark" onClick={this.handleShowNewItem.bind(this)}> Add </Button>
        }
    }

    sortByTitle(arr) {
        arr.sort((a, b) => a.title > b.title ? 1 : -1);
    }

    handleChange(event) {
        if (event.target.value === 'Title') {
            // let sortItems = this.state.filteredItems;
            // this.sortByTitle(sortItems);
            // this.setState({ filteredItems: filteredItems })
        }
        if (event.target.value === 'Date') {
            this.changeStateUpdate();
        }

    }

    filterByPhoto(event) {
        let filters = this.state.filters;
        if (event.target.checked) {
            filters.push({ id: 'fieldPhoto', func: (item) => { return !!item.img } });
        } else {
            const index = filters.findIndex(f => f.id === 'fieldPhoto');
            filters.splice(index, 1);
        }
        this.setState(state => ({ filters: filters }));
        this.refresh();

    }

    filterByCheckbox(event, field) {
        var filters = this.state.filters;
        if (event.target.checked) {
            filters.push({ id: field.id, func: (item) => { return item.fields.some(f => f.value === true && f.name === field.name); } });
        } else {
            const index = filters.findIndex(f => f.id === field.id);
            filters.splice(index, 1);
        }
        this.setState(state => ({ filters: filters }));
        this.refresh();
    }

    refresh() {
        let items = this.state.initialItems;

        this.state.filters.forEach(filter => {
            items = items.filter(filter.func);
        });

        this.setState({ items: items })
    }

    render() {
        const linkAuthor = `/user/${this.state.authorId}`;
        return (
            <div>
                <div className="divSetting">
                    <Container>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <h1>{this.state.title}</h1>
                            <p className="text-muted">{this.state.initialItems.length} photos collected by
                                <LinkContainer to={linkAuthor}>
                                    <a> {this.state.author}</a>
                                </LinkContainer>
                            </p>
                            <div className="description">
                                <Container>
                                    <h4 className="">Description</h4>
                                    <ReactMarkdown source={this.state.description} escapeHtml={false} />{' '}
                                </Container>

                            </div>

                        </div>
                    </Container>

                    <Container>
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <div className="d-flex flex-row">
                                <h4 className="itemsTool">Items</h4>
                                {this.showButtonAdd()}
                            </div>

                            <div className="d-flex flex-row justify-content-around">
                                <Form.Check className="checkboxCollection" type="checkbox" label='With foto' onChange={e => this.filterByPhoto(e)}
                                    defaultChecked={false} id='checkPhoto' />
                                {this.state.fields.map(field => {
                                    if (field.type === 'Checkbox') {
                                        return (
                                            <div key={field.id + new Date().getMilliseconds() -67}>
                                                <Form.Check className="checkboxCollection" type="checkbox" label={field.name} name={field.name} onChange={e => this.filterByCheckbox(e, field)}
                                                    defaultChecked={false} />
                                            </div>)
                                    } else {
                                        return;
                                    }
                                })}
                            </div>


                            <div className="d-flex align-items-center ">
                                <p className="text-muted itemsTool"> Sort By: </p>
                                <div>
                                    <select className="form-control" onChange={(e) => this.handleChange(e)}>
                                        <option value="Date" name="date">Date</option>
                                        <option value="Title" name="title">Title</option>
                                    </select>
                                </div>

                            </div>
                        </div>

                        <div className="row ">
                            {
                                this.state.items.map(item => {
                                    return <div className=" card-deck col-xs-12 col-lg-6 col-xl-4" style={{ marginTop: 3 + '%' }} key={item._id + new Date().getMilliseconds() }>
                                        <CardItem
                                            deleteItem={this.deleteItem.bind(this)}
                                            editItem={this.editItem.bind(this)}
                                            item={item}
                                        />
                                    </div>
                                })
                            }

                            <ModalItem
                                show={this.state.show}
                                handleShow={this.handleShow.bind(this)}
                                changeStateUpdate={this.changeStateUpdate.bind(this)}
                                header={this.state.headerModal}
                                type={this.state.typeModal}
                                item={item}
                                fields={this.state.fields}
                                topic={this.state.topic}
                                collectionId={this.state.idCollection}
                            />
                        </div>

                    </Container>

                </div>
            </div>
        )
    }
}