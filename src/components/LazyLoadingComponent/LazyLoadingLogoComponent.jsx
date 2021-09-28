import React from "react";
import lzloading from "../../assets/img/lazy-loading.png";
import "./LazyLoadingLogoStyle.scss";
import { useSelector } from "react-redux";
import { Fragment } from "react";

export default function LazyLoadingLogoComponent(props) {
  const { isLoading } = useSelector((state) => state.lazyLoadingReducer);
  console.log("ABC", isLoading);
  return (
    <Fragment>
      {isLoading ? (
        <div className="lazyLogo">
          <div className="lazyLogo__detail row">
            <div className="col-4">
              <img src={lzloading} alt={lzloading} />
            </div>
            <div className="col-4">
              <img src={lzloading} alt={lzloading} />
            </div>
            <div className="col-4">
              <img src={lzloading} alt={lzloading} />
            </div>
            <div className="col-4">
              <img src={lzloading} alt={lzloading} />
            </div>
            <div className="col-4">
              <img src={lzloading} alt={lzloading} />
            </div>
            <div className="col-4">
              <img src={lzloading} alt={lzloading} />
            </div>

            <div className="col-4">
              <img src={lzloading} alt={lzloading} />
            </div>
            <div className="col-4">
              <img src={lzloading} alt={lzloading} />
            </div>
            <div className="col-4">
              <img src={lzloading} alt={lzloading} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
