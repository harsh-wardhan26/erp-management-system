import { Link } from "react-router-dom";

function Sidebar() {

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    display: "block",
    margin: "12px 0",
    fontSize: "16px"
  };

  return (
    <div style={{
      width: "220px",
      background: "#1e1e2f",
      color: "#fff",
      height: "100vh",
      padding: "20px"
    }}>

      <h2>ERP</h2>

      <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
      <Link to="/products" style={linkStyle}>Products</Link>
      <Link to="/customers" style={linkStyle}>Customers</Link>
      <Link to="/suppliers" style={linkStyle}>Suppliers</Link>
      <Link to="/sales-orders" style={linkStyle}>Sales Orders</Link>
      <Link to="/purchase-orders" style={linkStyle}>Purchase Orders</Link>
      <Link to="/grn" style={linkStyle}>GRN</Link>
      <Link to="/invoices" style={linkStyle}>Invoices</Link>
      <Link to="/users" style={linkStyle}>Users</Link>

    </div>
  );
}

export default Sidebar;