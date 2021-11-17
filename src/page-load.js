import { DisplayController } from './display-controller';
import { ProjectsController } from './projects-controller';

const pageLoad = () => {
  ProjectsController.initialize();
  DisplayController.initialize();
  DisplayController.updateDisplay();
};

export default pageLoad;