import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'display',
  standalone: true
})
export class DisplayPipe implements PipeTransform {

  transform(value: number, format: string): string|number {
    if (!value) return value;

    switch(format){
      case 'c':
        return '($'+value+')';

      default:
          return value;
    }
  }

}
