import React, { Component } from "react";
import { Form} from "react-bootstrap";

let inputFieldsName = React.createRef();
let inputFieldsType = React.createRef();

class AddingFields extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: []
        }
    }

    addField() {
        const name = inputFieldsName.current.value;
        const type = inputFieldsType.current.value;
        if (name != '') {
            this.setState(state => ({ fields: [...state.fields, { 'id': new Date().getMilliseconds(), 'type': type, 'name': name, 'value': '' }] }));
        }
    }

    deleteField(id) {
        this.setState(({ fields }) => {
            const index = fields.findIndex(element => element.id === id);
            const before = fields.slice(0, index);
            const after = fields.slice(index + 1);
            const newArray = [...before, ...after];
            return {
                fields: newArray
            }
        })        
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.fields !== prevState.fields) {
            this.props.updateFields(this.state.fields);
        }
    }

    componentDidMount(){
        this.setState({fields : this.props.fields})
    }

    render() {
        return (
            <Form.Group >
                <Form.Label>Item fields (Optionals)</Form.Label>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="inputCity">Type</label>
                        <select className="form-control" id="exampleFormControlSelect1" ref={inputFieldsType}>
                            <option>Number</option>
                            <option>Checkbox</option>
                            <option>String</option>
                            <option>Text</option>
                            <option>Date</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputNameField">Name</label>
                        <input type="text" className="form-control" id="inputNameField" ref={inputFieldsName} />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputCity">Add</label>
                        <button type="button" className="btn btn-dark" onClick={this.addField.bind(this)}>Add</button>
                    </div>
                </div>
                {
                    this.state.fields.map(item => {
                        return <div key={item.id + new Date().getMilliseconds() - 23} className="fieldsList">
                            <h4><span className="badge ">{item.type}  :  {item.name}</span></h4>
                            <button type="button" className="btn buttonX" id="btnEdit" onClick={() => this.deleteField(item.id)}>
                                <span className="oi oi-x " title="icon x" aria-hidden="true"></span>
                            </button>
                        </div>
                    })
                }

            </Form.Group>
        );
    }
}

export default AddingFields;