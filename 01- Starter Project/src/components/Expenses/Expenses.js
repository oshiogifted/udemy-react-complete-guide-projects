import React, { useState } from 'react';
import './Expenses.css';
import Card from '../UI/Card';
import ExpenseFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2020'); // '2020' is the default value

  const filterChangeHandler = selectedYear => {
    setFilteredYear(selectedYear); // update selected year - calls return to re-renders the <ExpenseFilter /> component
  };

  const filteredExpenses = props.items.filter(expense => {
    // returns true if year stored in the date is the same year as selected in the filter and returns false otherwise
    // this means that only items that match our filteredYear will be kept arround in the filteredExpenses array
    return expense.date.getFullYear().toString() === filteredYear;
  });

  return (
    <div>
      <Card className="expenses">
        <ExpenseFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
        <ExpensesChart expenses={filteredExpenses}/>
        <ExpensesList items={filteredExpenses}/>
      </Card>
    </div>
  );
}
export default Expenses;