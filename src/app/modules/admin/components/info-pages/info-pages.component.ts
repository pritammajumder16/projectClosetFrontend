import { Component } from '@angular/core';
import { Editor } from 'ngx-editor';
import { BackendServiceService } from '../../../../services/backend-service.service';

@Component({
  selector: 'app-info-pages',
  templateUrl: './info-pages.component.html',
  styleUrl: './info-pages.component.scss',
})
export class InfoPagesComponent {
  editor1!: Editor;
  editor2!: Editor;
  html1 = '';
  html2 = '';
  public types = ['aboutUs', 'contactUs'];
  constructor(private _backendService: BackendServiceService) {}
  async ngOnInit() {
    this.editor1 = new Editor();
    this.editor2 = new Editor();
    this.getHtmls();
  }
  async getHtmls() {
    const res: any = await this._backendService
      .makeGetApiCall('admin/pageInfo')
      .toPromise();
    if (res.success) {
      res.data.forEach((page: any) => {
        if (page.name == this.types[0]) {
          this.html1 = page.html;
        } else if (page.name == this.types[1]) {
          this.html2 = page.html;
        }
      });
    }
    console.log(res);
  }
  async save(type: string, html: string) {
    const res = await this._backendService
      .makePostApiCall('admin/pageInfo', { name: type, html })
      .toPromise();
    console.log(res);
  }

  ngOnDestroy(): void {
    this.editor2.destroy();
  }
}
