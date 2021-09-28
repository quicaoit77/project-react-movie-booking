import React, { useState } from "react";
import { Modal, Button, Select } from "antd";
import "./ModalAddUserStyle.scss";
import { useFormik } from "formik";
import { GROUPID } from "../../../util/settings/config";
import { useDispatch } from "react-redux";
import _ from "lodash";
const { Option } = Select;
export default function ModalAddUserComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      hoTen: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
      matKhau: "",
      maNhom: GROUPID,
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
  });
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log(formik.values);
    dispatch({
      type: "postNewUserAdminApiAction",
      newUser: formik.values,
    });
    formik.resetForm();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    formik.resetForm();
    setIsModalVisible(false);
  };
  function handleChange(value) {
    formik.setFieldValue("maLoaiNguoiDung", value);
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Users
      </Button>
      <Modal
        title="Create New User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add User"
        okButtonProps={{ disabled: !(formik.dirty && formik.isValid) }}
      >
        <div className="addUser">
          <form>
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>UserName</label>
                  <span className="addUser__validate">
                    {formik.touched.taiKhoan && formik.errors.taiKhoan
                      ? "*" + formik.errors.taiKhoan
                      : ""}
                  </span>
                  <input
                    name="taiKhoan"
                    className="form-control"
                    onChange={(e) => formik.handleChange(e)}
                    value={formik.values.taiKhoan}
                    onBlur={(e) => formik.handleBlur(e)}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>FullName</label>
                  <span className="addUser__validate">
                    {formik.touched.hoTen && formik.errors.hoTen
                      ? "*" + formik.errors.hoTen
                      : ""}
                  </span>
                  <input
                    name="hoTen"
                    className="form-control"
                    onChange={(e) => formik.handleChange(e)}
                    value={formik.values.hoTen}
                    onBlur={(e) => formik.handleBlur(e)}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Email</label>
                  <span className="addUser__validate">
                    {formik.touched.email && formik.errors.email
                      ? "*" + formik.errors.email
                      : ""}
                  </span>
                  <input
                    name="email"
                    className="form-control"
                    onChange={(e) => formik.handleChange(e)}
                    value={formik.values.email}
                    onBlur={(e) => formik.handleBlur(e)}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>PhoneNumber</label>
                  <span className="addUser__validate">
                    {formik.touched.soDt && formik.errors.soDt
                      ? "*" + formik.errors.soDt
                      : ""}
                  </span>
                  <input
                    name="soDt"
                    className="form-control"
                    onChange={(e) => formik.handleChange(e)}
                    value={formik.values.soDt}
                    onBlur={(e) => formik.handleBlur(e)}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>TypeUser</label>
                  <Select
                    defaultValue="KhachHang"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    value={
                      formik.values.maLoaiNguoiDung !== ""
                        ? formik.values.maLoaiNguoiDung
                        : "KhachHang"
                    }
                  >
                    <Option value="KhachHang">Khách Hàng</Option>
                    <Option value="QuanTri">Quản Trị</Option>
                  </Select>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Password</label>
                  <span className="addUser__validate">
                    {formik.touched.matKhau && formik.errors.matKhau
                      ? "*" + formik.errors.matKhau
                      : ""}
                  </span>
                  <input
                    name="matKhau"
                    className="form-control"
                    onChange={(e) => formik.handleChange(e)}
                    value={formik.values.matKhau}
                    onBlur={(e) => formik.handleBlur(e)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
