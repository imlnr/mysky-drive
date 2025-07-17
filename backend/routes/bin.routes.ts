import { Router } from "express";
import { deleteItem, getTrashedItems, restoreItem } from "../controllers/bin.controllers";
import { auth } from "../middlewares/auth.middleware";

const binRouter = Router();

binRouter.put("/soft-delete/all", auth as any, deleteItem as any);
binRouter.put("/restore/all", auth as any, restoreItem as any);
binRouter.get("/get-trashed-items", auth as any, getTrashedItems as any);

export default binRouter;