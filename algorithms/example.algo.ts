import { Algorithm } from "./types";

const a_uppercase: Algorithm = {
  label: "L337",
  transform: (text) => {
    return text.toUpperCase()
      .replaceAll("A", "4")
      .replaceAll("I", "1")
      .replaceAll("E", "3")
      .replaceAll("T", "7")
  },
};

export default a_uppercase;