export const getter = async <T>(url: string): Promise<T> => fetch(url).then(r => r.json());

export const poster = async <T>(url: string, { arg }: { arg: Partial<T> }): Promise<T> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then(res => res.json());
