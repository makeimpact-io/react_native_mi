import { Company, PortfolioData, Sector } from '../../../types';
import { ResolvedPortfolioData, UserStockData } from '../PortfolioScreen';

function getCurrencySymbol(currency: any): string {
  if (currency === 'EUR') {
    return '€';
  } else if (currency === 'USD') {
    return '$';
  } else if (currency === 'GBP') {
    return '£';
  } else {
    return currency;
  }
}

export const resolvePortfolioData = (
  portfolioData: PortfolioData[],
  companies: Company[],
  sectors: Sector[],
) => {
  let userStockData: UserStockData[] = [];
  let stocksMarketValue: number[] = [];
  let stocksLabels: string[] = [];
  let totalMarketValue = 0;
  let calculatePNLPCT = 0;
  let unrealizedPNL = 0;

  let totalPurchasePrice = 0;
  let positionPCT = 0;

  for (let i = 0; i < portfolioData.length; i++) {
    const currentStock = portfolioData[i];
    const company = companies.filter(
      c => parseInt(c.conId, 10) === currentStock.conid,
    )[0];

    if (currentStock.position > 0) {
      positionPCT =
        (currentStock.unrealizedPnl /
          (currentStock.avgPrice * currentStock.position)) *
        100;

      const onProfit = positionPCT > 0;
      const currencySymbol = getCurrencySymbol(currentStock.currency);
      if (company) {
        const sector = sectors.filter(s => s.id === company.sectorId)[0];

        userStockData.push({
          company: company,
          sector: sector,
          stocks: currentStock.position,
          currentMarketPrice: currentStock.mktPrice,
          averageBoughtPrice: currentStock.avgPrice,
          totalReturn: currentStock.mktValue,
          currency: currencySymbol,
          positionChange: positionPCT,
          isProfitable: onProfit,
        });
        stocksMarketValue.push(currentStock.mktValue);
        stocksLabels.push(company.name);
      }
      totalMarketValue += currentStock.mktValue;
      unrealizedPNL += currentStock.unrealizedPnl;
      totalPurchasePrice += currentStock.avgPrice * currentStock.position;
    }
  }

  calculatePNLPCT = (unrealizedPNL / totalPurchasePrice) * 100;

  const returnData: ResolvedPortfolioData = {
    userStockData: userStockData,
    stocksMarketValue: stocksMarketValue,
    stocksLabels: stocksLabels,
    totalMarketValue: totalMarketValue,
    unrealizedPNL: unrealizedPNL,
    calculatePNLPCT: calculatePNLPCT,
  };

  return returnData;
};
