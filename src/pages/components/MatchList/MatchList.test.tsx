import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import MatchList from './index';

import { Match } from '../../../types';

const match1 = new Match('Canada', 'Mexico', 2, 5);
const match2 = new Match('Spain', 'Brazil', 2, 10);
const onDeleteMock = jest.fn();
const onUpdateMock = jest.fn();

describe("MatchList component", () => {
  test('should render component and open modal', async () => {
    const { getByTestId, getAllByTestId } = render(
      <MatchList matches={[match1, match2]} onDelete={onDeleteMock} onUpdate={onUpdateMock} />
    );
    
    expect(getByTestId('match-list')).toBeInTheDocument();
    expect(getAllByTestId('match-list-update-btn')[0] as HTMLAnchorElement).toBeInTheDocument();
    fireEvent.click(getAllByTestId('match-list-update-btn')[0] as HTMLAnchorElement);
  
    await waitFor(() => expect(getByTestId('update-score-modal')).toBeInTheDocument());
  });
});
