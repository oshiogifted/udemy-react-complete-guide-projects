import React, { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  // Alternative - using one state as opposed to multiple states
  /* const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: ''
  }); */

  const titleChangedHander = (event) => {
    setEnteredTitle(event.target.value);
    //console.log(event.target.value);
    /* setUserInput({
      ...userInput,
      enteredTitle: event.target.value
    }) */
    /* setUserInput((prevState) => {
      return {...prevState, enteredTitle: event.target.value};
    }); */
  };

  const amountChangedHander = (event) => {
    setEnteredAmount(event.target.value);
    /* setUserInput({
      ...userInput,
      enteredAmount: event.target.value
    }) */
  };

  const dateChangedHander = (event) => {
    setEnteredDate(event.target.value);
    /* setUserInput({
      ...userInput,
      enteredDate: event.target.value
    }) */
  };

  const sumbitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate)
    };

    props.onSaveExpenseData(expenseData); // communicating up to NewExpense.js

    // Two way binding to clear input after user submited form
    // Remember to set value={enteredX} where 'x' is Title, Date, or Amount
    
    /*     
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate(''); */
  };

  return (
    <form onSubmit={sumbitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input
            type='text'
            value={enteredTitle}
            onChange={titleChangedHander} />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangedHander} />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input
            type='date'
            min='2019-01-01'
            step='2022-12-31'
            value={enteredDate}
            onChange={dateChangedHander} />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;