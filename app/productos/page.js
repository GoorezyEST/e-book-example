/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/modules/productos.module.css";
import Navbar from "@/components/Navbar";
import { useGlobal } from "@/contexts/GlobalContext";
import Product from "@/components/Product";
import Footer from "@/components/Footer";
import FloatingCart from "@/components/FloatingCart";

export default function Page() {
  const {
    selectedCategory,
    setSelectedCategory,
    productsList,
    categoriesList,
    productPage,
    setProductPage,
    productsPerPage,
    setProductsPerPage,
    totalPages,
    setTotalPages,
  } = useGlobal();

  useEffect(() => {
    const updateProductsPerPage = () => {
      if (window.innerWidth <= 768) {
        setProductsPerPage(6);
      } else {
        setProductsPerPage(12);
      }
    };

    updateProductsPerPage();

    window.addEventListener("resize", updateProductsPerPage);

    return () => {
      window.removeEventListener("resize", updateProductsPerPage);
    };
  }, []);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (productsList.length > 0 && categoriesList.length > 0) {
      if (selectedCategory !== "Todos") {
        setCategories((prev) => [{ name: "Todos" }, ...categoriesList]);
        let data = productsList.filter(
          (el) => el.category === selectedCategory
        );
        setProducts(data);
      }
      if (selectedCategory === null) {
        setProducts(productsList);
        setCategories(categoriesList);
      }
    }
  }, [productsList, categoriesList]);

  function handleCategoryChange(category) {
    if (category.name !== "Todos") {
      setSelectedCategory(category.name);
      let data = productsList.filter((el) => el.category === category.name);
      setProducts(data);
      setTotalPages(Math.ceil(data.length / productsPerPage));
      setProductPage(1);
      if (!categories.some((item) => item.name === "Todos")) {
        setCategories((prev) => [{ name: "Todos" }, ...prev]);
      }
      return;
    }
    if (category.name === "Todos") {
      setSelectedCategory(null);
      setProducts(productsList);
      setTotalPages(Math.ceil(productsList.length / productsPerPage));
      setProductPage(1);
      setCategories((prev) => prev.filter((e) => e.name !== "Todos"));
      return;
    }
  }

  const startIndex = (productPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Slice the products array based on the current page
  const productsToDisplay = products.slice(startIndex, endIndex);

  return (
    <section className={styles.container}>
      <Navbar />
      <FloatingCart />
      {categoriesList.length < 1 && productsList.length < 1 ? (
        <div className={styles.contentLoading}>
          <span>Estamos organizando los productos</span>
          <p>Un momento por favor</p>
          <div className={styles.contentLoader}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className={styles.contentWrapper}>
          <div className={styles.menu}>
            <div
              className={styles.filter}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <div className={styles.filter_label}>
                <p>
                  {selectedCategory !== null
                    ? selectedCategory.charAt(0).toUpperCase() +
                      selectedCategory.slice(1)
                    : "Categorías ..."}
                </p>
                {!menuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="48"
                      d="M112 268l144 144 144-144M256 392V100"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="48"
                      d="M112 244l144-144 144 144M256 120v292"
                    />
                  </svg>
                )}
              </div>
              <ul
                className={styles.filter_categories}
                style={{
                  transform: !menuOpen ? "scaleY(0)" : "scaleY(1)",
                }}
              >
                {categories.map((item, index) => {
                  return (
                    <li
                      value={item.name}
                      key={index}
                      onClick={() => handleCategoryChange(item)}
                    >
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={styles.products_wrapper}>
            {productsToDisplay.map((item, index) => {
              return <Product {...{ item, index }} key={index} />;
            })}
          </div>
          <div className={styles.pagination_container}>
            <div className={styles.products_pagination}>
              <button
                type="button"
                disabled={productPage === 1}
                onClick={() => {
                  setProductPage(1);
                  window.scrollTo({ top: 0 });
                }}
              >
                {"<<"}
              </button>
              <button
                type="button"
                disabled={productPage === 1}
                onClick={() => {
                  setProductPage((prev) => prev - 1);
                  window.scrollTo({ top: 0 });
                }}
              >
                {"<"}
              </button>
              <div>
                <span>{productPage}</span>
                <span>de</span>
                <span>{totalPages}</span>
              </div>
              <button
                type="button"
                disabled={productPage === totalPages}
                onClick={() => {
                  setProductPage((prev) => prev + 1);
                  window.scrollTo({ top: 0 });
                }}
              >
                {">"}
              </button>
              <button
                type="button"
                disabled={productPage === totalPages}
                onClick={() => {
                  setProductPage(totalPages);
                  window.scrollTo({ top: 0 });
                }}
              >
                {">>"}
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </section>
  );
}
