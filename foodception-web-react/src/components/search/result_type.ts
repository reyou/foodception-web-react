export enum ResultType {
  Recipe = 0,
  RecipeVideo = 1,
  Ingredient = 2,
  RecipeCategory = 3,
  Diet = 4,
  Meal = 5,
  Country = 6
}

export function parseResultType(value: number): ResultType {
  if (value in ResultType) {
    return value as ResultType;
  }
  throw new Error(`Invalid enum value received: ${value}`);
}
