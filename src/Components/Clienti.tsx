import './Clienti.css';

import { IClienti } from '../Types/IClienti';
import React from 'react';

const Clienti : React.FC<IClienti> = ({nome,bollini,data}) => {
    return (
        <div className="card">
            <h5 className="card-header">{nome}</h5>
            <div className="card-body">
                <h5 className="card-title">Monte Bollini: {bollini}</h5>
                <p className="card-text">Ultima Spesa Eseguita il {data}</p>
                <button className="btn btn-primary">Elimina</button>
            </div>
        </div>
    )
}

export default Clienti;
