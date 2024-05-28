interface FormValue {
  value: string | number;
  type: string;
  error: string;
  label: string;
}

export interface FormData {
  [key: string]: {
    [key: string]: FormValue;
  };
}

export type Section = keyof FormData;

export function mergeData(data: FormData) {
  return Object.keys(data).reduce((acc, val) => {
    Object.keys(data[val]).forEach((key) => {
      acc = {
        ...acc,
        [key]: data[val][key].value,
      };
    });
    return acc;
  }, {});
}
