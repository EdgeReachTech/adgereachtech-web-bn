import express from 'express';
import { validatePortfolio } from '../validations/portfolioValidation';
import { portfolioController } from '../controllers/portfolioControllers';
import { isLoggedIn } from '../middleware/authentication';
import { isAdmin } from '../middleware/authorisation';

export const portfolioRouter = express.Router();
     
portfolioRouter.post("/createPortfolio", validatePortfolio,isLoggedIn, portfolioController.createPortfolio);
portfolioRouter.patch("/updatePortfolio/:portfolioId/:userId", validatePortfolio, portfolioController.updatePortfolio);
portfolioRouter.delete("/deletePortfolio/:portfolioId/:userId", portfolioController.deletePortfolio);



