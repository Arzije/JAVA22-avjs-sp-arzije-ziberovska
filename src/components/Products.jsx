import Form from "./Form";
import SortByPrice from "./SortByPrice";

export default function Products({ products, updateStock, addToCart, handleSortByPrice }) {
  return (
    <div className="products">
      <h2>Products</h2>
      <SortByPrice 
      handleSortByPrice={handleSortByPrice} 
      />
      {products.map(
        (product) => (
          (
            <section key={product.id} className="product">
              <h3>{product.name}</h3>
              <p>Price: {product.price} SEK</p>
              {product.img_url && (
                <img src={product.img_url} />
              )}
              {product.in_stock > 0 && (
                <Form
                  productId={product.id}
                  updateStock={updateStock}
                  addToCart={addToCart}
                />
              )}
              {product.in_stock > 0 ? (
                <p >{"In stock: " + product.in_stock}</p>
              ) : (
                <p className="outOfStock">Out of stock</p>
              )}

            </section>
          )
        )
      )}
    </div>
  );
}
