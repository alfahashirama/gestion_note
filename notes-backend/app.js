// app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '1mb' }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/auth', limiter, require('./routes/user')); // Ligne ~15, probable source d'erreur
app.use('/etablissements', authMiddleware, require('./routes/etablissement'));
app.use('/professeurs', authMiddleware, require('./routes/professeur'));
app.use('/etudiants', authMiddleware, require('./routes/etudiant'));
app.use('/matieres', authMiddleware, require('./routes/matiere'));
app.use('/notes', authMiddleware, require('./routes/note'));

app.use((req, res, next) => {
  res.status(404).json({ message: 'Ressource non trouvée' });
});

app.use(errorHandler);

module.exports = app;