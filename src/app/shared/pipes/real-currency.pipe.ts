// real-currency.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appRealCurrency',
  standalone: true,
})
export class RealCurrencyPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) return '';
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
