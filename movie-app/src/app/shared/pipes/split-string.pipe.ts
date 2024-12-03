import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitString',
  standalone: true
})
export class SplitStringPipe implements PipeTransform {

  transform(value: string, separator: string): string[] {
    return value ? value.split(separator).filter(x => x) : [];
  }

}
