// src/utils/localStorage.js

// Sauvegarde du token
export function saveToken(token) {
    localStorage.setItem('token', token);
  }
  
  // Récupération du token
  export function getToken() {
    return localStorage.getItem('token');
  }
  
  // Suppression du token (par exemple lors de la déconnexion)
  export function removeToken() {
    localStorage.removeItem('token');
  }
  