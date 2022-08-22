import { type } from "os";

async function GenLetterOutput(url = "russianUTF-8.txt") {
  const data: string = await $fetch("/Library/" + url);
  console.log(data);

  let words = data.split("\n");
  if (words.length && words[0].at(-1) == "\r")
    words = words.map((word) => word.slice(0, -1));

  // Доступные буквы: ABЕКМНОРСТУХ
  // Доступные цифры: 03469 (озчбд)
  const ans1 = words
    .filter((word) =>
      /^[авекмнорстух]?[озчбд]{3}[авекмнорстух]{0,2}$/i.test(word)
    )
    .map((word) =>
      /(^[авекмнорстух]?)([озчбд]{3})([авекмнорстух]{0,2})$/i.exec(word)
    )
    .map(([a, b, c, d]) => b.padStart(1, "*") + c + d.padEnd(2, "*"));
  const ans2 = words
    .filter((word) => /^[авекмнорстух]?[озчбд]{0,2}$/i.test(word))
    .map((word) => /^([авекмнорстух]?)([озчбд]{0,2})$/i.exec(word))
    .map(([a, b, c]) => b.padStart(1, "*") + c.padEnd(5, "*"));
  const ans3 = words
    .filter((word) => /^[озчбд]{0,2}[авекмнорстух]{1,2}$/i.test(word))
    .map((word) => /^([озчбд]{0,2})([авекмнорстух]{1,2})$/i.exec(word))
    .map(([a, b, c]) => b.padStart(4, "*") + c.padEnd(2, "*"));
  return [...ans1, ...ans2, ...ans3];
}

async function Gen3LetterOutput(url = "russianUTF-8.txt") {
  const data: string = await $fetch("/Library/" + url);

  let words = data.split("\n");
  if (words.length && words[0].at(-1) == "\r")
    words = words.map((word) => word.slice(0, -1));

  return words.filter((word) => /^[авекмнорстух]{3}$/i.test(word));
}
async function Gen6LetterOutput(url = "russianUTF-8.txt") {
  const data: string = await $fetch("/Library/" + url);

  let words = data.split("\n");
  if (words.length && words[0].at(-1) == "\r")
    words = words.map((word) => word.slice(0, -1));

  return words.filter((word) =>
    /^[авекмнорстух][озчбд]{3}[авекмнорстух]{2}$/i.test(word)
  );
}
type Type = "" | "6" | "3";
export function useGenOutput(url = "russianUTF-8.txt", type: Type = "") {
  const loading = ref(true);
  const error = ref(false);
  const data = ref([]);
  const funcs = {
    "": GenLetterOutput,
    "3": Gen3LetterOutput,
    "6": Gen6LetterOutput,
  };

  funcs[type](url)
    .then((Data) => {
      console.log(Data);
      data.value = Data;
      loading.value = false;
    })
    .catch((e) => {
      error.value = true;
      loading.value = false;
    });

  return { loading, error, data };
}
