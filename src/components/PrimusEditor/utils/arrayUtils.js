import shortid from "shortid";

export const generateRowId = () => {
    return shortid.generate()
}

export const generateKeyedFormData = (formData) => {
    return !Array.isArray(formData)
      ? []
      : formData.map(item => {
          return {
            key: generateRowId(),
            item,
          };
        });
}

export const keyedToPlainFormData = (keyedFormData) => {
    return keyedFormData.map(keyedItem => keyedItem.item);
}