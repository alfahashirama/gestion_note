import { Routes, Route } from 'react-router-dom';
import MatiereList from '../components/MatiereList';
import MatiereForm from '../components/MatiereForm';

function MatierePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <Routes>
          <Route path="/" element={<MatiereList />} />
          <Route path="/create" element={<MatiereForm />} />
          <Route path="/edit/:id" element={<MatiereForm />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="relative mt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white border-opacity-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">📚</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Gestion des Matières</p>
                  <p className="text-xs text-gray-600">Système académique</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                  <span>📊</span>
                  <span className="hidden sm:inline">Statistiques</span>
                </div>
                <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                  <span>⚙️</span>
                  <span className="hidden sm:inline">Paramètres</span>
                </div>
                <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                  <span>❓</span>
                  <span className="hidden sm:inline">Aide</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                © 2024 Système de Gestion Académique - Tous droits réservés
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MatierePage;