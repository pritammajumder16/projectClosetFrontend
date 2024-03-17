import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendServiceService } from '../../../../services/backend-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../../common/error-dialog/error-dialog.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent {
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _backendService: BackendServiceService, private _dialog:MatDialog
  ) {}
  public action: string | undefined;
  public productId: number | undefined;
  public productName: string | undefined;
  public allFiles:any[]=[]
  public imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  public productForm: FormGroup = new FormGroup({
    productId: new FormControl({ value: '', disabled: true }),
    productName: new FormControl('', Validators.required),
    productImages: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
  });
  public sizeList = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((params: any) => {
      this.action = params.action;
      if (this.action == 'update') {
        this.productId = parseInt(params.productId);
        this.productName = params.productName;
        this.getProduct();
      }
    });
  }

  getProduct() {
    const obj: any = { productId: this.productId };
    this._backendService
      .makeGetApiCall('admin/getProduct', obj)
      .subscribe((res: any) => {
        if (res.success) {
        }
      });
  }
  submit() {}
  cancel() {}
  fileUpload(fileEvent: Event) {
    const fileInput = fileEvent.target as HTMLInputElement;
    if (!fileInput || !fileInput.files) {
      this._dialog.open(ErrorDialogComponent,{data:{message:"Please select a valid file"}})
      return;
    }
    const file = fileInput.files[0];
    console.log(file);
    if (!this.imageMimeTypes.includes(file.type)) {
      this._dialog.open(ErrorDialogComponent,{data:{message:"Only .jpg/.jpeg/.png files supported"}})
      return;}
    if(file.size>1*1024*1024){
      this._dialog.open(ErrorDialogComponent,{data:{message:"Max size 1 MB"}})
      return;
    }
    const reader:FileReader = new FileReader()
    reader.addEventListener("load",(src)=>{
      this.allFiles.push(src)
    });

    reader.readAsDataURL(file);
  }
}
