import { Typography } from "@material-ui/core";
import React from "react";
import { Page } from "../../components";

interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = ({}) => {
  return (
    <Page title="Projects">
      <Typography>Projects</Typography>
    </Page>
  );
};

export default Projects;
