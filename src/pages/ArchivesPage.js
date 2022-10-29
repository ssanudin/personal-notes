import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import NotesList from "../components/NotesList";
import SearchBar from "../components/SearchBar";

import useBahasa from "../hooks/useBahasa";

import { getArchivedNotes } from "../utils/network-data";
import { filterNotes } from "../utils/index";

const ArchivesPage = () => {
  const { isBahasa } = useBahasa();

  const [notes, setNotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => searchParams.get("title") || "");
  const [init, setInit] = useState(true);

  // const
  useEffect(() => {
    const fetchNotes = async () => {
      const notesData = await getArchivedNotes();

      if (!notesData.error) {
        setNotes(notesData.data);
      }

      setInit(false);
    };

    fetchNotes();
  }, []);

  const onSearchHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ title: keyword });
  };

  return (
    <section className="archives-page">
      <h2>{isBahasa("Catatan Terarsip", "Archived Notes")} 📒</h2>
      <SearchBar search={onSearchHandler} keyword={keyword} />
      <NotesList notes={filterNotes({ notes, keyword })} init={init} />
    </section>
  );
};

export default ArchivesPage;
