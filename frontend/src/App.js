import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Suppliers from "./pages/Suppliers";
import SalesOrders from "./pages/SalesOrders";
import PurchaseOrders from "./pages/PurchaseOrders";
import GRN from "./pages/GRN";
import Invoices from "./pages/Invoices";
import Users from "./pages/Users";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>

      <ToastContainer />

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/products" element={
          <ProtectedRoute>
            <Layout><Products /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/customers" element={
          <ProtectedRoute>
            <Layout><Customers /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/suppliers" element={
          <ProtectedRoute>
            <Layout><Suppliers /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/sales-orders" element={
          <ProtectedRoute>
            <Layout><SalesOrders /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/purchase-orders" element={
          <ProtectedRoute>
            <Layout><PurchaseOrders /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/grn" element={
          <ProtectedRoute>
            <Layout><GRN /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/invoices" element={
          <ProtectedRoute>
            <Layout><Invoices /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/users" element={
          <ProtectedRoute>
            <Layout><Users /></Layout>
          </ProtectedRoute>
        } />

      </Routes>

    </Router>
  );
}

export default App;