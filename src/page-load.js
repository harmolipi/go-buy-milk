import { displayController } from './display-controller';
import { generateDefault } from './default-project-module';

const pageLoad = () => {
  displayController.initialize();
  const defaultProjects = generateDefault();
  displayController.addProject(defaultProjects[0]);
  displayController.addProject(defaultProjects[1]);
  displayController.updateDisplay();
};

export default pageLoad;