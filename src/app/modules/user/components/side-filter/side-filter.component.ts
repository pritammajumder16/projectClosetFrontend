import { Component, EventEmitter, Input, Output } from '@angular/core';
import { constants } from '../../../../constants/constants';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrl: './side-filter.component.scss'
})
export class SideFilterComponent {
  disabled = false;
  max = 10000;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  public searchText:string=""
  public value1=0;
  public value2 = this.max
  @Input() categories:any
  
  @Input() allData:any=[]
  @Input() fromFilterBtn:boolean=false;
  @Output() filterChangeTrigger : EventEmitter<any>=new EventEmitter()
  @Input() productCount:any=0
  public sizeArray:string[] = constants.sizes
  public selectedCategories:any={}
  public selectedSizes:any={}
  public showCount :Number= 0;
  public randArr=[]
  ngOnInit(){
    this.showCount=this.productCount;
    this.sizeArray.forEach((size:string)=>{
      this.selectedSizes[size]=false
    })
    this.categories.forEach((category:any)=>{
      this.selectedCategories[category.categoryId]=false
    })
    this.getAllData(this.allData)
  }
  getAllData(allData:any){
    console.log("allDataa")
    if(allData?.priceFilterS1){
      this.value1=allData.priceFilterS1
    }
    console.log(this.value1, allData)
    
    if(allData?.priceFilterS2){
      this.value2=allData.priceFilterS2
    }
    
    if(allData?.categoryFilter){
      this.selectedCategories=allData.categoryFilter
    }
    
    if(allData?.sizeFilter){
      this.selectedSizes=allData.sizeFilter
    }
    
    if(allData?.searchText){
      this.searchText=allData.searchText
    }
  }
  filterChange(data:any,type:string){
    this.filterChangeTrigger.emit({priceFilterS2:this.value2,priceFilterS1:this.value1,categoryFilter:this.selectedCategories,sizeFilter:this.selectedSizes,searchText:this.searchText})
  }
  changeCount(count:Number){
    this.showCount=count
  }
}
