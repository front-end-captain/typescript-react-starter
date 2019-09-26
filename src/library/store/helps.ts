export function getActionName(action: any): string {
  if (typeof action === "string") return action;

  try {
    const str = action.toString();

    const regAction = /return.*\.(_?[a-zA-Z]*)/;
    const arr: any = str.match(regAction) || [];
    return arr[1];
  } catch (error) {
    console.log(error);
    throw new Error("action type or selector invalid");
  }
}
