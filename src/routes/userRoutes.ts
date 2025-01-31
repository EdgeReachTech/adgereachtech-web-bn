import express from "express";
import { userController } from "../controllers/userControllers";
import { validateChangeUserPassword, validateRole, validateUser } from "../validations/userValidation";
import { isLoggedIn } from "../middleware/authentication";
import { isAdmin } from "../middleware/authorisation";

export const userRouter = express.Router();

userRouter.post("/register", validateUser, userController.registerUser);
userRouter.post("/login", userController.login);
userRouter.put("/", isLoggedIn, userController.updateUser);
userRouter.delete("/delete/:id", userController.deleteUser);
userRouter.get("/verify/:token", userController.verifyUser);
userRouter.get("/forgot-password", userController.forgotPassword)
userRouter.patch("/reset-password/:token", userController.resetPassword)
userRouter.put("/change-password", isLoggedIn, validateChangeUserPassword, userController.changeUserPassword);
userRouter.get('/me',isLoggedIn,userController.getUSer)
userRouter.get('/',isLoggedIn,userController.getAllUser)
userRouter.patch('/block/:id', isLoggedIn, isAdmin, userController.blockUser)
userRouter.patch('/unblock/:id', isLoggedIn, isAdmin, userController.unBlockuser)
userRouter.patch('/changerole/:id', validateRole, isLoggedIn, isAdmin, userController.changeRole)

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - location
 *         - dateOfBirth
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         location:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *        
 *         role:
 *           type: string
 *         gender:
 *           type: string
 *         
 *         
 *         password:
 *           type: string
 *        
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management APIs
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     description: Allows a user to register by providing personal information and password.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User successfully registered
 *       '400':
 *         description: Invalid input data
 *       '500':
 *         description: Server error
 */

  /**
   * @swagger
   * /user/login:
   *   post:
   *     summary: Login an existing user
   *     description: Logs in the user and returns a token for further authentication.
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Successfully logged in
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: 'Login successful'
   *                 token:
   *                   type: string
   *       '401':
   *         description: Invalid credentials
   *       '500':
   *         description: Server error
   */

  /**
   * @swagger
   * /user:
   *   put:
   *     summary: Update user information
   *     description: Allows a user to update their profile details.
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       '200':
   *         description: User updated successfully
   *       '400':
   *         description: Invalid input data
   *       '404':
   *         description: User not found
   *       '500':
   *         description: Server error
   */
 
  
  /**
   * @swagger
   * /user:
   *   get:
   *     summary: Get all users
   *     description: Returns a list of all users.
   *     tags: [User]
   *     responses:
   *       '200':
   *         description: List of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   *       '500':
   *         description: Server error
   */

  
  /**
   * @swagger
   * /user/me:
   *   get:
   *     summary: Get the logged-in user's information
   *     description: Fetches the details of the currently authenticated user.
   *     tags: [User]
   *     responses:
   *       '200':
   *         description: User data
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       '404':
   *         description: User not found
   *       '500':
   *         description: Server error
   */
 
  
  /**
   * @swagger
   * /user/{id}:
   *   delete:
   *     summary: Delete a user
   *     description: Deletes a user by their ID.
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User's unique ID
   *     responses:
   *       '200':
   *         description: User successfully deleted
   *       '400':
   *         description: User deletion failed
   *       '500':
   *         description: Server error
   */
 
  
  /**
   * @swagger
   * /user/verify/{token}:
   *   get:
   *     summary: Verify a user account
   *     description: Verifies the user's account with a token (e.g., from email).
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: token
   *         required: true
   *         schema:
   *           type: string
   *         description: Verification token
   *     responses:
   *       '200':
   *         description: User verified successfully
   *       '400':
   *         description: Invalid token
   *       '500':
   *         description: Server error
   */
 
  
  /**
   * @swagger
   * /user/forgot-password:
   *   post:
   *     summary: Send password reset email
   *     description: Sends an email with instructions for resetting the user's password.
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Email sent successfully
   *       '400':
   *         description: User not found
   *       '500':
   *         description: Server error
   */
 
  
  /**
   * @swagger
   * /user/reset-password/{token}:
   *   post:
   *     summary: Reset password
   *     description: Allows the user to reset their password with a valid token.
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: token
   *         required: true
   *         schema:
   *           type: string
   *         description: Password reset token
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               password:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Password successfully reset
   *       '400':
   *         description: Invalid token or password
   *       '500':
   *         description: Server error
   */
 
  
  /**
   * @swagger
   * /user/block/{id}:
   *   put:
   *     summary: Block a user
   *     description: Blocks a user by their ID.
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User's unique ID
   *     responses:
   *       '200':
   *         description: User blocked successfully
   *       '400':
   *         description: Failed to block user
   *       '500':
   *         description: Server error
   */
  
  /**
   * @swagger
   * /user/unblock/{id}:
   *   put:
   *     summary: Unblock a user
   *     description: Unblocks a user by their ID.
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User's unique ID
   *     responses:
   *       '200':
   *         description: User unblocked successfully
   *       '400':
   *         description: Failed to unblock user
   *       '500':
   *         description: Server error
   */
 
  
  /**
   * @swagger
   * /user/change-role/{id}:
   *   put:
   *     summary: Change user role
   *     description: Allows an admin to change the role of a user.
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User's unique ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               role:
   *                 type: string
   *     responses:
   *       '200':
   *         description: User role updated successfully
   *       '400':
   *         description: Failed to change user role
   *       '500':
   *         description: Server error
   */
 
  
  /**
   * @swagger
   * /user/change-password:
   *   put:
   *     summary: Change user password
   *     description: Allows a user to change their password.
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               currentPassword:
   *                 type: string
   *               newPassword:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Password successfully updated
   *       '400':
   *         description: Invalid current password
   *       '500':
   *         description: Server error
   */
    // Controller code
  
  

 

