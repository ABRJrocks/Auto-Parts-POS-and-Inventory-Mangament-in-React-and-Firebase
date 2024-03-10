import React, { useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";

function AddProduct() {
  const [product, setProduct] = useState({
    brand: "",
    productCode: "",
    description: "",
    model: "",
    purchasePrice: "",
    mechanicPrice: "",
    customerPrice: "",
  });
  const [errors, setErrors] = useState({});
  const [isChecking, setIsChecking] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() && !isChecking) {
      setIsChecking(true);
      try {
        const productRef = collection(db, "products");
        const q = query(
          productRef,
          where("productCode", "==", product.productCode)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setErrors({ productCode: "Product Code already exists" });
          setIsChecking(false);
        } else {
          const docRef = await addDoc(productRef, {
            ...product,
            createdAt: serverTimestamp(),
          });
          console.log("Product added with ID: ", docRef.id);
          // Reset form fields after successful submission
          setProduct({
            brand: "",
            productCode: "",
            description: "",
            model: "",
            purchasePrice: "",
            mechanicPrice: "",
            customerPrice: "",
          });
          setErrors({});
          setIsChecking(false);
        }
      } catch (error) {
        console.error("Error adding product: ", error);
        setIsChecking(false);
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    if (!product.brand.trim()) {
      errors.brand = "Brand is required";
      isValid = false;
    }
    if (!product.productCode.trim()) {
      errors.productCode = "Product Code is required";
      isValid = false;
    }
    if (!product.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }
    if (!product.model.trim()) {
      errors.model = "Model is required";
      isValid = false;
    }
    if (!product.purchasePrice.trim()) {
      errors.purchasePrice = "Purchase Price is required";
      isValid = false;
    }
    if (!product.mechanicPrice.trim()) {
      errors.mechanicPrice = "Mechanic Price is required";
      isValid = false;
    }
    if (!product.customerPrice.trim()) {
      errors.customerPrice = "Customer Price is required";
      isValid = false;
    }
    if (isValid) {
      setErrors({});
    } else {
      setErrors(errors);
    }
    return isValid;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="brand"
                className="block text-gray-700 font-medium mb-2"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                className={`w-full border ${
                  errors.brand ? "border-red-500" : "border-gray-300"
                } rounded-md px-4 py-2 focus:outline-none focus:border-blue-500`}
              />
              {errors.brand && (
                <p className="text-red-500 mt-1">{errors.brand}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="productCode"
                className="block text-gray-700 font-medium mb-2"
              >
                Product Code
              </label>
              <input
                type="text"
                id="productCode"
                name="productCode"
                value={product.productCode}
                onChange={handleChange}
                className={`w-full border ${
                  errors.productCode ? "border-red-500" : "border-gray-300"
                } rounded-md px-4 py-2 focus:outline-none focus:border-blue-500`}
              />
              {errors.productCode && (
                <p className="text-red-500 mt-1">{errors.productCode}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                rows="3"
                className={`w-full border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-md px-4 py-2 focus:outline-none focus:border-blue-500`}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 mt-1">{errors.description}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="model"
                className="block text-gray-700 font-medium mb-2"
              >
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={product.model}
                onChange={handleChange}
                className={`w-full border ${
                  errors.model ? "border-red-500" : "border-gray-300"
                } rounded-md px-4 py-2 focus:outline-none focus:border-blue-500`}
              />
              {errors.model && (
                <p className="text-red-500 mt-1">{errors.model}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="purchasePrice"
                className="block text-gray-700 font-medium mb-2"
              >
                Purchase Price
              </label>
              <input
                type="number"
                id="purchasePrice"
                name="purchasePrice"
                value={product.purchasePrice}
                onChange={handleChange}
                className={`w-full border ${
                  errors.purchasePrice ? "border-red-500" : "border-gray-300"
                } rounded-md px-4 py-2 focus:outline-none focus:border-blue-500`}
              />
              {errors.purchasePrice && (
                <p className="text-red-500 mt-1">{errors.purchasePrice}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="mechanicPrice"
                className="block text-gray-700 font-medium mb-2"
              >
                Mechanic Price
              </label>
              <input
                type="number"
                id="mechanicPrice"
                name="mechanicPrice"
                value={product.mechanicPrice}
                onChange={handleChange}
                className={`w-full border ${
                  errors.mechanicPrice ? "border-red-500" : "border-gray-300"
                } rounded-md px-4 py-2 focus:outline-none focus:border-blue-500`}
              />
              {errors.mechanicPrice && (
                <p className="text-red-500 mt-1">{errors.mechanicPrice}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="customerPrice"
                className="block text-gray-700 font-medium mb-2"
              >
                Customer Price
              </label>
              <input
                type="number"
                id="customerPrice"
                name="customerPrice"
                value={product.customerPrice}
                onChange={handleChange}
                className={`w-full border ${
                  errors.customerPrice ? "border-red-500" : "border-gray-300"
                } rounded-md px-4 py-2 focus:outline-none focus:border-blue-500`}
              />
              {errors.customerPrice && (
                <p className="text-red-500 mt-1">{errors.customerPrice}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={isChecking}
            className="mt-4 col-span-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {isChecking ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
