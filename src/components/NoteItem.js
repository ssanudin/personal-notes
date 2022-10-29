import React, { useContext } from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

import LocaleContext from "../contexts/LocaleContext";

import { showFormattedDate } from "../utils/index";

const NoteItem = ({ id, title, body, createdAt }) => {
  const { locale } = useContext(LocaleContext);

  return (
    <article className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">
        {showFormattedDate({ date: createdAt, locale })}
      </p>
      <p className="note-item__body">{parse(body)}</p>
    </article>
  );
};

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;
