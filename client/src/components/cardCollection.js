import React, { Component } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import img_default from '../assets/card_default.jpeg'
import ReactMarkdown from 'react-markdown';
import { LinkContainer } from 'react-router-bootstrap';


class CardCollection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: props.item,
        }
    }

    editCollection() {
        this.props.editCollection(this.state.item._id);
    }

    deleteCollection() {
        this.props.deleteCollection(this.state.item._id);
    }

    getCardBody() {
        const linkCollection = `/collection/${this.state.item._id}`
        return <div className="media-body">
            <Card.Body>
                <Card.Title>{this.state.item.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{this.state.item.topic}</Card.Subtitle>
                <div>
                    <ReactMarkdown source={this.state.item.description} escapeHtml={false} />{' '}
                </div>
                <LinkContainer to={linkCollection}>
                    <a className="btn btn-secondary">Go </a>
                </LinkContainer>
            </Card.Body>
        </div>
    }

    showCardTool() {
        //console.log('item state', this.state.item)
        if (this.props.nameAuthor === localStorage.getItem('username') || localStorage.getItem('role') === 'admin') {
            return <div className='media position-relative'>
                {this.getCardBody()}
            </div>
        }
        else return <div className='media '>
            {this.getCardBody()}
        </div>
    }

    componentDidMount() {

    }

    getCover() {
        if (this.state.item.cover === '') {
            return 'https://res.cloudinary.com/dvfmqld3v/image/upload/w_300,h_200/logoDefault_chafgb'
        } else {
            return this.state.item.cover;
        }
    }

    render() {

        return (
            <Card >
                <div className="cardImg ">
                    <div className="cardTool">
                        <button type="button" className="btn btn-outline-light " id="btnEdit" onClick={this.editCollection.bind(this)}>
                            <span className="oi oi-pencil" title="icon pencil" aria-hidden="true"></span>
                        </button>
                        <button type="button" className="btn btn-outline-light" id="btnDelete" onClick={this.deleteCollection.bind(this)}>
                            <span className="oi oi-trash " title="icon trash" aria-hidden="true"> </span>
                        </button>
                    </div>
                    <Card.Img variant="top" src={this.getCover()} className="cardImg" />
                </div>

                {this.showCardTool()}

                <Card.Footer>
                    <div>
                        <div className="row">
                            <div className="col col-lg-4 col-sm-4 col-md-4 col-xl-6">
                                <div className="">
                                    by  <LinkContainer to={`/user/${this.state.item.authorId}`} >
                                        <a> {this.state.item.author}</a>
                                    </LinkContainer>
                                </div>
                            </div>
                        </div>  
                    </div>                 
                </Card.Footer>
            </Card >
        )
    }
}

export default CardCollection;