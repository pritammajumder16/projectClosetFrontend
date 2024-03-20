import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendServiceService } from '../../../../services/backend-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../../common/error-dialog/error-dialog.component';
import { constants } from '../../../../constants/constants';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent {
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _backendService: BackendServiceService,
    private _dialog: MatDialog
  ) {}
  public action: string | undefined;
  public productId: number | undefined;
  public productName: string | undefined;
  public allFilesBase64: any[] = [];
  public allFiles: any[] = [];  
  public sizeList = constants.sizes;
  public categoryList: any[] = [];
  public imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', "image/webp"];
  public productForm: FormGroup = new FormGroup({
    productId: new FormControl({ value: '', disabled: true }),
    productName: new FormControl('', Validators.required),
    productImages: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    categoryName: new FormControl('', Validators.required),
  });

  async ngOnInit() {
    const res:any = await this.getAllCategories()   
    if (res.success) {
      this.categoryList = res.data;
    }
    this._activatedRoute.queryParams.subscribe((params: any) => {
      this.action = params.action;
      if (this.action == 'update') {
        this.productId = parseInt(params.productId);
        this.productName = params.productName;

        this.getProduct();
      }
    });
  }
  async getAllCategories() {
    return this._backendService
      .makeGetApiCall('unvfd/categoryList').toPromise();
  }
  getProduct() {
    if (!this.productId) return;
    this._backendService
      .makeGetApiCall('admin/fetchProduct', {
        productId: this.productId.toString(),
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.productForm.patchValue({
            productId: res.data.productId,
            productName: res.data.productName,
            size: res.data.size,
            price: res.data.price,
            description: res.data.description,
            productImages: res.data.productImages,
            categoryId: res.data.categoryId
          });
          if (res?.data?.productImages && res.data.productImages.length > 0) {
            res.data.productImages.forEach((fileUrl: string) => {
              this.allFiles.push(fileUrl);
              console.log(this.productForm.value);
              this.allFilesBase64.push(this._backendService.fileURI + fileUrl);
            });
          }
        }
      });
  }
  submit() {
    const finalObj = this.productForm.getRawValue();
    if (finalObj.categoryId) {
      const i = this.categoryList.findIndex(
        (category: any) => category.categoryId == finalObj.categoryId
      );
      console.log(i)
      if (i >= 0) {
        this.productForm.patchValue({
          categoryName: this.categoryList[i].categoryName,
        });
        finalObj.categoryName = this.categoryList[i].categoryName;
      }
    }
    console.log(finalObj)
    if (this.productForm.invalid) return;
    console.log({ ...finalObj });
    console.log(finalObj.productImages);
    finalObj.productImages = finalObj.productImages.map((file: any) => {
      if (!(typeof file == 'string')) return file.name;
      return file;
    });
    console.log('product images', finalObj.productImages);
    const formData = new FormData();
    formData.append('product', JSON.stringify(finalObj));
    this.allFiles.forEach((file: any) => {
      if (typeof file != 'string') formData.append('files', file);
    });
    console.log(this.allFiles[0]);
    this._backendService
      .sendFormDataApiCall('admin/productUpload', formData)
      .subscribe((res: any) => {
        this._router.navigate(["admin/productList"])
      });
  }
  cancel() {
    this._router.navigate(['/admin/productList']);
  }
  fileUpload(fileEvent: Event) {
    const fileInput = fileEvent.target as HTMLInputElement;
    if (this.allFilesBase64.length > 2) {
      this._dialog.open(ErrorDialogComponent, {
        data: { message: 'Maximum 3 images allowed' },
      });
      return;
    }
    if (!fileInput || !fileInput.files || !fileInput.files[0]) {
      this._dialog.open(ErrorDialogComponent, {
        data: { message: 'Please select a valid file' },
      });
      return;
    }
    const file: any = fileInput.files[0];
    if (!this.imageMimeTypes.includes(file.type)) {
      this._dialog.open(ErrorDialogComponent, {
        data: { message: 'Only .jpg/.jpeg/.png files supported' },
      });
      return;
    }
    if (file.size > 1 * 1024 * 1024) {
      this._dialog.open(ErrorDialogComponent, {
        data: { message: 'Max size 1 MB' },
      });
      return;
    }
    const newName = new Date().getTime().toString() + '-' + file.name;
    const myNewFile = new File([file], newName, { type: file.type });

    this.allFiles.push(myNewFile);
    this.productForm.controls['productImages'].patchValue(this.allFiles);
    const reader: FileReader = new FileReader();
    reader.addEventListener('load', (src: any) => {
      this.allFilesBase64.push(src?.target?.result);
    });
    reader.readAsDataURL(myNewFile);
  }
  deleteFile(i: number) {
    this.allFilesBase64.splice(i, 1);
    this.allFiles.splice(i, 1);
    this.productForm.controls['productImages'].patchValue(this.allFiles);
  }
}
