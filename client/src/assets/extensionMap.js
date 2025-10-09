import { javascript } from "@codemirror/lang-javascript";
import {html} from "@codemirror/lang-html"
import {python} from "@codemirror/lang-python"
import {cpp} from "@codemirror/lang-cpp"
import {css} from "@codemirror/lang-css"
import {java} from "@codemirror/lang-java"
import {json} from "@codemirror/lang-json"

const extensionMap = {
  html: {
    language: html(),
    icon: "https://img.icons8.com/?size=100&id=20909&format=png&color=000000",
  },
  js: {
    language: javascript(),
    icon: "https://img.icons8.com/?size=100&id=108784&format=png&color=000000",
  },
  css: {
    language: css(),
    icon: "https://img.icons8.com/?size=100&id=YiXdSkWpicvy&format=png&color=000000",
  },
  json: {
    language: json(),
    icon: "https://img.icons8.com/?size=100&id=E6LuCTDk8X6X&format=png&color=000000",
  },
  java: {
    language: java(),
    icon: "https://img.icons8.com/?size=100&id=13679&format=png&color=000000",
  },
  c: {
    language: cpp(),
    icon: "https://img.icons8.com/?size=100&id=mfkStOwP4EC0&format=png&color=000000",
  },
  py: {
    language: python(),
    icon: "https://img.icons8.com/?size=100&id=13441&format=png&color=000000",
  },
};
export default extensionMap;
