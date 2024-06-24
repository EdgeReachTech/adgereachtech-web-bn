import { Request, Response } from "express"
import { userService } from "../services/userServices"
import { hashingPassword } from "../utils/passwordUtils"

export class userController {

   static registerUser = async (req: Request, res: Response) => {
      try {

         const { role, status, isVerified, verifiedAt, createdAt, ...userData } = req.body
         userData['password'] = await hashingPassword(userData.password)
         const user = await userService.registerUser(userData)
         if (!user || undefined) {
            res.status(401).json({ message: "failed to register users" })
         }
         res.status(user?.status as number).json({ message: user?.message })

      }
      catch (error: any) {
         res.status(500).json({ error: `Error ${error.message} happened` })
      }
   }

   static login = async (req: Request, res: Response) => {
      const loginData = req.body;
      try {
         const user = await userService.login(loginData);
         if (!user) {
            return res.status(401).json({ message: "Failed to login" });
         }

         const token = user.token;

         return res.status(user.status).json({ message: user.message, token });

      } catch (error: any) {
         return res.status(500).json({ error: `Error ${error.message} happened` });
      }
   }

   static updateUser = async (req: any, res: Response) => {
      const userId = req.user
      const updatedData = req.body;

      try {
         const result = await userService.updateUser(userId, updatedData);
         return res.status(result.status).json({ message: result.message, user: result.user });
      } catch (error: any) {
         return res.status(500).json({ error: `Error ${error.message} happened` });
      }
   }

   static deleteUser = async (req: Request, res: Response) => {
      const userId = req.params.id;
      try {
         const result = await userService.deleteUser(userId);

         return res.status(result?.status).json({ message: result?.message })
      } catch (error) {
         return res.status(500).json({ error: `Error ${error} happened` });
      }
   }

   static verifyUser = async (req: Request, res: Response) => {
      const userId = req.params.id;
      const token = req.query.token as string;
      try {
         const result = await userService.verifyUser(userId, token);
         if (!result) return res.status(404).json({ message: 'User not found' });

         return res.status(result?.status).json({ message: result?.message })
      } catch (error) {
         return res.status(500).json({ error: `Error ${error} happened` });
      }
   }
}