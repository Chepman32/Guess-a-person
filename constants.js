import { Dimensions, Platform, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

export const MAX_WIDTH = Dimensions.get("screen").width
export const MAX_HEIGHT = Dimensions.get("screen").height
export const TouchableWrapper = Platform.OS === "android" ? TouchableWithoutFeedback : TouchableOpacity
export function randomNumber(min, max){
  const r = Math.random()*(max-min) + min
  return Math.floor(r)
}
export const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}