import apiClient from "./api";

// Fonction pour l'inscription
export const register = async (userData) => {
  try {
    const response = await apiClient.post("/register", userData);
    return response.data; // Retourne les données si l'inscription réussit
  } catch (error) {
    throw error.response?.data?.message || "Erreur lors de l'inscription";
  }
};

// Fonction pour la connexion
export const login = async (userData) => {
  try {
    const response = await apiClient.post("/login", userData);
    return response.data; // Retourne les données si la connexion réussit
  } catch (error) {
    throw error.response?.data?.message || "Erreur lors de la connexion";
  }
};
