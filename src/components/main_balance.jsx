import React, { Component } from 'react';
import Example from './bootsrapModal';
import UpdateValue from './updateBootstrapModal';
import { Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
// import {Route, Switch} from 'react-router-dom';
// import About from './about';
import { Chart as ChartJS, CategoryScale } from 'chart.js'; // Import CategoryScale
import { Chart as ChartJS1, LinearScale } from 'chart.js'; // Import the LinearScale
import { Chart as ChartJS2, BarController, BarElement } from 'chart.js';

ChartJS.register(CategoryScale); // Register the scale
ChartJS1.register(LinearScale); // Register the linear scale
ChartJS2.register(BarController, BarElement); // Register the necessary components


class Main_Balance extends Component {
    constructor(props){
        super(props);

        this.state = {
            totalPurchased: undefined,
            mainBalance: undefined,
            // product_name: [],
            // product_price: [],
            products: [],
            searchResult: [],
            res: false,
            chartData: {
                labels: [""],
                datasets: [
                    {
                      label: '',
                      data: [0],
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                ]
                }
        };

        this.handleCallback = this.handleCallback.bind(this);
        this.editHandleCallback = this.editHandleCallback.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.searchResults = this.searchResults.bind(this);
    
    }


    // checkBalance = () => {
    //     if(this.state.mainBalance === 0){
    //         let updateMainBalance = prompt("Enter the amount of main balance : ", 0);
    //         this.setState({
    //             mainBalance: updateMainBalance
    //         });
    //         console.log("clicked");
    //     }
    // }
    
    
    // shouldComponentUpdate(nextState) {
    //     let demo = this.state.products;
    //     demo.forEach((value, index, demo) => { if(value.product_name !== nextState.product_name && value.product_price !== nextState.product_price){ value.product_name = nextState.product_name; value.product_price = nextState.product_price}});
        // this.setState({products: demo});
    // }

    searchResults = (event) => {
        console.log("search input clicked : " + typeof(event.target.value));
        let productCopy = this.state.products;
        // let searchedArray = [];
        if(event.target.value === ''){
            this.setState({
                res: false
            });
            console.log("if condition : " + this.state.products);

            if(this.state.res === false || event.target.value === ''){
                const newUpdatedProductsState = [...this.state.products];
                
                this.setState({
                    chartData: {
                    labels: newUpdatedProductsState.map(product => product.product_name),
                    datasets: [
                        {
                          label: 'My Data',
                          data: newUpdatedProductsState.map(product => Number(product.product_price)), // Example data
                          backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                      ]
                    }
                });
            }
        }
        else{
            let searchedArray = productCopy.filter((value) => (value.product_name === event.target.value || value.product_price === event.target.value));
            this.setState({
                searchResult: [...searchedArray],
                res: true
            });
            console.log("else condition :" + this.state.searchResult);
            if(this.state.res === true){
                const newUpdatedProductsState = [...searchedArray];
                
                this.setState({
                    chartData: {
                    labels: newUpdatedProductsState.map(product => product.product_name),
                    datasets: [
                        {
                          label: 'My Data',
                          data: newUpdatedProductsState.map(product => Number(product.product_price)), // Example data
                          backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                      ]
                    }
                });
            }
        }
    }

    handleCallback = (childData) => {
        if(this.state.mainBalance === 0){
            let updateMainBalance = prompt("Enter the amount of main balance : ", 0);
            this.setState({
                mainBalance: updateMainBalance
            });
        } else 
        {
            let newBalance = Number(this.state.mainBalance) - Number(childData.product_price);

            if(newBalance >= 0){
                
                let demo = this.state.products;
                var add = false;
                let matchProductPrice = 0;

                demo.forEach((value) => { 
                    if(value.product_name === childData.product_name){ 
                        add = true;
                        matchProductPrice = value.product_price;
                    }
                });

                if(add)
                {
                    demo.forEach((value) => { if(value.product_name === childData.product_name){ value.product_name = childData.product_name; value.product_price = childData.product_price}});

                    this.setState({
                        products: [...demo]
                    });

                    let updateNewBalance = Number(this.state.mainBalance) + Number(matchProductPrice) - Number(childData.product_price);

                    this.setState({mainBalance: updateNewBalance});
                
                    console.log(this.state.mainBalance);
                } else {
                    
                    this.setState({
                        products: [...this.state.products, childData]
                        // products_name: this.state.product_name.push(childData.product_name),
                        // product_price: this.state.product_price.push(childData.product_price) 
                    });

                    this.setState({mainBalance: Number(this.state.mainBalance) - Number(childData.product_price)});
                    console.log(this.state.mainBalance);
                    
                    const newUpdatedProductsState = [...this.state.products, childData];
                    this.setState({
                        chartData: {
                        labels: newUpdatedProductsState.map(product => product.product_name),
                        datasets: [
                            {
                              label: 'My Data',
                              data: newUpdatedProductsState.map(product => Number(product.product_price)), // Example data
                              backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            },
                          ]
                        }
                    });
            }
            } else {
                alert("You can't purchase because your main balance is low");
            }
        }
    }

    // componentDidUpdate (prevProps, prevState) {
    //     if(this.state.products !== prevState.products){
    //         this.setState({
    //             chartData: {
    //                 labels: this.state.products.map(product => product.product_name),
    //                 datasets: {
    //                     label: "product price",
    //                     data: this.state.products.map(product => product.product_price)
    //                 }
    //             }
    //         });
    //     }
    // }

    editHandleCallback = (childData) => {
        console.log("product index : " + childData.product_index);
        let newBalance = Number(this.state.mainBalance) + Number(childData.old_product_price) - Number(childData.product_price);
        if(newBalance >= 0){
            this.setState({mainBalance: newBalance});  
            // let demo = this.state.products;
            // demo.forEach((value) => { if(value.product_name === childData.product_name && value.product_price === childData.product_price){ value.product_name = childData.product_name; value.product_price = childData.product_price}});

            let demo = this.state.products;
            // let delete_item_index_arr = [];
            demo.forEach((value, index, demo) => { 
                // if(value.product_name === childData.product_name){ 
                //     value.product_name = childData.product_name; 
                //     value.product_price = childData.product_price;
                //     // delete_item_index_arr.push(index);
                // }

                if(index === childData.product_index){ 
                    value.product_name = childData.product_name; 
                    value.product_price = childData.product_price;
                    // delete_item_index_arr.push(index);
                }

            });
            
            // demo.forEach((value, index, demo) => {
            //     delete_item_index_arr.forEach((value1, index1, delete_item_index_arr) => {
            //         if(index === delete_item_index_arr[index1+1]){
            //             demo.splice(index,1);
            //         }
            //     });
            // });
        // this.setState({products: demo});


            this.setState({
                products: [...demo]//[...this.state.products, childData]
            });

            const newUpdatedProductsState = [...this.state.products];

            this.setState({
                chartData: {
                labels: newUpdatedProductsState.map(product => product.product_name),
                datasets: [
                    {
                      label: 'My Data',
                      data: newUpdatedProductsState.map(product => Number(product.product_price)), // Example data
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                ]
                }
            });
        }
         else {
            alert("You can't purchase because your main balance is low");
        }
    }



    handleDelete = (data) => {
        let searchedArray = this.state.searchResult;
        if(searchedArray !== undefined){
        let newsearchedArray = searchedArray.filter((value) => (value.product_name !== data.product_name));
            this.setState({
                searchResult: [...newsearchedArray],
            });
        }
        let stateObj = this.state.products;
        let newStateObj = stateObj.filter(value => value.product_name !== data.product_name);
        this.setState({products: [...newStateObj]});
        this.setState({mainBalance: Number(this.state.mainBalance) + Number(data.product_price)});
        // console.log("product name : " +  data.product_name + " , product price : " + data.product_price);
        // <UpdateValue product_details={"Update Product Name And Price"} editparentCallback={this.editHandleCallback}/>

        const newUpdatedProductsState = [...newStateObj];
        this.setState({
            chartData: {
            labels: newUpdatedProductsState.map(product => product.product_name),
            datasets: [
                {
                  label: 'product price',
                  data: newUpdatedProductsState.map(product => Number(product.product_price)), // Example data
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
            ]
            }
        });
    }

    render() { 
        // let validMainBalance = this.state.mainBalance - bal;
        return (
            <div>
                {/* <Switch>
                    <Route path="/about" component={About} />
                </Switch> */}
                {this.state.mainBalance === undefined && this.setState({mainBalance: prompt("Enter main balance", 0)})} {this.state.totalPurchased === undefined && this.setState({totalPurchased: this.state.mainBalance}) }
                {this.state.mainBalance !== undefined && <h1>Main Balance : {this.state.mainBalance}, Total : {this.state.totalPurchased - this.state.mainBalance}</h1>}
                <Example product_details={"Add Purchased Detail"} parentCallback={this.handleCallback} />
                <input style={{float: "right"}} type="text" onKeyUp={this.searchResults} placeholder='search here...' />
                <br />
                <br />
                <Table striped bordered center="true" hover>
                    <thead>
                        <tr>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    
                    {this.state.res && 
                    this.state.searchResult.map((element, index) => (<tr key={index}><td>{element.product_name}</td> <td>{element.product_price}</td><td><div>{<UpdateValue searchValue={true} all_products={this.state.products} product_index={index} product_details={element} product_main_balance={this.state.mainBalance} product_heading={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path></svg>} editparentCallback={this.editHandleCallback}/>}</div></td><td><div><button type="button" class="btn btn-danger" onClick={() => {this.handleDelete(element)}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path></svg></button></div></td></tr>))} 
                    
                    {this.state.res === false &&
                    this.state.products.map((element, index) => (<tr key={index}><td>{element.product_name}</td> <td>{element.product_price}</td><td><div>{<UpdateValue all_products={this.state.products} product_details={element} product_main_balance={this.state.mainBalance} product_index={index} product_heading={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path></svg>} editparentCallback={this.editHandleCallback}/>}</div></td><td><div><button type="button" class="btn btn-danger" onClick={() => {this.handleDelete(element)}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path></svg></button></div></td></tr>))}
                    </tbody>{/*<button type="button" onClick={this.handleEdit(element)} */}  
                </Table>
                <div>
                    <h1>data visuliation through bar grpah(product_price, product_name)</h1>
                    <Bar  data={this.state.chartData} options={{ scales: {
      y: {
        title: {
          display: true,
          text: 'Product Price', // Your custom Y-axis label
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Product Names', // Your custom Y-axis label
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
        tooltips: {
            enabled: true, // Make sure tooltips are enabled
            callbacks: {
              label: (context) => {
                const { dataIndex } = context;
                const product = this.state.products[dataIndex];
                return `Name: ${product.product_name}, Price: ${product.product_price}`;
              },
            },
        },
    }
  }}/>
                </div>
            </div>
        );
    
    }
}
 
export default Main_Balance;