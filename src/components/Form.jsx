import { useState } from "react";

//skapa en form som lägger till produkter i Shopping cart och uppdaterar varje gång antalet ändras
export default function Form({ productId, addToCart }) {
    const [amount, setAmount] = useState(0);
  
    function handleFormSubmit(event) {
      event.preventDefault();
      addToCart(productId, amount);
      event.target.reset();
      console.log(amount);
    }
  
    function handleFormChange(event) {
      event.preventDefault();
      setAmount(event.target.value);
    }
  
    return (
      <div>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="amount">Select amount </label>
          <input type="number" onChange={handleFormChange} />
          <button type="submit">Add to cart</button>
        </form>
      </div>
    );
  }