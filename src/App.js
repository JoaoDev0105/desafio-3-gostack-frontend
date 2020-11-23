import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  // Cria duas variaves para estado inicial e estado alterado dentro de um array vazio
  const [repositories, setRepositories] = useState([]);
  // Para buscar os projetos dentro do response.data através da função then 
  useEffect (() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Desafio ReactJS 3",
      url: "https://github.com/joaopaulomp0105",
      techs: ["HTML", "Node.js"],
    })
    // Copiando todo o array através do express-operation
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    /**
     * Ira efetuar uma busca por todos os ids e ao encontrar o id correto
     * ira verificar se e o mesmo id selecionado se for ira deletar   
     */
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
