// Posts.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Posts from './Posts';

describe('Posts', () => {
  beforeEach(() => {
    localStorage.setItem('posts', JSON.stringify([{ id: 1, title: 'Test Title', body: 'Test Body' }]));
  });

  test('renders posts from localStorage', () => {
    render(<Posts />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Body')).toBeInTheDocument();
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
  });
});
