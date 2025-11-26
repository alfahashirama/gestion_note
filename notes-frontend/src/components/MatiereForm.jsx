import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createMatiere, getMatiere, updateMatiere, getProfesseurs } from '../api/api';

function MatiereForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_professeur: '',
    nom_matiere: '',
    coefficient: '',
    credit: '',
  });
  const [professeurs, setProfesseurs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profResponse = await getProfesseurs();
        setProfesseurs(profResponse.data);
        if (id) {
          const response = await getMatiere(id);
          setFormData(response.data);
        }
      } catch (err) {
        setError('Erreur lors du chargement des données');
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateMatiere(id, formData);
      } else {
        await createMatiere(formData);
      }
      navigate('/matieres');
    } catch (err) {
      setError('Erreur lors de la soumission');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
          {/* Header avec gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 sm:px-8">
            <h3 className="text-3xl font-bold text-white tracking-tight">
              {id ? '✏️ Modifier Matière' : '➕ Créer Matière'}
            </h3>
            <p className="mt-2 text-blue-100 text-sm">
              {id ? 'Modifiez les informations de la matière' : 'Ajoutez une nouvelle matière au système'}
            </p>
          </div>

          {/* Message d'erreur animé */}
          {error && (
            <div className="mx-6 mt-6 sm:mx-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg animate-pulse">
              <div className="flex items-center">
                <span className="text-red-600 font-medium">⚠️ {error}</span>
              </div>
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-8 space-y-6">
            {/* Professeur */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-blue-600">
                👨‍🏫 Professeur
              </label>
              <select
                name="id_professeur"
                value={formData.id_professeur}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 outline-none bg-gray-50 hover:bg-white text-gray-900"
                required
              >
                <option value="">Sélectionner un professeur</option>
                {professeurs.map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.nom_prof} {prof.prenom_prof}
                  </option>
                ))}
              </select>
            </div>

            {/* Nom Matière */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-blue-600">
                📚 Nom de la Matière
              </label>
              <input
                type="text"
                name="nom_matiere"
                value={formData.nom_matiere}
                onChange={handleChange}
                placeholder="Ex: Mathématiques"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 outline-none bg-gray-50 hover:bg-white"
                required
              />
            </div>

            {/* Grille responsive pour Coefficient et Crédit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Coefficient */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-blue-600">
                  🔢 Coefficient
                </label>
                <input
                  type="number"
                  name="coefficient"
                  value={formData.coefficient}
                  onChange={handleChange}
                  placeholder="Ex: 2"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 outline-none bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Crédit */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-blue-600">
                  ⭐ Crédit
                </label>
                <input
                  type="number"
                  name="credit"
                  value={formData.credit}
                  onChange={handleChange}
                  placeholder="Ex: 3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 outline-none bg-gray-50 hover:bg-white"
                />
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-blue-300 focus:outline-none"
              >
                {id ? '💾 Mettre à jour' : '✨ Créer la matière'}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/matieres')}
                className="flex-1 sm:flex-none bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transform hover:scale-105 transition-all duration-200 shadow hover:shadow-md focus:ring-4 focus:ring-gray-300 focus:outline-none"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>

        {/* Info supplémentaire */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            💡 Tous les champs marqués sont obligatoires
          </p>
        </div>
      </div>
    </div>
  );
}

export default MatiereForm;