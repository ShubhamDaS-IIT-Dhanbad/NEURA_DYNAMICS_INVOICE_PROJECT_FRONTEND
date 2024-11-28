import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../redux/features/InvoiceData.jsx';
import InvoiceCard from '../components/invoiceCard.jsx';
import '../styles/home.css';

import { MdDelete } from "react-icons/md";
function Home() {
  const dispatch = useDispatch();
  const { invoiceData: invoices, loading, error } = useSelector((state) => state.invoices);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchInvoices({ page: currentPage }));
  }, [dispatch, currentPage]);

  return (
    <div className="home-container">
      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {!loading && !error && invoices.length > 0 ? (
        <div className="invoice-list">
          {invoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      ) : (
        !loading && <p className="no-invoices-text">No invoices to display</p>
      )}
    </div>
  );
}

export default Home;

