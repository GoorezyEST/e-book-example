"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useGlobal } from "@/contexts/GlobalContext";
import styles from "@/styles/modules/dynamic_product.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  transformString,
  resizeImgurImages,
  formatPrice,
} from "@/functions/functions";
import Breadcrumb from "@/components/Breadcrumb";
import FloatingCart from "@/components/FloatingCart";

export default function Page() {
  const {
    productsList,
    addToCart,
    removeFromCart,
    setAddedProducts,
    addedProducts,
  } = useGlobal();
  const path = usePathname();
  const [exist, setExist] = useState(false);
  const [product, setProduct] = useState({
    id: "",
    name: "",
    text: "",
    img: "",
    alt: "",
    price: "",
    category: "",
  });
  const [itExists, setItExists] = useState(false);

  const loadingDiv = useRef(null);
  const [mainLoading, setMainLoading] = useState(true);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productsListLoaded, setProductsListLoaded] = useState(false);

  useEffect(() => {
    if (productsList.length > 0) {
      setProductsListLoaded(true);
    }
  }, [productsList]);

  useEffect(() => {
    const relatedProductsList = productsList.filter(
      (item) => item.category === product.category && item.name !== product.name
    );

    const relatedProductsWithLoading = relatedProductsList.map((item) => ({
      ...item,
      loading: true,
    }));

    setRelatedProducts(relatedProductsWithLoading);
  }, [product, productsList]);

  function handleRelatedProductLoad(index) {
    setRelatedProducts((prev) => {
      const updatedRelatedProducts = [...prev];
      updatedRelatedProducts[index].loading = false;
      return updatedRelatedProducts;
    });
  }

  useEffect(() => {
    if (loadingDiv.current) {
      const img = loadingDiv.current.querySelector("img");

      function loaded() {
        setMainLoading(false);
      }

      if (img.complete) {
        loaded();
      } else {
        img.addEventListener("load", loaded);
      }
    }
  }, [loadingDiv.current]);

  function isNameInList(url) {
    const urlWithoutPrefix = url.replace("/productos/", "");

    const lowercaseUrl = urlWithoutPrefix.replace(/-/g, " ").toLowerCase();

    for (const item of productsList) {
      if (item.name.toLowerCase() === lowercaseUrl) {
        setProduct(item);
        setExist(true);
        return;
      }
    }
  }

  useEffect(() => {
    if (productsListLoaded) {
      isNameInList(path);
    }
  }, [path, productsListLoaded]);

  useEffect(() => {
    if (exist) {
      checkIfExistsInList();
    }
  }, [addedProducts, exist]);

  function checkIfExistsInList() {
    const productsIds = addedProducts.map((product) => product.id);

    if (productsIds.includes(product.id)) {
      setItExists(true);
    } else {
      setItExists(false);
    }
  }

  function addProduct(data) {
    if (addedProducts) {
      const productIds = addedProducts.map((product) => product.id);

      if (productIds.includes(data.id)) {
        setAddedProducts((prev) =>
          prev.filter((product) => product.id !== data.id)
        );
        removeFromCart(data);
      } else {
        setAddedProducts((prev) => [...prev, data]);
        addToCart(data);
      }
    }
  }

  const crumbs = [
    { name: "Inicio", url: "/" },
    { name: "Productos", url: "/productos" },
  ];

  return (
    <main className={styles.container}>
      <Navbar />
      <FloatingCart />
      {productsListLoaded ? (
        <div className={styles.wrapper}>
          {exist ? (
            <div className={styles.contentWrapper}>
              <div className={styles.crumbs}>
                <Breadcrumb routes={crumbs} />
              </div>
              <div className={styles.content}>
                <div
                  className={styles.image}
                  ref={loadingDiv}
                  style={{
                    backgroundImage: `url(${resizeImgurImages(product.img)})`,
                  }}
                >
                  <img
                    src={product.img}
                    alt={product.alt}
                    loading="lazy"
                    className={mainLoading ? "loading" : "loaded"}
                    onLoad={() => setMainLoading(false)}
                  />
                </div>

                <div className={styles.info}>
                  <h1>{product.name}</h1>
                  <span>{formatPrice(product.price)}</span>
                  <div className={styles.description}>
                    <h2>Descripción</h2>
                    <p>{product.text}</p>
                  </div>
                  <div className={styles.category}>
                    <h3>Categoría</h3>
                    <p>
                      {product.category.charAt(0).toUpperCase() +
                        product.category.slice(1)}
                    </p>
                  </div>
                  <button type="button" onClick={() => addProduct(product)}>
                    {itExists ? "Quitar del carrito" : "Añadir al carrito"}
                  </button>
                </div>
              </div>
              {relatedProducts.length > 0 && (
                <div className={styles.relatedWrapper}>
                  <div className={styles.title}>
                    <span>
                      Más productos de la categoría &quot;{product.category}
                      &quot;
                    </span>
                  </div>
                  <div className={styles.related}>
                    <div
                      className={styles.list}
                      style={{
                        gridTemplateColumns: `repeat(${Math.min(
                          Math.ceil(relatedProducts.length / 2),
                          4
                        )}, 150px)`,
                      }}
                    >
                      {relatedProducts.map((item, index) => (
                        <Link
                          className={styles.item}
                          key={item.id}
                          href={`/productos/${transformString(item.name)}`}
                          style={{
                            backgroundImage: `url(${resizeImgurImages(
                              item.img
                            )})`,
                          }}
                        >
                          <img
                            src={item.img}
                            alt={item.alt}
                            loading="lazy"
                            className={item.loading ? "loading" : "loaded"}
                            onLoad={() => handleRelatedProductLoad(index)}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className={styles.more}>
                <span>¿Cómo funciona el proceso de compra?</span>
                <p>
                  Si deseas conocer más sobre nuestro funcionamiento, te
                  invitamos a visitar la sección &quot;Nosotros&quot; en la
                  barra de navegación principal o simplemente haz{" "}
                  <Link href="/nosotros">clic aquí</Link>.
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.error}>
              <span>Error</span>
              <p>
                Este producto no existe, puedes ver nuestros productos haciendo{" "}
                <Link href="/productos">click aqui</Link>
              </p>
              <Link href="/productos">Productos</Link>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.refresh}>
          <div className={styles.refreshLoader}>
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
      )}
      <Footer />
    </main>
  );
}
