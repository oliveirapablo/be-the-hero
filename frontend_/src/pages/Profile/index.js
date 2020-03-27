import React, { useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower} from 'react-icons/fi';
import {FiTrash2} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api'
import './styles.css';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history  = useHistory();

    useEffect(()=> {
        api.get('profile',{
            headers: {
                Authorization: ongId,
            }
        }).then(response=>{
            setIncidents(response.data);
        })
    }, [ongId]);

    async function hadleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident=> incident.id !== id));
        }catch(erro){
            alert('Tente Novamente');
        }
    }
 
    function handleLogout(){
        
        localStorage.clear();

        history.push('/')

    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span> Bem vinda, APD</span>

                <Link className="button" to="/incidents/new"> Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1> 

            <ul>
                {incidents.map(incident=>(
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRICAO:</strong>
                    <p>{incident.description}</p>

                    <strcong>VALOR:</strcong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={()=>hadleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}
             </ul>

        </div>
    )
}