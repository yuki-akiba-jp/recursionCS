import { EmotionObject } from "./emotionobject.js";

export const emotions = [
  new EmotionObject(
    "angry",
    "feeling or showing strong annoyance, displeasure, or hostility; full of anger.",
    "red",
    ["bark", "grunt", "roar", "whack", "smack", "hiss"]
  ),
  new EmotionObject(
    "happy",
    "feeling or showing pleasure or contentment.",
    "yellow",
    ["bling", "chatter", "chant", "giggle"]
  ),
  new EmotionObject(
    "bad",
    "not such as to be hoped for or desired; unpleasant or unwelcome.",
    "beige",
    ["ahem", "clatter", "clunk"]
  ),
  new EmotionObject("sad", "feeling or showing sorrow; unhappy.", "grey", [
    "bawl",
    "whine",
    "waah",
  ]),
  new EmotionObject(
    "surprised",
    "to feel mild astonishment or shock.",
    "purple",
    ["boom", "honk", "zing"]
  ),
  new EmotionObject(
    "fearful",
    "feeling afraid; showing fear or anxiety.",
    "green",
    ["buzz", "caw", "crawl"]
  ),
  new EmotionObject(
    "disgusted",
    "feeling or showing strong annoyance, displeasure, or hostility; full of anger.",
    "orange",
    ["flick", "gargle", "oink"]
  ),
];
