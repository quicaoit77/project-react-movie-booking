import React, { useEffect, useState, Fragment } from "react";
import "./ShowFilmsAdminStyle.scss";
import { Table, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import imgErro from "../../../assets/img/img-err.jpg";
import ModalAddFilm from "../ModalAddFilm/ModalAddFilmComponent";
import ModalEditFilmComponent from "../ModalEditFilm/ModalEditFilmComponent";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import DeleteFilmComponent from "../DeleteFilm/DeleteFilmComponent";
const { Search } = Input;
export default function ShowFilmsAdminComponent(props) {
  const { movieList } = useSelector((state) => state.movieReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "getMovieListApiAction",
    });
  }, []);

  const renderMovieList = () =>
    movieList.map((item, index) => ({
      key: index,
      tenPhim: item.tenPhim,
      maPhim: item.maPhim,
      hinhAnh: item.hinhAnh,
      ngayKhoiChieu: item.ngayKhoiChieu,
      moTa: item.moTa,
      trailer: item.trailer,
      danhGia: item.danhGia,
    }));
  const columns = [
    {
      title: "ID",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      defaultSortOrder: "descend",
      sortDirections: ["descend"],
      //   sortDirections: "ascend",
    },
    {
      title: "Name",
      dataIndex: "tenPhim",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => {
        const tenPhimA = a.tenPhim.toLowerCase().trim();
        const tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "Release Date",
      dataIndex: "ngayKhoiChieu",
      render: (text, film) => {
        return (
          <Fragment>
            {moment(film.ngayKhoiChieu).format("dddd - DD/MM/YY")}
          </Fragment>
        );
      },
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      render: (text, film) => {
        return (
          <img
            src={film.hinhAnh}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = { imgErro };
            }}
          />
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      render: (text, film) => {
        return (
          <div>
            <ModalEditFilmComponent idFilm={film.maPhim} film={film} />
            <ModalComponent
              textShowModal={
                <span>
                  <i className="fa fa-trash-alt"></i>
                </span>
              }
              Component={DeleteFilmComponent}
              textOk="Delete Film"
              functionOk={() => {
                const deleteFilm = async () => {
                  await dispatch({
                    type: "deleteMovieApiAction",
                    id: film.maPhim,
                  });
                  await dispatch({
                    type: "getMovieListApiAction",
                  });
                };
                deleteFilm();
              }}
              film={film}
              titleModal="Delete Film"
            />
          </div>
        );
      },
    },
  ];
  const data = renderMovieList();

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const onSearch = (value) => {
    if (value.trim() !== "") {
      dispatch({
        type: "getMovieListApiAction",
        film: value,
      });
    }
  };
  return (
    <section className="showFilmsAm">
      <div className="showFilmsAm__Title">
        <h3>Films Management</h3>
      </div>
      <div className="showFilmsAm__Search">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          onChange={(e) => {
            if (e.target.value.trim() === "") {
              dispatch({
                type: "getMovieListApiAction",
              });
            }
          }}
        />
      </div>
      <div className="showFilmsAm__Add">
        <ModalAddFilm />
      </div>
      <div className="showFilmsAm__Content">
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </section>
  );
}
