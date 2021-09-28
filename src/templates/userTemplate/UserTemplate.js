import { Redirect, Route } from "react-router-dom";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import { USER_LOGIN } from "../../util/settings/config";

import "./UserTemplateStyle.scss";

const UserTemplate = (props) => {
  const { Component, ...restProps } = props;
  //   if (localStorage.getItem(USER_LOGIN)) {
  //     return <Redirect to="/home" />;
  //   }
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <div className="template__user">
            <CustomCard
              effectColor="#000"
              blur={10}
              className="template__userContent"
            >
              <Component {...propsRoute} />
            </CustomCard>
          </div>
        );
      }}
    />
  );
};

export default UserTemplate;
