import React, { Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getOwnedMenus,
  deleteOwnedMenu,
} from "../../../../actions/menu.actions";
import Spinner from "../../../utils/Spinner";
import qrcode from "qrcode";
import { useHistory } from "react-router-dom";
const DashboardMenu = ({
  getOwnedMenus,
  deleteOwnedMenu,
  menu,
  restaurant,
}) => {
 
  useEffect(() => {
    getOwnedMenus(localStorage.getItem("currentRestaurant"));
  }, [getOwnedMenus, menu.loading]);
  const downloadQr = async (e, menuURL, menuName) => {
    const qr = await qrcode.toDataURL(menuURL);
    console.log(qr)
    const a = document.createElement("a");
    a.href = qr;
    a.download = `${menuName}.png`;
    a.click();
  };
  return menu.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="text-gray-600 p-8">
        <div>
          <Link
            to="/manager/dashboard/menus/create"
            className="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-shade rounded text-lg">
            Add menu
          </Link>
        </div>
        <div className="border rounded-md shadow mt-10">
          <table className="text-left w-full ">
            <thead>
              <tr>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-gray-200">
                  Name
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-gray-200">
                  Link
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {menu.menus &&
                menu.menus.map((menu) => {
                  return (
                    <tr className="hover:bg-grey-lighter">
                      <td className="py-4 px-6 border-b border-gray-200">
                        {menu.menuName}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200">
                        {menu.menuURL}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200">
                       
                       
                        <button
                          onClick={(e) =>
                            downloadQr(e, menu.menuURL, menu.menuName)
                          }
                          className="w-10 h-10 focus:outline-none appearance-none font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-primary hover:text-white">
                          <i className="fas fa-qrcode"></i>
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            deleteOwnedMenu(
                              menu._id,
                              localStorage.getItem("currentRestaurant")
                            );
                          }}
                          className="w-10 h-10 focus:outline-none appearance-none font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-primary hover:text-white">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </Fragment>
  );
};
DashboardMenu.propTypes = {
  menu: PropTypes.object.isRequired,
  restaurant: PropTypes.object,
  getOwnedMenus: PropTypes.func.isRequired,
  deleteOwnedMenu: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  menu: state.menu,
  restaurant: state.restaurant,
});

const mapDispatchToProps = {
  getOwnedMenus,
  deleteOwnedMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenu);
