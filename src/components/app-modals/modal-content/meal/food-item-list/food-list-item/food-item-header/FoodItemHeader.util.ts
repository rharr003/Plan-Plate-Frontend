export function determineValidUnitOptions(unit: string) {
  const weightUnits = ["g", "oz"];
  const volumeUnits = ["ml", "cup"];

  if (weightUnits.includes(unit)) {
    return weightUnits;
  }
  if (volumeUnits.includes(unit)) {
    return volumeUnits;
  } else {
    return ["tbsp"];
  }
}
