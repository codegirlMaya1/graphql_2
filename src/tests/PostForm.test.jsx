// PostForm.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostForm from './PostForm';

describe('PostForm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('creates a new post', () => {
    render(<PostForm />);
    fireEvent.change(screen.getByPlaceholderText('Post ID (for update/delete)'), { target: { value: '1' } });
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Body'), { target: { value: 'Test Body' } });
    fireEvent.click(screen.getByText('Create Post'));

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Body')).toBeInTheDocument();
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
  });

  test('updates an existing post', () => {
    render(<PostForm />);
    fireEvent.change(screen.getByPlaceholderText('Post ID (for update/delete)'), { target: { value: '1' } });
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Body'), { target: { value: 'Test Body' } });
    fireEvent.click(screen.getByText('Create Post'));

    fireEvent.change(screen.getByPlaceholderText('Post ID (for update/delete)'), { target: { value: '1' } });
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Title' } });
    fireEvent.change(screen.getByPlaceholderText('Body'), { target: { value: 'Updated Body' } });
    fireEvent.click(screen.getByText('Update Post'));

    expect(screen.getByText('Updated Title')).toBeInTheDocument();
    expect(screen.getByText('Updated Body')).toBeInTheDocument();
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
  });

  test('deletes a post', () => {
    render(<PostForm />);
    fireEvent.change(screen.getByPlaceholderText('Post ID (for update/delete)'), { target: { value: '1' } });
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Body'), { target: { value: 'Test Body' } });
    fireEvent.click(screen.getByText('Create Post'));

    fireEvent.click(screen.getByText('Delete'));

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Body')).not.toBeInTheDocument();
    expect(screen.queryByText('ID: 1')).not.toBeInTheDocument();
  });
});
