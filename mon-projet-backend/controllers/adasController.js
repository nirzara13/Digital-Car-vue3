// controllers/adasController.js
import AdasComponent from '../models/AdasComponent';  // Assurer que le chemin d'import est correct

export const getAdasComponent = async (req, res) => {
  const { id } = req.params;  // Exemple d'ID passé dans les paramètres

  try {
    // Récupérer le composant ADAS depuis la base de données
    const component = await AdasComponent.findByPk(id);

    if (!component) {
      return res.status(404).json({ message: 'Composant ADAS non trouvé' });
    }

    // Renvoyer les détails du composant avec le chemin du fichier
    res.json({ name: component.name, file_path: component.file_path });
  } catch (error) {
    console.error('Erreur lors de la récupération du composant ADAS:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
