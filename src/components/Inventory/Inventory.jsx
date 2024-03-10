import React, { useState, useEffect, Fragment } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { Dialog, Transition } from "@headlessui/react";
import { HiOutlineSearch } from "react-icons/hi";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    brand: "",
    productCode: "",
    description: "",
    model: "",
    purchasePrice: "",
    mechanicPrice: "",
    customerPrice: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productRef = collection(db, "products");
        const queryRef = query(productRef, orderBy("productCode"));
        const querySnapshot = await getDocs(queryRef);
        const productData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditedProduct(product); // Populate form fields with existing data
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = () => {
    deleteProduct(selectedProduct.id);
    setIsDeleteModalOpen(false);
  };

  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDoc(doc(db, "products", selectedProduct.id), editedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProduct.id ? editedProduct : product
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-8 ">
      <h2 className="text-3xl font-bold mb-8">Inventory</h2>
      <div className="mb-4">
        <div className="relative">
          <HiOutlineSearch
            fontSize={20}
            className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-400 rounded-3xl px-4 pl-11"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-y-auto h-[70vh]">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{product.brand}</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-gray-600">
                    <p className="mb-2 font-medium">Product Code:</p>
                    <p className="text-lg font-semibold">
                      {product.productCode}
                    </p>
                  </div>
                  <div className="text-gray-600">
                    <p className="mb-2 font-medium">Description:</p>
                    <p className="text-lg font-semibold">
                      {product.description}
                    </p>
                  </div>
                  <div className="text-gray-600">
                    <p className="mb-2 font-medium">Model:</p>
                    <p className="text-lg font-semibold">{product.model}</p>
                  </div>
                  <div className="text-gray-600">
                    <p className="mb-2 font-medium">Purchase Price:</p>
                    <p className="text-lg font-semibold">
                      Rs. {product.purchasePrice}
                    </p>
                  </div>
                  <div className="text-gray-600">
                    <p className="mb-2 font-medium">Mechanic Price:</p>
                    <p className="text-lg font-semibold">
                      Rs. {product.mechanicPrice}
                    </p>
                  </div>
                  <div className="text-gray-600">
                    <p className="mb-2 font-medium">Customer Price:</p>
                    <p className="text-lg font-semibold">
                      Rs. {product.customerPrice}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsDeleteModalOpen(true);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}

          {loading && <p>Loading...</p>}
        </ul>

        {/* Edit Modal */}
        <Transition appear show={isEditModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={() => setIsEditModalOpen(false)}
          >
            <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
              <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <form onSubmit={handleEditFormSubmit}>
                  <div className="p-6">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Edit Product
                    </Dialog.Title>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Brand
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={editedProduct.brand}
                        onChange={handleEditFormChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Product Code
                      </label>
                      <input
                        type="text"
                        name="productCode"
                        value={editedProduct.productCode}
                        onChange={handleEditFormChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={editedProduct.description}
                        onChange={handleEditFormChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Model
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={editedProduct.model}
                        onChange={handleEditFormChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Purchase Price
                      </label>
                      <input
                        type="number"
                        name="purchasePrice"
                        value={editedProduct.purchasePrice}
                        onChange={handleEditFormChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Mechanic Price
                      </label>
                      <input
                        type="number"
                        name="mechanicPrice"
                        value={editedProduct.mechanicPrice}
                        onChange={handleEditFormChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Customer Price
                      </label>
                      <input
                        type="number"
                        name="customerPrice"
                        value={editedProduct.customerPrice}
                        onChange={handleEditFormChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="mt-3 w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* Delete Modal */}
        <Transition appear show={isDeleteModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={() => setIsDeleteModalOpen(false)}
          >
            <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
              <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="p-6">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Confirm Deletion
                  </Dialog.Title>
                  <p className="mt-2 text-sm text-gray-500">
                    Are you sure you want to delete this product?
                  </p>
                </div>
                <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleDeleteProduct}
                    className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-transparent rounded-md shadow-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}

export default Inventory;
