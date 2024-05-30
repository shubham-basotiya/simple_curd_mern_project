import React, {Component} from 'react';

class PurchaseDetail extends Component {
    constructor(props){
        super(props);
    }

    render(){

        this.setState({
            mainBalance: 1000-(this.props.rateDetail)
        });

        return (
            
            <div>
                <p>purchase 1 : {this.props.rateDetail}</p>
            </div>
        );
    }
}

export default PurchaseDetail;