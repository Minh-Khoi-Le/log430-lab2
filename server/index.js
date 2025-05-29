const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3800;
app.listen(PORT, () => {
  console.log(`Serveur backend écoute sur http://localhost:${PORT}`);
});
