import { Project, ProjectStatus } from '../models/project.js';


// Project State Management
type Listener<T> = (items: T[]) => void;

export abstract class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listener: Listener<T>) {
    this.listeners.push(listener);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  } // Singleton class - private constructor and getInstance method.

  static getInstance() {
    return this.instance ?? (this.instance = new ProjectState());
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(), // OK for a demo. this is not 100% secure that generates unique IDs.
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  changeStatus(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((project) => project.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listener of this.listeners) {
      listener(this.projects.slice()); // Passing a copy to avoid unwanted behavior.
    }
  }
}

export const projectState = ProjectState.getInstance();
