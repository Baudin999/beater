import * as React from "react";

const noop = () => {};

export const AddButton = ({ onClick = noop }) => {
  return (
    <div className="add-button" onClick={onClick}>
      <i className="fas fa-plus-circle" />
    </div>
  );
};
