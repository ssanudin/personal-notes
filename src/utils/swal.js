import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const swalErorr = ({ message = "", theme = "light" }) => {
  return MySwal.fire({
    title: "Error",
    html: message,
    icon: "error",
    showConfirmButton: false,
    customClass: {
      popup: `swal2-theme-${theme}`,
    },
  });
};

const swalSuccess = ({ message = "", theme = "light" }) => {
  return MySwal.fire({
    title: "Success",
    html: message,
    icon: "success",
    showConfirmButton: false,
    customClass: {
      popup: `swal2-theme-${theme}`,
    },
  });
};

const swalLoading = (args = {}) => {
  const { theme = "light", target = "body", position = "center" } = args;

  return MySwal.fire({
    title: "Loading...",
    target,
    position,
    customClass: {
      popup: `swal2-theme-${theme}`,
    },
    didOpen: () => {
      MySwal.showLoading();
    },
  });
};

const swalClose = () => {
  return MySwal.close();
};

const swalConfirm = ({
  title = "Are you sure?",
  message = "",
  confirmText = "Yes",
  cancelText = "Cancel",
  theme = "light",
  color = "primary",
}) => {
  return MySwal.fire({
    title: title,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: color === "danger" ? "#cf6679" : "#3085d6",
    cancelButtonColor: "#6d6d6d",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    customClass: {
      popup: `swal2-theme-${theme}`,
    },
  });
};

const swalToast = ({
  type = "info",
  title = "",
  theme = "light",
  timer = 1000,
}) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return Toast.fire({
    icon: type,
    title: title,
    customClass: {
      popup: `swal2-theme-${theme}`,
    },
  });
};

export {
  MySwal,
  swalErorr,
  swalSuccess,
  swalLoading,
  swalClose,
  swalConfirm,
  swalToast,
};
