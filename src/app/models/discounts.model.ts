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
      let mediumWithFourToppings = mediumPizzas.filter(p => p.toppingCounts === 4);
    while (mediumWithFourToppings.length >= 2) {
        // Apply the offer to the first two pizzas in the filtered list
        mediumWithFourToppings[0].price = 4.5;
        mediumWithFourToppings[0].offer = 'Offer 2';
        mediumWithFourToppings[1].price = 4.5;
        mediumWithFourToppings[1].offer = 'Offer 2';

        // Remove these pizzas from the list to avoid reapplying the discount
        mediumWithFourToppings.splice(0, 2);
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