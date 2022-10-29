import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { FiTrash2, FiArchive, FiRotateCcw } from "react-icons/fi";

import LocaleContext from "../contexts/LocaleContext";
import useBahasa from "../hooks/useBahasa";

import PageAction from "../components/PageAction";

import {
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
} from "../utils/network-data";
import { showFormattedDate } from "../utils/index";
import { swalToast, swalConfirm } from "../utils/swal";

const NotePage = () => {
  const { locale } = useContext(LocaleContext);
  const { isBahasa } = useBahasa();

  const navigate = useNavigate();
  const { id } = useParams();

  const [init, setInit] = useState(true);
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const noteData = await getNote(id);

      if (!noteData.error) {
        setNote(noteData.data);
      }

      setInit(false);
    };

    fetchData();
  }, [id]);

  const onBtnAction = async (action, id, archived) => {
    if (!id || !action) {
      swalToast({
        type: "error",
        title: isBahasa("Terjadi kesalahan", "Error occurred"),
      });
      return false;
    }

    let result = null;

    swalToast({ type: "info", title: "Loading..." });
    if (action === "unarchive") {
      result = await unarchiveNote(id);
    }
    if (action === "archive") {
      result = await archiveNote(id);
    }
    if (action === "delete") {
      const confirm = await swalConfirm({
        title: isBahasa("Anda yakin?", "Are you sure?"),
        message: isBahasa(
          "Anda akan menghapus catatan!",
          "Note will be deleted!"
        ),
        cancelText: isBahasa("Batal", "Cancel"),
        confirmText: isBahasa("Hapus", "Delete"),
        color: "danger",
      });

      if (confirm.isConfirmed) {
        result = await deleteNote(id);
      }
    }

    if (result !== null) {
      const waitToaster = await swalToast({
        type: result.error ? "error" : "success",
        title: `${result.message} ${archived ? "📝" : "📒"}`,
      });

      if (waitToaster.dismiss && !result.error) {
        const goto = archived ? "/archives" : "/";
        navigate(goto);
      }
    }
  };

  if (init) {
    return null;
  }

  if (!note) {
    return (
      <section className="detail-page-empty">
        <p className="detail-page__empty">
          {isBahasa("Catatan tidak ditemukan", "Note is Not Found")}
        </p>
      </section>
    );
  }

  const buttons = [
    {
      title: note.archived
        ? isBahasa("Aktifkan", "Activate")
        : isBahasa("Arsipkan", "Archive"),
      action: () => {
        onBtnAction(
          note.archived ? "unarchive" : "archive",
          note.id,
          note.archived
        );
      },
      icon: note.archived ? <FiRotateCcw /> : <FiArchive />,
    },
    {
      title: isBahasa("Hapus", "Delete"),
      action: () => {
        onBtnAction("delete", note.id, note.archived);
      },
      icon: <FiTrash2 />,
    },
  ];

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">
        {showFormattedDate({ date: note.createdAt, locale })}
      </p>
      {note.archived && (
        <span className="detail-page__noteIsArchived">
          {isBahasa("Terarsip", "Archived")}
        </span>
      )}
      <div className="detail-page__body">{parse(note.body)}</div>
      <PageAction sectionName="detail-page" buttons={buttons} />
    </section>
  );
};

export default NotePage;
