import { Request, Response } from "express";
import { portfolioService } from "../services/portfolioServices";
import Portfolio from "../models/Portfolio";

export class portfolioController {
  static createPortfolio = async (req: any, res: Response) => {
    try {
      const data = req.body;
  
      const userId = req.user._id;
      data["userId"] = userId;

      const portfolio = await portfolioService.createPortfolio(data);
      if (!portfolio) {
        res.status(400).json({ message: "Fail to create portfolio" })
      }

      res.status(portfolio.status).json({ message: portfolio.message, data });
    } catch (error: any) {
      res.status(500).json({ error: `Error ${error.message} happened` });
    }
  };
  static Portfolios = async (req: Request, res: Response) => {
    try {
     
  
    

      const portfolios = await Portfolio.find();
      

      res.status(200).json(portfolios);
    } catch (error: any) {
      res.status(500).json({ error: `Error ${error.message} happened` });
    }
  };

  static updatePortfolio = async (req: any, res: Response) => {
    try {
      const userId = req.user._id; // Use authenticated user ID
      const portfolioId = req.params.portfolioId;
      const bothIds = { portfolioId, userId };
  
      const data = req.body;
      const updatedPortfolio = await portfolioService.updatePortfolio(data, bothIds);
      if (!updatedPortfolio) {
        res.status(404).json({ message: "Failed to update portfolio" });
      }
  
      res.status(updatedPortfolio.status).json({ message: updatedPortfolio.message, data: bothIds });
    } catch (error: any) {
      res.status(500).json({ error: `Error ${error.message} happened` });
    }
  };

  static deletePortfolio = async (req: any, res: Response) => {
    try {
      const userId = req.user._id; // Use authenticated user ID from token
      const portfolioId = req.params.portfolioId;
      const bothIds = { portfolioId, userId };
  
      console.log("Attempting to delete portfolio with:", bothIds); // Debug
  
      const deletedPortfolio = await portfolioService.deletePortfolio(bothIds);
      
      if (!deletedPortfolio) {
        console.log("Portfolio not found or deletion failed.");
        return res.status(404).json({ message: "Failed to delete portfolio" });
      }
  
      console.log("Deleted portfolio:", deletedPortfolio);
      res.status(deletedPortfolio.status).json({ message: deletedPortfolio.message, data: bothIds });
    } catch (error: any) {
      console.error("Error deleting portfolio:", error.message);
      res.status(500).json({ message: `Error ${error.message} happened` });
    }
  };
  
}