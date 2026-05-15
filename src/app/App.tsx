import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomeModule } from './components/HomeModule';
import { SearchModule } from './components/SearchModule';
import { ProtocolListModule } from './components/ProtocolListModule';
import { ProtocolViewer } from './components/ProtocolViewer';

export default function App() {
  const [activeModule, setActiveModule] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProtocolId, setSelectedProtocolId] = useState<string | null>(null);

  const handleProtocolSelect = (protocolId: string) => {
    setSelectedProtocolId(protocolId);
    setActiveModule('viewer');
  };

  const handleBackToSearch = () => {
    setActiveModule('search');
    setSelectedProtocolId(null);
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'home':
        return <HomeModule onNavigate={setActiveModule} onProtocolSelect={handleProtocolSelect} />;
      case 'search':
        return <SearchModule onProtocolSelect={handleProtocolSelect} />;
      case 'list':
        return <ProtocolListModule onProtocolSelect={handleProtocolSelect} />;
      case 'viewer':
        return selectedProtocolId ? (
          <ProtocolViewer protocolId={selectedProtocolId} onBack={handleBackToSearch} />
        ) : (
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center">
            <p className="text-zinc-400">Nenhum protocolo selecionado</p>
          </div>
        );
      case 'favorites':
        return (
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center">
            <p className="text-zinc-400">Funcionalidade de favoritos em desenvolvimento</p>
          </div>
        );
      default:
        return <HomeModule onNavigate={setActiveModule} onProtocolSelect={handleProtocolSelect} />;
    }
  };

  return (
    <div className="size-full flex flex-col bg-black text-zinc-100">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeModule={activeModule}
          onModuleChange={setActiveModule}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto bg-zinc-950 p-6">
          <div className="max-w-6xl mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  );
}