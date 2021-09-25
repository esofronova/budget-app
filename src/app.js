import { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import './style.scss';

export default function App() {

  let [expensesArray, setExpensesArray] = useState([
    {
      title: "desk",
      value: 320
    },
    {
      title: "tv",
      value: 540
    },
    {
      title: "bed",
      value: 260
    }
  ]);

  let [budget, setBudget] = useState();
  let [budgetValue, setBudgetValue] = useState();
  let [expenses, setExpenses] = useState(countExpenses(expensesArray));
  let [balance, setBalance] = useState();
  let [expenseTitle, setExpenseTitle] = useState('');
  let [expenseAmount, setExpenseAmount] = useState();

  // Sum of object.titles in array
  function countExpenses(arr) {
    let sum = arr.reduce((a, b) => { return a + b.value }, 0);
    return sum;
  };

  return (
    <div className="budget-app m-4">
      <h1 className="fw-bold">Budget App</h1>
      <div className="row mt-4">
        <form className="col-5 border border-success border-3 p-3 rounded">
          <p className="mb-2">Please Enter Your Budget</p>
          <input
            type="text"
            className="form-control border border-success mb-3 budget"
            required
            value={budgetValue === 0 ? '' : budgetValue}
            onChange={e => { setBudgetValue(e.target.value) }}
            onFocus={() => { if (budgetValue === 0) { setBudgetValue(''); } }}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => {
              setBudget(budgetValue);
              setBalance(Number(budgetValue) - expenses);
              setBudgetValue('');
            }}
          >Calculate</button>
        </form>
        <div className="col-7 d-flex balance">
          <div className="col-4">
            <h3>Budget</h3>
            <i><Icon.Cash /></i>
            <h2 className="text-success">$ {budget ? budget : 0}</h2>
          </div>
          <div className="col-4">
            <h3>Expenses</h3>
            <i><Icon.CreditCard /></i>
            <h2 className="text-danger">$ {expenses ? expenses : 0}</h2>
          </div>
          <div className="col-4">
            <h3>Balance</h3>
            <i><b>$</b></i>
            <h2 className={balance > 0 ? "text-success" : balance < 0 ? "text-danger" : ""}>$ {balance ? balance : 0}</h2>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <form className="col-5 border border-danger border-3 p-3 rounded">
          <p className="mb-2">Please Enter Your Expense</p>
          <input
            type="text"
            className="form-control border border-danger mb-3 expense-title"
            required
            value={expenseTitle}
            onChange={e => { setExpenseTitle(e.target.value); }}
          />
          <p className="mb-2">Please Enter Expense Amount</p>
          <input
            type="text"
            className="form-control border border-danger mb-3 expense-amount"
            required
            value={expenseAmount}
            onChange={e => { setExpenseAmount(e.target.value); }}
          />
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => {
              let newExpensesArray = [...expensesArray];
              newExpensesArray.push({
                title: expenseTitle,
                value: expenseAmount
              });
              setExpensesArray(newExpensesArray);
              setExpenses(expenses !== undefined ? expenses + Number(expenseAmount) : Number(expenseAmount));
              setExpenseTitle('');
              setExpenseAmount('');
            }}
          >Add Expense</button>
        </form>
        <div className="col-7 expenses text-center">
          <div className="expenses-title d-flex mb-2 fw-bold  fs-6">
            <div className="col-4">Expense Title</div>
            <div className="col-4">Expense Value</div>
            <div className="col-4"></div>
          </div>
          {
            expensesArray.map((item, index) => {
              return (
                <div className="d-flex text-danger mb-2" key={index}>
                  <div className="col-4 text-uppercase">{item.title}</div>
                  <div className="col-4">$ {item.value}</div>
                  <button
                    className="col-4 py-0 btn text-danger"
                    onClick={() => {
                      let newExpensesArray = [...expensesArray];
                      newExpensesArray.splice(index, 1);
                      setExpenses(countExpenses(newExpensesArray));
                      setExpensesArray(newExpensesArray);
                    }}
                  ><Icon.TrashFill /></button>
                </div>
              );
            })
          }
        </div>
      </div>
      <button className="btn btn-primary mt-4"
        onClick={() => {
          setBudgetValue('');
          setBudget('');
          setExpenses('');
          setBalance('');
          setExpenseTitle('');
          setExpenseAmount('');
          setExpensesArray([]);
        }}
      >Start Again</button>
    </div>
  );
};