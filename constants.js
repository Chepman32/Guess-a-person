import { Dimensions } from "react-native";

export const MAX_WIDTH = Dimensions.get("screen").width
export const MAX_HEIGHT = Dimensions.get("screen").height
export function randomNumber(min, max){
  const r = Math.random()*(max-min) + min
  return Math.floor(r)
}