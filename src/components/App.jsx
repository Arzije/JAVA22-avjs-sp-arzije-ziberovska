import "../css/App.css";
import ShoppingCart from "./ShoppingCart";
import Products from "./Products";
import Menu from "./Menu";
import FilterByPrice from "./FilterByPrice";
import { useState, useMemo, useEffect } from "react";
import React from "react";

function App({}) {
  const [selectedComponent, setSelectedComponent] = useState("products");
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [updateDatabase, setUpdateDatabase] = useState(false);

  //funktion som ger index som id till varje produkt
  async function getProducts() {
    const productsUrl = `https://asj-slutprojekt-default-rtdb.europe-west1.firebasedatabase.app/.json`;
    const response = await fetch(productsUrl);
    const data = await response.json();
    const productsWithIds = Object.keys(data).map((key, index) => {
      return {
        id: index,
        ...data[key],
      };
    });
    setProducts(productsWithIds);
  }

  //uppdaterar varje gång en ändring görs i databasen
  useEffect(() => {
    getProducts();
  }, [updateDatabase]);

  //funktion som uppdaterar databasen
  async function updateStock(productId, amount) {
    const stockUrl = `https://asj-slutprojekt-default-rtdb.europe-west1.firebasedatabase.app/${productId}/.json`;
    const response = await fetch(stockUrl);
    const data = await response.json();

    const newStock = {
      in_stock: data.in_stock - amount,
    };

    const options = {
      method: "PATCH",
      body: JSON.stringify(newStock),
      headers: {
        "Content-Type": "application/json, charset=UTF-8",
      },
    };

    const patchResponse = await fetch(stockUrl, options);
    const patchData = await patchResponse.json();

  setProducts(prevProducts => {
    const updatedProducts = prevProducts.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          in_stock: newStock.in_stock,
        };
      }
      return product;
    });
    return updatedProducts;
  });

  setUpdateDatabase(true);
  return patchData;

  }

  //funktion som lägger till produkter i varukorgen
  function addToCart(productId, amount) {
    const product = products.find((product) => product.id === productId);
    if (product.in_stock < amount) {
      alert("There are not enough items in stock");
      return;
    } else if (amount < 1) {
      alert("Please enter a valid amount");
      return;
    } else if (cartItems.some((cartItem) => cartItem.productId === productId)) {
      const newCartItems = cartItems.map((cartItem) => {
        if (cartItem.productId === productId) {
          return {
            ...cartItem,
            amountOfPurchase:
              parseInt(cartItem.amountOfPurchase) + parseInt(amount),
          };
        } else {
          return cartItem;
        }
      });
      setCartItems(newCartItems);
    } else {
      const cartItem = {
        productId: productId,
        amountOfPurchase: amount,
        name: product.name,
        price: product.price,
        img_url: product.img_url,
      };

      setCartItems([...cartItems, cartItem]);
    }
  }

  //funktion som räknar antalet produkter i varukorgen
  const numberOfItemsInCart = useMemo(() => {
    return cartItems.reduce((total, cartItem) => {
      const amount = parseInt(cartItem.amountOfPurchase);
      return total + amount;
    }, 0);
  }, [cartItems]);

  // funktion som hanterar köp, uppdaterar lagersaldo, tömmer varukorgen och meddelar kunden
  function handlePurchase() {
    cartItems.forEach((cartItem) => {
      updateStock(cartItem.productId, cartItem.amountOfPurchase);
    });
    setCartItems([]);
    alert("Thank you for your purchase!");
  }

  //funktion som väljer vilken komponent som ska visas (product, eller shoppingcart)
  function handleSelectedComponent(component) {
    setSelectedComponent(component);
    console.log("handleClick");
  }

  //funktion som tar bort produkter från varukorgen
  function handleRemoveFromCart(productId) {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.productId !== productId
    );
    setCartItems(newCartItems);
    if (newCartItems.length === 0) {
      setSelectedComponent("products");
    }
  }

  //funktion som filtrerar produkter efter pris varje gång användaren ändrar i dropdownmenyn
  function handleFilterByPrice(event) {
    const value = event.target.value;
    if (value === "lowToHigh") {
      const sortedProducts = products.sort((a, b) => {
        return a.price - b.price;
      });
      setProducts([...sortedProducts]);
    } else if (value === "highToLow") {
      const sortedProducts = products.sort((a, b) => {
        return b.price - a.price;
      });
      setProducts([...sortedProducts]);
    } else {
      getProducts();
    }
  }

  //funktion som uppdaterar antalet produkter i varukorgen
  function handleUpdateCart(productId, amount) {
    if (amount < 1) {
      const newCartItems = cartItems.filter(
        (cartItem) => cartItem.productId !== productId
      );
      setCartItems(newCartItems);
      if (newCartItems.length === 0) {
        setSelectedComponent("products");
      }
    } else {
      const newCartItems = cartItems.map((cartItem) => {
        if (cartItem.productId === productId) {
          return {
            ...cartItem,
            amountOfPurchase: amount,
          };
        } else {
          return cartItem;
        }
      });
      setCartItems(newCartItems);
    }
  }

  //här visas alla komponenter
  return (
    <div className="App">
      <Menu
        onClick={handleSelectedComponent}
        cartItems={cartItems}
        numberOfItemsInCart={numberOfItemsInCart}
      />
      {selectedComponent === "shoppingCart" && (
        <ShoppingCart
          cartItems={cartItems}
          handleRemoveFromCart={handleRemoveFromCart}
          handleUpdateCart={handleUpdateCart}
          handlePurchase={handlePurchase}
          numberOfItemsInCart={numberOfItemsInCart}
        />
      )}
      {selectedComponent === "products" && (
        <Products products={products} addToCart={addToCart} />
      )}
    </div>
  );
}

export default App;
