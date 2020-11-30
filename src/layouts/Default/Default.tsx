import { Container } from "@material-ui/core";
import React, { Fragment } from "react";
import { Nav } from "./components";

interface DefaultProps {
  children: React.ReactElement;
}

export const Default: React.FC<DefaultProps> = ({ children }) => {
  return (
    <Fragment>
      <Nav />
      <Container>{children}</Container>
    </Fragment>
  );
};
