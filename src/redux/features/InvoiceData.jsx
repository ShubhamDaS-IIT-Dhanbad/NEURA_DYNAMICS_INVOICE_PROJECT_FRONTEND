import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch invoices using the native fetch API
export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async ({ page }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/invoices?page=${page}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        invoices: data.data,
        totalPages: data.totalPages || 1, // Assume totalPages is included in the response
      };
    } catch (error) {
      throw Error(error.message || 'Something went wrong');
    }
  }
);

const initialState = {
  invoiceData: [],
  loading: false,
  currentPage: 1,
  totalPages: 1,
  hasMoreInvoices: true,
  error: null,
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetInvoices: (state) => {
      state.invoiceData = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.hasMoreInvoices = true;
      state.error = null;
    },
    updateInvoice: (state, action) => {
      const index = state.invoiceData.findIndex((inv) => inv.id === action.payload.id);
      if (index !== -1) {
        state.invoiceData[index] = action.payload; // Update the invoice
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        const { invoices, totalPages } = action.payload;
        if (invoices && invoices.length > 0) {
          const newInvoices = invoices.filter(
            (invoice) => !state.invoiceData.some(existingInvoice => existingInvoice.id === invoice.id)
          );
          state.invoiceData = [...state.invoiceData, ...newInvoices];
          state.totalPages = totalPages;
          state.hasMoreInvoices = state.currentPage < totalPages;
        } else {
          state.hasMoreInvoices = false;
        }
        state.loading = false;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.hasMoreInvoices = false;
      });
  },
});

// Exporting actions and reducer
export const { setCurrentPage, resetInvoices, updateInvoice } = invoicesSlice.actions;
export default invoicesSlice.reducer;
