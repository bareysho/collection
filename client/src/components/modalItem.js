import React, { Component } from "react";
import { Modal, Button, Card, Container, Image, Form, Tab, Nav, Col, Row } from "react-bootstrap";
import DndFile from './dndFile';
import Wrapper from '../utils/wrapperAxios';
import Tags from '../components/tags';


const ModalItem = (props) => {
    const { show, handleShow, header, type, item, changeStateUpdate, fields, collectionId, topic } = props;

    let parametrs = item;

    const saveItem = (type) => {
        let someElement = document.getElementById("textErrorModalItem");

        if (type === "new") {
            if (parametrs.title === '') {
                someElement.innerHTML = 'Fill in all the fields with *';
            } else {
                //console.log("parametrs all", parametrs)
                const newItem = {
                    _idCollection: collectionId,
                    title: parametrs.title,
                    author: parametrs.author,
                    authorId: parametrs.authorId,
                    tags: parametrs.tags,
                    fields: parametrs.fields,
                    topic: topic,
                    img: parametrs.img
                }

                const wrapp = new Wrapper();
                wrapp.post(`api/collections/collection/${collectionId}/item`, newItem)
                    .then(res => {
                        handleShow();
                    })
                    .catch(err => {
                        someElement.innerHTML = err;
                    })
            }
        } else {
            const updateItem = {
                _id: parametrs.id,
                title: parametrs.title,
                tags: parametrs.tags,
                fields: parametrs.fields,
                img: parametrs.img
            }

            const wrapp = new Wrapper();
            wrapp.put(`api/collections/collection/${collectionId}/update/${parametrs.id}`, updateItem)
                .then(res => {
                    handleShow();
                })
                .catch(err => {
                    someElement.innerHTML = err;
                })
        }
    }

    function handleChange(event) {
        parametrs[event.target.name] = event.target.value
    }

    function handleChange2(event, id) {
        parametrs.fields.map(f => {
            if (f.id === id) {
                f.value = event.target.value;
            }
        });
    }

    function setImg(url) {
        parametrs.img = url;
    }

    function getTags(tags) {
        parametrs.tags = tags;
    }

    function onChangeFavorite(event, id) {
        parametrs.fields.map(f => {
            if (f.id === id) {
                f.value = event.target.checked;
            }
        });
    };


    function fieldsItem(field) {
        //console.log('field.value', field.value)
        switch (field.type) {
            case 'Number':
                return <Form.Group as={Row} key={field.id}>
                    <Form.Label column sm="2">{field.name}</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="number"
                            name="Number"
                            onChange={(e) => handleChange2(e, field.id)}
                            defaultValue={field.value}
                        />
                    </Col>
                </Form.Group>
                break;
            case 'String':
                return <Form.Group as={Row} key={field.id}>
                    <Form.Label column sm="2">{field.name}</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            name='String'
                            onChange={(e) => handleChange2(e, field.id)}
                            defaultValue={field.value}
                        />
                    </Col>
                </Form.Group>
                break;
            case 'Text':
                return <Form.Group as={Row} key={field.id}>
                    <Form.Label column sm="2">{field.name}</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            as="textarea"
                            rows="2"
                            name='Text'
                            onChange={(e) => handleChange2(e, field.id)}
                            defaultValue={field.value}
                        />
                    </Col>
                </Form.Group>
                break;
            case 'Checkbox':
                return <Form.Group key={field.id} >
                    <Form.Check type="checkbox" label={field.name} name={field.name} onChange={e => onChangeFavorite(e, field.id)}
                        defaultChecked={field.value} />
                </Form.Group >
                break;
            case 'Date':
                return <Form.Group as={Row} key={field.id}>
                    <Form.Label column sm="2">{field.name}</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="date"
                            rows="3"
                            name='Date'
                            onChange={(e) => handleChange2(e, field.id)}
                            defaultValue={field.value}
                        />
                    </Col>
                </Form.Group>
                break;
        }
    }

    //console.log('params ', parametrs)
    return (
        <>
            <Modal show={show} onHide={handleShow} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title >{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Text id="textErrorModalItem" > </Form.Text>
                    <Container>
                        <Form.Group >
                            <Form.Label>Image: </Form.Label>
                            <DndFile setCover={setImg} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Item title:*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                name="title"
                                onChange={(e) => handleChange(e)}
                                defaultValue={parametrs.title}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Tags:*</Form.Label>
                            <Tags getTags={getTags} defaultTags={parametrs.tags} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Item fields</Form.Label>
                            {fields.map((field) => {
                                return fieldsItem(field);
                            })}


                        </Form.Group>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShow}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => saveItem(type)}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
};

export default ModalItem;