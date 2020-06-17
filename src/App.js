import React, { useState, useEffect } from "react";
import api from 'services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    const getRepositories = async () => {
      try {
        let _repositories = await api.get('/repositories');
        _repositories = _repositories.data;
        setRepositories(_repositories);
      } catch (error) {
        console.error('Falha ao listar os repositórios');
      }
    };

    getRepositories();
  }, [])

  async function handleAddRepository() {
    try {
      const repository = await api.post('/repositories', {
        title: `Repositório ${new Date().getTime()}`,
        url: `#`,
        techs: ['React', 'Node']
      });

      setRepositories([...repositories, repository.data]);
    } catch (error) {
      console.error('Falha ao adicionar um repositório');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      const repositoryIndex = repositories.findIndex(rep => rep.id === id);
      const reps = [...repositories];
      reps.splice(repositoryIndex, 1);
      setRepositories(reps);
    } catch (error) {
      console.error('Falha ao excluir o repositório');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
