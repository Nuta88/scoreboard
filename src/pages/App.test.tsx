import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import App from './App';

describe("App component tests", () => {
  test('page should have container, card and list', () => {
    render(<App />);
    
    expect(screen.getByTestId('board-container')).toBeInTheDocument();
    expect(screen.getByTestId('board-container-card')).toBeInTheDocument();
    expect(screen.getByTestId('match-list')).toBeInTheDocument();
  });
  test('should open create match modal', async () => {
    const { getByTestId } = render(<App />);
    
    expect(getByTestId('board-add-match-btn')).toBeInTheDocument();
    fireEvent.click(getByTestId('board-add-match-btn'));
    
    await waitFor(() => expect(getByTestId('create-match-modal')).toBeInTheDocument());
  });
});
