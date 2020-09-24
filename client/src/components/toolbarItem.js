import React, { Component } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { LinkContainer } from 'react-router-bootstrap';


class ToolbarItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
        }
    }

    render() {
        return (
           <div>
               <Button variant="dark"> Add </Button>
           </div>
        )
    }
}

export default ToolbarItem;