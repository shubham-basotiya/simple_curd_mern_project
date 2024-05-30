import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import $ from 'jquery';

class UpdateValue extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            show: false,
            warning: false,
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

        const checkValue = () => {
            let product_name = $('[name="product_name"]').val();
            let all_products = this.props.all_products;

            all_products.forEach(element => {console.log(element.product_name);});
            all_products.forEach(element => {
                if(element.product_name === product_name){
                    // this.setState({warning: true});
                    // console.log(this.state.warning + "warning true");

                    alert('Please provide different product name');
                    $('[name="product_name"]').val('');

                }
            });
            // console.log(this.state.warning);
            // if(this.state.warning === true){
            //     alert('Please provide different product name');
            //     $('[name="product_name"]').val = '';
            // }
        }

        const updateDataIntoTable = () => {
            let product_name = $('[name="product_name"]').val();
            let product_price = $('[name="product_price"]').val();// + this.props.product_main_balance;
            let old_product_name = this.props.product_details.product_name;
            let old_product_price = this.props.product_details.product_price;
            var product_index = this.props.product_index;
            let all_products = this.props.all_products;
            console.log(product_name + " " + product_price);
            let searchValue = this.props.searchValue;
            console.log("product index : " + searchValue);
            // all_products.forEach(element => {console.log(element.product_name + " " + element.product_price);});
            // all_products.forEach(element => {
            //     if(element.product_name === product_name){
            //         this.setState({warning: true});
            //         console.log("warning true");
            //     }
            // });
            // console.log(this.state.warning);
            // if(this.state.warning){
            //     alert('Please provide different product name');
            // } else{

            if(searchValue === true){
                all_products.forEach((element, index, all_products) => {
                        if(element.product_name === old_product_name){
                            // this.setState({warning: true});
                            product_index = index;
                            console.log("warning true: " + product_index);
                        }
                    });
            }
                let childData = {
                    product_name,
                    product_price,
                    old_product_name,
                    old_product_price,
                    product_index
                }
                // this.props.parentCallback(childData);
                this.props.editparentCallback(childData);
            // }
        }

        return (
            <>
            <Button variant="primary" onClick={handleShow}>{this.props.product_heading}</Button>

            <Modal show={this.state.show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>{this.props.product_heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {('product_details' in this.props) && true}
                    <label>Product Name : </label>
                    <input type="text" name="product_name" placeholder='Enter the product name...' onBlur={checkValue} defaultValue={this.props.product_details.product_name}/>
                    <br />
                    <br />
                    <label>Product Price : </label> 
                    <input type="number" name="product_price" placeholder='Enter the product price...' defaultValue={this.props.product_details.product_price} />

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => { handleClose(); updateDataIntoTable();}}>
                    Updated Value Into DB
                </Button>
                </Modal.Footer>
            </Modal>
            </>
        );
    }
}

export default UpdateValue;