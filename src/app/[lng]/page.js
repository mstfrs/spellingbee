"use client";
import Buttons from "@/components/Buttons";
import enwords from "../../data/enwords.json";
import trwords from "../../data/trwords.json";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import { toast } from "react-toastify";
import CountdownTimer from "@/components/Counter";
import { useTranslation } from "../i18n/client";

export default function Home({ params: { lng } }) {
  const [randomWord, setRandomWord] = useState();
  const [shuffledStr, setShuffledStr] = useState();
  const [typedWord, setTypedWord] = useState("");
  const [foundedWords, setFoundedWords] = useState([]);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(60);
  const [isDisabled, setIsDisabled] = useState(false);
  const { t } = useTranslation(lng);

  function getRandomRecord() {
    let wordGroup;

    if (lng === "en") {
      wordGroup = enwords;
    } else if (lng === "tr") {
      wordGroup = trwords;
    }

    const dataLength = wordGroup?.length;
    const randomIndex = Math.floor(Math.random() * dataLength);
    setRandomWord(wordGroup[randomIndex]);
    shuffleWord(randomWord);
    setTypedWord("");
    setCount(60);
    setScore(0);
    setIsDisabled(false);
    setFoundedWords([]);
  }

  async function shuffleWord(word) {
    const removedStr = word?.availableLetters.split(word.middleLetter).join("");
    const shuffledStr = await removedStr
      ?.split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setShuffledStr(shuffledStr);
  }

  function handleInputChange(e) {
    setTypedWord(typedWord + e.target.innerText);
  }

  const handleDelete = () => {
    setTypedWord((prevStr) => prevStr.slice(0, -1));
  };

  function handleCheck(wordTocheck) {
    const foundWord = randomWord?.answers.find(
      (word) => word === wordTocheck.toLowerCase()
    );
    if (foundedWords?.find((item) => item === wordTocheck.toLowerCase())) {
      toast.error(t("errors.founded"));
    } else if (foundWord) {
      setFoundedWords((prev) => [...prev, foundWord]);
      setTypedWord("");
      setScore(score + foundWord.length);
      setCount(count + 15);
    } else if (wordTocheck.length < 4) {
      toast.error(t("errors.tooShort"));
    } else if (!wordTocheck.toLowerCase().includes(randomWord?.middleLetter)) {
      toast.error(t("errors.missingCenter"));
    } else {
      toast.error(t("errors.invalidWord"));
      setTypedWord("");
    }
  }

  useEffect(() => {
    getRandomRecord();
    setFoundedWords([]);
  }, []);

  useEffect(() => {
    if (randomWord) {
      shuffleWord(randomWord);
    }
  }, [randomWord]);

  return (
    <div className="py-2">
      <div className="grid grid-cols-1 sm:grid-cols-3 pt-5 justify-items-center sm:gap-10 ">
        <div className="order-last sm:order-first max-w-72 text-center pt-5 sm:pt-0 md:mt-0">
          <h3 className="text-sm md:text-2xl uppercase text-center px-10 border-b-2 border-w- border-yellow-500">
            {t("yourWords")}
          </h3>
          <div className="flex flex-col justify-center items-center uppercase text-lg font-semibold pt-4">
            {foundedWords.map((word, index) => (
              <p key={index}>{word}</p>
            ))}
          </div>
        </div>
        <div className="order-2 ">
          <Input value={typedWord} />
          <div className="flex flex-col gap-5 md:gap-10 h-auto my-10 items-center justify-center">
            <div className="flex items-center justify-center md:gap-5 gap-2.5">
              <div
                className="hexagon flex items-center justify-center font-bold md:text-6xl text-3xl uppercase"
                onClick={(e) => handleInputChange(e)}
              >
                {shuffledStr?.[0]}
              </div>
              <div
                className="hexagon flex items-center justify-center font-bold md:text-6xl text-3xl uppercase"
                onClick={(e) => handleInputChange(e)}
              >
                {shuffledStr?.[1]}
              </div>
            </div>
            <div className="flex items-center justify-center md:gap-5 gap-2.5">
              <div
                className="hexagon flex items-center justify-center font-bold md:text-6xl text-3xl uppercase"
                onClick={(e) => handleInputChange(e)}
              >
                {shuffledStr?.[2]}
              </div>
              <div
                id="middleLetter"
                className=" flex items-center justify-center font-bold md:text-6xl text-3xl uppercase"
                onClick={(e) => handleInputChange(e)}
              >
                {randomWord?.middleLetter}
              </div>
              <div
                className="hexagon flex items-center justify-center font-bold md:text-6xl text-3xl uppercase"
                onClick={(e) => handleInputChange(e)}
              >
                {shuffledStr?.[3]}
              </div>
            </div>
            <div className="flex items-center justify-center md:gap-5 gap-2.5">
              <div
                className="hexagon flex items-center justify-center font-bold md:text-6xl text-3xl uppercase"
                onClick={(e) => handleInputChange(e)}
              >
                {shuffledStr?.[4]}
              </div>
              <div
                className="hexagon flex items-center justify-center font-bold md:text-6xl text-3xl uppercase"
                onClick={(e) => handleInputChange(e)}
              >
                {shuffledStr?.[5]}
              </div>
            </div>
          </div>
          <Buttons
            getRandomRecord={getRandomRecord}
            shuffleWord={() => shuffleWord(randomWord)}
            randomWord={randomWord}
            handleDelete={handleDelete}
            handleCheck={() => handleCheck(typedWord)}
            isDisabled={isDisabled}
            lng={lng}
          />
        </div>
        <div className="order-first sm:order-3 max-w-72 text-center flex sm:flex-col items-center justify-center sm:items-center sm:justify-start gap-10">
          <div className="flex justify-center flex-col items-center">
            <h3 className=" text-sm md:text-2xl uppercase text-center px-10 border-b-2 border-yellow-500">
              {t("yourScore")}
            </h3>
            <h3 className="text-lg md:text-5xl mt-5 bg-blue-300 rounded-full w-14 h-14 md:w-28 md:h-28 flex items-center justify-center font-medium border-2 border-yellow-300">
              {score !== 0 && score}
            </h3>
          </div>
          <div className="flex justify-center flex-col items-center">
            <h3 className="text-sm md:text-2xl uppercase text-center px-10 border-b-2 border-yellow-500">
              {t("yourTime")}
            </h3>
            <h3 className="text-lg md:text-5xl mt-5 bg-blue-300 rounded-full w-14 h-14 md:w-28 md:h-28 flex items-center justify-center font-medium border-2 border-yellow-300">
              <CountdownTimer
                count={count}
                setCount={setCount}
                setIsDisabled={setIsDisabled}
                isDisabled={isDisabled}
                lng={lng}
              />
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
