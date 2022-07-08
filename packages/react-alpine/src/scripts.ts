export const scripts: Array<string> = [];

export const replacements: Array<[string, string]> = [];

export function replaceAll(body: string) {
  for (const [prev, next] of replacements) {
    body = body.split(prev).join(next);
  }

  return body;
}
