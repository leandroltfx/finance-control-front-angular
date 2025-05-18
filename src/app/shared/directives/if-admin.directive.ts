// if-admin.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIfAdmin]',
  standalone: true, // Angular 16 recomenda usar standalone para diretivas/componentes isolados
})
export class IfAdminDirective {
  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appIfAdmin(isAdmin: boolean) {
    this.viewContainer.clear();
    if (isAdmin) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
