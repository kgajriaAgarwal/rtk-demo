import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [incrementBy, setIncrementBy] = useState(0);
  const addVal = Number(incrementBy) || 0;

  const resetAll = () => {
    setIncrementBy(0);
    dispatch(reset());
  };

  return (
    <>
      <h4>Counter</h4>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        {/* <button onClick={() => dispatch(reset())}>Reset</button> */}

        <input
          type="text"
          value={incrementBy}
          onChange={(e) => setIncrementBy(e.target.value)}
        />
        <button onClick={() => dispatch(incrementByAmount(addVal))}>
          Add Amount
        </button>
        <button onClick={resetAll}>reset</button>
      </div>
    </>
  );
};

export default Counter;
