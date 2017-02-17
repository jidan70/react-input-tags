import React from 'react';

import { TagDefault } from '../implementation/TagDefault.jsx';

export const Tag = ({
  TagImplementation,
  value,
  handleEdit,
  handleRemove,
}) =>
  <TagImplementation
    value={value}
    handleEdit={handleEdit}
    handleRemove={handleRemove}
  />;

Tag.propTypes = {
  TagImplementation: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
  handleEdit: React.PropTypes.func.isRequired,
  handleRemove: React.PropTypes.func.isRequired,
};

Tag.defaultProps = {
  TagImplementation: TagDefault,
};
