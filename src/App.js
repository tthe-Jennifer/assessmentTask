import './App.css';
import React, { useState, Fragment } from 'react';
import { nanoid } from 'nanoid';
import data from "./shipmentsdata.json"
import UnEditableRow from "./parts/UnEditableRow"
import EditableRow from './parts/EditableRow';
import "bootstrap/dist/css/bootstrap.min.css";


// import { BrowserRouter, Route, Link } from "react-router-dom";


const App = () => {
  const [orders, setOrders] = useState(data);
  const [addOrderData, setAddOrderData] = useState({
    orderNo: '',
    date: '',
    customer: '',
    trackingNo: '',
    status: '',
    consignee: '' 
    }
  );

  const [view, setView] = useState(false);
  const [viewOrderData, setViewOrderData] = useState({});
  const handleClickView = (orderNoId) => {
    setViewOrderData(orderNoId);
    setView(true);
  };

  const hideModal = () => {
    setOrders(false);
  };

  // fornholding the data while its being edited
  const [editOrderData, setEditOrderData] = useState({
    orderNo: '',
    date: '',
    customer: '',
    trackingNo: '',
    status: '',
    consignee: '',
  })
// for editing the data
  const [editOrderNo, setEditOrderNo] = useState(null);

  // for adding new data to the data from the form. this updates when a data on the form changes
  const handleAddForm = (event) => {
    event.preventDefault();

    const defOrder = event.target.getAttribute("name");
    const defValue = event.target.value;

    const newOrderData = { ...addOrderData };
    newOrderData[defOrder] = defValue;

    setAddOrderData(newOrderData);
  };

  // doing same as above for the editing part
  const handleEditOrderChange = (event) => {
    event.preventDefault();

    const defOrder = event.target.getAttribute("name");
    const defValue = event.target.value;

    const newOrderData = { ...editOrderData };
    newOrderData[defOrder] = defValue;

    setEditOrderData(newOrderData);
  }
// adding the new data to respective array position
  const handleAddOrderFormSubmit = (event) => {
    event.preventDefault();

    const newOrder = {
      id: nanoid(),
      orderNo: addOrderData.orderNo,
      date: addOrderData.date,
      customer: addOrderData.customer,
      trackingNo: addOrderData.trackingNo,
      status: addOrderData.status,
      consignee: addOrderData.consignee,
    };
    const newOrders = [...orders, newOrder];
    setOrders(newOrders);
  };

  // to handle the saving of the edited items
  const handleEditOrderSubmit = (event) => {
    event.preventDefault();

    const editedOrder = {
      id: editOrderNo, 
      orderNo: editOrderData.orderNo,
      date: editOrderData.date,
      customer: editOrderData.customer,
      trackingNo: editOrderData.trackingNo,
      status: editOrderData.status,
      consignee: editOrderData.consignee,
    }

    const newOrders = [ ...orders];

    const index = orders.findIndex((order) => order.orderNo === editOrderNo);

    newOrders[index] = editedOrder;

    setOrders(newOrders);
    setEditOrderNo(null);
  }

  // creating the edit button and linking it to specific data row
  const handleEditButton = (event, order) => {
    event.preventDefault();
    setEditOrderNo(order.orderNo);

    const orderValues = {
      orderNo: order.orderNo,
      date: order.date,
      customer: order.customer,
      trackingNo: order.trackingNo,
      status: order.status,
      consignee: order.consignee,
    }

    setEditOrderData(orderValues);
  }

  const handleDeleteButton = (orderNoId) => {
    const newOrders = [...orders];

    const index = orders.findIndex((order)=> order.orderNo === orderNoId);

    newOrders.splice(index, 1);

    setOrders(newOrders);
  }

  // const handleViewOrderButton = (orderNoId) => {
  //   const newOrders = [...orders];

  //   const index = orders.findIndex((order)=> order.orderNo === orderNoId);
    
  //   orderNo: order.orderNo,
  //     date: order.date,
  //     customer: order.customer,
  //     trackingNo: order.trackingNo,
  //     status: order.status,
  //     consignee: order.consignee,

  // }



  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css?family=Lato: 100,300,400,700|Luckiest+Guy|Oxygen:300,400" rel="stylesheet"></link>
      <ul class="navigation">
              <li><img src="https://cdn.phenompeople.com/CareerConnectResources/KUNAGLOBAL/images/Jobadsheader-1598457961772.jpg" height="20px;" alt='KNpeople'></img></li>
              <a href= "https://jobs.kuehne-nagel.com/global/en/about-us"><li class="active">KNpeople</li></a>
              <li>Profiles</li>
              <li>Settings</li>
            </ul>
            
       <div class="search">Search the table</div>
       <div class="search">
       <h2>
        Add new shipment data
      </h2>
      <form onSubmit={handleAddOrderFormSubmit}>
        <input type="text" name="orderNo" required="required" placeholder="Enter an Order Number" onChange={handleAddForm}></input>
        <input type="text" name="date" required="required" placeholder="Enter Delivery Date" onChange={handleAddForm}></input>
        <input type="text" name="customer" required="required" placeholder="Enter Customer's Name" onChange={handleAddForm}></input>
        <input type="text" name="trackingNo" required="required" placeholder="Tracking Number" onChange={handleAddForm}></input>
        <input type="text" name="status" required="required" placeholder="Shipment Status" onChange={handleAddForm}></input>
        <input type="text" name="consignee" required="required" placeholder="Consignee Name" onChange={handleAddForm}></input>
      <button type="submit">Add data</button>
      </form> 
      </div>
      <form onSubmit={handleEditOrderSubmit}>
       <table>
        <thead>
          <tr>
            <th scope= "col">Order Number</th>
            <th scope= "col">Delivery Date</th>
            <th scope= "col">Customer</th>
            <th scope= "col">Tracking Number</th>
            <th scope= "col">Status</th>
            <th scope= "col">Consignee</th>
            <th scope= "col">Actions</th>
          </tr>
        </thead> 
        {/* maps the given data according to specifications below */}
            <tbody>
              {orders.map((order) => (
                <Fragment>
                  { editOrderNo === order.orderNo ? (<EditableRow editOrderData= {editOrderData} handleEditOrderChange={handleEditOrderChange} /> 
                  ) : (
                  <UnEditableRow order= {order} handleEditButton= {handleEditButton} handleDeleteButton= {handleDeleteButton} handleClickView={handleClickView} />) }
                </Fragment>
              ))}
        </tbody>
      </table>
      {view && <Modal details={viewOrderData} handleClose={hideModal} />}
      </form>
    </div>
  );
  }
  const Modal = ({ handleClose, details }) => {
    return (
      <div className="modal display-block">
        <section className="modal-main">
          <div>
            <table>
            <thead>
          <tr>
            <th scope= "col">Order Number</th>
            <th scope= "col">Delivery Date</th>
            <th scope= "col">Customer</th>
            <th scope= "col">Tracking Number</th>
            <th scope= "col">Status</th>
            <th scope= "col">Consignee</th>
          </tr>
        </thead> 
              <tbody>
                <tr>
                  <td>{details?.orderNo}</td>
                  <td>{details?.date}</td>
                  <td>{details?.customer}</td>
                  <td>{details?.trackingNo}</td>
                  <td>{details?.status}</td>
                  <td>{details?.consignee}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button onClick={handleClose} target="_blank" >close</button>
        </section>
      </div>
    );
  };
  
export default App;
