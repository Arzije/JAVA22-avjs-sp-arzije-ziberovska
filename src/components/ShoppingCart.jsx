export default function ShoppingCart({
  cartItems,
  handleRemoveFromCart,
  handleUpdateCart,
  handlePurchase,
}) {
  console.log(cartItems);

  //funktion som räknar ut totalpriset av varor i varukorgen
  const totalPrice = cartItems.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.amountOfPurchase;
  }, 0);

  return (
    <section className="products">
      <h2>Shopping cart</h2>
      {cartItems.length === 0 && <p>No items in cart</p>}
      {cartItems.map((cartItem) => (
        <section key={cartItem.productId} className="product">
          <p>Product id: {cartItem.productId}</p>
          <h3>{cartItem.name}</h3>
          <p>Price: {cartItem.price} SEK</p>
          {cartItem.img_url && (
            <img src={cartItem.img_url} style={{ width: "300px" }} />
          )}
          <p>Amount: {cartItem.amountOfPurchase}</p>
          <button onClick={() => handleRemoveFromCart(cartItem.productId)}>
            Remove from cart
          </button>
          <label htmlFor="amountInShop">Select amount: </label>
          <input
            type="number"
            onChange={(event) =>
              event.target.value > cartItem.in_stock
                ? setTimeout(() => {
                    alert("Not enough in stock");
                  }, 200) 
                : handleUpdateCart(cartItem.productId, event.target.value)
            }
          />
        </section>
      ))}

      <p>Total price: {totalPrice}</p>

      {cartItems.length > 0 && (
        <button onClick={() => handlePurchase()}>Finilize purchase</button>
      )}
    </section>
  );
}
