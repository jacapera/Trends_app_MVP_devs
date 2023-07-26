// helper para convertir en sets las propiedades que son arrays dentro de los perfiles
export const convertObjToSets = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, new Set(value)])
  );
};
