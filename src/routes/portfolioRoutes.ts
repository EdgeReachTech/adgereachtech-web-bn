import express from 'express';
import { validatePortfolio } from '../validations/portfolioValidation';
import { portfolioController } from '../controllers/portfolioControllers';
import { isLoggedIn } from '../middleware/authentication';
import { isAdmin } from '../middleware/authorisation';

export const portfolioRouter = express.Router();

portfolioRouter.post("/createPortfolio", validatePortfolio, isLoggedIn, isAdmin, portfolioController.createPortfolio);
portfolioRouter.patch("/updatePortfolio/:portfolioId/:userId", validatePortfolio, isLoggedIn, isAdmin, portfolioController.updatePortfolio);
portfolioRouter.delete("/deletePortfolio/:portfolioId/:userId", isLoggedIn, isAdmin, portfolioController.deletePortfolio);


// http://localhost:5000/portfolio/updatePortfolio/60d21bbf9d1d4f6a12c3d3d5/60d21bbf9d1d4f6a12c3d3d6 <= forget about this
