import { Request, Response } from "express";
import { portfolioService } from "../services/portfolioServices";

export class portfolioController {
  static createPortfolio = async (req:Request, res: Response) => {
    try {
      const data = req.body;
      //@ts-ignore
      const userId = req.user._id
      data['userId'] = userId
      console.log(data)

      const portfolio = await portfolioService.createPortfolio(data);
      if (!portfolio) {
        res.status(400).json({ message: "Fail to create portfolio" })
      }

      res.status(portfolio.status).json({ message: portfolio.message, data });
    } catch (error: any) {
      res.status(500).json({ error: `Error ${error.message} happened` });
    }
  };

  static updatePortfolio = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const portfolioId = req.params.portfolioId;
      const bothIds = { portfolioId, userId }

      const data = req.body;
      const updatedPortfolio = await portfolioService.updatePortfolio(data, bothIds);
      if (!updatedPortfolio) {
        res.status(404).json({ message: "Failed to update portfolio" });
      }

      res.status(updatedPortfolio.status).json({ message: updatedPortfolio.message, data: bothIds });
    } catch (error: any) {
      res.status(500).json({ error: `Error ${error.message} happened` });
    }
  }

  static deletePortfolio = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const portfolioId = req.params.portfolioId;
      const bothIds = { portfolioId, userId }

      const deletedPortfolio = await portfolioService.deletePortfolio(bothIds);
      if (!deletedPortfolio) {
        res.status(404).json({ message: "Fail to delete portfolio" });
      }

      res.status(deletedPortfolio.status).json({ message: deletedPortfolio.message, data: bothIds });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} happened` });
    }
  }
}