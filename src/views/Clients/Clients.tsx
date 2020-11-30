import { Typography } from "@material-ui/core";
import React from "react";
import { Page } from "../../components";

interface ClientsProps {}

const Clients: React.FC<ClientsProps> = ({}) => {
  return (
    <Page title="Clients">
      <Typography>Clients</Typography>
    </Page>
  );
};

export default Clients;
