import './App.css';

import React, {useEffect, useState} from 'react';

import Clienti from './Components/Clienti';
import { IClienti } from './Types/IClienti';
import { Loading } from './Components/Loading';
import axios from 'axios';

const App : React.FC = () => {

  interface IallClienti {
    currentCli : IClienti;
    allCli : Array<IClienti>;
  }

  const [clientiState, setClientiState] = useState<IallClienti>({
    currentCli: {
      codfid : "",
      nome : "",
      bollini : 0,
      data : "",
      deleteCli : () => {}
    },
    allCli: []
  })

  const [bollini, setBollini] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Attivato useEffect");

    if (bollini > 0)
    {
      console.log("Hai diritto a " + (bollini / 500) + " Coupons"); 
    }

  },[bollini])

  useEffect(() => {
    fetch('http://localhost:5051/api/clienti/cerca/all')
    .then(res => {
      
      if (!res.ok) {
        throw Error("Impossibile ottenere i dati dei clienti!");
      }
      return res.json();
    })
    .then(data => {
      console.log(data);

      setClientiState({
        currentCli: {
          codfid : "",
          nome : "",
          bollini : 0,
          data : "",
          deleteCli : () => {}
        },
        allCli : data
      })
      setLoading(false);
    })
    .catch(err => {
      console.log(err.message);
      setError(err.message);
      setLoading(false);
    })
  },[])

  const onChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) : void => {

    setClientiState({
      ...clientiState,
      currentCli : {
        ...clientiState.currentCli,
        [e.target.name] : e.target.value

      }
    })

    if (e.target.name === "nome" &&  e.target.value === "main")
    {
      setClientiState({
        ...clientiState,
        currentCli : {
          ...clientiState.currentCli,
          nome : "Nicola",
          bollini : 1500,
          data : "01/09/2021"
        }
      })
    }
  }

  const submitForm = (e : React.SyntheticEvent) : void => {
    e.preventDefault();

    axios.post('http://localhost:5051/api/clienti/registra', clientiState.currentCli)
      .then(response => {

        console.log(response);

        setClientiState({
          currentCli: {
            codfid : "",
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


      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      })
  }

  console.log(clientiState);

  const viewAllClienti = clientiState.allCli.map((cliente, i) => (
    <Clienti
    key = {i}
    codfid = {cliente.codfid}
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

    console.log(clientiState.allCli[index].codfid);    

    axios.delete(`http://localhost:5051/api/clienti/elimina/${clientiState.allCli[index].codfid}`)
    .then(response => {

      console.log(response);

      setClientiState({
        ...clientiState,
        allCli : filteredCli
      })

    })
    .catch(error => {
      console.log(error);
      setError(error.message);
    })

    
  }
  
  return (
    <div className="container">
      <h1>Saluti sono React con Typescript</h1>
      <br/>

      <form onSubmit={submitForm}>

      <div className="mb-3">
          <label htmlFor="nomeCli" className="form-label">CodFid:</label>
          <input 
          className = "form-control"
          id = "codFid"
          type = "text"
          name = "codfid"
          onChange = {onChangeHandler}
          value = {clientiState.currentCli.codfid}
          />
        </div>

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

        <button className="btn btn-primary" onClick={() => setBollini(clientiState.currentCli.bollini)}>Calcola Coupon</button>
      </form>
      {error && <div className="errmsg alert alert-danger" role="alert">{error}</div>}
      {loading && <Loading/>}
      {viewAllClienti}
    </div>
  );
}

export default App;
