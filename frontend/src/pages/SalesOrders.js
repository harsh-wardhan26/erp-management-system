import { useEffect, useState } from "react";
import API from "../api/api";
import {
  TextField,
  Button,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";
import { toast } from "react-toastify";

function SalesOrders() {

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [form, setForm] = useState({
    customer: "",
    product: "",
    quantity: ""
  });

  // FETCH DATA
  const fetchData = async () => {
    try {

      const [cRes, pRes, oRes] = await Promise.all([
        API.get("/customers"),
        API.get("/products"),
        API.get("/sales-orders")
      ]);

      setCustomers(Array.isArray(cRes.data) ? cRes.data : cRes.data.customers || []);
      setProducts(Array.isArray(pRes.data) ? pRes.data : pRes.data.products || []);
      setOrders(Array.isArray(oRes.data) ? oRes.data : []);

    } catch (err) {
      toast.error("Error loading data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CALCULATE TOTAL
  const getTotal = () => {
    const product = products.find(p => p._id === form.product);
    if (!product) return 0;
    return product.price * Number(form.quantity || 0);
  };

  // CREATE ORDER
  const handleSubmit = async () => {
    try {

      const payload = {
        customer: form.customer,
        products: [
          {
            product: form.product,
            quantity: Number(form.quantity)
          }
        ],
        totalPrice: getTotal(),
        status: "pending"
      };

      await API.post("/sales-orders", payload);

      toast.success("Order created");

      setForm({
        customer: "",
        product: "",
        quantity: ""
      });

      fetchData();

    } catch (err) {
      console.log(err.response?.data);
      toast.error("Error creating order");
    }
  };

  return (

    <div>

      <h2>Sales Orders</h2>

      {/* FORM */}
      <Paper style={{ padding: "20px", marginBottom: "20px" }}>

        <TextField
          select
          label="Customer"
          name="customer"
          value={form.customer}
          onChange={handleChange}
          style={{ marginRight: "10px", width: "200px" }}
        >
          {customers.map(c => (
            <MenuItem key={c._id} value={c._id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Product"
          name="product"
          value={form.product}
          onChange={handleChange}
          style={{ marginRight: "10px", width: "200px" }}
        >
          {products.map(p => (
            <MenuItem key={p._id} value={p._id}>
              {p.title}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Quantity"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />

        <TextField
          label="Total"
          value={getTotal()}
          disabled
          style={{ marginRight: "10px" }}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Create Order
        </Button>

      </Paper>

      {/* TABLE */}
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {orders.map(o => (
            <TableRow key={o._id}>

              <TableCell>{o.customer?.name || o.customer}</TableCell>

              <TableCell>
                {o.products?.[0]?.product?.title || o.products?.[0]?.product}
              </TableCell>

              <TableCell>{o.products?.[0]?.quantity}</TableCell>
              <TableCell>₹{o.totalPrice}</TableCell>
              <TableCell>{o.status}</TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>

    </div>
  );
}

export default SalesOrders;