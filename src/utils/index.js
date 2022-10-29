const APP_ID = "PN"; //Personal Notes

const showFormattedDate = ({ date, locale }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(
    locale === "id" ? "id-ID" : "en-US",
    options
  );
};

const isStorageExist = () => {
  return typeof Storage === "undefined" ? false : true;
};

const setLocal = (key, value) => {
  if (isStorageExist()) {
    localStorage.setItem(APP_ID + key.toUpperCase(), JSON.stringify(value));
    return true;
  }
  return false;
};

const getLocal = (key) => {
  const dataLocal = localStorage.getItem(APP_ID + key.toUpperCase());
  return JSON.parse(dataLocal);
};

const isEmail = (email) => {
  const regexp =
    /^[a-z][a-z0-9]+[_|.]?[a-z0-9]+@[a-z0-9]+-?[a-z0-9]+\.[a-z]{2,3}(\.[a-z]{2,3})?$/;
  return regexp.test(String(email).toLowerCase());
};

const filterNotes = ({ keyword = "", notes = [] }) => {
  if (notes.length <= 0 || keyword === "") {
    return notes;
  }

  return notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );
};

const errorMessages = {
  id: {
    name: {
      required: '"Nama" tidak boleh kosong!',
    },
    email: {
      required: '"Email" tidak boleh kosong!',
      notvalid: '"Email" yang Anda masukan salah',
    },
    password: {
      required: '"Password" tidak boleh kosong!',
      length: '"Password" setidaknya harus memiliki 8 karakter!',
    },
    confirmPassword: {
      required: '"Konfirmasi Password" tidak boleh kosong!',
      notmatch: '"Konfirmasi Password" tidak sesuai!',
    },
  },
  en: {
    name: {
      required: '"Name" is not allowed to be empty!',
    },
    email: {
      required: '"Email" is not allowed to be empty!',
      notvalid: "Looks like it's not an email",
    },
    password: {
      required: '"Password" is not allowed to be empty!',
      length: '"Password" must be at least 8 characters!',
    },
    confirmPassword: {
      required: '"Confirm Password" is not allowed to be empty!',
      notmatch: '"Confirm Password" does not match!',
    },
  },
};

export {
  showFormattedDate,
  setLocal,
  getLocal,
  isEmail,
  filterNotes,
  errorMessages,
};
