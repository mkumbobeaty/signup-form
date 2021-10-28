import { useState } from 'react';
import './asserts/css/App.scss';
import SignInForm from './components/form';

function App() {
  const [values, sethandleValue] = useState({})
  const [genderSelected, setGenderSelected] = useState(null);

  return (
    <div className="App">
        <SignInForm  handleSubmit={sethandleValue} genderSelected={genderSelected} setGenderSelected={setGenderSelected}/>
    </div>
  );
}

export default App;
