import { Pizza } from "./pizza.model";

export class Discount {

    applyDiscount(pizzas: Pizza[]): number {
      let total = 0; // final total price of the whole order
  /*
        apply promotion to pizzas with order below: 1,2,3

  */
      const mediumPizzas = pizzas.filter(p => p.size == 'Medium');
      const largePizzas = pizzas.filter(p => p.size == 'Large');
  
      // promote 1: medium with 2 toppings= $5, but no promotion price for pizza with 3 topping
      mediumPizzas.forEach(pizza => {
        if (pizza.toppingCounts === 2) {
          pizza.price = 5;
          pizza.offer='Offer 1';
          console.log("offer 1 triggered!!!!")
        }
      });
  
      // promote 2: 2 medium with 4 toppings each for $9
      const mediumPairs = Math.floor(mediumPizzas.length / 2);
      for (let i = 0; i < mediumPairs * 2; i += 2) {
        if (mediumPizzas[i].toppingCounts === 4 && mediumPizzas[i + 1].toppingCounts === 4) {
          mediumPizzas[i].price = 4.5;  
          mediumPizzas[i].offer = 'Offer 2';  
          mediumPizzas[i + 1].price = 4.5;
          mediumPizzas[i + 1].offer = 'Offer 2';
          
        }
      }
  
      // promote 3: large with 4 toppings at 50% discount
      largePizzas.forEach(pizza => {
        if (pizza.toppingCounts === 4) {
          pizza.price= pizza.originalPrice * 0.5;
          pizza.offer="offer3"
        }
      });
  
      // Calculate total price after discounts
      pizzas.forEach(pizza => {
        total += pizza.price;
      });
  
      return total;
    }
  }