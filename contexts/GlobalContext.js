import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/firebase/functions/auth";
import { getAllProducts, getCategories } from "@/firebase/functions/db";
import { usePathname } from "next/navigation";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [logged, setLogged] = useState(false);
  const [isHydrated, setIsHydrated] = useState(true);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addedProducts, setAddedProducts] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [productPage, setProductPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [success, setSuccess] = useState(false);

  const [device, setDevice] = useState(null);

  const [currentPath, setCurrentPath] = useState(null);
  const path = usePathname();

  useEffect(() => {
    handlePathChange();
  }, [path]);

  function handlePathChange() {
    if (currentPath === null) {
      setCurrentPath(path);
    }
    setCurrentPath((prevPath) => {
      if (prevPath === "/carrito" && success) {
        setSuccess(false);
      }
      return path;
    });
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  function restartAfterSend() {
    setCart([]);
    setTotalPrice(0);
    setAddedProducts([]);
  }

  async function fetchAllData() {
    const products = await getAllProducts();
    setProductsList(products);
    const categories = await getCategories();
    setCategoriesList(categories);
  }

  useEffect(() => {
    if (productsList.length > 0) {
      setTotalPages(Math.ceil(productsList.length / productsPerPage));
    }
  }, [productsList, productsPerPage]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // User is signed in, you can access the user information here
        setLogged(true);
      } else {
        // User is signed out
        setLogged(false);
      }

      return () => unsubscribe();
    });
  }, []);

  function addToCart(data) {
    setCart((prev) => {
      return [...prev, data];
    });
  }

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  function removeFromCart(item) {
    const newCart = cart.filter((el) => el.id !== item.id);
    updateCart(newCart);
  }

  return (
    <GlobalContext.Provider
      value={{
        logged,
        isHydrated,
        setIsHydrated,
        cart,
        addToCart,
        updateCart,
        totalPrice,
        setTotalPrice,
        removeFromCart,
        selectedCategory,
        setSelectedCategory,
        addedProducts,
        setAddedProducts,
        showCategories,
        setShowCategories,
        showProducts,
        setShowProducts,
        productsList,
        categoriesList,
        setCategoriesList,
        setProductsList,
        productPage,
        setProductPage,
        totalPages,
        productsPerPage,
        setProductsPerPage,
        setTotalPages,
        success,
        setSuccess,
        restartAfterSend,
        device,
        setDevice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal debe ser usado con un settings provider");
  }
  return context;
}
