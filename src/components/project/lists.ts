import { Component } from '../base.js';
import { DragTarget } from '../../models/drag-drop.js';
import { Project, ProjectStatus } from '../../models/project.js';
import { AutoBind } from '../../decorators/autobind.js';
import { projectState } from '../../state/project-state.js';
import { ProjectItem } from './item.js';

// ProjectList Class
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: ProjectStatus) {
    super('project-list', 'app', 'beforeend', `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listElement = this.element.querySelector('ul')! as HTMLUListElement;
      listElement.classList.add('droppable');
    }
  }

  @AutoBind
  dropHandler(event: DragEvent): void {
    const projectId = event.dataTransfer!.getData('text/plain');
    projectState.changeStatus(projectId, this.type);
  }

  @AutoBind
  dragLeaveHandler(_event: DragEvent): void {
    const listElement = this.element.querySelector('ul')! as HTMLUListElement;
    listElement.classList.remove('droppable');
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects.filter(
        (project) => project.status === this.type
      );
      this.renderProjects();
    });
  }

  private renderProjects() {
    const listElement = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;

    listElement.innerHTML = ''; // reset list element

    for (const project of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, project);
    }
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }
}
