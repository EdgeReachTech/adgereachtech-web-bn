import Portfolio from "../models/Portfolio";

export class portfolioService {

  // Create portfolio
  static async createPortfolio(data: any) {
    try {
      
      const portfolio = await Portfolio.create(data);
      if (!portfolio) {
        return { status: 404, message: "Unable to create portfolio" };
      }

      return { status: 200, message: "Portfolio created successfully", };
    } catch (error: any) {
      return {
        status: 500,
        message: `Error ${error.message} happened while creating portfolio`,
      };
    }
  }

  // Update portfolio
  static updatePortfolio = async (data: any, bothIds: any) => {
    try {
      const portfolio = await Portfolio.findById(bothIds.portfolioId);
      if (!portfolio) {
        return { status: 404, message: "Unable to find portfolio" }
      }
      if (portfolio.userId !== bothIds.userId) {
        return { status: 401, message: "Unauthorized" };
      }

      const updatedPortfolio = await Portfolio.findByIdAndUpdate(
        bothIds.portfolioId,
        data,
        { new: true }
      );
      if (!updatedPortfolio) {
        return { status: 404, message: "Something went wrong updating portfolio" };
      }

      return { status: 200, message: "Portfolio updated successfully" };
    } catch (error: any) {
      return {
        status: 500,
        message: `Error ${error.message} happened while updating portfolio`,
      }
    }
  }

  // Delete portfolio
  static deletePortfolio = async (bothIds: any) => {
    try {
      const portfolio = await Portfolio.findById(bothIds.portfolioId);
      if (!portfolio) {
        return { status: 404, message: "Unable to find portfolio" };
      }
      if (portfolio.userId !== bothIds.userId) {
        return { status: 401, message: "Unauthorized" };
      }

      await Portfolio.findByIdAndDelete(bothIds.portfolioId);
      return { status: 200, message: "Portfolio deleted" };
    } catch (error: any) {
      return { status: 500, message: `${error.message}` };
    }
  };

}