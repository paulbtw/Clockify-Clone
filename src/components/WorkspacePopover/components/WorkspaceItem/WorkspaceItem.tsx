import { Button } from "@material-ui/core";
import React from "react";
import { IWorkspace } from "../../../../constants/WorkspaceTypes";
import CheckIcon from "@material-ui/icons/Check";

interface WorkspaceItemProps {
  workspace: IWorkspace;
  onClick: (workspaceId: string) => void;
  active: boolean;
}

const WorkspaceItem: React.FC<WorkspaceItemProps> = ({
  workspace,
  onClick,
  active,
}) => {
  return (
    <Button
      fullWidth
      id={workspace.id}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
        onClick(event.currentTarget.id)
      }
      endIcon={active && <CheckIcon color="primary" />}
    >
      {workspace.name}
    </Button>
  );
};

export default WorkspaceItem;
