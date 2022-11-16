import React from 'react';
import { render } from '@testing-library/react';

import MatchList from './index';

import { Match } from '../../types';

const match1 = new Match('Canada', 'Mexico', 2, 5);
const match2 = new Match('Spain', 'Brazil', 2, 10);
const onDeleteMock = jest.fn();

describe("MatchList component", () => {
  test('should render component', async () => {
    const { getByTestId } = render(<MatchList matches={[match1, match2]} onDelete={onDeleteMock} />);
    
    expect(getByTestId('match-list')).toBeInTheDocument();
  });
});
