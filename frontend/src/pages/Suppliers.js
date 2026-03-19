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

function Suppliers() {

  const [suppliers, setSuppliers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    contact: "",
    address: ""
  });

  const [editId, setEditId] = useState(null);

  // FETCH SUPPLIERS
  const fetchSuppliers = async () => {
    try {
      const res = await API.get("/suppliers");

      console.log("SUPPLIERS:", res.data);

      if (Array.isArray(res.data)) {
        setSuppliers(res.data);
      } else if (Array.isArray(res.data.suppliers)) {
        setSuppliers(res.data.suppliers);
      } else {
        setSuppliers([]);
      }

    } catch (err) {
      toast.error("Failed to fetch suppliers");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE SUPPLIER
  const handleSubmit = async () => {
    try {

      const payload = {
        name: form.name,
        contact: form.contact,
        address: form.address
      };

      if (editId) {
        await API.put(`/suppliers/${editId}`, payload);
        toast.success("Supplier updated");
      } else {
        await API.post("/suppliers", payload);
        toast.success("Supplier added");
      }

      setForm({
        name: "",
        contact: "",
        address: ""
      });

      setEditId(null);

      fetchSuppliers();

    } catch (err) {
      console.log(err.response?.data);
      toast.error("Error saving supplier");
    }
  };

  // DELETE SUPPLIER
  const handleDelete = async (id) => {
    try {
      await API.delete(`/suppliers/${id}`);
      toast.success("Deleted successfully");
      fetchSuppliers();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // EDIT SUPPLIER
  const handleEdit = (s) => {
    setForm({
      name: s.name || "",
      contact: s.contact || "",
      address: s.address || ""
    });
    setEditId(s._id);
  };

  return (

    <div>

      <h2>Suppliers</h2>

      {/* FORM */}
      <Paper style={{ padding: "20px", marginBottom: "20px" }}>

        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />

        <TextField
          label="Contact"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />

        <br/><br/>

        <TextField
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          style={{ marginRight: "10px", width: "300px" }}
        />

        <Button variant="contained" onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </Button>

      </Paper>

      {/* TABLE */}
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {Array.isArray(suppliers) && suppliers.length > 0 ? (
            suppliers.map((s) => (
              <TableRow key={s._id}>

                <TableCell>{s.name}</TableCell>
                <TableCell>{s.contact}</TableCell>
                <TableCell>{s.address}</TableCell>

                <TableCell>

                  <Button
                    variant="outlined"
                    onClick={() => handleEdit(s)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(s._id)}
                  >
                    Delete
                  </Button>

                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No Suppliers Found</TableCell>
            </TableRow>
          )}

        </TableBody>

      </Table>

    </div>
  );
}

export default Suppliers;