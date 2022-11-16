import { useCallback, useState } from 'react';

import { Button, Card } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import './App.css';
import MatchModal from './components/CreateMatchModal';
import MatchList from './components/MatchList';

import { IMatch } from '../types';

const cardStyle = {
  headStyle: { backgroundColor: '#b25949' },
  bodyStyle: { backgroundColor: '#3f4464' },
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matches, setMatches] = useState<IMatch[]>([]);
  
  const handleToggleModal = useCallback(() => {
    setIsModalOpen(prevState => !prevState);
  }, []);
  
  const handleSave = useCallback((match: IMatch) => {
    setMatches( prevMatches => [...prevMatches, match]);
    handleToggleModal();
  }, []);
  
  const handleDelete = (id: string) => {
    setMatches(matches => matches.filter(matche => matche.id !== id));
  };
  
  const handleUpdateMatch = (updatesMatch: IMatch) => {
    setMatches(matches => matches.map(match => match.id === updatesMatch.id ? updatesMatch : match));
  };
  
  return (
    <div
      data-testid="board-container"
      className="board-container"
    >
      <Card
        title="TODAY'S MATCHES"
        data-testid="board-container-card"
        bordered={false}
        {...cardStyle}
        extra={
          <Button
            data-testid="board-add-match-btn"
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleToggleModal}
          />
        }
      >
        <MatchList
          matches={matches}
          onDelete={handleDelete}
          onUpdate={handleUpdateMatch}
        />
      </Card>
      <MatchModal
        isModalOpen={isModalOpen}
        onSave={handleSave}
        onCancel={handleToggleModal}
      />
    </div>
  );
}

export default App;
