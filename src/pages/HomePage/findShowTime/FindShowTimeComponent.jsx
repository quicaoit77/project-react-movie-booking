import React, { useState } from "react";
import "./FindShowTimeStyle.scss";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { NavLink } from "react-router-dom";

const { Option } = Select;

export default function FindShowTimeComponent(props) {
  const [state, setState] = useState({
    showTimes: [],
    idShowTime: "",
  });
  const { movieList } = props;
  const { showTimesFilm } = useSelector((state) => state.cinemaReducer);

  const dispatch = useDispatch();
  const renderMovieListOption = () =>
    movieList.map((item, index) => (
      <Option value={item.maPhim} key={index}>
        {item.tenPhim}
      </Option>
    ));

  const renderCinemaOption = () =>
    showTimesFilm.heThongRapChieu?.map((item, index) =>
      item.cumRapChieu.map((itemChild, index2) => {
        const i = Math.random() * item.cumRapChieu.length;
        return (
          <Option value={itemChild.maCumRap} key={i}>
            {itemChild.tenCumRap}
          </Option>
        );
      })
    );

  const renderShowTimesOption = () =>
    state.showTimes.map((item, index) => (
      <Option value={item.maLichChieu}>
        {moment(item.ngayChieuGioChieu).format("dddd - DD/MM/YYYY - hh:mm A")}
      </Option>
    ));
  const handleChangeMovie = (value) => {
    dispatch({
      type: "getShowTimeFilmApiAction",
      id: value,
    });
  };
  const handleChangeCinema = (value) => {
    const systemcinemaChoose = showTimesFilm.heThongRapChieu?.find((item) =>
      item.cumRapChieu?.find((itemChild) => itemChild.maCumRap === value)
    );
    const cinema = systemcinemaChoose.cumRapChieu.find(
      (item) => item.maCumRap === value
    );
    setState({
      ...state,
      showTimes: cinema.lichChieuPhim,
    });
  };
  const handleChangeShowtimes = (value) => {
    setState({
      ...state,
      idShowTime: value,
    });
  };
  return (
    <div className="findShowTime">
      <div className="findShowTime__content">
        <div className="findShowTime__detail">
          <form>
            <div className="row">
              <div className="col-12 col-lg-4">
                <div className="findShowTime__item">
                  <div className="form-group">
                    <label>MOVIES</label>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())
                      }
                      onChange={handleChangeMovie}
                    >
                      {renderMovieListOption()}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 ">
                <div className="findShowTime__item">
                  <div className="form-group">
                    <label>CINEMAS</label>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())
                      }
                      onChange={handleChangeCinema}
                    >
                      {renderCinemaOption()}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="findShowTime__item">
                  <div className="form-group">
                    <label>DATES</label>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())
                      }
                      onChange={handleChangeShowtimes}
                    >
                      {renderShowTimesOption()}
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <div className="findShowTime__btn">
              <NavLink
                to={
                  state.idShowTime !== ""
                    ? `/check-out/${state.idShowTime}`
                    : ""
                }
              >
                <span>AVAIABLE NOW</span>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
