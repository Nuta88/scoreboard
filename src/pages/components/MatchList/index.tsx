import React, { useMemo } from 'react';

import { Button, Popconfirm, List, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { sortMatches } from './utils';

import { IMatch } from '../../types';

interface IMatchListProps {
  matches: IMatch[],
  onDelete: (id: string) => void,
}

const MatchList: React.FC<IMatchListProps> = ({ matches, onDelete }: IMatchListProps) => {
  const data = useMemo(() => sortMatches(matches), [matches]);
  
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
              </Space>
            </div>
          </List.Item>
        )}
      />
    </>
  )
};

export default MatchList;
