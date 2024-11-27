import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateInvoice } from '../redux/features/InvoiceData.jsx'; // Import your Redux action
import '../styles/editVoiceCard.css';

import { MdCancel } from "react-icons/md";
import { IoSave } from "react-icons/io5";

function EditInvoiceForm({ invoice, onCancel, onUpdate }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: invoice.id,
    invoice_number: invoice.invoice_number,
    customer_name: invoice.customer_name,
    total_amount: invoice.total_amount,
    date: invoice.date,
    details: invoice.details || [],
  });

  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.details];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    setFormData((prev) => ({ ...prev, details: updatedDetails }));
  };

  const handleUpdateSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/invoices/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update invoice: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Update successful:', result);

      // Dispatch Redux action to update state
      dispatch(updateInvoice(formData));

      onUpdate(); // Notify parent about successful update
      onCancel();
    } catch (error) {
      console.error('Error updating invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="edit-invoice-form" onSubmit={(e) => e.preventDefault()}>
      <h3 style={{marginBottom:"10px"}}>UPDATE INVOICE ID #{formData.invoice_number}</h3>
      
      <p className='invoice-card-data'><strong>CUSTOMER NAME~</strong> 
      <input
          type="text"
          name="customer_name"
          value={formData.customer_name}
          onChange={handleFormChange}
        />
      </p>

      <p className='invoice-card-data'><strong>TOTAL AMOUNT~</strong>
      <input
          type="number"
          name="total_amount"
          value={formData.total_amount}
          onChange={handleFormChange}
        />
      </p>

      <p className='invoice-card-data'><strong>DATE~</strong>
      <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleFormChange}
        />
      </p>


      
      
      <h4 style={{marginTop:"10px"}}>DETAILS:</h4>
      {formData.details.map((detail, index) => (
        <div key={detail.id || index} className="detail-card">
          <label>
            DESCRIPTION~
            <input
              type="text"
              value={detail.description}
              onChange={(e) =>
                handleDetailChange(index, 'description', e.target.value)
              }
            />
          </label>
          <label>
            QUANTITY~
            <input
              type="number"
              value={detail.quantity}
              onChange={(e) =>
                handleDetailChange(index, 'quantity', e.target.value)
              }
            />
          </label>
          <label>
            UNIT PRICE~
            <input
              type="number"
              value={detail.unit_price}
              onChange={(e) =>
                handleDetailChange(index, 'unit_price', e.target.value)
              }
            />
          </label>
        </div>
      ))}


      <div className='invoice-edit-add-div'>
        <button className="add-button" onClick={handleUpdateSubmit} disabled={loading}>
          <IoSave/>
        </button>
        <button className="add-button" onClick={onCancel}>< MdCancel/></button>
      </div>

    </form>
  );
}

export default EditInvoiceForm;
