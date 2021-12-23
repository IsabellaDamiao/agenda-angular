import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case ' ': return 'code';
      case 'oi': return 'computer';
    }
    return 'code';
  }

}
