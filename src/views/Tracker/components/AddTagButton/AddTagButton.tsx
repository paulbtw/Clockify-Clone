import {
  Button,
  Dialog,
  Divider,
  List,
  ListItem,
  ListItemText,
  Popover,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import LensIcon from "@material-ui/icons/Lens";
import React, { useState } from "react";

interface TagItemProps {
  onSelectTag: (tagId: string) => void;
  name: string;
  color: string;
  id: string;
}

export const TagItem: React.FC<TagItemProps> = ({
  onSelectTag,
  name,
  color,
  id,
}) => {
  return (
    <ListItem className="list-item">
      <ListItemText primary="Test" />
    </ListItem>
  );
};

interface TagItemListProps {
  onSelectTag: (tagId: string) => void;
  tags: any[];
  dialogMaxHeight: number;
}

export const TagItemList: React.FC<TagItemListProps> = ({
  onSelectTag,
  tags = [],
  dialogMaxHeight = 300,
}) => {
  const [filterTag, setFilterTag] = useState("");

  const handleFilterTagChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterTag(event.currentTarget.value);
  };

  return (
    <div>
      <List className="list first">
        <SearchIcon
          className="material-icons"
          style={{ color: "lightgrey", fontSize: 18, top: 5, paddingRight: 8 }}
        />
        <TextField
          id="find-tag"
          className="input-filter"
          // ref={(node) => (findTag = node)}
          value={filterTag}
          onChange={handleFilterTagChange}
        />
      </List>
      <Divider />
      <List
        className="list"
        style={{
          maxHeight: dialogMaxHeight,
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        {tags.map((tag) => {
          if (filterTag === "" || tag.name.indexOf(filterTag) !== -1) {
            return (
              <TagItem
                key={tag.key}
                id={tag.key}
                onSelectTag={onSelectTag}
                name={tag.name}
                color={tag.color}
              />
            );
          } else {
            return undefined;
          }
        })}
      </List>
    </div>
  );
};

interface TagButtonProps {
  onClick: (event: React.MouseEvent) => void;
  tagName: string | null;
  tagColor: string;
}

export const TagButton: React.FC<TagButtonProps> = ({
  onClick,
  tagName,
  tagColor,
}) => {
  return tagName ? (
    <Button
      onClick={onClick}
      startIcon={<LensIcon style={{ color: tagColor, fontSize: 20 }} />}
    >
      {tagName}
    </Button>
  ) : (
    <Button
      onClick={onClick}
      startIcon={<AddIcon style={{ color: "green", fontSize: 30 }} />}
    >
      Tag
    </Button>
  );
};

interface AddTagButtonProps {
  onCreateTag: (tag: string, color: string) => void;
  onFetchList: () => void;
  onSelectTag: (tagId: string) => void;
  tags: any[];
  tagId: string;
  dialogMaxHeight: number;
}

const AddTagButton: React.FC<AddTagButtonProps> = ({
  onCreateTag,
  onFetchList,
  onSelectTag,
  tags,
  tagId,
  dialogMaxHeight,
}) => {
  const getTagButtonValue = (curTagId: string, curTags: any[]) => {
    let result = null;
    if (curTags && curTags.length && curTags.length > 0) {
      tags.forEach((tag) => {
        if (tag.key === tagId) {
          result = tag;
          return false;
        }
      });
    }
    return result;
  };

  const tagValue = getTagButtonValue(tagId, tags);

  const [openTagForm, setOpenTagForm] = useState(false);
  const [createTagDialogOpen, setCreateTagDialogOpen] = useState(false);
  // @ts-ignore
  const [tagName, setTagName] = useState(tagValue ? tagValue.name : null);
  // @ts-ignore
  const [tagColor, setTagColor] = useState(tagValue ? tagValue.color : null);
  // @ts-ignore
  const [tagsId, setTagsId] = useState(tagValue ? tagValue.tagId : null);
  const [anchorEl, setAnchorEl] = useState(null as any);

  const handleOpenTagForm = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenTagForm(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseTagForm = () => {
    setOpenTagForm(false);
  };

  const handleOpenCreateTagDialog = () => {
    setCreateTagDialogOpen(true);
    setOpenTagForm(false);
  };

  const handleCloseCreateTagDialog = () => {
    setCreateTagDialogOpen(false);
  };

  const handleCreateTag = (tag: string, color: string) => {
    onCreateTag(tag, color);
    handleCloseCreateTagDialog();
  };

  const handleSelectTag = (
    tagId: string,
    tagName?: string,
    tagColor?: string
  ) => {
    onSelectTag(tagId);
    setTagColor(tagName);
    setTagName(tagColor);
    handleCloseTagForm();
  };

  return (
    <div className="container-add-tag">
      <TagButton
        onClick={handleOpenTagForm}
        tagName={tagName}
        tagColor={tagColor}
      />
      <Popover
        open={openTagForm}
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        style={{ paddingLeft: 10, paddingRight: 10 }}
        className="container-add-tag-popup"
        onClose={handleCloseTagForm}
      >
        {tags && tags.length > 0 && (
          <TagItemList
            onSelectTag={handleSelectTag}
            tags={tags}
            dialogMaxHeight={dialogMaxHeight}
          />
        )}
        <List className="list">
          <div style={{ textAlign: "center" }}>
            <Button
              startIcon={
                <AddIcon
                  style={{ color: "lightgreen" }}
                  onClick={handleOpenCreateTagDialog}
                />
              }
            >
              Add Tag
            </Button>
          </div>
        </List>
      </Popover>
      <Dialog
        title="Create new tag"
        open={createTagDialogOpen}
        onClose={handleCloseCreateTagDialog}
      >
        {/* <CreateTagForm onSave={handleCreateTag} /> */}
      </Dialog>
    </div>
  );
};

export default AddTagButton;
