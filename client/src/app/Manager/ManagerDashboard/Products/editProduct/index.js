import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  updateProduct,
  getProduct,
} from "../../../../../actions/product.action";
import { getCategories } from "../../../../../actions/category.actions";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
const EditProduct = ({ updateProduct, getCategories, category, product, getProduct }) => {
  let history = useHistory();
  const { productId } = useParams();
  const [ProductData, setProductData] = useState({
    productId: "",
    productName: "",
    description: "",
    category: "",
    price: "",
    image:""
  });
  useEffect(() => {
    getProduct(productId, localStorage.getItem("currentRestaurant"));
  }, []);
  useEffect(() => {
    setProductData({
      productId: product.product && product.product._id,
      productName: product.product && product.product.productName,
      description: product.product && product.product.description,
      price: product.product && product.product.price,
      image:product.product && product.product.image,
      category: product.product && product.product.category,
    });
  }, [product.product]);
  useEffect(() => {
    getCategories(localStorage.getItem("currentRestaurant"));
  }, [category.loading]);

  const onInputChange = (e) => {
    setProductData({ ...ProductData, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    await updateProduct(
      {
        productName: ProductData.productName,
        description: ProductData.description,
        category: ProductData.category,
        price: ProductData.price,
        image: ProductData.image
      },
      ProductData.productId,
      localStorage.getItem("currentRestaurant")
    );
    history.push("/manager/dashboard/products");
  };

  return (
    <section className=" text-gray-600 p-8">
      <div className="border-2 border-gray-200 p-8 rounded-lg">
        <form onSubmit={(e) => onSubmitForm(e)}>
          <div className="mb-4 w-full">
            <label htmlFor="image" className="leading-7 text-sm text-gray-600">
              Image
            </label>
            <input
              onChange={(e) => onInputChange(e)}
              required
              type="text"
              id="image"
              name="image"
              value={ProductData.image}
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="productName"
              className="leading-7 text-sm text-gray-600"
            >
              Product Name
            </label>
            <input
              onChange={(e) => onInputChange(e)}
              required
              type="text"
              id="productName"
              value={ProductData.productName}
              name="productName"
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="description"
              className="leading-7 text-sm text-gray-600"
            >
              Description
            </label>
            <textarea
              onChange={(e) => onInputChange(e)}
              required
              type="text"
              id="description"
              value={ProductData.description}
              name="description"
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="price" className="leading-7 text-sm text-gray-600">
              Price
            </label>
            <input
              onChange={(e) => onInputChange(e)}
              required
              type="number"
              id="price"
              name="price"
              value={ProductData.price}
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="description"
              className="leading-7 text-sm text-gray-600"
            >
              Category
            </label>
            <select
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              name="category"
              value={ProductData.category}
              onChange={(e) => onInputChange(e)}
            >
              <option value={null}>----</option>
              {category.categories &&
                category.categories.map((category) => {
                  return (
                    <option value={category._id}>
                      {category.categoryName}
                    </option>
                  );
                })}
            </select>
          </div>
          <button
            type="submit"
            className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-shade rounded text-lg"
          >
            update
          </button>
        </form>
      </div>
    </section>
  );
};

EditProduct.propTypes = {
  updateProduct: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  category: state.category,
  product: state.product
});

const mapDispatchToProps = {
  updateProduct,
  getCategories,
  getProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
