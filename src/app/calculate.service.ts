import { Injectable } from '@angular/core';
import { Pizza } from './models/pizza.model';
import { Discount } from './models/discounts.model';
import { FirebaseDBService } from './firebase-db.service';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {
/*
  1. keep order content
  2. initialize all pizza in order
  3. apply discount

*/
  private userOrders :Pizza[] =[]; //original orders
  public doughs:any[]=[];  //original pizza data
  public toppings:any[]=[];


  setSizes(){ //initialize basic pizza reference data
    this.dbRep.getSizes().then(
      data=>{
        this.doughs=data;
        
      },
      
    )
  }

  setToppings(){
    this.dbRep.getToppings().then(
      data=>{
        this.toppings=data;
      },
      
    )
  }
  
  
  constructor(private dbRep:FirebaseDBService) {
    this.setSizes();
    this.setToppings();
       
   }


  //add one pizza to order
  addPizza(p:Pizza):void{
    this.userOrders.push(p);
  }

  getLength():number{
    //front end can use this to prevent  big  or empty order
    return this.userOrders.length;
  }

  reset():void{
    this.userOrders=[]; //clear user order for next client
  }

  calculate(discount:Discount):number{
    //apply discount to each pizza in order
    console.log(discount.applyDiscount(this.userOrders));
    return discount.applyDiscount(this.userOrders);
  }

  initPizzas(){
    //initialize all pizza in order with original price, doughPrice and count_as
    for(let i =0; i <this.userOrders.length;i++){
      const dough=this.doughs.find(item=>item.data.size==this.userOrders[i].size);
      this.userOrders[i].originalPrice+=dough.data.price; 
      this.userOrders[i].doughPrice=dough.data.price; 
      for (let j=0; j<this.userOrders[i].toppings.length;j++){
        const topping=this.toppings.find(item=>item.data.name==this.userOrders[i].toppings[j]);
        this.userOrders[i].originalPrice+=topping.data.price;
        this.userOrders[i].toppingCounts+=topping.data.countAs;
      }
    }
    //console.log(this.userOrders[0]);
  }

  getAllPizzas():Pizza[]{
    return this.userOrders;
  }
}
