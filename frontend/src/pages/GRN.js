import { useEffect, useState } from "react";
import API from "../api/api";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper
} from "@mui/material";
import { toast } from "react-toastify";

function GRN() {

  const [purchaseOrders, setPurchaseOrders] = useState([]);

  const [form, setForm] = useState({
    purchaseOrder: "",
    product: "",
    quantity: ""
  });

  // FETCH PURCHASE ORDERS
  const fetchPO = async () => {
    try {

      const res = await API.get("/purchase-orders");

      const data = Array.isArray(res.data) ? res.data : [];

      setPurchaseOrders(data);

    } catch (err) {
      toast.error("Failed to load purchase orders");
    }
  };

  useEffect(() => {
    fetchPO();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT GRN
  const handleSubmit = async () => {
    try {

      if (!form.purchaseOrder || !form.product || !form.quantity) {
        return toast.error("Fill all fields");
      }

      const payload = {
        purchaseOrder: form.purchaseOrder,
        receivedProducts: [
          {
            product: form.product,
            quantity: Number(form.quantity)
          }
        ]
      };

      await API.post("/grn", payload);

      toast.success("GRN created & stock updated");

      setForm({
        purchaseOrder: "",
        product: "",
        quantity: ""
      });

    } catch (err) {
      console.log(err.response?.data);
      toast.error("Error creating GRN");
    }
  };

  // GET PRODUCTS FROM SELECTED PO
  const selectedPO = purchaseOrders.find(
    (po) => po._id === form.purchaseOrder
  );

  const products = selectedPO?.products || [];

  return (

    <Box sx={{ padding: 3 }}>

      <Typography variant="h5" mb={2}>
        Goods Receipt Note (GRN)
      </Typography>

      <Paper sx={{ padding: 3, maxWidth: 600 }}>

        {/* PURCHASE ORDER */}
        <TextField
          select
          fullWidth
          label="Select Purchase Order"
          name="purchaseOrder"
          value={form.purchaseOrder}
          onChange={handleChange}
          margin="normal"
        >
          {purchaseOrders.map((po) => (
            <MenuItem key={po._id} value={po._id}>
              PO - {po._id.slice(-5)}
            </MenuItem>
          ))}
        </TextField>

        {/* PRODUCT */}
        <TextField
          select
          fullWidth
          label="Select Product"
          name="product"
          value={form.product}
          onChange={handleChange}
          margin="normal"
          disabled={!form.purchaseOrder}
        >
          {products.map((p) => (
            <MenuItem key={p.product._id} value={p.product._id}>
              {p.product.title}
            </MenuItem>
          ))}
        </TextField>

        {/* QUANTITY */}
        <TextField
          fullWidth
          label="Received Quantity"
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          margin="normal"
        />

        {/* BUTTON */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Submit GRN
        </Button>

      </Paper>

    </Box>
  );
}

export default GRN;