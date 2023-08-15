import { useGlobal } from "@/contexts/GlobalContext";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/admin/modals.module.css";
import { useForm } from "react-hook-form";
import { db } from "@/firebase/firebaseConfig";
import {
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
} from "firebase/firestore";

export default function Products() {
  const {
    register,
    formState: { errors },
    getFieldState,
    handleSubmit,
    setValue,
    reset,
  } = useForm();

  const { setShowProducts, productsList, setProductsList, categoriesList } =
    useGlobal();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [add, setAdd] = useState(false);
  const [danger, setDanger] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    // Precargar todas las imágenes antes de mostrarlas
    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
      });
    };

    Promise.all(productsList.map((item) => loadImage(item.img)))
      .then(() => setLoadingImages(false))
      .catch(() => setLoadingImages(false));
  }, [productsList]);

  const addForm = useRef(null);

  useEffect(() => {
    if (selectedProduct) {
      setValue("name", selectedProduct.name || "");
      setValue("text", selectedProduct.text || "");
      setValue("img", selectedProduct.img || "");
      setValue("alt", selectedProduct.alt || "");
      setValue("price", selectedProduct.price || "");
      setValue("category", selectedProduct.category || "");
    }
  }, [selectedProduct]);

  const editNameValidation = () => {
    if (
      selectedProduct.name === addForm.current[0].value &&
      selectedProduct.text === addForm.current[1].value &&
      selectedProduct.img === addForm.current[2].value &&
      selectedProduct.alt === addForm.current[3].value &&
      selectedProduct.price === addForm.current[4].value &&
      selectedProduct.category ===
        addForm.current[5].selectedOptions[0].innerText
          .charAt(0)
          .toLowerCase() +
          addForm.current[5].selectedOptions[0].innerText.slice(1)
    ) {
      return "Must edit";
    }
  };

  const editTextValidation = () => {
    if (
      selectedProduct.text === addForm.current[1].value &&
      selectedProduct.name === addForm.current[0].value &&
      selectedProduct.img === addForm.current[2].value &&
      selectedProduct.alt === addForm.current[3].value &&
      selectedProduct.price === addForm.current[4].value &&
      selectedProduct.category ===
        addForm.current[5].selectedOptions[0].innerText
          .charAt(0)
          .toLowerCase() +
          addForm.current[5].selectedOptions[0].innerText.slice(1)
    ) {
      return "Must edit";
    }
  };

  const editImgValidation = () => {
    if (
      selectedProduct.img === addForm.current[2].value &&
      selectedProduct.text === addForm.current[1].value &&
      selectedProduct.name === addForm.current[0].value &&
      selectedProduct.alt === addForm.current[3].value &&
      selectedProduct.price === addForm.current[4].value &&
      selectedProduct.category ===
        addForm.current[5].selectedOptions[0].innerText
          .charAt(0)
          .toLowerCase() +
          addForm.current[5].selectedOptions[0].innerText.slice(1)
    ) {
      return "Must edit";
    }
  };

  const editAltValidation = () => {
    if (
      selectedProduct.alt === addForm.current[3].value &&
      selectedProduct.img === addForm.current[2].value &&
      selectedProduct.text === addForm.current[1].value &&
      selectedProduct.name === addForm.current[0].value &&
      selectedProduct.price === addForm.current[4].value &&
      selectedProduct.category ===
        addForm.current[5].selectedOptions[0].innerText
          .charAt(0)
          .toLowerCase() +
          addForm.current[5].selectedOptions[0].innerText.slice(1)
    ) {
      return "Must edit";
    }
  };

  const editPriceValidation = () => {
    if (
      selectedProduct.price === addForm.current[4].value &&
      selectedProduct.alt === addForm.current[3].value &&
      selectedProduct.img === addForm.current[2].value &&
      selectedProduct.text === addForm.current[1].value &&
      selectedProduct.name === addForm.current[0].value &&
      selectedProduct.category ===
        addForm.current[5].selectedOptions[0].innerText
          .charAt(0)
          .toLowerCase() +
          addForm.current[5].selectedOptions[0].innerText.slice(1)
    ) {
      return "Must edit";
    }
  };

  const editCategoryValidation = () => {
    if (
      selectedProduct.price === addForm.current[4].value &&
      selectedProduct.alt === addForm.current[3].value &&
      selectedProduct.img === addForm.current[2].value &&
      selectedProduct.text === addForm.current[1].value &&
      selectedProduct.name === addForm.current[0].value &&
      selectedProduct.category ===
        addForm.current[5].selectedOptions[0].innerText
          .charAt(0)
          .toLowerCase() +
          addForm.current[5].selectedOptions[0].innerText.slice(1)
    ) {
      return "Must edit";
    }
  };

  const handleEditSave = async (e) => {
    try {
      if (selectedProduct !== null) {
        const updating = doc(db, "productos", selectedProduct.id);

        await updateDoc(updating, {
          name: e.name,
          text: e.text,
          img: e.img,
          alt: e.alt,
          price: e.price,
          category: e.category,
        })
          .then(() => {
            setProductsList((prevList) => {
              const indexToDelete = prevList.findIndex(
                (el) => el.id === selectedProduct.id
              );
              if (indexToDelete !== -1) {
                const updatedList = [...prevList];
                updatedList.splice(indexToDelete, 1, {
                  id: selectedProduct.id,
                  name: e.name,
                  text: e.text,
                  img: e.img,
                  alt: e.alt,
                  price: e.price,
                  category: e.category,
                });
                return updatedList;
              } else {
                return;
              }
            });
          })
          .then(() => {
            setSelectedProduct(null);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddSave = async (e) => {
    try {
      let newID;

      const docRef = await addDoc(collection(db, "productos"), {
        name: e.newName,
        text: e.newText,
        img: e.newImg,
        alt: e.newAlt,
        price: e.newPrice,
        category: e.newCategory,
      });

      newID = docRef.id;

      setProductsList((prevList) => {
        return [
          {
            id: newID,
            name: e.newName,
            text: e.newText,
            img: e.newImg,
            alt: e.newAlt,
            price: e.newPrice,
            category: e.newCategory,
          },
          ...prevList,
        ];
      });
      reset();

      setAdd(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleProductDelete = async () => {
    try {
      await deleteDoc(doc(db, "productos", selectedProduct.id)).then(() => {
        setProductsList((prevList) => {
          let data = prevList.filter((el) => el.id !== selectedProduct.id);
          return data;
        });
        setSelectedProduct(null);
        setDanger(false);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.showcase}>
          <div className={styles.showcase_content}>
            <div
              className={`${styles.showcase_item} ${styles.showcase_addnew}`}
              onClick={() => setAdd(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                  fill="none"
                  stroke="var(--admin-primary-bg)"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                />
                <path
                  fill="none"
                  stroke="var(--admin-primary-bg)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M256 176v160M336 256H176"
                />
              </svg>
            </div>
            {productsList.map((item, index) => {
              return (
                <div className={styles.showcase_item} key={index}>
                  <div className={styles.back}>
                    {loadingImages && (
                      <div className={styles.img_loading}>
                        <span>Cargando</span>
                      </div>
                    )}
                    {!loadingImages && (
                      <img
                        src={item.img}
                        alt={item.alt}
                        style={{ display: loadingImages ? "none" : "block" }}
                      />
                    )}
                  </div>
                  <div className={styles.front}>
                    <button
                      onClick={() => {
                        setSelectedProduct(item);
                      }}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {selectedProduct !== null && (
          <div className={styles.products}>
            <div className={styles.products_header}>
              <span>
                Editando:{" "}
                {selectedProduct.name.charAt(0).toUpperCase() +
                  selectedProduct.name.slice(1)}
              </span>

              <button
                className={styles.products_back}
                onClick={() => setSelectedProduct(null)}
              >
                Regresar
              </button>
            </div>

            <div className={styles.products_content}>
              <form
                ref={addForm}
                className={styles.products_form}
                onSubmit={handleSubmit(handleEditSave)}
              >
                <div className={styles.products_form_title}>
                  <h1>Editar producto</h1>
                </div>
                <div className={styles.products_form_group}>
                  <label
                    className={styles.products_form_label}
                    htmlFor="name"
                    style={{
                      color:
                        errors.name?.type === "required" ||
                        errors.name?.type === "validate" ||
                        errors.name?.type === "pattern"
                          ? "red"
                          : !errors.name && getFieldState("name").isDirty
                          ? "green"
                          : "",
                    }}
                  >
                    {errors.name?.type === "required" &&
                      "Este campo es requerido"}
                    {errors.name?.type === "pattern" && "Solo letras y numeros"}
                    {errors.name?.type === "validate" &&
                      "Debes modificar algun campo"}
                    {!errors.name && !getFieldState("name").isDirty && "Nombre"}
                    {!errors.name && getFieldState("name").isDirty && "Nombre"}
                  </label>
                  <input
                    type="text"
                    className={styles.products_form_field}
                    placeholder="Nombre ..."
                    name="name"
                    id="name"
                    {...register("name", {
                      required: true,
                      validate: editNameValidation,
                      pattern: /^[a-zA-Z0-9 ]+$/,
                    })}
                    autoComplete="off"
                    onChange={(e) =>
                      setValue("name", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                </div>

                <div className={styles.products_form_group}>
                  <label
                    className={styles.products_form_label}
                    htmlFor="text"
                    style={{
                      color:
                        errors.text?.type === "required" ||
                        errors.text?.type === "validate" ||
                        errors.text?.type === "maxLength"
                          ? "red"
                          : !errors.text && getFieldState("text").isDirty
                          ? "green"
                          : "",
                    }}
                  >
                    {errors.text?.type === "required" &&
                      "Este campo es requerido"}
                    {errors.text?.type === "maxLength" &&
                      "Máximo de 140 caracteres"}
                    {errors.text?.type === "validate" &&
                      "Debes modificar algun campo"}
                    {!errors.text &&
                      !getFieldState("text").isDirty &&
                      "Descripción"}
                    {!errors.text &&
                      getFieldState("text").isDirty &&
                      "Descripción"}
                  </label>
                  <input
                    type="text"
                    className={styles.products_form_field}
                    placeholder="Descripción ..."
                    name="text"
                    id="text"
                    {...register("text", {
                      required: true,
                      maxLength: 140,
                      validate: editTextValidation,
                    })}
                    autoComplete="off"
                    onChange={(e) =>
                      setValue("text", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                </div>

                <div className={styles.products_form_group}>
                  <label
                    className={styles.products_form_label}
                    htmlFor="img"
                    style={{
                      color:
                        errors.img?.type === "required" ||
                        errors.img?.type === "validate"
                          ? "red"
                          : !errors.img && getFieldState("img").isDirty
                          ? "green"
                          : "",
                    }}
                  >
                    {errors.img?.type === "required" &&
                      "Este campo es requerido"}
                    {errors.img?.type === "validate" &&
                      "Debes modificar algun campo"}
                    {!errors.img &&
                      !getFieldState("img").isDirty &&
                      "Imagen URL"}
                    {!errors.img &&
                      getFieldState("img").isDirty &&
                      "Imagen URL"}
                  </label>
                  <input
                    type="img"
                    className={styles.products_form_field}
                    placeholder="URL de imagen ..."
                    name="img"
                    id="img"
                    {...register("img", {
                      required: true,
                      validate: editImgValidation,
                    })}
                    autoComplete="off"
                    onChange={(e) =>
                      setValue("img", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                </div>

                <div className={styles.products_form_group}>
                  <label
                    className={styles.products_form_label}
                    htmlFor="alt"
                    style={{
                      color:
                        errors.alt?.type === "required" ||
                        errors.alt?.type === "validate"
                          ? "red"
                          : !errors.alt && getFieldState("alt").isDirty
                          ? "green"
                          : "",
                    }}
                  >
                    {errors.alt?.type === "required" &&
                      "Este campo es requerido"}
                    {errors.alt?.type === "validate" &&
                      "Debes modificar algun campo"}
                    {!errors.alt &&
                      !getFieldState("alt").isDirty &&
                      "Texto de imagen"}
                    {!errors.alt &&
                      getFieldState("alt").isDirty &&
                      "Texto de imagen"}
                  </label>
                  <input
                    type="alt"
                    className={styles.products_form_field}
                    placeholder="Texto de imagen ..."
                    name="alt"
                    id="alt"
                    {...register("alt", {
                      required: true,
                      validate: editAltValidation,
                    })}
                    autoComplete="off"
                    onChange={(e) =>
                      setValue("alt", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                </div>

                <div className={styles.products_form_group}>
                  <label
                    className={styles.products_form_label}
                    htmlFor="price"
                    style={{
                      color:
                        errors.price?.type === "required" ||
                        errors.price?.type === "pattern" ||
                        errors.price?.type === "validate"
                          ? "red"
                          : !errors.price && getFieldState("price").isDirty
                          ? "green"
                          : "",
                    }}
                  >
                    {errors.price?.type === "required" &&
                      "Este campo es requerido"}
                    {errors.price?.type === "pattern" && "Ingresa solo números"}
                    {errors.price?.type === "validate" &&
                      "Debes modificar algun campo"}
                    {!errors.price &&
                      !getFieldState("price").isDirty &&
                      "Precio"}
                    {!errors.price &&
                      getFieldState("price").isDirty &&
                      "Precio"}
                  </label>
                  <input
                    type="price"
                    className={styles.products_form_field}
                    placeholder="Precio ..."
                    name="price"
                    id="price"
                    {...register("price", {
                      required: true,
                      pattern: /^[0-9]+$/,
                      validate: editPriceValidation,
                    })}
                    autoComplete="off"
                    onChange={(e) =>
                      setValue("price", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                </div>

                <div className={styles.products_form_group}>
                  <label
                    className={styles.products_form_label}
                    htmlFor="category"
                    style={{
                      color:
                        errors.category?.type === "required" ||
                        errors.category?.type === "validate"
                          ? "red"
                          : !errors.category &&
                            getFieldState("category").isDirty
                          ? "green"
                          : "",
                    }}
                  >
                    {errors.category?.type === "required" &&
                      "Este campo es requerido"}
                    {errors.category?.type === "validate" &&
                      "Debes modificar algun campo"}
                    {!errors.category &&
                      !getFieldState("category").isTouched &&
                      "Categoría"}
                    {!errors.category &&
                      getFieldState("category").isTouched &&
                      "Categoría"}
                  </label>
                  <select
                    className={styles.products_form_select}
                    name="category"
                    id="category"
                    {...register("category", {
                      required: true,
                      validate: editCategoryValidation,
                    })}
                    autoComplete="off"
                    onChange={(e) =>
                      setValue("category", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  >
                    {categoriesList.map((item, index) => (
                      <option value={item.name} key={index}>
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  type="submit"
                  className={styles.products_form_submit}
                  value="Guardar"
                />
                <button
                  type="button"
                  className={styles.products_form_delete}
                  onClick={() => {
                    setDanger(true);
                  }}
                >
                  Eliminar
                </button>
              </form>
            </div>
          </div>
        )}
        {danger && (
          <div className={styles.danger}>
            <div className={styles.popup}>
              <span>¿Estás seguro?</span>
              <p>
                Elimnar el producto sera una accion permanente la cual no podra
                deshacerse.
              </p>
              <div>
                <button
                  type="button"
                  className={styles.popup_yes}
                  onClick={() => handleProductDelete()}
                >
                  Si
                </button>
                <button
                  type="button"
                  className={styles.popup_no}
                  onClick={() => setDanger(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
        {add && (
          <div className={styles.products}>
            <div className={styles.products_header}>
              <span>Crear producto</span>

              <button onClick={() => setAdd(false)}>Regresar</button>
            </div>

            <div className={styles.products_content}>
              <form
                className={styles.products_form}
                onSubmit={handleSubmit(handleAddSave)}
              >
                <div className={styles.products_form_title}>
                  <h1>Nuevo producto</h1>
                </div>
                <div className={styles.products_form_group}>
                  <label
                    className={styles.products_form_label}
                    htmlFor="newName"
                    style={{
                      color:
                        errors.newName?.type === "required" ||
                        errors.newName?.type === "pattern"
                          ? "red"
                          : !errors.newName && getFieldState("newName").isDirty
                          ? "green"
                          : "",
                    }}
                  >
                    {errors.newName?.type === "required" &&
                      "Este campo es requerido"}
                    {errors.newName?.type === "pattern" &&
                      "Unicamente letras y numeros"}
                    {!errors.newName &&
                      !getFieldState("newName").isDirty &&
                      "Nombre"}
                    {!errors.newName &&
                      getFieldState("newName").isDirty &&
                      "Nombre"}
                  </label>
                  <input
                    type="text"
                    className={styles.products_form_field}
                    placeholder="Nombre ..."
                    name="newName"
                    id="newName"
                    {...register("newName", {
                      required: true,
                      pattern: /^[a-zA-Z0-9 ]+$/,
                    })}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.products_form_group}>
                  <label
                    className={styles.products_form_label}
                    htmlFor="newText"
                    style={{
                      color:
                        errors.newText?.type === "required" ||
                        errors.newText?.type === "maxLength"
                          ? "red"
                          : !errors.newText && getFieldState("newText").isDirty
                          ? "green"
                          : "",
                    }}
                  >
                    {errors.newText?.type === "required" &&
                      "Este campo es requerido"}
                    {errors.newText?.type === "maxLength" &&
                      "Máximo de 140 caracteres"}
                    {!errors.newText &&
                      !getFieldState("newText").isDirty &&
                      "Descripción"}
                    {!errors.newText &&
                      getFieldState("newText").isDirty &&
                      "Descripción"}
                  </label>
                  <input
                    type="newText"
                    className={styles.products_form_field}
                    placeholder="Descripción ..."
                    name="newText"
                    id="newText"
                    {...register("newText", {
                      required: true,
                      maxLength: 140,
                    })}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.products_form_group}>
                  <label
                    className={styles.products_form_label}
                    htmlFor="newImg"
                    style={{
                      color:
                        errors.newImg?.type === "required"
                          ? "red"
                          : !errors.newImg && getFieldState("newImg").isDirty
                          ? "green"
                          : "",
                    }}
                  >
                    {errors.newImg?.type === "required" &&
                      "Este campo es requerido"}
                    {!errors.newImg &&
                      !getFieldState("newImg").isDirty &&
                      "Imagen URL"}
                    {!errors.newImg &&
                      getFieldState("newImg").isDirty &&
                      "Imagen URL"}
                  </label>
                  <input
                    type="newImg"
                    className={styles.products_form_field}
                    placeholder="URL de imagen ..."
                    name="newImg"
                    id="newImg"
                    {...register("newImg", {
                      required: true,
                    })}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.products_form_group}>
                  <label
                    className={styles.products_form_label}
                    htmlFor="newAlt"
                    style={{
                      color:
                        errors.newAlt?.type === "required"
                          ? "red"
                          : !errors.newAlt && getFieldState("newAlt").isDirty
                          ? "green"
                          : "",
                    }}
                  >
                    {errors.newAlt?.type === "required" &&
                      "Este campo es requerido"}
                    {!errors.newAlt &&
                      !getFieldState("newAlt").isDirty &&
                      "Texto de imagen"}
                    {!errors.newAlt &&
                      getFieldState("newAlt").isDirty &&
                      "Texto de imagen"}
                  </label>
                  <input
                    type="newAlt"
                    className={styles.products_form_field}
                    placeholder="Texto de imagen ..."
                    name="newAlt"
                    id="newAlt"
                    {...register("newAlt", {
                      required: true,
                    })}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.products_form_group}>
                  <label
                    className={styles.products_form_label}
                    htmlFor="newPrice"
                    style={{
                      color:
                        errors.newPrice?.type === "required" ||
                        errors.newPrice?.type === "pattern"
                          ? "red"
                          : !errors.newPrice &&
                            getFieldState("newPrice").isDirty
                          ? "green"
                          : "",
                    }}
                  >
                    {errors.newPrice?.type === "required" &&
                      "Este campo es requerido"}
                    {errors.newPrice?.type === "pattern" &&
                      "Ingresa solo números"}
                    {!errors.newPrice &&
                      !getFieldState("newPrice").isDirty &&
                      "Precio"}
                    {!errors.newPrice &&
                      getFieldState("newPrice").isDirty &&
                      "Precio"}
                  </label>
                  <input
                    type="newPrice"
                    className={styles.products_form_field}
                    placeholder="Precio ..."
                    name="newPrice"
                    id="newPrice"
                    {...register("newPrice", {
                      required: true,
                      pattern: /^[0-9]+$/,
                    })}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.products_form_group}>
                  <label
                    className={styles.products_form_label}
                    htmlFor="newCategory"
                    style={{
                      color:
                        errors.newCategory?.type === "required"
                          ? "red"
                          : !errors.newCategory &&
                            getFieldState("newCategory").isDirty
                          ? "green"
                          : "",
                    }}
                  >
                    {errors.newCategory?.type === "required" &&
                      "Este campo es requerido"}
                    {!errors.newCategory &&
                      !getFieldState("newCategory").isTouched &&
                      "Categoría"}
                    {!errors.newCategory &&
                      getFieldState("newCategory").isTouched &&
                      "Categoría"}
                  </label>
                  <select
                    className={styles.products_form_select}
                    name="newCategory"
                    id="newCategory"
                    {...register("newCategory", {
                      required: true,
                    })}
                    autoComplete="off"
                    defaultValue=""
                  >
                    <option hidden disabled value="">
                      Filtrar ...
                    </option>
                    {categoriesList.map((item, index) => (
                      <option value={item.name} key={index}>
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="submit"
                  className={styles.products_form_submit}
                  value="Crear"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
