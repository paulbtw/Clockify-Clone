import { Button } from "@material-ui/core";
import { get } from "lodash";
import React from "react";
import { connect } from "react-redux";

interface AddTagButtonProps {
  workspaceId: string;
}

const AddTagButton: React.FC<AddTagButtonProps> = ({ workspaceId }) => {
  return <Button>New Tag</Button>;
};

const mapStateToProps = (state: any) => {
  return {
    workspaceId: get(state, "auth.user.activeWorkspace", null),
  };
};

export default connect(mapStateToProps)(AddTagButton);
