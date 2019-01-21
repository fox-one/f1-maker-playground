import localForage from 'localforage';
import uuidv4 from 'uuid';

const foxUUID = 'fox-uuid';

function generateUUID() {
  // eslint-disable-next-line no-use-before-define
  getUUID();
}

export default async function getUUID() {
  const uuid = await localForage.getItem(foxUUID);
  if (!uuid) {
    const newUUID = uuidv4();
    localForage.setItem(foxUUID, newUUID);
    return newUUID;
  }

  return uuid;
}

export function removeAdminUUID() {
  return localForage.removeItem(foxUUID);
}

// 配置 LocalStorage
localForage.config({
  driver: localForage.LOCALSTORAGE,
  name: 'f1ex-admin',
  version: 1.0,
});

generateUUID();
