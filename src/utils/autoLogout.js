export const autoLogout = (expirationTime) => {
  setTimeout(() => {
    alert("Votre session a expiré. Veuillez vous reconnecter.");
    localStorage.removeItem("token"); // Nettoyer les informations de session
    window.location.href = "/login"; // Rediriger vers la page de connexion
  }, expirationTime);
};
