import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'statusPipe' })
export class statusPipe implements PipeTransform {
  transform(el: any) {
    let status = '';
    switch (el) {
      case 0:
        status = 'INATIVO';
        break;

      case 1:
        status = 'ATIVO';
        break;
    }

    return status;
  }
}
