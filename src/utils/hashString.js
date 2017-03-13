// @flow

export default function hashString(string: string): number {
  if (string.length === 0) return 0;

  const splitStr = string.split('');
  const hash = splitStr.reduce((acc, str) => {
    const chr = str.charCodeAt(0);
    let accc = ((acc << 5) - acc) + chr; // eslint-disable-line no-bitwise
    accc |= 0; // eslint-disable-line no-bitwise

    return accc;
  }, 0);

  return hash;
}
