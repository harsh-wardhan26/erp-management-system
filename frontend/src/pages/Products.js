import { useEffect, useState } from "react";
import API from "../api/api";
import {
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";
import { toast } from "react-toastify";

function Products() {

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    price: "",
    stock: "",
    SKU: "",
    reorderLevel: ""
  });

  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      } else {
        setProducts([]);
      }

    } catch (err) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {

      const payload = {
        title: form.title,
        price: Number(form.price),
        stock: Number(form.stock),
        SKU: form.SKU,
        reorderLevel: Number(form.reorderLevel)
      };

      if (editId) {
        await API.put(`/products/${editId}`, payload);
        toast.success("Product updated");
      } else {
        await API.post("/products", payload);
        toast.success("Product added");
      }

      setForm({
        title: "",
        price: "",
        stock: "",
        SKU: "",
        reorderLevel: ""
      });

      setEditId(null);

      fetchProducts();

    } catch (err) {
      console.log(err.response?.data); // VERY IMPORTANT DEBUG
      toast.error("Error saving product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      toast.success("Deleted successfully");
      fetchProducts();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (p) => {
    setForm({
      title: p.title || "",
      price: p.price || "",
      stock: p.stock || "",
      SKU: p.SKU || "",
      reorderLevel: p.reorderLevel || ""
    });
    setEditId(p._id);
  };

  return (

    <div>

      <h2>Products</h2>

      <Paper style={{ padding: "20px", marginBottom: "20px" }}>

        <TextField label="Title" name="title" value={form.title} onChange={handleChange} style={{ marginRight: "10px" }} />
        <TextField label="Price" name="price" value={form.price} onChange={handleChange} style={{ marginRight: "10px" }} />
        <TextField label="Stock" name="stock" value={form.stock} onChange={handleChange} style={{ marginRight: "10px" }} />

        <br/><br/>

        <TextField label="SKU" name="SKU" value={form.SKU} onChange={handleChange} style={{ marginRight: "10px" }} />
        <TextField label="Reorder Level" name="reorderLevel" value={form.reorderLevel} onChange={handleChange} style={{ marginRight: "10px" }} />

        <Button variant="contained" onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </Button>

      </Paper>

      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Reorder</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {Array.isArray(products) && products.map((p) => (
            <TableRow key={p._id}>
              <TableCell>{p.title}</TableCell>
              <TableCell>₹{p.price}</TableCell>
              <TableCell>{p.stock}</TableCell>
              <TableCell>{p.SKU}</TableCell>
              <TableCell>{p.reorderLevel}</TableCell>

              <TableCell>

                <Button onClick={() => handleEdit(p)} style={{ marginRight: "10px" }}>
                  Edit
                </Button>

                <Button color="error" onClick={() => handleDelete(p._id)}>
                  Delete
                </Button>

              </TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>

    </div>
  );
}

export default Products;