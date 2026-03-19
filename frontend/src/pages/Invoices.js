import { useEffect, useState } from "react";
import API from "../api/api";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import { toast } from "react-toastify";

function Invoices() {

  const [salesOrders, setSalesOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const [form, setForm] = useState({
    salesOrder: "",
    amount: "",
    status: "unpaid"
  });

  // FETCH DATA
  const fetchData = async () => {
    try {

      const [sRes, iRes] = await Promise.all([
        API.get("/sales-orders"),
        API.get("/invoices")
      ]);

      setSalesOrders(Array.isArray(sRes.data) ? sRes.data : []);
      setInvoices(Array.isArray(iRes.data) ? iRes.data : []);

    } catch (err) {
      toast.error("Error loading invoices");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);

    // Auto set amount from selected sales order
    if (updated.salesOrder) {
      const order = salesOrders.find(o => o._id === updated.salesOrder);
      if (order) {
        setForm({
          ...updated,
          amount: order.totalPrice
        });
      }
    }
  };

  // CREATE INVOICE
  const handleSubmit = async () => {
    try {

      if (!form.salesOrder) {
        return toast.error("Select sales order");
      }

      const payload = {
        salesOrder: form.salesOrder,
        amount: form.amount,
        status: form.status
      };

      await API.post("/invoices", payload);

      toast.success("Invoice created");

      setForm({
        salesOrder: "",
        amount: "",
        status: "unpaid"
      });

      fetchData();

    } catch (err) {
      console.log(err.response?.data);
      toast.error("Error creating invoice");
    }
  };

  return (

    <Box sx={{ p: 3 }}>

      <Typography variant="h5" mb={2}>
        Invoices
      </Typography>

      {/* FORM */}
      <Paper sx={{ p: 3, mb: 3, maxWidth: 600 }}>

        <TextField
          select
          fullWidth
          label="Select Sales Order"
          name="salesOrder"
          value={form.salesOrder}
          onChange={handleChange}
          margin="normal"
        >
          {salesOrders.map(o => (
            <MenuItem key={o._id} value={o._id}>
              Order - ₹{o.totalPrice}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Amount"
          value={form.amount}
          margin="normal"
          disabled
        />

        <TextField
          select
          fullWidth
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="unpaid">Unpaid</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
        </TextField>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Create Invoice
        </Button>

      </Paper>

      {/* TABLE */}
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {invoices.map(i => (
            <TableRow key={i._id}>

              <TableCell>
                {i.salesOrder?._id?.slice(-5)}
              </TableCell>

              <TableCell>₹{i.amount}</TableCell>
              <TableCell>{i.status}</TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>

    </Box>
  );
}

export default Invoices;