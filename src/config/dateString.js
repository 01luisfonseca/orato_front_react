import { format } from "date-fns";
import { es } from "date-fns/locale";

export const dateString = (dateAsString) => {
  if (!dateAsString) return "";
  const date = new Date(dateAsString);
  return format(date, "dd 'de' MMMM 'de' yyyy, hh:mm a", {
    locale: es,
  });
};

export const dateTimeInputString = (dateAsString) => {
  if (!dateAsString) return "";
  const date = new Date(dateAsString);
  return format(date, "yyyy-MM-dd'T'HH:mm");
};
