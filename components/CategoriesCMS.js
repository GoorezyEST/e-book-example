import { useGlobal } from "@/contexts/GlobalContext";
import React, { useEffect, useState } from "react";
import styles from "@/styles/admin/modals.module.css";
import { useForm } from "react-hook-form";
import { getCategories } from "@/firebase/functions/db";
import { db } from "@/firebase/firebaseConfig";
import {
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
} from "firebase/firestore";

export default function Categories() {
  const {
    register,
    formState: { errors },
    getFieldState,
    handleSubmit,
    setValue,
    reset,
  } = useForm();

  const { setShowCategories, categoriesList, setCategoriesList } = useGlobal();

  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [danger, setDanger] = useState(false);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (selectedCategorie) {
      setValue("category", selectedCategorie.name || "");
    }
  }, [selectedCategorie]);

  const categoryValidation = (value) => {
    if (selectedCategorie && selectedCategorie.name === value) {
      return "Name value must be different from the current value.";
    }
  };

  const handleEditSave = async (e) => {
    try {
      if (selectedCategorie !== null) {
        const updating = doc(db, "categorias", selectedCategorie.id);

        await updateDoc(updating, {
          name: e.category,
        })
          .then(() => {
            setCategoriesList((prevList) => {
              const indexToDelete = prevList.findIndex(
                (el) => el.id === selectedCategorie.id
              );
              if (indexToDelete !== -1) {
                const updatedList = [...prevList];
                updatedList.splice(indexToDelete, 1, {
                  id: selectedCategorie.id,
                  name: e.category,
                });
                return updatedList;
              } else {
                return [
                  ...prevList,
                  { id: selectedCategorie.id, name: e.category },
                ];
              }
            });
          })
          .then(() => {
            setSelectedCategorie(null);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddSave = async (e) => {
    try {
      let newID;

      const docRef = await addDoc(collection(db, "categorias"), {
        name: e.newCategory,
      });
      newID = docRef.id;
      setCategoriesList((prevList) => {
        return [{ id: newID, name: e.newCategory }, ...prevList];
      });
      reset();
      setAdd(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCategoryDelete = async () => {
    console.log(categoriesList);
    console.log(selectedCategorie);
    try {
      await deleteDoc(doc(db, "categorias", selectedCategorie.id)).then(() => {
        setCategoriesList((prevList) => {
          let data = prevList.filter((el) => el.id !== selectedCategorie.id);
          return data;
        });
        setSelectedCategorie(null);
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
            {categoriesList.map((item, index) => {
              return (
                <div className={styles.showcase_item} key={index}>
                  <div>
                    <span>Categoría:</span>
                    <p>
                      {/* {item.name.charAt(0).toUpperCase() + item.name.slice(1)} */}
                      {item.name}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategorie(item);
                    }}
                  >
                    Editar
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {selectedCategorie !== null && (
          <div className={styles.editing}>
            <div className={styles.editing_header}>
              <span>
                Editando:{" "}
                {selectedCategorie.name.charAt(0).toUpperCase() +
                  selectedCategorie.name.slice(1)}
              </span>

              <button
                className={styles.editing_back}
                onClick={() => setSelectedCategorie(null)}
              >
                Regresar
              </button>
            </div>

            <div className={styles.editing_content}>
              <form
                className={styles.editing_form}
                onSubmit={handleSubmit(handleEditSave)}
              >
                <div className={styles.editing_form_title}>
                  <h1>Editar categoría</h1>
                </div>
                <div className={styles.editing_form_group}>
                  <label
                    className={styles.editing_form_label}
                    htmlFor="category"
                    style={{
                      color:
                        errors.category?.type === "required" ||
                        errors.category?.type === "pattern" ||
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
                    {errors.category?.type === "pattern" &&
                      "Solo letras en minúsculas"}
                    {errors.category?.type === "validate" &&
                      "Debes modificar este campo"}
                    {!errors.category &&
                      !getFieldState("category").isDirty &&
                      "Edita el nombre"}
                    {!errors.category &&
                      getFieldState("category").isDirty &&
                      "Nombre válido"}
                  </label>
                  <input
                    type="text"
                    className={styles.editing_form_field}
                    placeholder="Nombre ..."
                    name="category"
                    id="category"
                    {...register("category", {
                      required: true,
                      pattern: /^[a-z]+$/,
                      validate: categoryValidation,
                    })}
                    autoComplete="off"
                    onChange={(e) =>
                      setValue("category", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                </div>
                <input
                  type="submit"
                  className={styles.editing_form_submit}
                  value="Guardar"
                />
                <button
                  type="button"
                  className={styles.editing_form_delete}
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
                Elimnar la categoría sera una accion permanente la cual no podra
                deshacerse.
              </p>
              <div>
                <button
                  type="button"
                  className={styles.popup_yes}
                  onClick={() => handleCategoryDelete()}
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
          <div className={styles.editing}>
            <div className={styles.editing_header}>
              <span>Crear categoría</span>

              <button
                className={styles.editing_back}
                onClick={() => setAdd(false)}
              >
                Regresar
              </button>
            </div>

            <div className={styles.editing_content}>
              <form
                className={styles.editing_form}
                onSubmit={handleSubmit(handleAddSave)}
              >
                <div className={styles.editing_form_title}>
                  <h1>Nueva categoría</h1>
                </div>
                <div className={styles.editing_form_group}>
                  <label
                    className={styles.editing_form_label}
                    htmlFor="newCategory"
                    style={{
                      color:
                        errors.newCategory?.type === "required" ||
                        errors.newCategory?.type === "pattern"
                          ? "red"
                          : !errors.newCategory &&
                            getFieldState("newCategory").isDirty
                          ? "green"
                          : "",
                    }}
                  >
                    {errors.newCategory?.type === "required" &&
                      "Este campo es requerido"}
                    {errors.newCategory?.type === "pattern" &&
                      "Solo letras en minúsculas"}
                    {!errors.newCategory &&
                      !getFieldState("newCategory").isDirty &&
                      "Escribe un nombre"}
                    {!errors.newCategory &&
                      getFieldState("newCategory").isDirty &&
                      "Nombre válido"}
                  </label>
                  <input
                    type="text"
                    className={styles.editing_form_field}
                    placeholder="Nombre ..."
                    name="newCategory"
                    id="newCategory"
                    {...register("newCategory", {
                      required: true,
                      pattern: /^[a-z]+$/,
                    })}
                    autoComplete="off"
                  />
                </div>
                <input
                  type="submit"
                  className={styles.editing_form_submit}
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
