export default function Menu({ onClick, numberOfItemsInCart }) {
  return (
    <nav className="componentMenu">
      <button onClick={() => onClick("products")}>Products</button>
      <button onClick={() => onClick("shoppingCart")}>
        Shopping cart ({numberOfItemsInCart})
      </button>
    </nav>
  );
}
