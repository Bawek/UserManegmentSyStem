import express from "express"
import { add, remove, update, view } from "../controler/noteController.js"
import auth from "../midleware/auth.js"

const noteRouter=express.Router()
noteRouter.post("/add",auth,add)
noteRouter.post("/remove",auth,remove)
noteRouter.post("/view",auth,view)
noteRouter.post("/update",auth,update)
export default noteRouter