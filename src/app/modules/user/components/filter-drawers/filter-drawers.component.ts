import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SideFilterComponent } from '../side-filter/side-filter.component';

@Component({
  selector: 'app-filter-drawers',
  templateUrl: './filter-drawers.component.html',
  styleUrl: './filter-drawers.component.scss',
})
export class FilterDrawersComponent {
  @Input() categories: any;

  @Input() allData: any;
  @Output() filterChangeTrigger: EventEmitter<any> = new EventEmitter();
  @ViewChild(SideFilterComponent) sideChild!: SideFilterComponent;
  @Input() productCount: any;
  trigger(event: any) {
    this.filterChangeTrigger.emit(event);
  }
  changeCount(count: number) {
    console.log(count);
    this.productCount = count;
    this.sideChild.changeCount(count);
  }
  getAllData(allData: any) {
    this.sideChild.getAllData(allData);
  }
  constructor() {}
}
