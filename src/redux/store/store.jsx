import {configureStore} from '@reduxjs/toolkit';
import invoices from '../features/InvoiceData.jsx';

const store=configureStore({
    reducer:{
        invoices:invoices
    }
});
export default store;