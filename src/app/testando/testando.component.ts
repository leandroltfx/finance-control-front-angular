import { Component } from '@angular/core';
import { IfAdminDirective } from '../shared/directives/if-admin.directive';
import { HighlightDirective } from '../shared/directives/highlight.directive';
import { SimpleDatePipe } from '../shared/pipes/simple-date.pipe';
import { RealCurrencyPipe } from '../shared/pipes/real-currency.pipe';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'fc-testando',
  templateUrl: './testando.component.html',
  styleUrls: ['./testando.component.css'],
  imports: [
    IfAdminDirective,
    HighlightDirective,
    SimpleDatePipe,
    RealCurrencyPipe,
  ],
  standalone: true
})
export class TestandoComponent {

  searchTerm: string = '';
  user = { isAdmin: true };
  hoje = new Date();
  preco = 1500.99;

  users: User[] = [
    { id: 1, name: 'João Silva', email: 'joao@email.com' },
    { id: 2, name: 'Maria Oliveira', email: 'maria@email.com' },
    { id: 3, name: 'Carlos Souza', email: 'carlos@email.com' },
    { id: 4, name: 'Ana Lima', email: 'ana@email.com' },
    { id: 5, name: 'Fernanda Costa', email: 'fernanda@email.com' }
  ];

}
