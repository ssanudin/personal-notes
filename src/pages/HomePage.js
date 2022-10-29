import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import NotesList from "../components/NotesList";
import SearchBar from "../components/SearchBar";
import PageAction from "../components/PageAction";

import useBahasa from "../hooks/useBahasa";

import { filterNotes } from "../utils/index";
import { getActiveNotes } from "../utils/network-data";

const HomePage = () => {
  const { isBahasa } = useBahasa();

  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => searchParams.get("title") || "");
  const [init, setInit] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      const notesData = await getActiveNotes();

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
    <section className="homepage">
      <h2>{isBahasa("Catatan Aktif", "Active Notes")} 📝</h2>
      <SearchBar search={onSearchHandler} keyword={keyword} />
      <NotesList notes={filterNotes({ notes, keyword })} init={init} />
      <PageAction
        sectionName="homepage"
        buttons={[
          {
            title: isBahasa("Tambah Note", "Add Note"),
            action: () => {
              navigate("/notes/new");
            },
            icon: <FiPlus />,
          },
        ]}
      />
    </section>
  );
};

export default HomePage;
