import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Box,
  Divider,
  ListItemIcon,
  Tooltip,
  Avatar,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Navbar() {
  const { cart } = useCart();
  const { user, setUser } = useUser();
  const totalItems = cart.reduce((acc, item) => acc + item.quantite, 0);
  const location = useLocation();

  // Pour le menu utilisateur
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleRoleChange = (role) => {
    setUser((u) => ({ ...u, role }));
    handleClose();
  };
  const handleLogout = () => {
    setUser(null);
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ background: "#2d3240", boxShadow: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: 60 }}>
        {/* Gauche : Logo + liens */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            LOG430 Magasin
          </Typography>
          <Link
            to="/"
            style={{
              color: location.pathname === "/" ? "#3a8bff" : "#fff",
              textDecoration: "none",
              fontWeight: 600,
              marginRight: 16,
              fontSize: 17
            }}
          >
            Produits
          </Link>
          {user?.role === "gestionnaire" && (
            <Link to="/dashboard" style={{
              color: "#fff",
              marginRight: 16,
              fontSize: 17,
              textDecoration: "none",
              fontWeight: 500
            }}>
              Dashboard
            </Link>
          )}
          {user?.role === "client" && (
            <Link to="/panier" style={{
              color: "#fff",
              marginRight: 16,
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              fontWeight: 500
            }}>
              <Badge badgeContent={totalItems} color="primary" sx={{ marginRight: 1 }}>
                <ShoppingCartIcon sx={{ color: "#fff" }} />
              </Badge>
              Mon panier
            </Link>
          )}
        </Box>

        {/* Droite : utilisateur + avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {user?.nom && (
            <Typography variant="body1" sx={{ color: "#fff", marginRight: 2, fontSize: 16 }}>
              Utilisateur: <b>{user.nom}</b>
            </Typography>
          )}
          <Tooltip title="Mon compte">
            <IconButton
              color="inherit"
              onClick={handleMenu}
              size="large"
              aria-label="Compte utilisateur"
              sx={{
                ml: 1,
                background: "rgba(255,255,255,0.06)",
                "&:hover": { background: "rgba(58,139,255,0.09)" }
              }}
            >
              {user?.nom ? (
                <Avatar sx={{ bgcolor: "#3a8bff", width: 36, height: 36 }}>
                  {user.nom[0]?.toUpperCase() || <AccountCircleIcon />}
                </Avatar>
              ) : (
                <AccountCircleIcon fontSize="large" />
              )}
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              selected={user?.role === "client"}
              onClick={() => handleRoleChange("client")}
            >
              <ListItemIcon>
                <SwitchAccountIcon fontSize="small" />
              </ListItemIcon>
              Client
            </MenuItem>
            <MenuItem
              selected={user?.role === "gestionnaire"}
              onClick={() => handleRoleChange("gestionnaire")}
            >
              <ListItemIcon>
                <SwitchAccountIcon fontSize="small" />
              </ListItemIcon>
              Gestionnaire
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Déconnexion
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
