import React, { useState } from 'react';
import EditInvoiceForm from './editVoiceForm.jsx';
import DetailCard from './detailCard.jsx';
import '../styles/invoiceCard.css';
import { IoIosAddCircle } from "react-icons/io";
import { SiCkeditor4 } from "react-icons/si";
import { FaDeleteLeft } from "react-icons/fa6";

function InvoiceCard({ invoice, onInvoiceDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState(invoice.details || []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/invoices/delete/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invoice_id: invoice.invoice_number }),
      });

      if (response.status === 200) {
        alert("Invoice deleted successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error deleting invoice:", errorData);
        alert(`Failed to delete invoice: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
      alert("Failed to delete invoice.");
    }
  };

  const handleDetailDeleted = (detailId) => {
    setDetails((prevDetails) => prevDetails.filter((detail) => detail.id !== detailId));
  };
  // const handleInvoiceDeleted = (invoiceId) => {
  //   setDetails((prevDetails) => prevDetails.filter((number) => invoice.invoice_number!== invoiceId));
  // };

  return (
    <div className="invoice-card">
      {isEditing ? (
        <EditInvoiceForm invoice={invoice} onCancel={handleCancelEdit} />
      ) : (
        <>
          <FaDeleteLeft
            size={25}
            className="delete-button"
            onClick={handleDeleteClick}
          />
          <h3 className="invoice-card-invoice-id">INVOICE ID #{invoice.invoice_number}</h3>

          <p className="invoice-card-data"><strong>CUSTOMER NAME~</strong> {invoice.customer_name}</p>
          <p className="invoice-card-data"><strong>TOTAL AMOUNT~</strong> ${invoice.total_amount}</p>
          <p className="invoice-card-data"><strong>DATE~</strong> {invoice.date}</p>

          {details.length > 0 && (
            <div className="details-section">
              <h4>DETAILS:</h4>
              {details.map((detail) => (
                <DetailCard
                  key={detail.id}
                  detail={detail}
                  invoice_id={invoice.invoice_number}
                  onDetailDeleted={handleDetailDeleted}
                />
              ))}
            </div>
          )}

          <div className="invoice-edit-add-div">
            <button className="edit-button" onClick={()=>alert("Add detail feature not implemented due to time constraint")}>
              <IoIosAddCircle />
            </button>
            <button className="add-button" onClick={handleEditClick}>
              <SiCkeditor4 />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default InvoiceCard;
