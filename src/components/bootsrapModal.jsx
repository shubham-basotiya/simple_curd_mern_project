import React, { Component } from 'react';
// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import TableData from './tableData';
import $ from 'jquery';

class Example extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            show: false,
          }
    }
    
    render() {

        // const [show, setShow] = useState(false);
        const handleClose = () => this.setState({show: false});
        const handleShow = () => this.setState({show: true});

        // const dataSave = (e) => {
        //     // e.target.value = this.props.product_details.product_price;
        //     // return this.value;
        //     this.props.product_details.mainBalance -= e.target.value;
        // }

        const addDataIntoTable = () => {
            let product_name = $('[name="product_name"]').val();
            let product_price = $('[name="product_price"]').val();
            console.log(product_name + " " + product_price);

            let childData = {
                product_name,
                product_price
            }
            this.props.parentCallback(childData);
        }

        return (
            <>
            <Button variant="primary" onClick={handleShow}>{this.props.product_details}</Button>

            <Modal show={this.state.show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>{this.props.product_details}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {('product_details' in this.props) && true} */}
                    <label>Product Name : </label>
                    <input type="text" name="product_name" placeholder='Enter the product name...'/>
                    <br />
                    <br />
                    <label>Product Price : </label> 
                    <input type="number" name="product_price" placeholder='Enter the product price...' />

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => { handleClose(); addDataIntoTable();}}>
                    Save value into db
                </Button>
                </Modal.Footer>
            </Modal>
            </>
        );
    }
}

export default Example;// UpdateValue;