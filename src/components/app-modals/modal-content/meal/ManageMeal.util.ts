export function determineUpdates(oldServings: any[], newServings: any[]) {
  const servingsToAdd = newServings.filter(
    (newServing) =>
      !oldServings.some(
        (oldServing) => oldServing.foodItemId === newServing.foodItemId
      )
  );
  const servingsToUpdate = newServings.filter((newServing) =>
    oldServings.some(
      (oldServing) =>
        oldServing.foodItemId === newServing.foodItemId &&
        oldServing.servingMultiple !== newServing.servingMultiple
    )
  );
  console.log(servingsToAdd);
  console.log(servingsToUpdate);
  return [servingsToAdd, servingsToUpdate];
}
