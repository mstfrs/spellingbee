import Link from "next/link";
import { languages } from "../../../i18n/settings";
import { useState } from "react";

export const FooterBase = ({ lng }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(lng);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <footer className="flex justify-center md:justify-end m-3">
      {languages.map((l, index) => {
        const isSelected = selectedLanguage === l;

        return (
          <span
            className={`mx-1 w-10 h-6 flex justify-center items-center rounded-lg uppercase ${
              isSelected
                ? "bg-yellow-400 "
                : "bg-gray-100 border border-gray-400"
            }`}
            key={l}
            onClick={() => handleLanguageChange(l)}
          >
            <Link href={`/${l}`}>{l}</Link>
          </span>
        );
      })}
    </footer>
  );
};
