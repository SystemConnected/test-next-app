import { Document, model, models, Schema } from "mongoose";


export interface ISubMenu {
    title: string;
    path: string;
    permissions: ("read" | "write" | "delete" | "admin")[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export interface ISideMenu extends Document {
    title: string;
    path: string;
    permissions: ("read" | "write" | "delete" | "admin")[];
    isActive: boolean;
    subMenus: ISubMenu[];
    createdAt: Date;
    updatedAt: Date;
};

const SubMenuSchema = new Schema<ISubMenu>({
    title: { type: String, required: true },
    path: { type: String, required: true },
    permissions: [{ type: String, enum: ["read", "write", "delete", "admin"] }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

});

const SideMenuSchema = new Schema<ISideMenu>({
    title: { type: String, required: true },
    path: { type: String, required: true },
    permissions: [{ type: String, enum: ['read', 'write', 'delete', 'admin'] }],
    isActive: { type: Boolean, default: true },
    subMenus: [SubMenuSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const SideMenu = models.SideMenu || model<ISideMenu>("SideMenu", SideMenuSchema);