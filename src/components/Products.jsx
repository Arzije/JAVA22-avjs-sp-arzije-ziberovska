import Form from "./Form";
import FilterByPrice from "./FilterByPrice";

export default function Products({ products, updateStock, addToCart, handleFilterByPrice }) {
  return (
    <div>
      <h2>Products</h2>
      <FilterByPrice 
      handleFilterByPrice={handleFilterByPrice} 
      />
      {products.map(
        (product) => (
          console.log(product.in_stock),
          (
            <div key={product.id} className="product">
              <h3>{product.name}</h3>
              <p>Price: {product.price}</p>
              {product.img_url && (
                <img src={product.img_url} style={{ width: "300px" }} />
              )}
              <p>{"Product ID: " + product.id}</p>
              {product.in_stock > 0 && (
                <Form
                  productId={product.id}
                  updateStock={updateStock}
                  addToCart={addToCart}
                />
              )}
              {product.in_stock > 0 ? (
                <p>{"In stock: " + product.in_stock}</p>
              ) : (
                <p>Out of stock</p>
              )}

            </div>
          )
        )
      )}
    </div>
  );
}
