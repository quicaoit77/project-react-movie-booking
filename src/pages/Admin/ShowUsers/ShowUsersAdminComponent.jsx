import { Table, Input } from "antd";
import React, { useEffect } from "react";
import "./ShowUsersAdminStyle.scss";
import { useDispatch, useSelector } from "react-redux";
import ModalAddUserComponent from "../ModalAddUsers/ModalAddUserComponent";
import ModalEditUserComponent from "../ModalEditUser/ModalEditUserComponent";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import DeleteUserComponent from "../DeleteUser/DeleteUserComponent";
const { Search } = Input;
export default function ShowUsersAdminComponent() {
  const { listUser } = useSelector((state) => state.userReducer);
  console.log(listUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "getListUserApiAction",
    });
  }, []);
  const columns = [
    {
      title: "",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
      defaultSortOrder: "ascend",
      sortDirections: ["descend"],
    },
    {
      title: "UserName",
      dataIndex: "userName",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => {
        const userNameA = a.userName.toLowerCase().trim();
        const userNameB = b.userName.toLowerCase().trim();
        if (userNameA > userNameB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "FullName",
      dataIndex: "fullName",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => {
        const fullNameA = a.fullName.toLowerCase().trim();
        const fullNameB = b.fullName.toLowerCase().trim();
        if (fullNameA > fullNameB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "TypeUser",
      dataIndex: "typeUser",
      filters: [
        {
          text: "QuanTri",
          value: "QuanTri",
        },
        {
          text: "KhachHang",
          value: "KhachHang",
        },
      ],
      onFilter: (text, user) => user.typeUser.indexOf(text) === 0,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "",
      dataIndex: "",
      render: (text, user) => {
        return (
          <div>
            <ModalEditUserComponent user={user} />
            <ModalComponent
              textShowModal={
                <span>
                  <i className="fa fa-trash-alt"></i>
                </span>
              }
              Component={DeleteUserComponent}
              textOk="Delete User"
              functionOk={() => {
                dispatch({
                  type: "deleteInfoUserApiAction",
                  userName: user.userName,
                });
              }}
              titleModal="Delete User"
              user={user}
            />
          </div>
        );
      },
    },
  ];
  const renderListUser = () =>
    listUser.map((item, index) => ({
      key: index + 1,
      userName: item.taiKhoan,
      fullName: item.hoTen,
      typeUser: item.maLoaiNguoiDung,
      email: item.email,
      phoneNumber: item.soDt,
      password: item.matKhau,
    }));
  const data = renderListUser();
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  const onSearch = (value) => {
    if (value.trim() !== "") {
      dispatch({
        type: "getListUserApiAction",
        keyWord: value,
      });
    }
  };

  return (
    <section className="showUsersAm">
      <div className="showUsersAm__Title">
        <h3>Users Managerment</h3>
      </div>
      <div className="showUsersAm__Search">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          onChange={(e) => {
            if (e.target.value.trim() === "") {
              dispatch({
                type: "getListUserApiAction",
              });
            }
          }}
        />
      </div>
      <div className="showUsersAm__Add">
        <ModalAddUserComponent />
      </div>
      <div className="showUsersAm__Content">
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </section>
  );
}
