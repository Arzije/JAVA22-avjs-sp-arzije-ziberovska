import React, { useMemo } from "react";

export default function ShoppingCart({
  cartItems,
  handleRemoveFromCart,
  handleUpdateCart,
  handlePurchase,
}) {

    //funktion som räknar ut totalpriset av varor i varukorgen
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.amountOfPurchase;
    }, 0);
  }, [cartItems]);

  return (
    <div>
      <h2>Shopping cart</h2>
      {cartItems.length === 0 && <p>No items in cart</p>}
      {cartItems.map((cartItem) => (
        <div key={cartItem.productId}>
          <p>Product id: {cartItem.productId}</p>
          <h3>{cartItem.name}</h3>
          {cartItem.img_url && (
            <img src={cartItem.img_url} style={{ width: "300px" }} />
          )}
          <p>Price: {cartItem.price}</p>
          <p>Amount: {cartItem.amountOfPurchase}</p>
          <p>{"Product ID: " + cartItem.productId}</p>
          <button onClick={() => handleRemoveFromCart(cartItem.productId)}>
            Remove from cart
          </button>
          <input
            type="number"
            onChange={(event) =>
              handleUpdateCart(cartItem.productId, event.target.value)
            }
            value={cartItem.amountOfPurchase}
          />
        </div>
      ))}

      <p>Total price: {totalPrice}</p>

      {cartItems.length > 0 && (
        <button onClick={() => handlePurchase()}>Finilize purchase</button>
      )}
    </div>
  );
}
