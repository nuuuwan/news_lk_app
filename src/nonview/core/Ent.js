import { JSONWWW } from "../../nonview/base/WWW";
import { URL_DATA } from "../../nonview/constants/Data";

const URL_ENT_TO_GROUP = URL_DATA + "/ent_to_group.json";

export const ENT_ALL = "all";

export default class Ent {
  static async loadEntToGroup() {
    const jsonWWW = new JSONWWW(URL_ENT_TO_GROUP);
    return await jsonWWW.read();
  }
}
