import { Component, OnInit } from '@angular/core';
import { FirebaseDBService } from '../firebase-db.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculateService } from '../calculate.service';
import { Discount } from '../models/discounts.model';
import { DisplayPipe } from '../display.pipe';
import { Pizza } from '../models/pizza.model';

@Component({
  selector: 'app-pizza-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DisplayPipe],
  templateUrl: './pizza-list.component.html',
  styleUrl: './pizza-list.component.css'
})
export class PizzaListComponent implements OnInit {

  public pizzaList:Pizza[]=[]; //pizza Array for display
  
  public hasPizza:boolean=false;
  public PizzaLength:number=0;
  public totalPrice:number=0;
  public vegToppings:any[]=[];
  public nonVegToppings:any[]=[];

  constructor(private calc:CalculateService, private route:Router, private dbRep:FirebaseDBService) {
        calc.initPizzas();
        const offer=new Discount();
        this.totalPrice= calc.calculate(offer);
        this.pizzaList=calc.getAllPizzas();  //get all pizzas from order
        
        dbRep.getToppings().then(
          data=>{
            this.vegToppings=data.filter(topping=>topping.data.category==1);  
            this.nonVegToppings=data.filter(topping=>topping.data.category==2);  
          },
          err=>{
            console.log("can't get topping data",err);
          }
        )
        console.log(this.pizzaList);
  }
 
  ngOnInit(): void {
   if (this.calc.getLength()){ 
    this.hasPizza=true;
    this.PizzaLength= this.calc.getLength();
   }else{
    this.hasPizza=false;
    this.PizzaLength=0
   }
  }

  startOver():void{
    this.calc.reset();
    this.route.navigate(['/order']);
  }
  
}

