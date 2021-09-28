import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/img/logo_2.png";
import "./HeaderCheckoutStyle.scss";
import { USER_LOGIN, TOKEN } from "../../../util/settings/config";
import { deleteUserLogin } from "../../../redux/actions/userAction";
import { useDispatch } from "react-redux";

export default function HeaderCheckoutComponent(props) {
  const { userLogin } = props;
  const { thongTinPhim } = props.listChair;
  const dispatch = useDispatch();

  const changeHeaderCheckOut = () => {
    const headerCheckOut = document.querySelector("#headerCheckOutId");
    if (headerCheckOut) {
      if (window.scrollY > 80) {
        headerCheckOut.classList.add("headerCheckOut__Change");
      } else {
        headerCheckOut.classList.remove("headerCheckOut__Change");
      }
    }
  };
  window.addEventListener("scroll", changeHeaderCheckOut);
  return (
    <header
      //   data-aos="fade-down"
      //   data-aos-once="true"
      className={`headerCheckOut `}
      id="headerCheckOutId"
    >
      <div className="headerCheckOut__content">
        <nav>
          <NavLink className="headerCheckOut__logo" to="/home">
            <img src={logo} alt={logo} />
          </NavLink>
          <div className="headerCheckOut__InfoCinema">
            <div className="row">
              <div className="col-1 headerCheckOut__Img">
                <img src={thongTinPhim.hinhAnh} alt={thongTinPhim.hinhAnh} />
              </div>
              <div className="col-11 headerCheckOut__Info">
                <h5>{thongTinPhim.tenCumRap}</h5>
                <p>{thongTinPhim.diaChi}</p>
              </div>
            </div>
          </div>
          <div className="headerCheckOut__user">
            <NavLink to="/profile">{userLogin.taiKhoan}</NavLink>
            <NavLink
              to="/home"
              onClick={() => {
                dispatch(deleteUserLogin());
              }}
            >
              Sign Out
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
