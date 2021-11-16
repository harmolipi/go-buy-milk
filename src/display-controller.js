const displayController = (() => {
  const displayItems = [];

  const initialize = () => {
    const body = document.querySelector('body');
    const content = createContentContainer();
    const projects = createProjectsContainer();
    const navbar = createNavbar();
    const newProjectButton = createNewProjectButton();

    body.appendChild(content);
    content.prepend(navbar);
    content.appendChild(projects);
    projects.prepend(newProjectButton);
  };

  const updateDisplay = (display = displayItems) => {
    const projects = document.querySelector('#projects');
    clearProjects(projects);

    for(const project of display) {
      projects.appendChild(project.displayProject());
    }
  };

  const clearProjects = element => {
    while(element.lastChild && element.lastChild.classList.contains('project-container')) {
      element.removeChild(element.lastChild);
    }
  }

  const addProject = project => {
    displayItems.push(project);
  };

  const createContentContainer = () => {
    const content = document.createElement('div');
    content.id = 'content';
    content.classList.add('min-vh-100', 'h-100', 'ma0', 'pa0', 'paper');
    return content;
  }
  
  const createProjectsContainer = () => {
    const projects = document.createElement('div');
    projects.id = 'projects';
    projects.classList.add('flex', 'flex-wrap', 'pa2', 'pa3-ns');
    return projects;
  }

  const createNavbar = () => {
    const navbar = document.createElement('nav');

    const navBrand = document.createElement('div');
    navBrand.classList.add('nav-brand');

    const navLink = document.createElement('a');
    navLink.classList.add('f3');
    navLink.href = '#';
    navLink.textContent = 'Go Buy Milk';

    navbar.appendChild(navBrand);
    navBrand.appendChild(navLink);

    return navbar;
  }

  const createNewProjectButton = () => {
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

  return { initialize, addProject, updateDisplay };
})();

export { displayController };