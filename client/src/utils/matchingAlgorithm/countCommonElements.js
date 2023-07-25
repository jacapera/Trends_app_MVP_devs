// helper para contar elementos en común

// Se usa para contar los elementos que no se cuentan
// directamente en calculateMatchScore o para
// sumar puntos extra en combinación con otro match
export const countCommonElements = (set1, set2) => {
  let count = 0;
  set1.forEach((item) => {
    if (set2.has(item)) {
      count++;
    }
  });
  return count;
};
