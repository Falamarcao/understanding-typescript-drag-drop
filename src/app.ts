import { ProjectInput } from "./components/project/input.js";
import { ProjectList } from './components/project/lists.js';
import { ProjectStatus } from './models/project.js';

new ProjectInput();
new ProjectList(ProjectStatus.Active);
new ProjectList(ProjectStatus.Finished);
