import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { IoMdClose } from "react-icons/io";
import { AiOutlineEdit, AiFillCamera } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";
import "./widgetLg.css";

import HOC from "../../layout/HOC";
import axios from "axios";
import BaseUrl from "../../BaseUrl";
import auth from "../../Auth";

const History = () => {
  const [prop, setProp] = useState([]);
  const [popup, setPopup] = useState(false);
  let token = localStorage.getItem("Shaft");
  const [edit, setEdit] = useState("");
  const [banners, setBanners] = useState([]);

  const [image, setImage] = useState();
  const [name, setName] = useState("");

  const fetchBanners = async () => {
    const url = BaseUrl() + "/banner/get/banner";
    try {
      const res = await axios.get(url, auth);
      console.log("res", res);
      setBanners(res.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const addBanner = async (e) => {
    e.preventDefault();
    const url = BaseUrl() + "/banner/add/banner";
    const fd = new FormData();
    fd.append("myBanner", image);
    fd.append("bannername", name);

    try {
      const res = await axios.post(url, fd, auth);
      console.log("res", res);
      fetchBanners();
    } catch (err) {
      console.log("err", err);
    }
  };

  const deleteBanner = async (id) => {
    const url = BaseUrl() + `/banner/delete/banner/${id}`;

    try {
      const res = await axios.delete(url, auth);
      toast.success("Deleted Successfully");
      fetchBanners();
    } catch (err) {
      console.log("err", err);
      toast.error("Please try again");
    }
  };
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (
    <>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            History
          </span>
        </div>
        {/* <div className="widgetLg">
          <h3 className="widgetLgTitle">Latest transactions</h3>
          <table className="widgetLgTable">
            <thead>
              <tr className="widgetLgTr">
                <th className="widgetLgTh">Customer</th>
                <th className="widgetLgTh">Date</th>
                <th className="widgetLgTh">Amount</th>
                <th className="widgetLgTh">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="widgetLgTr">
                <td className="widgetLgUser">
                  <img
                    src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt=""
                    className="widgetLgImg"
                  />
                  <span className="widgetLgName">Susan Carol</span>
                </td>
                <td className="widgetLgDate">2 Jun 2021</td>
                <td className="widgetLgAmount">$122.00</td>
                <td className="widgetLgStatus">
                  <Button type="Approved" />
                </td>
              </tr>
              <tr className="widgetLgTr">
                <td className="widgetLgUser">
                  <img
                    src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt=""
                    className="widgetLgImg"
                  />
                  <span className="widgetLgName">Susan Carol</span>
                </td>
                <td className="widgetLgDate">2 Jun 2021</td>
                <td className="widgetLgAmount">$122.00</td>
                <td className="widgetLgStatus">
                  <Button type="Declined" />
                </td>
              </tr>
              <tr className="widgetLgTr">
                <td className="widgetLgUser">
                  <img
                    src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt=""
                    className="widgetLgImg"
                  />
                  <span className="widgetLgName">Susan Carol</span>
                </td>
                <td className="widgetLgDate">2 Jun 2021</td>
                <td className="widgetLgAmount">$122.00</td>
                <td className="widgetLgStatus">
                  <Button type="Pending" />
                </td>
              </tr>
              <tr className="widgetLgTr">
                <td className="widgetLgUser">
                  <img
                    src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt=""
                    className="widgetLgImg"
                  />
                  <span className="widgetLgName">Susan Carol</span>
                </td>
                <td className="widgetLgDate">2 Jun 2021</td>
                <td className="widgetLgAmount">$122.00</td>
                <td className="widgetLgStatus">
                  <Button type="Approved" />
                </td>
              </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
        </div> */}
    </>
  );
};

export default HOC(History);
