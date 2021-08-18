import './App.css';

import React, { useState } from 'react';

import Clienti from './Components/Clienti';
import { IClienti } from './Types/IClienti';

const App : React.FC = () => {

  interface IallClienti {
    currentCli : IClienti;
    allCli : Array<IClienti>;
  }

  const [clientiState, setClientiState] = useState<IallClienti>({
    currentCli: {
      nome : "",
      bollini : 0,
      data : "",
      deleteCli : () => {}
    },
    allCli: []
  })

  const onChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) : void => {

    setClientiState({
      ...clientiState,
      currentCli : {
        ...clientiState.currentCli,
        [e.target.name] : e.target.value

      }
    })
  }

  const submitForm = (e : React.SyntheticEvent) : void => {
    e.preventDefault();

    setClientiState({
      currentCli: {
        nome : "",
        bollini : 0,
        data : "",
        deleteCli : () => {}
      },
      allCli : [
        ...clientiState.allCli,
        clientiState.currentCli
      ]
    })

  }

  console.log(clientiState);

  const viewAllClienti = clientiState.allCli.map((cliente, i) => (
    <Clienti
    key = {i}
    nome = {cliente.nome}
    bollini = {cliente.bollini}
    data = {cliente.data}
    deleteCli = {() =>  deleteHandler(i)}
    />
  ))

  const deleteHandler = (index : number) : void => {

    const filteredCli = clientiState.allCli.filter((cliente, i) => {
        return index !== i
    })

    setClientiState({
      ...clientiState,
      allCli : filteredCli
    })
  }
  
  return (
    <div className="container">
      <h1>Saluti sono React con Typescript</h1>
      <br/>

      <form onSubmit={submitForm}>

        <div className="mb-3">
          <label htmlFor="nomeCli" className="form-label">Nome:</label>
          <input 
          className = "form-control"
          id = "nomeCli"
          type = "text"
          name = "nome"
          onChange = {onChangeHandler}
          value = {clientiState.currentCli.nome}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nrBollini" className="form-label">Bollini:</label>
          <input 
          className = "form-control"
          id = "nrBollini"
          type = "number"
          name = "bollini"
          onChange = {onChangeHandler}
          value = {clientiState.currentCli.bollini}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nomeCli" className="form-label">Data Spesa:</label>
          <input 
          className = "form-control"
          id = "dataSpesa"
          type = "text"
          name = "data"
          onChange = {onChangeHandler}
          value = {clientiState.currentCli.data}
          />
        </div>
        <button type="submit" className="btn btn-primary">Aggiungi Cliente</button>

      </form>
      {viewAllClienti}
    </div>
  );
}

export default App;
