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

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [editId, setEditId] = useState(null);

  // FETCH CUSTOMERS
  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");

      console.log("CUSTOMERS:", res.data);

      if (Array.isArray(res.data)) {
        setCustomers(res.data);
      } else if (Array.isArray(res.data.customers)) {
        setCustomers(res.data.customers);
      } else {
        setCustomers([]);
      }

    } catch (err) {
      toast.error("Failed to fetch customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE CUSTOMER
  const handleSubmit = async () => {
    try {

      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address
      };

      if (editId) {
        await API.put(`/customers/${editId}`, payload);
        toast.success("Customer updated");
      } else {
        await API.post("/customers", payload);
        toast.success("Customer added");
      }

      setForm({
        name: "",
        email: "",
        phone: "",
        address: ""
      });

      setEditId(null);

      fetchCustomers();

    } catch (err) {
      console.log(err.response?.data);
      toast.error("Error saving customer");
    }
  };

  // DELETE CUSTOMER
  const handleDelete = async (id) => {
    try {
      await API.delete(`/customers/${id}`);
      toast.success("Deleted successfully");
      fetchCustomers();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // EDIT CUSTOMER
  const handleEdit = (c) => {
    setForm({
      name: c.name || "",
      email: c.email || "",
      phone: c.phone || "",
      address: c.address || ""
    });
    setEditId(c._id);
  };

  return (

    <div>

      <h2>Customers</h2>

      {/* FORM */}
      <Paper style={{ padding: "20px", marginBottom: "20px" }}>

        <TextField label="Name" name="name" value={form.name} onChange={handleChange} style={{ marginRight: "10px" }} />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} style={{ marginRight: "10px" }} />

        <br/><br/>

        <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} style={{ marginRight: "10px" }} />
        <TextField label="Address" name="address" value={form.address} onChange={handleChange} style={{ marginRight: "10px" }} />

        <Button variant="contained" onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </Button>

      </Paper>

      {/* TABLE */}
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {Array.isArray(customers) && customers.length > 0 ? (
            customers.map((c) => (
              <TableRow key={c._id}>

                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell>{c.address}</TableCell>

                <TableCell>

                  <Button
                    variant="outlined"
                    onClick={() => handleEdit(c)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </Button>

                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>No Customers Found</TableCell>
            </TableRow>
          )}

        </TableBody>

      </Table>

    </div>
  );
}

export default Customers;