// // import CountPurchase from "../shoppingCart/CountPurchase";
// import { useState } from "react";

// export default function Form({ productId, updateStock, addToCart }) {
//     const [amountOfProduct, setAmountOfProduct] = useState(0);
//     let tempAmountOfProduct = 0;
  
//     function handleSubmit(event) {
//       event.preventDefault();
//       updateStock(productId, amountOfProduct);
//       addToCart(productId, amountOfProduct);
//     }

//     function handleChange(event) {
//       event.preventDefault();
//       tempAmountOfProduct = event.target.value;
//       console.log(tempAmountOfProduct);

//       setAmountOfProduct(tempAmountOfProduct);
//     }
  
//     return (
//       <div>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="amountOfProduct">Select amount </label>
//           <input type="number" onChange={handleChange}/>
//           <button type="submit">Add to cart</button>
//         </form>

//         </div>
//     );
// }

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