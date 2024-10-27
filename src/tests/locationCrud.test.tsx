import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LocationCrud from '../components/LocationCrud';

test('adds a new location', () => {
  const { getByPlaceholderText, getByText, getByRole } = render(<LocationCrud />);

  const input = getByPlaceholderText('Enter address');
  const addButton = getByRole('button', { name: /add location/i });

  fireEvent.change(input, { target: { value: '123 Main St' } });
  fireEvent.click(addButton);

  expect(getByText('123 Main St')).toBeTruthy();
});

test('edits an existing location', () => {
  const { getByPlaceholderText, getByText, getByRole } = render(<LocationCrud />);

  const input = getByPlaceholderText('Enter address');
  const addButton = getByRole('button', { name: /add location/i });

  fireEvent.change(input, { target: { value: '123 Main St' } });
  fireEvent.click(addButton);

  const editButton = getByText('Edit');
  fireEvent.click(editButton);

  fireEvent.change(input, { target: { value: '456 Elm St' } });
  const updateButton = getByRole('button', { name: /update location/i });
  fireEvent.click(updateButton);

  expect(getByText('456 Elm St')).toBeTruthy();
  expect(() => getByText('123 Main St')).toThrow();
});

test('deletes a location', () => {
  const { getByPlaceholderText, getByText, getByRole, queryByText } = render(<LocationCrud />);

  const input = getByPlaceholderText('Enter address');
  const addButton = getByRole('button', { name: /add location/i });

  fireEvent.change(input, { target: { value: '123 Main St' } });
  fireEvent.click(addButton);

  const deleteButton = getByText('Delete');
  fireEvent.click(deleteButton);

  expect(queryByText('123 Main St')).toBeNull();
});
