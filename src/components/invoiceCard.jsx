import React, { useState } from 'react';
import EditInvoiceForm from './editVoiceForm.jsx';
import DetailCard from './detailCard.jsx';
import '../styles/invoiceCard.css';

import { IoIosAddCircle } from "react-icons/io";
import { SiCkeditor4 } from "react-icons/si";

function InvoiceCard({ invoice }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="invoice-card">
      {isEditing ? (
        <EditInvoiceForm invoice={invoice} onCancel={handleCancelEdit} />
      ) : (
        <>
          <h3 className='invoice-card-invoice-id'>INVOICE ID #{invoice.invoice_number}</h3>
          <p className='invoice-card-data'><strong>CUSTOMER NAME~</strong> {invoice.customer_name}</p>
          <p className='invoice-card-data'><strong>TOTAL AMOUNT~</strong> ${invoice.total_amount}</p>
          <p className='invoice-card-data'><strong>DATE~</strong> {invoice.date}</p>

          {invoice.details && invoice.details.length > 0 && (
            <div className="details-section">
              <h4>DETAILS:</h4>
              {invoice.details.map((detail) => (
                <DetailCard key={detail.id} detail={detail} />
              ))}
            </div>
          )}


          <div className='invoice-edit-add-div'>
            <button className="edit-button" onClick={handleEditClick}>< IoIosAddCircle /></button>
            <button className="add-button" onClick={handleEditClick}><SiCkeditor4/></button>
          </div>
        </>
      )}
    </div>
  );
}

export default InvoiceCard;
