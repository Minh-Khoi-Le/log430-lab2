const express = require('express');
const cors = require('cors');
const produitRoutes = require('./routes/produit.routes');
const maisonmereRoutes = require('./routes/maisonmere.routes');
const magasinRoutes = require('./routes/magasin.routes');
const clientRoutes = require('./routes/client.routes');
const venteRoutes = require('./routes/vente.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/produits', produitRoutes);
app.use('/maisonmere', maisonmereRoutes);
app.use('/magasins', magasinRoutes);
app.use('/clients', clientRoutes);
app.use('/ventes', venteRoutes);


const PORT = 3800;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
