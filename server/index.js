const express = require('express');
const cors = require('cors');
const produitRoutes = require('./routes/produit.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/produits', produitRoutes);


const PORT = 3800;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
