export default function Menu({ onClick, numberOfItemsInCart }) {
  return (
    <nav className="menu">
      <button onClick={() => onClick("products")}>Products</button>
      <button onClick={() => onClick("shoppingCart")}>
        Shopping cart ({numberOfItemsInCart})
      </button>
    </nav>
  );
}
