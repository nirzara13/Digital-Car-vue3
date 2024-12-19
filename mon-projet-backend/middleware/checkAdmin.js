// middlewares/checkAdmin.js
export function checkAdmin(req, res, next) {
    if (!req.session || !req.session.user || req.session.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé. Seul l\'administrateur peut uploader des fichiers.' });
    }
    next();
  }
  