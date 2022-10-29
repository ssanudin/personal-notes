import { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";

const useBahasa = () => {
  const { locale } = useContext(LocaleContext);
  const bahasa = "id";

  const isBahasa = (textId, textEn) => (locale === bahasa ? textId : textEn);

  return { isBahasa };
};

export default useBahasa;
