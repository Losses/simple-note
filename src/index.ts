import { defaultValueCtx, Editor, rootCtx } from "@milkdown/core";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { commonmark } from "@milkdown/preset-commonmark";
import { history } from "@milkdown/plugin-history";

import { nord } from "@milkdown/theme-nord";

import "@milkdown/theme-nord/style.css";
import "./styles.css";

const countWords = (s: string) => {
  const matches = s.match(/[\w\d'-]+/gi);
  return matches ? matches.length : 0;
};

(async () => {
  const $main = document.querySelector(`#main`)! as HTMLDivElement;
  const $count = document.querySelector(`#wordCount`)! as HTMLDivElement;

  await Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, "#main");
      ctx.set(defaultValueCtx, localStorage.getItem("content") ?? "");

      ctx.get(listenerCtx).markdownUpdated((_, markdown) => {
        localStorage.setItem("content", markdown);
        $count.innerText = `${countWords($main.innerText ?? "")}`;
      });
    })
    .config(nord)
    .use(commonmark)
    .use(listener)
    .use(history)
    .create();
})();

// window.setTimeout(() => {
//   $main.innerText = localStorage.getItem("content") ?? "";
//   $count.innerText = `${countWords($main.innerText ?? "")}`;
// }, 0);
