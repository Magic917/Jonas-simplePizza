import { publishFacade } from "@angular/compiler";


export class Pizza {
  public originalPrice: number=0; 
  public price:number=0; //price after promotion
  public offer:string='';
  public toppingCounts:number=0;
  public doughPrice:number=0;
    constructor(
      public size: string,
      public toppings: string[],
      
    ) { }
        
  }
