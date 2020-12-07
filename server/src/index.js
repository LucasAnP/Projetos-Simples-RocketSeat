const { request, response } = require('express');
const express = require('express'); // Importing the Express
const {uuid, isUuid} = require('uuidv4');

const app = express (); 
//    '/Observed port', (request, respopnse) Request = who keep the informations


 
const project = [];

function logRequests(request, response, next){
   const {method, url} = request;

   const logLabel = `[${method.toUpperCase()}] ${url}`;

   console.time(logLabel);

  next();
  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next){
  const { id } = request.params;

  if (!isUuid(id)){
    return response.status(400).json({error:'Invalid project ID.'});
  }
  return next();
}

 
app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects',(request,response)=>{
    const {title} = request.query;

    const results = title
      ? projects.filter(project => project.title.includes(title))
      :projects;

  return response.json(results);
});

app.post('/projects', (request, response)=>{
  const {title, owner} = request.body;

  const project = {id: uuid(),title,owner};

  projects.push(project);

  return response.json(project);
});

app.put('/projects/:id', (request, response)=>{
  const {id} = request.params;
  const {title, owner} = request.body;

  const projectIndex = projects.findIndex(projects => project.id === id);

  if (projectIndex < 0){
    return response.json({error: 'Project not found'});
  }

  const project = {
    id,
    title,
    owner
  }

  projects[projectIndex]  = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response)=>{
  const {id} = request.params;

  const projectIndex = projects.findIndex(projects => project.id === id);

  if (projectIndex < 0){
    return response.status(400).json({error: 'Project not found.'});
  }
        // remove
  project.splice(projectIndex, 1)
  return response.status(204).send();
});




// => Shot a function when the server will be able.
app.listen(3333, () =>{
  console.log('✔ Server Started!')
}); // Calling a port to backend