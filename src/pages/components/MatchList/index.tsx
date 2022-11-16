import React, { useCallback, useMemo, useState } from 'react';

import { Button, Popconfirm, List, Space } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

import UpdateScoreModal from '../UpdateScoreModal';
import { sortMatches } from './utils';

import { IMatch } from '../../../types';

interface IMatchListProps {
  matches: IMatch[],
  onUpdate: (match: IMatch) => void,
  onDelete: (id: string) => void,
}

const MatchList: React.FC<IMatchListProps> = ({ matches, onUpdate, onDelete }: IMatchListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchForUpdating, setMatchForUpdating] = useState<IMatch | null>(null);
  
  const data = useMemo(() => sortMatches(matches), [matches]);
  
  const handleToggleModal = useCallback(() => {
    setIsModalOpen(prevState => !prevState);
  }, []);
  
  const handleOpenModal = useCallback((match: IMatch) => {
    setMatchForUpdating(match)
    handleToggleModal();
  }, []);
  
  const handleUpdateMatch = useCallback((updatedMatch: IMatch) => {
    onUpdate(updatedMatch);
    handleToggleModal();
  }, []);
  
  const onConfirm = (id: string) => {
    onDelete(id);
  };
  
  return (
    <>
      <List
        data-testid="match-list"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <div className="list-item-container">
              <Space>
                <span>{item.homeTeamName}</span>
                <span>{item.homeTeamPoints} - {item.awayTeamPoints}</span>
                <span>{item.awayTeamName}</span>
                <Popconfirm
                  title="Are you sure to delete this match?"
                  onConfirm={() => onConfirm(item.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button size="small" shape="circle" icon={<CloseOutlined />} />
                </Popconfirm>
                <Button
                  data-testid="match-list-update-btn"
                  size="small"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => handleOpenModal(item)}
                />
              </Space>
            </div>
          </List.Item>
        )}
      />
      {isModalOpen && (
        <UpdateScoreModal
          match={matchForUpdating as IMatch}
          isModalOpen={isModalOpen}
          onUpdate={handleUpdateMatch}
          onCancel={handleToggleModal}
        />
      )}
    </>
  )
};

export default MatchList;
