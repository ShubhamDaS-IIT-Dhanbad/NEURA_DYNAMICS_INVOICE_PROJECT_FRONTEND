import React, { useState } from 'react';
import axios from 'axios'; // Assuming you use axios for API requests
import { IoSave } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import '../styles/addInvoice.css';
import { IoIosAddCircle } from "react-icons/io";

const AddInvoice = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    total_amount: '',
    date: '',
    details: [{ description: '', quantity: '', unit_price: '' }],
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form field changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle invoice details field changes
  const handleDetailChange = (index, field, value) => {
    const updatedDetails = formData.details.map((detail, i) =>
      i === index ? { ...detail, [field]: value } : detail
    );
    setFormData((prev) => ({
      ...prev,
      details: updatedDetails,
    }));
  };

  // Add a new detail row
  const handleAddDetail = () => {
    setFormData((prev) => ({
      ...prev,
      details: [...prev.details, { description: '', quantity: '', unit_price: '' }],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the data as JSON
    const invoiceData = {
      customer_name: formData.customer_name,
      total_amount: formData.total_amount,
      date: formData.date,
      details: formData.details,
    };

    try {
      // Send the data in JSON format
      const response = await fetch('http://127.0.0.1:8000/api/invoices/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData), // Send invoiceData instead of formData
      });

      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage('Invoice added successfully!');
        setErrorMessage('');
        // Reset form or do additional things
        setFormData({
          customer_name: '',
          total_amount: '',
          date: '',
          details: [{ description: '', quantity: '', unit_price: '' }],
        });
      } else {
        setErrorMessage('Failed to add invoice. Please try again.');
        setSuccessMessage('');
      }

    } catch (error) {
      setErrorMessage('Failed to add invoice. Please try again.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="add-new-invoice">
      <h3 className='invoice-card-invoice-id'>ADD NEW INVOICE</h3>

      <form onSubmit={handleSubmit} className="edit-invoice-form">
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className='invoice-card-data'>
          <strong>CUSTOMER NAME~</strong>
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleFormChange}
          />
        </p>

        <p className='invoice-card-data'>
          <strong>DATE~</strong>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleFormChange}
          />
        </p>

        <h4 style={{ marginTop: "10px" }}>DETAILS:</h4>
        {formData.details.map((detail, index) => (
          <div key={index} className="detail-card">
            <p className='invoice-card-data'>
              <strong>DESCRIPTION~</strong>
              <input
                type="text"
                value={detail.description}
                onChange={(e) => handleDetailChange(index, 'description', e.target.value)}
                required
              />
            </p>

            <p className='invoice-card-data'>
              <strong>QUANTITY~</strong>
              <input
                type="number"
                value={detail.quantity}
                onChange={(e) => handleDetailChange(index, 'quantity', e.target.value)}
                required
              />
            </p>

            <p className='invoice-card-data'>
              <strong>UNIT PRICE~</strong>
              <input
                type="number"
                value={detail.unit_price}
                onChange={(e) => handleDetailChange(index, 'unit_price', e.target.value)}
                required
              />
            </p>
          </div>
        ))}

        <button type="button" className="add-detail-add-invoice" onClick={handleAddDetail}>
          <IoIosAddCircle className="add-detail-add-invoice-IoIosAddCircle" size={50} />
        </button>

        <div className="invoice-edit-add-div">
          <button type="submit" className="add-button" disabled={loading}>
            <IoSave />
          </button>
          <button className="add-button" type="button" onClick={() => setFormData({
            customer_name: '',
            total_amount: '',
            date: '',
            details: [{ description: '', quantity: '', unit_price: '' }],
          })}>
            <MdCancel />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInvoice;
