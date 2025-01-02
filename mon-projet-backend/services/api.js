import axios from 'axios';

// Configuration d'instance Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // URL de ton back-end
  withCredentials: true, // Nécessaire pour envoyer les cookies (sessions)
});

export default apiClient;
