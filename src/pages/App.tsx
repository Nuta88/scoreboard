import { useState } from 'react';

import { Card } from 'antd';

import './App.css';
import MatchList from './components/MatchList';

import { IMatch } from '../types';

const cardStyle = {
  headStyle: { backgroundColor: '#b25949' },
  bodyStyle: { backgroundColor: '#3f4464' },
};

function App() {
  const [matches, setMatches] = useState<IMatch[]>([]);
  
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
      >
        <MatchList
          matches={matches}
          onDelete={handleDelete}
          onUpdate={handleUpdateMatch}
        />
      </Card>
    </div>
  );
}

export default App;
