import { useEffect, useState } from "react";
import API from "../api/api";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import { toast } from "react-toastify";

function Users() {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {

      const res = await API.get("/users");

      const data = Array.isArray(res.data) ? res.data : [];

      setUsers(data);

    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (

    <Box sx={{ p: 3 }}>

      <Typography variant="h5" mb={2}>
        User Management
      </Typography>

      <Paper sx={{ p: 2 }}>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {users.map((u) => (
              <TableRow key={u._id}>

                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>

      </Paper>

    </Box>
  );
}

export default Users;