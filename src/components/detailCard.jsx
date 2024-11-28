import React from 'react';
import '../styles/detailCard.css';
import { FaDeleteLeft } from "react-icons/fa6";

function DetailCard({ detail, invoice_id, onDetailDeleted }) {
  const handleDeleteClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/invoices/delete/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoice_id: invoice_id, // Pass the invoice ID
          detail_id: detail.id, // Pass the detail ID
        }),
      });

      if (response.status === 200) {
        alert("Detail deleted successfully!");
        onDetailDeleted(detail.id); // Notify parent about the deletion
      } else {
        const errorData = await response.json();
        console.error("Error deleting detail:", errorData);
        alert(`Failed to delete detail: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error deleting detail:", error);
      alert("Failed to delete detail.");
    }
  };

  return (
    <div className="detail-card">
      <FaDeleteLeft size={25} onClick={handleDeleteClick} />
      <p><strong>DESCRIPTION~</strong> {detail.description}</p>
      <p><strong>QUANTITY~</strong> {detail.quantity}</p>
      <p><strong>UNIT PRICE~</strong> ${detail.unit_price}</p>
    </div>
  );
}

export default DetailCard;
