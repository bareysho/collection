import React, { Component, useState } from 'react';
import { Button, Card, Container, Image, Modal } from 'react-bootstrap';
import plus1_img from '../assets/plus1.png';
import NewCollectionModal from './newCollectionModal'

function AddCardCollection(props) {
    const [show, setShow] = useState(false);
    
    const handleShow = () => {
        setShow(!show);
        props.changeStateUpdate();
    };
 
    return (      
            <NewCollectionModal {...{show, handleShow}}/>
    );
}
 
export default AddCardCollection;
