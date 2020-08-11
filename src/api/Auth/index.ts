import express, { Request, Response } from "express";
const AuthRouter = express.Router();

AuthRouter.get("/",  (req: Request, res: Response) => {
    console.log('!!!!!');
});

// GET items/:id

//AuthRouter.get("/:id", async (req: Request, res: Response) => {
////const id: number = parseInt(req.params.id, 10);

//});


//// POST items/

//AuthRouter.post("/", async (req: Request, res: Response) => {

//});

//// PUT items/

//AuthRouter.put("/", async (req: Request, res: Response) => {

//});

//// DELETE items/:id

//AuthRouter.delete("/:id", async (req: Request, res: Response) => {

//});
export default AuthRouter;