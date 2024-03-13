export function requiredValidator(requiredField: string) {
  return {
    required: true,
    message: `${requiredField} is required`,
  };
}

export function placeHolderGenerator(name: string, type?: string): string {
  let placeHolder: string = "";
  if (!!name) {
    if (type === "Input") {
      placeHolder = `Enter the ${name}`;
    } else if (type === "Tags") {
      placeHolder = `Select or Enter the ${name}`;
    } else placeHolder = `Select the ${name}`;
  }
  return placeHolder;
}
