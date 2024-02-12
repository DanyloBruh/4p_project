export default function getSearchWith(
  currentParams,
  paramsToUpdate,
) {
  const newParams = new URLSearchParams(
    currentParams.toString(),
  );
  Object.entries(paramsToUpdate)
    .forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);
        value.forEach((part) => {
          newParams.append(key, part);
        });
      } else {
        newParams.set(key, value);
      }
    });
  return newParams.toString();
}
