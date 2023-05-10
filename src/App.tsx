import React from 'react';
import MultiSelect, { MultiSelectOption } from './components/MultiSelect/MultiSelect';
import './App.scss';

const items: MultiSelectOption[] = [
  { label: "Natation", value: "44" },
  { label: "Basket", value: "45" },
  { label: "Football", value: "46" },
  { label: "Tennis", value: "47" }
];

function App() {
  return (
    <div className="container">
      <MultiSelect name="Sports" label="sports" options={items} onChange={(v: string) => console.log(v)} />
    </div>
  );
}

export default App;
