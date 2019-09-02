const express = require("express");

const server = express();

server.use(express.json());

let numberOfRequests = 0;
server.use((req, res, next) => {
  numberOfRequests++;
  console.log(`Number of requests: ${numberOfRequests}`);
  return next();
});

const projects = [];

function checkProjectParams(req, res, next) {
  const project = projects.filter(p => {
    return p.id == req.params.id;
  });
  if (project.length > 0) {
    if (req.method != "DELETE" && req.method != "POST" && req.method != "PUT") {
      return res.status(400).json({ error: "Project does exists" });
    }
  } else if (project.length == 0) {
    return res.status(400).json({ error: "Project does not exists" });
  }
  return next();
}

function checkProject(req, res, next) {
  const project = projects.filter(p => {
    return p.id == req.body.id;
  });
  if (project.length > 0) {
    return res.status(400).json({ error: "Project does exists" });
  } else if (project.length == 0 && req.method != "POST") {
    return res.status(400).json({ error: "Project does not exists" });
  } else {
    return next();
  }
}

server.post("/projects", checkProject, (req, res) => {
  const { id, title } = req.body;
  projects.push({
    id: id,
    title: title,
    task: []
  });
  return res.json(projects);
});
server.post("/projects/:id/tasks", checkProjectParams, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);
  project.task.push(title);
  return res.json(project);
});

server.put("/projects/:id", checkProjectParams, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);
  project.title = title;
  return res.json(project);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.delete("/projects/:id", checkProjectParams, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);
  projects.splice(projectIndex, 1);

  return res.send();
});

server.listen(3000);
