import React, { useEffect, useState } from "react";

import "./styles.css";

function App() {
  // Cria duas variaves para estado inicial e estado alterado dentro de um array vazio
  const [repositories, setRepositories] = useState([]);
  // Para buscar os projetos dentro do response.data através da função then 
  useEffect (() => {
    api.get(repositories).then(response => {
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
      // Copiando todo o array através do express operation
       // setProjects ([...projects, `Novo projeto ${Date.now()}`]);  
       const response = await api.post('repositories', {
        url: "https://github.com/joaopaulomp0105",
        title: "Desafio ReactJS 3",
        techs: ["HTML", "Node.js"],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
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
