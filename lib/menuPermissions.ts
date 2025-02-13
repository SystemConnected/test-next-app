
/**
 *
 * @param userID 
 * @param menuPath 
 * @param requiredPermission 
 */

import { IUser, User } from "@/models/User";
import { ISideMenu } from "@/models/UserMenu";
import mongoose from "mongoose";

export async function hasMenuPermission(userID: string,
    menuPath: string,
    requiredPermission: 'read' | 'write' | 'delete' | 'admin'
): Promise<boolean> {

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return false;
    }
    const user: IUser | null = await User.findById(userID).populate("menuPermissions");
    if (!user) return false;
    for (const menu of user.menuPermissions as ISideMenu[]) {
        if (!menu.isActive) continue;
        if (menu.path === menuPath && menu.permissions.includes(requiredPermission)) return true;

        for(const subMenu of menu.subMenus){
            if(subMenu.path===menuPath && subMenu.permissions.includes(requiredPermission) &&subMenu.isActive){
                return true;
            }
        }
    }
    return false;
}