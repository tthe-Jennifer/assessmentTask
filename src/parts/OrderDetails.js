import React, { useState } from 'react'



const OrderDetails = ({ order }) => {
    const [viewOrderData, setViewOrderData] = useState({
        orderNo: '',
        date: '',
        customer: '',
        trackingNo: '',
        status: '',
        consignee: '' 
        }
    )
    const handleViewOrderButton = (event) => {
        event.preventDefault();
    
        const defOrder = event.target.getAttribute("name");
        const defValue = event.target.value;
    
        const newOrderData = { ...viewOrderData };
        newOrderData[defOrder] = defValue;
    
        setViewOrderData(newOrderData);
      };

    return (
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
            <th scope= "col">Actions</th>
          </tr>
        </thead> 
        <tr>
            <td>{order.orderNo}</td>
            <td>{order.date}</td>
            <td>{order.customer}</td>
            <td>{order.trackingNo}</td>
            <td>{order.status}</td>
            <td>{order.consignee}</td>
            {/* <td>
                <button type="button" onClick={(event) => handleViewOrderButton(event, order)}>Order details</button>
            </td> */}
        </tr>
        </table>
        </div>
    )

}

export default OrderDetails  

// <OrderDetails order = {order} handleViewOrderButton= {handleViewOrderButton}
//onClick={(event) => handleEditButton(event, order)}
