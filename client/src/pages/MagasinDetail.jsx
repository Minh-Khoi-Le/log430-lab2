/**
 * Magasin Detail Page
 * 
 * This component provides detailed information about a specific store,
 * including stock levels, recent sales, and store management features.
 * Intended for use by gestionnaires
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Tabs, 
  Tab, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Divider,
  Alert
} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';

function MagasinDetail() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  
  // State variables
  const [store, setStore] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [sales, setSales] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch store data
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Function to fetch store details
    const fetchStoreData = async () => {
      try {
        // Fetch store details
        const storeRes = await fetch(`http://localhost:3000/api/v1/stores/${storeId}`);
        if (!storeRes.ok) throw new Error('Failed to load store details');
        const storeData = await storeRes.json();
        setStore(storeData);
        
        // Fetch store stock
        const stockRes = await fetch(`http://localhost:3000/api/v1/stores/${storeId}/stock`);
        if (!stockRes.ok) throw new Error('Failed to load stock data');
        const stockData = await stockRes.json();
        setStocks(stockData);
        
        // Fetch recent sales (limit to 10)
        const salesRes = await fetch(`http://localhost:3000/api/v1/sales/store/${storeId}?limit=10`);
        if (!salesRes.ok) throw new Error('Failed to load sales data');
        const salesData = await salesRes.json();
        setSales(salesData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching store data:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchStoreData();
  }, [storeId]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Show loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show error message if there was a problem
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          {error}
          <Button 
            variant="outlined" 
            sx={{ ml: 2 }} 
            onClick={() => navigate('/dashboard')}
          >
            Retour au tableau de bord
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, p: 2 }}>
      {/* Store header */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <StoreIcon sx={{ fontSize: 40, color: '#3a8bff', mr: 2 }} />
          <Typography variant="h4" component="h1">
            {store?.nom}
          </Typography>
        </Box>
        
        <Typography variant="body1" color="text.secondary">
          {store?.adresse || 'Adresse non spécifiée'}
        </Typography>
        
        <Button 
          variant="outlined" 
          sx={{ mt: 2 }} 
          onClick={() => navigate('/dashboard')}
        >
          Retour au tableau de bord
        </Button>
      </Paper>

      {/* Tab navigation */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<InventoryIcon />} label="Stock" />
          <Tab icon={<ReceiptIcon />} label="Ventes récentes" />
        </Tabs>
      </Paper>

      {/* Stock tab content */}
      {activeTab === 0 && (
        <Paper elevation={1} sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Inventaire du magasin
          </Typography>
          
          {stocks.length === 0 ? (
            <Alert severity="info">Aucun produit en stock</Alert>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell><strong>Produit</strong></TableCell>
                    <TableCell><strong>Description</strong></TableCell>
                    <TableCell align="right"><strong>Prix</strong></TableCell>
                    <TableCell align="right"><strong>Quantité</strong></TableCell>
                    <TableCell align="right"><strong>Valeur totale</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stocks.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.produit.nom}</TableCell>
                      <TableCell>{item.produit.description || '—'}</TableCell>
                      <TableCell align="right">${item.produit.prix.toFixed(2)}</TableCell>
                      <TableCell align="right">
                        <Box component="span" sx={{
                          fontWeight: 'bold',
                          color: item.quantite < 10 ? 'error.main' : 'inherit'
                        }}>
                          {item.quantite}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        ${(item.quantite * item.produit.prix).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      )}

      {/* Sales tab content */}
      {activeTab === 1 && (
        <Paper elevation={1} sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Ventes récentes
          </Typography>
          
          {sales.length === 0 ? (
            <Alert severity="info">Aucune vente récente</Alert>
          ) : (
            <Grid container spacing={3}>
              {sales.map((vente) => (
                <Grid item xs={12} key={vente.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="subtitle1">
                          <strong>Vente #{vente.id}</strong>
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          {formatDate(vente.date)}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Client: <strong>{vente.user?.nom || 'Client inconnu'}</strong>
                      </Typography>
                      
                      <Divider sx={{ my: 1 }} />
                      
                      <TableContainer sx={{ maxHeight: 200 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Produit</TableCell>
                              <TableCell align="right">Quantité</TableCell>
                              <TableCell align="right">Prix unitaire</TableCell>
                              <TableCell align="right">Total</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {vente.lignes.map((ligne) => (
                              <TableRow key={ligne.id}>
                                <TableCell>{ligne.produit?.nom || 'Produit inconnu'}</TableCell>
                                <TableCell align="right">{ligne.quantite}</TableCell>
                                <TableCell align="right">${ligne.prixUnitaire.toFixed(2)}</TableCell>
                                <TableCell align="right">
                                  ${(ligne.quantite * ligne.prixUnitaire).toFixed(2)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Typography variant="subtitle1" color="primary">
                          <strong>Total: ${vente.total.toFixed(2)}</strong>
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      )}
    </Box>
  );
}

export default MagasinDetail; 