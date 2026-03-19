import { useEffect, useState } from "react";
import API from "../api/api";
import {
  Box,
  Grid,
  Paper,
  Typography
} from "@mui/material";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

function Dashboard() {

  const [data, setData] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  const fetchData = async () => {
    try {

      const res = await API.get("/dashboard");

      setData(res.data);

    } catch (err) {
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = [
    { name: "Products", value: data.totalProducts },
    { name: "Customers", value: data.totalCustomers },
    { name: "Orders", value: data.totalOrders }
  ];

  const cardStyle = {
    padding: "20px",
    textAlign: "center"
  };

  return (

    <Box sx={{ p: 3 }}>

      <Typography variant="h5" mb={3}>
        ERP Dashboard
      </Typography>

      {/* STATS */}
      <Grid container spacing={2}>

        <Grid item xs={3}>
          <Paper sx={cardStyle}>
            <Typography variant="h6">Products</Typography>
            <Typography variant="h4">{data.totalProducts}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper sx={cardStyle}>
            <Typography variant="h6">Customers</Typography>
            <Typography variant="h4">{data.totalCustomers}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper sx={cardStyle}>
            <Typography variant="h6">Orders</Typography>
            <Typography variant="h4">{data.totalOrders}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper sx={cardStyle}>
            <Typography variant="h6">Revenue</Typography>
            <Typography variant="h4">₹{data.totalRevenue}</Typography>
          </Paper>
        </Grid>

      </Grid>

      {/* CHART */}
      <Box mt={5}>

        <Typography variant="h6" mb={2}>
          Overview Chart
        </Typography>

        <LineChart width={500} height={300} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" />
        </LineChart>

      </Box>

    </Box>
  );
}

export default Dashboard;