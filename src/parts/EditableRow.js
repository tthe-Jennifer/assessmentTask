import React from 'react'

const EditableRow = ({ editOrderData, handleEditOrderChange, handleCancel }) => {
    return (
        
        <tr class="editableRow">
            <td> 
                <input type="text" name="orderNo" required="required" placeholder="Enter an Order Number" value={editOrderData.orderNo} onChange={handleEditOrderChange}></input>
                </td>
            <td>
                <input type="text" name="date" required="required" placeholder="Enter Delivery Date" value={editOrderData.date} onChange={handleEditOrderChange}></input>
                </td>
            <td>
                <input type="text" name="customer" required="required" placeholder="Enter Customer's Name" value={editOrderData.customer} onChange={handleEditOrderChange}></input>
            </td>
            <td>
                <input type="text" name="trackingNo" required="required" placeholder="Tracking Number" value={editOrderData.trackingNo} onChange={handleEditOrderChange}></input>
            </td>
            <td>
                <input type="text" name="status" required="required" placeholder="Shipment Status" value={editOrderData.status} onChange={handleEditOrderChange}></input>
            </td>
            <td>
                <input type="text" name="consignee" required="required" placeholder="Consignee Name" value={editOrderData.consignee} onChange={handleEditOrderChange}></input>
            </td>
            <td>
                <button type="submit">Save</button>
                <button type='button' onClick={handleCancel}>Cancel</button>
            </td>
        </tr>
       
    )

}

export default EditableRow 