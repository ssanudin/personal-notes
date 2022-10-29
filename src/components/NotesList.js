import React from "react";
import PropTypes from "prop-types";

import NoteItem from "./NoteItem";

import useBahasa from "../hooks/useBahasa";

const NotesList = ({ notes, init }) => {
  const { isBahasa } = useBahasa();

  return (
    <section className={`notes-list${notes.length > 0 ? "" : "-empty"}`}>
      {notes.length <= 0 ? (
        <p className="notes-list__empty">
          {init
            ? isBahasa(
                "Menyiapkan catatan rahasia Anda...",
                "Preparing your secret notes..."
              )
            : isBahasa("Tidak ada catatan", "Empty notes")}
        </p>
      ) : (
        notes.map((note) => <NoteItem key={note.id} {...note} />)
      )}
    </section>
  );
};

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  init: PropTypes.bool,
};

export default NotesList;
