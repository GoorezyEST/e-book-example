import { useGlobal } from "@/contexts/GlobalContext";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/modules/product.module.css";
import Link from "next/link";
import { transformString, resizeImgurImages } from "@/functions/functions";

export default function Product({ item, index }) {
  const { addToCart, removeFromCart, setAddedProducts, addedProducts } =
    useGlobal();

  const [itExists, setItExists] = useState(false);
  const loadingDiv = useRef(null);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    const img = loadingDiv.current.querySelector("img");

    function loaded() {
      setImgLoading(false);
    }

    if (img.complete) {
      loaded();
    } else {
      img.addEventListener("load", loaded);
    }
  }, []);

  useEffect(() => {
    checkIfExistsInList();
  }, [addedProducts]);

  function checkIfExistsInList() {
    const productsIds = addedProducts.map((product) => product.id);
    if (productsIds.includes(item.id)) {
      setItExists(true);
    } else {
      setItExists(false);
    }
  }

  function addProduct(data) {
    if (addedProducts) {
      const productIds = addedProducts.map((product) => product.id);

      if (productIds.includes(data.item.id)) {
        setAddedProducts((prev) =>
          prev.filter((product) => product.id !== data.item.id)
        );
        removeFromCart(data.item);
      } else {
        setAddedProducts((prev) => [...prev, data.item]);
        addToCart(data.item);
      }
    }
  }

  return (
    <div key={index} className={styles.product_container}>
      <Link
        className={styles.product_img}
        href={`/productos/${transformString(item.name)}`}
        ref={loadingDiv}
        style={{ backgroundImage: `url(${resizeImgurImages(item.img)})` }}
      >
        <img
          src={item.img}
          alt={item.alt}
          className={imgLoading ? "loading" : "loaded"}
        />
      </Link>
      <div className={styles.product_detail}>
        <div>
          <span>${item.price}</span>
          <span className={styles.product_name}>{item.name}</span>
        </div>
        <div>
          <button
            onClick={() => {
              addProduct({ item, index });
            }}
            id={`btn_${index}`}
            aria-label="Agregar al carrito"
          >
            <span>{itExists ? "Quitar" : "Agregar"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
