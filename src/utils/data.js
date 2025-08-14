import { rawNotions, cloths } from './utils'

export const categories = Object.values(
  rawNotions.reduce((acc, item) => {
    if (item.parent) {
      if (!acc[item.parent]) acc[item.parent] = { key: item.parent, name: item.parent, children: [] };
      acc[item.parent].children.push(item);
    }
    return acc;
  }, {})
);

export const initialMetrics = { pattern: '', sewing: '', profit: '' };

export const initialNotions = rawNotions.reduce(
  (acc, item) => ({ ...acc, [item.key]: { selected: false, value: '' } }),
  {}
);

export const initialClothsOpts = cloths.reduce(
  (acc, item) => ({ ...acc, [item.key]: { selected: false, value: '' } }),
  {}
);
