import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getManagerOrder,
  cancelOrder,
  confirmOrder,
} from "../../../../../actions/order.actions";
import { useHistory, useParams } from "react-router-dom";
import Spinner from "../../../../utils/Spinner";
const OrderId = ({ order, getManagerOrder, cancelOrder, confirmOrder }) => {
  let history = useHistory();
  let { orderId } = useParams();
  useEffect(() => {
    getManagerOrder(orderId, localStorage.getItem("currentRestaurant"));
  }, [orderId, order.loading]);

  return order.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className=" w-30 max-w-6xl rounded my-6 bg-white border border-gray-300 shadow-md p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
        <h2 className="text-center font-bold">Menu Details </h2>
        <section>
          <div className="border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 w-full block hover:bg-gray-100 transition duration-150">
            <i className="fas fa-id-card-alt p-3"></i>
            order id
            <span className="text-gray-400 text-sm p-3"> {orderId}</span>
          </div>
          <div className="border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 w-full block hover:bg-gray-100 transition duration-150">
            <i className="far fa-user-circle p-3"></i>
            clientName
            <span className="text-gray-400 text-sm">
              {order?.order?.client?.firstName} {order.order?.client?.lastName} 
            </span>
          </div>
          <div className="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4  block hover:bg-gray-100 transition duration-150">
            <i className="fas fa-phone p-3"></i>
            phone
            <span className="text-gray-400 text-sm">
              {" "}
              {order?.order?.client.phoneNumber ? order.order.client.phoneNumber : "Not Phone Number"}{" "}
            </span>
          </div>
          <div className="p-3 w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 block hover:bg-gray-100 transition duration-150">
            order type
            <span className="text-gray-400 text-sm">
              {" "}
              {order?.order?.orderType}
            </span>
          </div>
          {/* <div className=" border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 w-full block hover:bg-gray-100 transition duration-150">
            state
            <span className="text-gray-400 text-sm">
              {" "}
              {order?.order?.state}
            </span>
          </div> */}
          <div className="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 w-full block hover:bg-gray-100 transition duration-150">
            <i className="fas fa-map-marker p-3"></i>
            deliveryAddress
            <span className="text-gray-400 text-sm p-3">
              {order?.order?.deliveryAddress?.streetName}{" "}
              {order?.order?.deliveryAddress?.codeZip}{" "}
              {order?.order?.deliveryAddress?.blockNumber}
            </span>
          </div>
          <div className="border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 w-full block hover:bg-gray-100 transition duration-150">
            <i className="fas fa-money-bill-alt p-3"></i>
            payed
            <span className="text-gray-400 text-sm p-3">
              {" "}
              {order?.order?.payed ? "Payed" : "Not Payed"}{" "}
            </span>
          </div>
          <div className="border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 w-full block hover:bg-gray-100 transition duration-150">
            <i className="fas fa-money-check p-3"></i>
            total price
            <span className="text-gray-400 text-sm p-3">
              {" "}
              {order?.order?.totalPrice}
            </span>
          </div>
        </section>

        {order.order.state !== "confirmed" && (
          <Fragment>
            <button
              onClick={(e) => confirmOrder(orderId)}
              className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-shade rounded text-lg"
            >
              confirm
            </button>
            <button
              onClick={(e) => cancelOrder(orderId)}
              className="text-white bg-danger border-0 py-2 px-6 focus:outline-none hover:bg-red-800 rounded text-lg"
            >
              Cancel
            </button>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  order: state.order,
});
OrderId.propTypes = {
  order: PropTypes.string.isRequired,
  getManagerOrder: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  confirmOrder: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getManagerOrder,
  cancelOrder,
  confirmOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderId);
