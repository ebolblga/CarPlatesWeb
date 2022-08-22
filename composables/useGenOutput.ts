import { type } from "os";

async function GenLetterOutput(data = "") {
  let words = data
    .split("\n")
    .map((word) => (word.at(-1) == "\r" ? word.slice(0, -1) : word));
  // Доступные буквы: ABЕКМНОРСТУХ
  // Доступные цифры: 03469 (озчбд)
  const ans1 = words
    .filter(
      (word) =>
        /^[авекмнорстух]?[озчбд]{3}[авекмнорстух]{0,2}$/i.test(word) &&
        word.length
    )
    .map((word) =>
      /(^[авекмнорстух]?)([озчбд]{3})([авекмнорстух]{0,2})$/i.exec(word)
    )
    .map(([a, b, c, d]) => b.padStart(1, "*") + c + d.padEnd(2, "*"));
  const ans2 = words
    .filter(
      (word) => /^[авекмнорстух]?[озчбд]{0,2}$/i.test(word) && word.length
    )
    .map((word) => /^([авекмнорстух]?)([озчбд]{0,2})$/i.exec(word))
    .map(([a, b, c]) => b.padStart(1, "*") + c.padEnd(5, "*"));
  const ans3 = words
    .filter((word) => /^[озчбд]{0,2}[авекмнорстух]{1,2}$/i.test(word))
    .map((word) => /^([озчбд]{0,2})([авекмнорстух]{1,2})$/i.exec(word))
    .map(([a, b, c]) => b.padStart(4, "*") + c.padEnd(2, "*"));
  return [...ans1, ...ans2, ...ans3];
}

async function Gen3LetterOutput(data = "") {
  let words = data
    .split("\n")
    .map((word) => (word.at(-1) == "\r" ? word.slice(0, -1) : word));
  return words.filter((word) => /^[авекмнорстух]{3}$/i.test(word));
}
async function Gen6LetterOutput(data = "") {
  let words = data
    .split("\n")
    .map((word) => (word.at(-1) == "\r" ? word.slice(0, -1) : word));

  return words.filter((word) =>
    /^[авекмнорстух][озчбд]{3}[авекмнорстух]{2}$/i.test(word)
  );
}
async function GenLetterOutputUrl(url = "russianUTF-8.txt") {
  const data: string = await $fetch("/Library/" + url);
  return GenLetterOutput(data);
}
async function Gen3LetterOutputUrl(url = "russianUTF-8.txt") {
  const data: string = await $fetch("/Library/" + url);
  return Gen3LetterOutput(data);
}
async function Gen6LetterOutputUrl(url = "russianUTF-8.txt") {
  const data: string = await $fetch("/Library/" + url);
  return Gen6LetterOutput(data);
}
async function GenLetterOutputFile(file: File) {
  const data: string = await file.text();
  return GenLetterOutput(data);
}
async function Gen3LetterOutputFile(file: File) {
  const data: string = await file.text();
  return Gen3LetterOutput(data);
}
async function Gen6LetterOutputFile(file: File) {
  const data: string = await file.text();
  return Gen6LetterOutput(data);
}
type Type = "" | "6" | "3";

export function useGenOutputFile(
  file: File,
  type: Type = "",
  callback = (e) => {}
) {
  const response = reactive({
    loading: true,
    error: false,
    data: [],
  });
  const funcs = {
    "": GenLetterOutputFile,
    "3": Gen3LetterOutputFile,
    "6": Gen6LetterOutputFile,
  };

  funcs[type](file)
    .then((Data) => {
      console.log(Data);
      response.data = Data;
      response.loading = false;
      callback(Data);
    })
    .catch((e) => {
      response.error = true;
      response.loading = false;
      console.error(e);
    });

  return response;
}

export function useGenOutput(
  url = "russianUTF-8.txt",
  type: Type = "",
  callback = (e) => {}
) {
  const response = reactive({
    loading: true,
    error: false,
    data: [],
  });
  const funcs = {
    "": GenLetterOutputUrl,
    "3": Gen3LetterOutputUrl,
    "6": Gen6LetterOutputUrl,
  };

  funcs[type](url)
    .then((Data) => {
      console.log(Data);
      response.data = Data;
      response.loading = false;
      callback(Data);
    })
    .catch((e) => {
      response.error = true;
      response.loading = false;
      console.error(e);
    });

  return response;
}
