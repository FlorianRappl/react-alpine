import { scripts, replacements } from '../scripts';

type StoreValue<T> = T extends Function ? {
  click: Record<string, string>;
  current: T;
} : {
  text: Record<string, string>;
  current: T;
}

type StoreKeys<T> = {
  [P in keyof T]: StoreValue<T[P]>;
};

type StoreData<T> = { data: Record<string, string> } & StoreKeys<T>;

export function useData<T>(cb: () => T): StoreData<T> {
  const id = Math.random().toString(26).substr(2, 8);
  const store = `store${id}`;
  const data = cb();
  scripts.push(`window["${store}"] = ${cb.toString()}`);
  replacements.push([`at-click-${id}`, '@click']);

  return {
    data: {
      'x-data': store,
    },
    ...Object.keys(data).reduce((p, c) => {
      // @ts-ignore
      const v = data[c];
      // @ts-ignore
      p[c] = (typeof v === 'function') ? {
        click: {
          [`at-click-${id}`]: `${c}()`,
        },
        current: v,
      } : {
        text: {
          'x-text': c,
        },
        current: v,
      };

      return p;
    }, {} as StoreKeys<T>),
  };
}
