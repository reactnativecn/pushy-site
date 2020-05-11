import { IFrontmatterData } from '../templates/docs';

export interface MenuDataItem extends IFrontmatterData {
  link?: string;
}

export interface IMenuData {
  [key: string]: IMenuData | MenuDataItem[];
}

export function getMenuItems(moduleData: { [key: string]: any }) {
  const menuMeta = moduleData.map((item: { meta: any }) => item.meta);
  const menuItems: {
    [key: string]: any;
  } = { topLevel: {} };
  menuMeta
    .sort((a: { order: number }, b: { order: number }) => (a.order || 0) - (b.order || 0))
    .forEach((meta: { category: { [x: string]: any }; type: string }) => {
      const category = meta.category || 'topLevel';
      if (!menuItems[category]) {
        menuItems[category] = {};
      }

      const type = meta.type || 'topLevel';
      if (!menuItems[category][type]) {
        menuItems[category][type] = [];
      }

      menuItems[category][type].push(meta);
    });
  return menuItems;
}

export function ping(callback: (arg0: any) => void) {
  const url =
    'https://private-a' +
    'lipay' +
    'objects.alip' +
    'ay.com/alip' +
    'ay-rmsdeploy-image/rmsportal/RKuAiriJqrUhyqW.png';

  const img = new Image();
  let done: boolean;
  const finish = (status: string) => {
    if (!done) {
      done = true;
      img.src = '';
      callback(status);
    }
  };
  img.onload = () => finish('responded');
  img.onerror = () => finish('error');
  img.src = url;
  return setTimeout(() => finish('timeout'), 1500);
}

