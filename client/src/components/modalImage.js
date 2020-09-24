import React, { Component } from 'react';

class ModalImage extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render() {
        return (
            <Modal show={props.show} onHide={props.handleShow} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Image src={props.item.img} />
                </Modal.Header>
                <Modal.Body>
                    <Container>

                        <Form.Group >
                            <Form.Label>Item fields</Form.Label>

                        </Form.Group>
                    </Container>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        )
    }
}
export default ModalImage;