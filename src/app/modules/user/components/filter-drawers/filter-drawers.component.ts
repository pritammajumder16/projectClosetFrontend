import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SideFilterComponent } from '../side-filter/side-filter.component';
import { ICategory } from '../../../../../models/category';
import { IFilters } from '../../../../../models/filters';

@Component({
  selector: 'app-filter-drawers',
  templateUrl: './filter-drawers.component.html',
  styleUrl: './filter-drawers.component.scss',
})
export class FilterDrawersComponent {
  @Input() categories!: ICategory[];

  @Input() allData!: { [key: string]: string };
  @Output() filterChangeTrigger: EventEmitter<IFilters> = new EventEmitter();
  @ViewChild(SideFilterComponent) sideChild!: SideFilterComponent;
  @Input() productCount!: number;
  trigger(event: IFilters) {
    this.filterChangeTrigger.emit(event);
  }
  changeCount(count: number) {
    console.log(count);
    this.productCount = count;
    this.sideChild.changeCount(count);
  }
  getAllData(allData: { [key: string]: string }) {
    this.sideChild.getAllData(allData);
  }
  constructor() {}
}
