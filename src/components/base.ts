// Component Base Class
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    where: InsertPosition,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    newElementId && (this.element.id = newElementId);

    this.attach(where);
  }

  private attach(where: InsertPosition) {
    this.hostElement.insertAdjacentElement(where, this.element);
  }

  abstract configure(): void;

  abstract renderContent(): void;
}
