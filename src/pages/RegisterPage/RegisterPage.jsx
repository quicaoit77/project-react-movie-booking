import React from "react";
import logo from "../../assets/img/logo_2.png";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import "./RegisterStyle.scss";
import { GROUPID, TYPE_USER } from "../../util/settings/config";

export default function RegisterPage(props) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      hoTen: "",
      soDt: "",
      email: "",
      taiKhoan: "",
      matKhau: "",
      maNhom: GROUPID,
      maLoaiNguoiDung: TYPE_USER,
    },
    validate: (values) => {
      const errors = {};
      if (!values.hoTen.trim()) {
        errors.hoTen = "required";
      }
      if (!values.soDt.trim()) {
        errors.soDt = "required";
      } else if (!/^[0-9]+$/.test(values.soDt)) {
        errors.soDt = "Phone number not valid!";
      }
      if (!values.email.trim()) {
        errors.email = "required";
      } else if (
        !/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/.test(
          values.email
        )
      ) {
        errors.email = "email not valid !";
      }
      if (!values.taiKhoan.trim()) {
        errors.taiKhoan = "required";
      }
      if (!values.matKhau.trim()) {
        errors.matKhau = "required";
      }

      return errors;
    },
    onSubmit: (values) => {
      dispatch({
        type: "postNewUserApiAction",
        newUser: values,
        history: props.history,
      });
    },
  });

  return (
    <div className="register">
      <div className="register__Logo">
        <NavLink to="/home">
          <img src={logo} alt="" />
        </NavLink>
      </div>
      <div className="register__Title">
        <h3>REGISTER NOW</h3>
      </div>
      <div className="register__Content">
        <form onSubmit={(e) => formik.handleSubmit(e)}>
          <div className="form-group">
            <input
              placeholder="Name"
              name="hoTen"
              type="text"
              className="form-control"
              onChange={(e) => formik.handleChange(e)}
              onBlur={(e) => formik.handleBlur(e)}
            />
            <p className="register__validate">
              {formik.touched.hoTen && formik.errors.hoTen
                ? "*" + formik.errors.hoTen
                : ""}
            </p>
          </div>
          <div className="form-group">
            <input
              name="taiKhoan"
              placeholder="Username"
              className="form-control"
              onChange={(e) => formik.handleChange(e)}
              onBlur={(e) => formik.handleBlur(e)}
            />
            <p className="register__validate">
              {formik.touched.taiKhoan && formik.errors.taiKhoan
                ? "*" + formik.errors.taiKhoan
                : ""}
            </p>
          </div>
          <div className="form-group">
            <input
              placeholder="Email"
              className="form-control"
              onChange={(e) => formik.handleChange(e)}
              onBlur={(e) => formik.handleBlur(e)}
              name="email"
            />
            <p className="register__validate">
              {formik.touched.email && formik.errors.email
                ? "*" + formik.errors.email
                : ""}
            </p>
          </div>
          <div className="form-group">
            <input
              placeholder="Phone"
              className="form-control"
              onChange={(e) => formik.handleChange(e)}
              onBlur={(e) => formik.handleBlur(e)}
              name="soDt"
            />
            <p className="register__validate">
              {formik.touched.soDt && formik.errors.soDt
                ? "*" + formik.errors.soDt
                : ""}
            </p>
          </div>
          <div className="form-group">
            <input
              placeholder="Password"
              type="password"
              className="form-control"
              onChange={(e) => formik.handleChange(e)}
              onBlur={(e) => formik.handleBlur(e)}
              name="matKhau"
            />
            <p className="register__validate">
              {formik.touched.matKhau && formik.errors.matKhau
                ? "*" + formik.errors.matKhau
                : ""}
            </p>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!(formik.isValid && formik.dirty)}
          >
            <span>Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
}
