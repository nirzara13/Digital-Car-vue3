import fs from 'fs';
import path from 'path';
import  File from '../models/File.js';  // Assurez-vous d'indiquer le fichier exact


// Vérifier si un dossier existe et le créer si nécessaire
function createDirectoryIfNotExists(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
}

// Ajouter un fichier
async function addFile(brand, model, component, file) {
    const fileName = `${component}_${file.originalname}`;
    const filePath = path.join(__dirname, '..', 'Files', brand, model, fileName);

    // Créer les dossiers si nécessaire
    createDirectoryIfNotExists(path.dirname(filePath));

    // Vérifier si le fichier existe déjà
    if (fs.existsSync(filePath)) {
        throw new Error('Le fichier existe déjà.');
    }

    // Sauvegarder le fichier sur le disque
    try {
        await fs.promises.rename(file.path, filePath);

        // Enregistrer le fichier dans la base de données
        await File.create({
            file_path: filePath,
            file_name: fileName,
            adas_component_id: component,  // Lier avec le composant ADAS
        });
        console.log('Fichier ajouté avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'ajout du fichier', error);
        throw error;
    }
}

// Supprimer un fichier
async function deleteFile(fileId) {
    try {
        const fileRecord = await File.findByPk(fileId);
        if (fileRecord) {
            const filePath = fileRecord.file_path;
            // Supprimer le fichier du disque
            await fs.promises.unlink(filePath);

            // Supprimer l'entrée de la base de données
            await fileRecord.destroy();
            console.log('Fichier supprimé avec succès');
        } else {
            console.log('Fichier introuvable');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du fichier', error);
        throw error;
    }
}

export { addFile, deleteFile };
