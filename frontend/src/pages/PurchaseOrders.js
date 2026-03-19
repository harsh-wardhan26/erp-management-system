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

function PurchaseOrders() {

  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [form, setForm] = useState({
    supplier: "",
    product: "",
    quantity: ""
  });

  // FETCH DATA
  const fetchData = async () => {
    try {

      const [sRes, pRes, oRes] = await Promise.all([
        API.get("/suppliers"),
        API.get("/products"),
        API.get("/purchase-orders")
      ]);

      setSuppliers(Array.isArray(sRes.data) ? sRes.data : sRes.data.suppliers || []);
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

  // CREATE PURCHASE ORDER
  const handleSubmit = async () => {
    try {

      if (!form.supplier || !form.product || !form.quantity) {
        return toast.error("Fill all fields");
      }

      const payload = {
        supplier: form.supplier,
        products: [
          {
            product: form.product,
            quantity: Number(form.quantity)
          }
        ],
        status: "pending"
      };

      await API.post("/purchase-orders", payload);

      toast.success("Purchase order created");

      setForm({
        supplier: "",
        product: "",
        quantity: ""
      });

      fetchData();

    } catch (err) {
      console.log(err.response?.data);
      toast.error("Error creating purchase order");
    }
  };

  return (

    <div>

      <h2>Purchase Orders</h2>

      {/* FORM */}
      <Paper style={{ padding: "20px", marginBottom: "20px" }}>

        <TextField
          select
          label="Supplier"
          name="supplier"
          value={form.supplier}
          onChange={handleChange}
          style={{ marginRight: "10px", width: "200px" }}
        >
          {suppliers.map(s => (
            <MenuItem key={s._id} value={s._id}>
              {s.name}
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
          type="number"
          value={form.quantity}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Create PO
        </Button>

      </Paper>

      {/* TABLE */}
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Supplier</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {orders.map(o => (
            <TableRow key={o._id}>

              <TableCell>{o.supplier?.name || o.supplier}</TableCell>

              <TableCell>
                {o.products?.[0]?.product?.title || o.products?.[0]?.product}
              </TableCell>

              <TableCell>{o.products?.[0]?.quantity}</TableCell>
              <TableCell>{o.status}</TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>

    </div>
  );
}

export default PurchaseOrders;