import React from 'react'
// import EditableRow from './EditableRow'
// import { BrowserRouter, Route, Link } from "react-router-dom";

const UnEditableRow = ({ order, handleEditButton, handleDeleteButton, handleClickView }) => {
    return (
        <tr>
            <td>{order.orderNo}</td>
            <td>{order.date}</td>
            <td>{order.customer}</td>
            <td>{order.trackingNo}</td>
            <td>{order.status}</td>
            <td>{order.consignee}</td>
            <td>
                <button type="button"
                onClick={(event) => handleEditButton(event, order)}
                >EDIT</button>
               <button type= "button" onClick={()=> handleDeleteButton(order.orderNo)}>Delete</button>
               <a href="#" onClick={() => handleClickView(order)}>Details</a>
            </td>
        </tr>
    )

}

export default UnEditableRow 

// arrow function on line 18 to prevent the function from being caled unless on click
//{orders.map((order) => (
    // // <Fragment>
    // { editOrderNo === order.orderNo ? (<EditableRow editOrderData= {editOrderData} handleEditOrderChange={handleEditOrderChange} /> 
    // ) : (
    // <UnEditableRow order= {order} / <a href='./OrderDetails.js'> - <Link to="./OrderDetails"> </Link>