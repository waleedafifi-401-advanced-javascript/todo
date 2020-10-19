import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../app.js'

describe('app tests', () => {
  it('will add a new to do list item to the screen that is incomplete', async () => {

    render(<App />);

    // const toDoListInput = screen.getByPlaceholderText('Item Details');

    // fireEvent.change(toDoListInput, {target: {value: 'Go Jogging'}})

    const button = screen.getAllByRole('button').filter(button => {
      return button.type === 'submit'
    })

    fireEvent.click(button[0]);
  
      // expect(screen.getByText('Go Jogging')).not.toBeTruthy();
  
      // expect(screen.getByText('Go Jogging')).toHaveClass('list-group-item-success')
  })  
})
