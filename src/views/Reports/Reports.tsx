import { Typography } from "@material-ui/core";
import React from "react";
import { Page } from "../../components";

interface ReportsProps {}

const Reports: React.FC<ReportsProps> = ({}) => {
  return (
    <Page title="Reports">
      <Typography>Reports</Typography>
    </Page>
  );
};

export default Reports;
