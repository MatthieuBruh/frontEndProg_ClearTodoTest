import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import'@testing-library/jest-dom/extend-expect';
import TodoTable from'./TodoTable';

test('verify the inputs and button', () => {
  render(<App />);
  const dateField = screen.getByPlaceholderText(/Date/i);
  fireEvent.change(dateField, {target: {value: '16.12.2022'}});
  const descField = screen.getByPlaceholderText(/Description/i);
  fireEvent.change(descField, {target: {value: 'Go to sleep at 10pm'}});

  expect(dateField).toHaveValue('16.12.2022');
  expect(descField).toHaveValue('Go to sleep at 10pm');

  const addButton = screen.getByText(/Add/i);
  fireEvent.click(addButton);

  expect(dateField).toHaveValue('');
  expect(descField).toHaveValue('');
});


test('create a new todo', () => {
  render(<App />);
  const dateField = screen.getByPlaceholderText(/Date/i);
  fireEvent.change(dateField, {target: {value: '31.10.2022'}});
  const descField = screen.getByPlaceholderText(/Description/i);
  fireEvent.change(descField, {target: {value: 'Go to FrontEnd programming course'}});
  const addButton = screen.getByText(/Add/i);
  fireEvent.click(addButton);
  
  const tablecell = screen.getByText(/Go to FrontEnd programming course/i);
  expect(tablecell).toBeInTheDocument();
});

test('todo is rendered', () => {
  const row = [
    {
      date: '01.11.2022',
      desc: 'Finish the mobile programming project'
    }
  ];
  render(<TodoTable todos={row} />);
  const tablecell = screen.getByText(/Finish the mobile programming project/i);
  expect(tablecell).toBeInTheDocument();
  const dateTablecell = screen.getByText(/01.11.2022/i);
  expect(dateTablecell).toBeInTheDocument();
});

test('clear all todos', () => {
  const res = render(<App />);
  const dateField = screen.getByPlaceholderText(/Date/i);
  const descField = screen.getByPlaceholderText(/Description/i);
  const addButton = screen.getByText(/Add/i);
  const table = res.container.querySelector('table');
  

  for (let i = 0; i < 5; i++) {
    let dateVal = '0' + (i+1) + '.11.2022';
    fireEvent.change(dateField, {target: {value: dateVal}});
    fireEvent.change(descField, {target: {value: 'Go to FrontEnd programming course' + i}});
    fireEvent.click(addButton);
  }

  // Verify that the table has 5 rows
  expect(table.rows.length).toBe(5);
  // Verify random data
  const tablecell = screen.getByText(/Go to FrontEnd programming course2/i);
  expect(tablecell).toBeInTheDocument();

  const clearButton = screen.getByText(/Clear/i);
  fireEvent.click(clearButton);

  // Verify that the table has 0 rows
  expect(table.rows.length).toBe(0);
  expect(tablecell).not.toBeInTheDocument();
});