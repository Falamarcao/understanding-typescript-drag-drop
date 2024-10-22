/// <reference path="models/project.ts" />
/// <reference path="components/project/input.ts" />
/// <reference path="components/project/item.ts" />
/// <reference path="components/project/lists.ts" />


namespace App {
  new ProjectInput();
  new ProjectList(ProjectStatus.Active);
  new ProjectList(ProjectStatus.Finished);
}
