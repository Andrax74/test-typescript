import './App.css';

import Clienti from './Components/Clienti';
import React from 'react';

const App : React.FC = () => {
  return (
    <div className="container">
      <h1>Saluti sono React con Typescript</h1>

      <Clienti
      nome = "Nicola La Rocca"
      bollini = {1780}
      data = "01/07/20211"
      />

      <Clienti
      nome = "Mario Bianchi"
      bollini = {238}
      data = "01/08/20211"
      />
    </div>
  );
}

export default App;
