const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;
  const repository = { id: uuid(), url, title, techs, likes: 0 }
  repositories.push(repository)
  response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id)

  if(repositoryIndex < 0) {
    return response.status(400).json({ "error": "Notfound" })
  }

  const { likes } = repositories.find(repository => repository.id === id);

  const repository = {
      id,
      url,
      title,
      techs,
      likes
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id)

  if(repositoryIndex < 0) {
    return response.status(400).json({ "error": "Notfound" })
  }

  repositories.splice(repositoryIndex, 1)

  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id)

  if(repositoryIndex < 0) {
    return response.status(400).json({ "error": "Notfound" })
  }

  const { url, title, techs, likes } = repositories.find(repository => repository.id == id)

  const nowLikes = likes + 1

  const repository = {
    id,
    url,
    title,
    techs,
    likes: nowLikes
  }

repositories[repositoryIndex] = repository;

return response.status(200).json(repository);

});

module.exports = app;
