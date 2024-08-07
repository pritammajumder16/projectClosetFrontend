import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendServiceService } from '../../../../services/backend-service.service';

@Component({
  selector: 'app-info-pages-display',
  templateUrl: './info-pages-display.component.html',
  styleUrl: './info-pages-display.component.scss',
})
export class InfoPagesDisplayComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _backendService: BackendServiceService
  ) {}
  public name!: string;
  public html!: string;
  ngOnInit() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this._activatedRoute.queryParams.subscribe((params: any) => {
      if (params['name']) {
        this.name = params['name'];
        this.getHtml();
      }
    });
  }
  camelCaseToSentence(camelCaseString: string) {
    // Split the camelCaseString into separate words
    const words = camelCaseString
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(/(?=[A-Z])/);

    // Capitalize the first letter of each word and join them into a sentence
    const sentence = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return sentence;
  }
  async getHtml() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await this._backendService
      .makeGetApiCall('admin/pageInfo', { name: this.name })
      .toPromise();
    if (res.success && res.data && res.data.length > 0) {
      this.html = res.data[0].html;
    }
  }
}
