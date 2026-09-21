
import { useState } from "react";
import "./App.css";

function App() {

  // =========================
  // PRODUCT LIST
  // =========================

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1499,
      icon: "🎧"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 2499,
      icon: "⌚"
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: 899,
      icon: "🖱️"
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      price: 1999,
      icon: "⌨️"
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      price: 1299,
      icon: "🔊"
    },
    {
      id: 6,
      name: "USB-C Charger",
      price: 799,
      icon: "🔌"
    }
  ];


  // =========================
  // STATES
  // =========================

  const [cart, setCart] = useState([]);

  const [coupon, setCoupon] = useState("");

  const [discount, setDiscount] = useState(0);

  const [couponMessage, setCouponMessage] = useState("");


  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (product) => {

    const existingProduct = cart.find(
      item => item.id === product.id
    );

    if (existingProduct) {

      setCart(
        cart.map(item =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + 1
            }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);

    }

  };


  // =========================
  // REMOVE ITEM
  // =========================

  const removeFromCart = (id) => {

    setCart(
      cart.filter(item => item.id !== id)
    );

  };


  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = (id) => {

    setCart(
      cart.map(item =>
        item.id === id
          ? {
            ...item,
            quantity: item.quantity + 1
          }
          : item
      )
    );

  };


  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = (id) => {

    setCart(

      cart
        .map(item =>
          item.id === id
            ? {
              ...item,
              quantity: item.quantity - 1
            }
            : item
        )
        .filter(item => item.quantity > 0)

    );

  };


  // =========================
  // SUBTOTAL
  // =========================

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  // =========================
  // COUPON
  // =========================

  const applyCoupon = () => {

    const code = coupon.trim().toUpperCase();

    if (code === "SAVE10") {

      setDiscount(10);

      setCouponMessage(
        "Coupon applied! You saved 10%."
      );

    } else if (code === "SAVE20") {

      setDiscount(20);

      setCouponMessage(
        "Coupon applied! You saved 20%."
      );

    } else {

      setDiscount(0);

      setCouponMessage(
        "Invalid coupon code."
      );

    }

  };


  // =========================
  // DISCOUNT AMOUNT
  // =========================

  const discountAmount =
    subtotal * discount / 100;


  // =========================
  // PRICE AFTER DISCOUNT
  // =========================

  const priceAfterDiscount =
    subtotal - discountAmount;


  // =========================
  // GST
  // =========================

  const gstRate = 18;

  const gstAmount =
    priceAfterDiscount * gstRate / 100;


  // =========================
  // GRAND TOTAL
  // =========================

  const grandTotal =
    priceAfterDiscount + gstAmount;


  // =========================
  // TOTAL ITEMS
  // =========================

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  return (

    <div className="app">

      {/* =========================
                HEADER
            ========================= */}

      <header className="header">

        <div className="logo">
          🛒 ShopCart
        </div>

        <div className="cart-count">
          Cart: {totalItems} item(s)
        </div>

      </header>


      {/* =========================
                MAIN CONTENT
            ========================= */}

      <main className="main-container">


        {/* =========================
                    PRODUCTS
                ========================= */}

        <section className="products-section">

          <h1>
            Online Shopping
          </h1>

          <p className="section-description">
            Choose your favorite products
          </p>


          <div className="product-grid">

            {products.map(product => (

              <div
                className="product-card"
                key={product.id}
              >

                <div className="product-icon">
                  {product.icon}
                </div>

                <h3>
                  {product.name}
                </h3>

                <p className="product-price">
                  ₹{product.price}
                </p>

                <button
                  className="add-button"
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  + Add to Cart
                </button>

              </div>

            ))}

          </div>

        </section>


        {/* =========================
                    CART
                ========================= */}

        <section className="cart-section">

          <div className="cart-header">

            <h2>
              🛒 Your Cart
            </h2>

            <span>
              {totalItems} items
            </span>

          </div>


          {cart.length === 0 ? (

            <div className="empty-cart">

              <div>
                🛍️
              </div>

              <h3>
                Your cart is empty
              </h3>

              <p>
                Add some products to get started.
              </p>

            </div>

          ) : (

            <div className="cart-items">

              {cart.map(item => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  <div className="cart-product">

                    <div className="cart-icon">
                      {item.icon}
                    </div>

                    <div>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        ₹{item.price} each
                      </p>

                    </div>

                  </div>


                  {/* Quantity */}

                  <div className="quantity">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.id
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.id
                        )
                      }
                    >
                      +
                    </button>

                  </div>


                  {/* Item Total */}

                  <div className="item-total">

                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}

                  </div>


                  {/* Remove */}

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(
                        item.id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

          )}


          {/* =========================
                        COUPON
                    ========================= */}

          {cart.length > 0 && (

            <div className="coupon-section">

              <h3>
                🎟️ Apply Coupon
              </h3>

              <div className="coupon-box">

                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) =>
                    setCoupon(e.target.value)
                  }
                />

                <button
                  onClick={applyCoupon}
                >
                  Apply
                </button>

              </div>

              <p className="coupon-hint">
                Try: SAVE10 or SAVE20
              </p>

              {couponMessage && (

                <p
                  className={
                    discount > 0
                      ? "coupon-success"
                      : "coupon-error"
                  }
                >
                  {couponMessage}
                </p>

              )}

            </div>

          )}


          {/* =========================
                        BILL
                    ========================= */}

          {cart.length > 0 && (

            <div className="bill">

              <h2>
                Order Summary
              </h2>


              <div className="bill-row">

                <span>
                  Subtotal
                </span>

                <span>
                  ₹{subtotal.toFixed(2)}
                </span>

              </div>


              <div className="bill-row discount-row">

                <span>
                  Discount ({discount}%)
                </span>

                <span>
                  - ₹{discountAmount.toFixed(2)}
                </span>

              </div>


              <div className="bill-row">

                <span>
                  Price after discount
                </span>

                <span>
                  ₹{priceAfterDiscount.toFixed(2)}
                </span>

              </div>


              <div className="bill-row">

                <span>
                  GST ({gstRate}%)
                </span>

                <span>
                  ₹{gstAmount.toFixed(2)}
                </span>

              </div>


              <div className="divider"></div>


              <div className="grand-total">

                <span>
                  Grand Total
                </span>

                <strong>
                  ₹{grandTotal.toFixed(2)}
                </strong>

              </div>


              <button
                className="checkout-button"
                onClick={() =>
                  alert(
                    "Order placed successfully!"
                  )
                }
              >
                Proceed to Checkout
              </button>

            </div>

          )}

        </section>

      </main>


      {/* =========================
                FOOTER
            ========================= */}

      <footer>

        Online Shopping Cart • React Assignment

      </footer>

    </div>

  );
}

export default App;

