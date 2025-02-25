import Portfolio from "../models/Portfolio";

export class portfolioService {
  // Create portfolio (unchanged, assuming it works)
  static async createPortfolio(data: any) {
    try {
      const portfolio = await Portfolio.create(data);
      if (!portfolio) {
        return { status: 404, message: "Unable to create portfolio" };
      }

      return { status: 200, message: "Portfolio created successfully" };
    } catch (error: any) {
      return {
        status: 500,
        message: `Error ${error.message} happened while creating portfolio`,
      };
    }
  }

  // Update portfolio (unchanged, assuming it works)
  static updatePortfolio = async (data: any, bothIds: any) => {
    try {
      if (!bothIds || !bothIds.portfolioId || !bothIds.userId) {
        return { status: 400, message: "Missing or invalid portfolioId or userId" };
      }

      const portfolio = await Portfolio.findById(bothIds.portfolioId);
      if (!portfolio) {
        return { status: 404, message: "Unable to find portfolio" };
      }
      if (portfolio.userId.toString() !== bothIds.userId.toString()) {
        return { status: 401, message: "Unauthorized! " };
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
      };
    }
  }

  // Delete portfolio
  static deletePortfolio = async (bothIds: any) => {
    try {
      // Validate input
      if (!bothIds || !bothIds.portfolioId || !bothIds.userId) {
        return { status: 400, message: "Missing or invalid portfolioId or userId" };
      }

      console.log("Deleting portfolio with IDs:", bothIds); // Debug

      // Find the portfolio
      const portfolio = await Portfolio.findById(bothIds.portfolioId);
      if (!portfolio) {
        return { status: 404, message: "Portfolio not found" };
      }

      // Check authorization
      if (portfolio.userId !== bothIds.userId) {
        return { status: 401, message: "Unauthorized: User does not own this portfolio" };
      }

      // Delete the portfolio
      const deletedPortfolio = await Portfolio.findByIdAndDelete(bothIds.portfolioId);
      if (!deletedPortfolio) {
        return { status: 500, message: "Failed to delete portfolio" };
      }

      return { status: 200, message: "Portfolio deleted successfully" };
    } catch (error: any) {
      console.error("Error in deletePortfolio service:", error);
      return { status: 500, message: `Error deleting portfolio: ${error.message}` };
    }
  };
}