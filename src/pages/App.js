import { useState } from "react";
import gitLogo from "../assets/github.png";
import Input from "../components/Input";
import ItemRepo from "../components/ItemRepo";
import { Container } from "./styles";
import Button from "../components/Button";
import api from "../services/api";

function App() {
  const [repos, setRepos] = useState([]);
  const [currentRepo, setCurrentRepo] = useState("");

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`);

    if (data.id) {
      const isExist = repos.find((repo) => repo.id === data.id);

      if (!isExist) {
        setRepos((prev) => [...prev, data]);
        setCurrentRepo("");
        return;
      } else {
        alert("Repositorio ja está listado");
      }
    }
    alert("Repositório nao encontrado!");
  };

  const handleRemoveRepo = (id) => {
    const updatedRepos = repos.filter((repo) => repo.id !== id);

    setRepos(updatedRepos);
  };

  return (
    <div className="App">
      <Container>
        <img src={gitLogo} alt="gitLogo" width={72} height={72} />
        <Input
          value={currentRepo}
          onChange={(ev) => setCurrentRepo(ev.target.value)}
        />
        <Button onClick={handleSearchRepo} />
        {repos.map((repo) => (
          <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />
        ))}
      </Container>
    </div>
  );
}

export default App;
