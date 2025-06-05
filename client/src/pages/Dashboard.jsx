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

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Appel à l'API pour récupérer les statistiques des magasins
    fetch("http://localhost:3800/maisonmere/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => setStats([]));
  }, []);

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 6 }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 3 }}>
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
        <TableContainer>
          <Table>
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
            <TableBody>
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
              {stats && stats.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Aucune donnée à afficher.
                  </TableCell>
                </TableRow>
              )}
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
    </Box>
  );
};

export default Dashboard;
