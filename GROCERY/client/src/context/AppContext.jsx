import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
axios.defaults.withCredentials=true;
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;
export const AppContext =createContext(null);

    const AppContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const[isSeller, setIsSeller] = useState(null);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems,setCartItems]=useState([]);
    const [searchQuery,setSearchQuery]=useState([]);


    const fetchProducts = async () => {
      setProducts(dummyProducts);
    };
    
      // You can add any additional initialization logic here
   
    //add to cart
     const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems || {}); // safeguard for undefined
    
        if (cartData[itemId]) {
          cartData[itemId] += 1;
        } else {
          cartData[itemId] = 1;
        }
    
        setCartItems(cartData);
        toast.success("Added to cart");
      };
      //UPDATE ITEM CARD QUANTITY
      const updateCartItem = (itemId, quantity) => {
          let cartData = structuredClone(cartItems);
          cartData[itemId] = quantity;
          setCartItems(cartData);
          toast.success("cart updated");
        };
 // total cart items
  const cartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };
  // total cart amount
  const totalCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += cartItems[items] * itemInfo.offerPrice;
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };
  // remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      toast.success(`remove from cart`);
      setCartItems(cartData);
    }
  };

        useEffect(() => {
      fetchProducts();
        },[])
    const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    addToCart,
    updateCartItem,
     removeFromCart,
    cartCount,
    totalCartAmount,
    cartItems,
    searchQuery,
    setSearchQuery,
    axios,

  };
  // You can add any additional logic or effects here if needed
 // Return the context provider with the value
return <AppContext.Provider value={value}> {children} </AppContext.Provider>;
};

export default AppContextProvider;