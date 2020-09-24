import React, { Component } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { LinkContainer } from 'react-router-bootstrap';



class CardItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: props.item,
        }
        //console.log("item ", this.state.item)
    }

    deleteItem() {
        this.props.deleteItem(this.state.item._id);
    }

    editItem() {
        this.props.editItem(this.state.item._id);
    }

    getCardBody() {
        const linkImage = `/collection/${this.state.item._id}`
        return <div className="media-body">
            <Card.Body>
                <Card.Title>{this.state.item.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{this.state.item.topic}</Card.Subtitle>
                <div>
                    <ReactMarkdown source={this.state.item.description} escapeHtml={false} />{' '}
                    {this.state.item.fields.map(data => {
                        if (data.type === 'Checkbox') {
                            let b = 'false';
                            if (data.value) {
                                b = 'true'
                            }
                            return (
                                <div key={data.id + new Date().getMilliseconds()} className="d-flex flex-row">
                                    <p className="cardItemFields">
                                        <b>{data.name}:</b>  {b}
                                    </p>
                                </div>
                            )
                        } else {
                            return (
                                <div key={data.id + new Date().getMilliseconds()} className="d-flex flex-row">
                                    <p className="cardItemFields">
                                        <b>{data.name}:</b>
                                    </p>
                                    <ReactMarkdown source={data.value} escapeHtml={false} />
                                </div>
                            )
                        }
                    })
                    }
                </div>
                <LinkContainer to={linkImage}>
                    <a className="stretched-link"> </a>
                </LinkContainer>
            </Card.Body>

        </div>
    }

    showCardTool() {

        if (this.state.item.authorId === localStorage.getItem('id') || localStorage.getItem('role') === 'admin') {
            return <div className='media position-relative'>
                {this.getCardBody()}
            </div>
        }
        else return <div className='media '>
            {this.getCardBody()}
        </div>
    }


    getImage(){
        if(this.state.item.img === ''){
            return 'https://res.cloudinary.com/dvfmqld3v/image/upload/w_300,h_200/fotoDedault_h4wsk8'
        } else {
            return this.state.item.img;
        } 
    }

    render() {
        const linkAuthor = `/user/${this.state.item.authorId}`;
        return (
            <Card >
                <div className="cardImg ">
                    <div className="cardTool">
                        <button type="button" className="btn btn-outline-light " id="btnEdit" onClick={this.editItem.bind(this)}>
                            <span className="oi oi-pencil" title="icon pencil" aria-hidden="true"></span>
                        </button>
                        <button type="button" className="btn btn-outline-light" id="btnDelete" onClick={this.deleteItem.bind(this)}>
                            <span className="oi oi-trash " title="icon trash" aria-hidden="true"> </span>
                        </button>
                    </div>
                    <Card.Img variant="top" src={this.getImage()} className="cardImg" />
                </div>

                {this.showCardTool()}
                <Card.Footer>
                    <div>
                        <div className="row">
                            <div className="col col-lg-8 col-sm-8 col-md-8 col-xl-6">
                                {
                                    this.state.item.tags.map(tag => {
                                        return <div className="tagFooter" key={tag._id + new Date().getMilliseconds()}>
                                            <span className="badge badge-secondary">{tag.text}</span>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="col col-lg-4 col-sm-4 col-md-4 col-xl-6">
                                <div className="linkFooter">
                                    by  <LinkContainer to={linkAuthor} >
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

export default CardItem;