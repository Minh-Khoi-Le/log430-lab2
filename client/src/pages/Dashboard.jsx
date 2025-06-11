/**
 * Dashboard Page
 * 
 * This component provides a management dashboard for users with the gestionnaire role.
 * It displays performance statistics and visualizations for all stores.
 * 
 */

import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Skeleton,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  // State to store statistics data from API
  const [stats, setStats] = useState(null);

  // Fetch store statistics when component mounts
  useEffect(() => {
    // API call to get store statistics
    fetch("http://localhost:3000/api/v1/maisonmere/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => setStats([]));
  }, []);

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 6 }}>
      {/* Main statistics table card */}
      <Paper elevation={3} sx={{ p: 5, borderRadius: 3 }}>
        {/* Dashboard header */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 4,
            fontWeight: 600,
            letterSpacing: 1,
            color: "#2d3240",
          }}
        >
          <StoreIcon sx={{ mr: 1, fontSize: 38, color: "#3a8bff" }} />
          Tableau de bord —{" "}
          <span style={{ color: "#3a8bff" }}>Maison Mère</span>
        </Typography>
        
        {/* Store statistics table */}
        <TableContainer>
          <Table>
            {/* Table header */}
            <TableHead>
              <TableRow sx={{ background: "#f7f8fa" }}>
                <TableCell>
                  <b>Magasin</b>
                </TableCell>
                <TableCell align="right">
                  <b>Ventes totales</b>
                </TableCell>
                <TableCell align="right">
                  <b>Produits vendus</b>
                </TableCell>
                <TableCell align="right">
                  <b>Chiffre d'affaires</b>
                </TableCell>
              </TableRow>
            </TableHead>
            
            {/* Table body */}
            <TableBody>
              {/* Loading state with skeleton placeholders */}
              {!stats &&
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton width={100} />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton width={80} />
                    </TableCell>
                  </TableRow>
                ))}
              
              {/* Empty state message */}
              {stats && stats.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Aucune donnée à afficher.
                  </TableCell>
                </TableRow>
              )}
              
              {/* Store data rows */}
              {stats?.map((magasin) => (
                <TableRow key={magasin.id}>
                  <TableCell sx={{ fontWeight: 600 }}>{magasin.nom}</TableCell>
                  <TableCell align="right">{magasin.ventesTotal}</TableCell>
                  <TableCell align="right">{magasin.produitsVendus}</TableCell>
                  <TableCell align="right">
                    <b style={{ color: "#127c50" }}>
                      ${magasin.chiffreAffaires.toFixed(2)}
                    </b>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      {/* Sales distribution pie chart */}
      {stats && stats.length > 0 && (
        <Box sx={{ mt: 5, p: 4, background: "#fff", borderRadius: 3, boxShadow: 2 }}>
          <Typography variant="h6" align="center" sx={{ mb: 3, fontWeight: 600, color: "#2d3240" }}>
            Répartition des ventes par magasin
          </Typography>
          {/* Responsive chart container */}
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              {/* Pie chart showing sales distribution */}
              <Pie
                data={stats}
                dataKey="ventesTotal"
                nameKey="nom"
                cx="50%"
                cy="50%"
                outerRadius={110}
                fill="#3a8bff"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {/* Custom colors for each store slice */}
                {stats.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={["#3a8bff", "#127c50", "#ffb347", "#ff6961", "#6a5acd"][idx % 5]} />
                ))}
              </Pie>
              {/* Interactive tooltips and legend */}
              <Tooltip formatter={(value) => `${value} ventes`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
