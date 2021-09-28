import React, { useState } from "react";
import { Tabs, Menu } from "antd";
import "./ShowTime2Style.scss";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { slice } from "lodash";

const { SubMenu } = Menu;
const { TabPane } = Tabs;

export default function ShowTime2Component(props) {
  const { cinemaList } = props;
  //   console.log(cinemaList);

  const renderShowTimes = (arrayShowTimes) => {
    if (arrayShowTimes) {
      return arrayShowTimes.slice(0, 5)?.map((film, index) => (
        <div className="row showTime__film" key={index}>
          <div className="col-12 col-md-2 col-xl-1 sTfilm__img">
            <img src={film.hinhAnh} alt={film.hinhAnh} />
          </div>
          <div className="col-12 col-md-10 col-xl-11 sTfim__detail">
            <h6>{film.tenPhim}</h6>
            <p>
              <i className="fa fa-clock" />
              <span>VIEWING TIMES</span>
            </p>
            <div>
              {film.lstLichChieuTheoPhim?.slice(0, 5).map((time, index) => (
                <NavLink to={`/check-out/${time.maLichChieu}`} key={index}>
                  <span>
                    {moment(time.ngayChieuGioChieu).format("hh:mm A")}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="row">
          <div className="col-1"></div>
          <div className="col-11">
            <h6 className="text-center">
              Sorry there is no showtime on this day.
            </h6>
          </div>
        </div>
      );
    }
  };
  const renderShowTimesMobi = (arrayShowTimes) => {
    if (arrayShowTimes) {
      return arrayShowTimes.slice(0, 5)?.map((film, index) => (
        <div className="row showTime__film" key={index}>
          <div className="col-12 col-md-2 col-xl-1 sTfilm__img">
            <img src={film.hinhAnh} alt={film.hinhAnh} />
            <div className="sTfilm__nameFilm">
              <h6>{film.tenPhim}</h6>
            </div>
          </div>
          <div className="col-12 col-md-10 col-xl-11 sTfim__detail">
            <p>
              <i className="fa fa-clock" />
              <span>VIEWING TIMES</span>
            </p>
            <div>
              {film.lstLichChieuTheoPhim?.slice(0, 5).map((time, index) => (
                <NavLink to={`/check-out/${time.maLichChieu}`} key={index}>
                  <span>
                    {moment(time.ngayChieuGioChieu).format("hh:mm A")}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="row">
          <div className="col-1"></div>
          <div className="col-11">
            <h6 className="text-center">
              Sorry there is no showtime on this day.
            </h6>
          </div>
        </div>
      );
    }
  };
  const renderCinemaName = (cinemaName) => {
    const index = cinemaName.indexOf("-");
    let newCinemaName = "";
    let systemCinema = "";
    if (index !== -1) {
      newCinemaName = cinemaName?.slice(index);
      systemCinema = cinemaName?.slice(0, index);
    }
    return (
      <>
        <p>{systemCinema}</p>
        <p>{newCinemaName}</p>
      </>
    );
  };
  const renderCinemaList = () =>
    cinemaList?.map((item, index) => (
      <TabPane tab={<img src={item.logo} />} key={index}>
        <Tabs
          //   data-aos="fade-right"
          //   data-aos-once="true"
          defaultActiveKey="0"
          tabPosition="left"
          onChange={callback}
        >
          {item.lstCumRap.slice(0, 5)?.map((itemChild, index) => (
            <TabPane
              tab={
                <div>
                  <div>
                    <img src={item.logo} />
                  </div>

                  {renderCinemaName(itemChild.tenCumRap)}
                </div>
              }
              key={index}
            >
              {renderShowTimes(itemChild.danhSachPhim)}
            </TabPane>
          ))}
        </Tabs>
      </TabPane>
    ));

  const renderCinemaListMobi = () =>
    cinemaList?.map((item, index) => (
      <TabPane tab={<img src={item.logo} />} key={index}>
        <Menu mode="inline" style={{ width: 256 }}>
          {item.lstCumRap.slice(0, 5)?.map((itemChild, index) => (
            <SubMenu key={`sub${index}`} title={itemChild.tenCumRap}>
              {renderShowTimesMobi(itemChild.danhSachPhim)}
            </SubMenu>
          ))}
          {/* <SubMenu key="sub1" title="Navigation One">
           
          </SubMenu>
          <SubMenu key="sub2" title="Navigation Two">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title="Navigation Three">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu> */}
        </Menu>
      </TabPane>
    ));
  function callback(key) {
    console.log(key);
  }
  return (
    <section className="showTime" id="showTimeId">
      <div
        className="showTime__content"
        // data-aos="fade-down"
        // data-aos-once="true"
      >
        <div className="showTime__title">
          <h2>ALL CINEMAS</h2>
        </div>
        <Tabs defaultActiveKey="0" onChange={callback}>
          {renderCinemaList()}
        </Tabs>
      </div>
      <div
        className="showTime__contentMobi"
        // data-aos="fade-down"
        // data-aos-once="true"
      >
        <div className="showTime__title">
          <h2>ALL CINEMAS</h2>
        </div>
        <Tabs defaultActiveKey="0" onChange={callback} tabPosition="left">
          {renderCinemaListMobi()}
        </Tabs>
      </div>
    </section>
  );
}
