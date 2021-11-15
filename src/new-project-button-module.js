const displayNewProjectButton = () => {
  const newProjectButton = document.createElement('button');
  newProjectButton.setAttribute('id', 'new-project-button');
  newProjectButton.classList.add('article', 'mw5', 'bg-white', 'f4', 'f3-ns', 'pa2', 'pa3-ns', 'ma3', 'flex', 'flex-column', 'items-center');

  const plusSign = document.createElement('span');
  plusSign.classList.add('f1');
  plusSign.innerText = '+';

  const addNewProject = document.createElement('span');
  addNewProject.innerText = 'Add New Project';
  
  newProjectButton.appendChild(plusSign);
  newProjectButton.appendChild(addNewProject);

  return newProjectButton;
}

export  { displayNewProjectButton };