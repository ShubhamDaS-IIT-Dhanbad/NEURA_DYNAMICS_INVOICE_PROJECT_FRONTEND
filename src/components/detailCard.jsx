import React from 'react';
import '../styles/detailCard.css';

function DetailCard({ detail }) {
  return (
    <div className="detail-card">
      <p><strong>DESCRIPTION~</strong> {detail.description}</p>
      <p><strong>QUANTITY~</strong> {detail.quantity}</p>
      <p><strong>UNIT PRICE~</strong> ${detail.unit_price}</p>
    </div>
  );
}

export default DetailCard;
