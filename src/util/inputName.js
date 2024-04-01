const separator = "_";
export function getInputKey(name) {
  return name.split(separator).pop();
}

export function getInputName(inputType, inputIndex) {
  return inputType + separator + inputIndex;
}
