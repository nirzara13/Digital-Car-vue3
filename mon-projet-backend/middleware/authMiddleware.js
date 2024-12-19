// const jwt = require('jsonwebtoken');
// const SECRET_KEY = 'votre_clé_secrète';

// exports.verifyToken = (req, res, next) => {
//   const token = req.headers['x-access-token'];
//   if (!token) return res.status(403).json({ error: 'No token provided' });

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) return res.status(500).json({ error: 'Failed to authenticate token' });

//     req.userId = decoded.id;
//     next();
//   });
// };

// const jwt = require('jsonwebtoken');

// // Middleware pour vérifier si un token est présent et valide
// const authMiddleware = (req, res, next) => {
//   // Vérifie si le token est présent dans les en-têtes de la requête
//   const token = req.header('x-auth-token');

//   if (!token) {
//     return res.status(401).json({ msg: 'Aucun token, accès refusé' });
//   }

//   try {
//     // Vérifie le token avec la clé secrète
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user; // Ajoute les informations de l'utilisateur à la requête
//     next(); // Passe à la route suivante si le token est valide
//   } catch (err) {
//     res.status(401).json({ msg: 'Token invalide' });
//   }
// };

// module.exports = authMiddleware;

export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    next(); // Session valide, passe à la prochaine étape
  } else {
    res
      .status(401)
      .json({ message: "Session expirée. Veuillez vous reconnecter." });
  }
};
