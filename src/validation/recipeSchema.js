import * as yup from "yup";

const recipeSchema = yup.object({
  recipeName: yup.string().trim().required("Give this recipe a name."),
  isVeg: yup.boolean().required("Mark whether this is veg or non-veg."),
  description: yup.string().trim().max(500, "Keep the description under 500 characters."),
  cookingTime: yup
    .number()
    .typeError("Cooking time must be a number.")
    .positive("Cooking time must be greater than 0.")
    .integer("Cooking time must be a whole number of minutes.")
    .nullable()
    .transform((value, original) => (original === "" ? null : value)),
  ingredients: yup
    .string()
    .min(1, "Add at least one ingredient."),
  instructions: yup
    .string()
    .min(1, "Add at least one step."),
  imgUrl: yup
    .string()
    .trim()
    .url("Enter a valid URL.")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
});

export default recipeSchema;
