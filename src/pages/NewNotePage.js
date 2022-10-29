import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

import useInput from "../hooks/useInput";
import useBahasa from "../hooks/useBahasa";

import PageAction from "../components/PageAction";

import { addNote } from "../utils/network-data";
import { swalConfirm, swalToast } from "../utils/swal";

const NewNotePage = () => {
  const { isBahasa } = useBahasa();

  const navigate = useNavigate();
  const [title, setTitle] = useInput("");
  const [body, setBody] = useState("");

  const onAddNote = async () => {
    if (!title && !body) {
      swalToast({
        type: "error",
        timer: 2000,
        title: isBahasa(
          "Tidak bisa menambah catatan yang kosong",
          "Can't add an empty note"
        ),
      });

      return false;
    }

    let confirm = null;
    if (!title || !body) {
      confirm = await swalConfirm({
        title: isBahasa("Anda yakin?", "Are you sure?"),
        message: isBahasa(
          "Judul atau Isi catatn kosong!",
          "Title or Body note is empty"
        ),
        cancelText: isBahasa("Batal", "Cancel"),
        confirmText: isBahasa("Simpan", "Save"),
      });
    }

    if (confirm === null || confirm.isConfirmed) {
      const result = await addNote({ title, body });

      if (result.error) {
        swalToast({ type: "error", title: result.message, timer: 2000 });
      } else {
        const waitToast = await swalToast({
          type: "success",
          title: result.message,
        });
        if (waitToast.dismiss) {
          navigate(`/notes/${result.data.id}`);
        }
      }
    }
  };

  return (
    <section className="add-new-page">
      <section className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          placeholder={isBahasa("Catatan rahasia", "A secret note")}
          value={title}
          onChange={setTitle}
        />
        <div
          className="add-new-page__input__body"
          contentEditable="true"
          data-placeholder={isBahasa(
            "Sebenarnya saya adalah ....",
            "I'm a ...."
          )}
          onInput={(e) => setBody(e.target.innerHTML)}
        ></div>
      </section>
      <PageAction
        sectionName="add-new-page"
        buttons={[
          {
            title: isBahasa("Simpan", "Save"),
            action: onAddNote,
            icon: <FiCheck />,
          },
        ]}
      />
    </section>
  );
};

export default NewNotePage;
