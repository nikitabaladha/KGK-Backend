// validator/validateItemData.js

module.exports = function validateItemData(
  name,
  description,
  startingPrice,
  imageUrl,
  endTime
) {
  const errors = [];

  if (!name || typeof name !== "string") errors.push("Invalid or missing name");
  if (!description || typeof description !== "string")
    errors.push("Invalid or missing description");
  if (!startingPrice || isNaN(parseFloat(startingPrice)))
    errors.push("Invalid or missing starting price");
  if (!imageUrl || typeof imageUrl !== "string")
    errors.push("Invalid or missing image URL");
  if (!endTime || isNaN(Date.parse(endTime)))
    errors.push("Invalid or missing end time");

  return errors;
};
