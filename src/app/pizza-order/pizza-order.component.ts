import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pizza } from '../models/pizza.model';
import { FirebaseDBService } from '../firebase-db.service';
import { CalculateService } from '../calculate.service';
import { Router } from '@angular/router';
import { DisplayPipe } from '../display.pipe';

@Component({
  selector: 'app-pizza-order',
  standalone: true,
  imports: [FormsModule,CommonModule,DisplayPipe],
  templateUrl: './pizza-order.component.html',
  styleUrl: './pizza-order.component.css'
})
export class PizzaOrderComponent {
  private customPizza!: Pizza;
  
  public sizeList:any[]=[];
  public toppingList:any[]=[];

  public selectedSize:string='';
  public selectedToppings:string[]=[];
  public orderMessage:string='';
  /**
   *select size and topping to customize a pizza then add to calculation service
   */
  constructor(private dbRep:FirebaseDBService, private Calc:CalculateService,private router:Router) {
    dbRep.getSizes().then(
      data=>{
        this.sizeList=data;
        
      },
      err=>{
        console.log("can't get pizza size data!");
      }
    )    
    dbRep.getToppings().then(
      data=>{
        this.toppingList=data;
      },
      err=>{
        console.log("can't get topping data",err);
      }
    )
  }

  addSize(s:string):void{
    this.selectedSize=s;
    this.orderMessage='';
  }
  addTopping(t:string):void{
    const index=this.selectedToppings.indexOf(t);
    if (index==-1){
      this.selectedToppings.push(t);
    }
    else{
      this.selectedToppings.splice(index,1);
    }
  }

  savePizza():boolean{
    //check then save a customized pizza to service
    
    if ((this.selectedSize == null || this.selectedSize=='')&& (this.Calc.getLength()==0)) {
      this.orderMessage="Please select a size before saving the pizza!";

      return false;
    }
    this.customPizza=new Pizza(this.selectedSize,this.selectedToppings);
    this.Calc.addPizza(this.customPizza);
    this.clear(); //start for new pizza
    return true;
  }

  clear():void{
    this.orderMessage='';
    this.selectedSize='';
    this.selectedToppings=[];
    
  }

  startOver():void{
    this.Calc.reset(); //discard existing order
    this.clear();
  }
  checkOut():void{
    if(this.savePizza()){
      this.router.navigate(['/list']);
    }
  }

}
