import { Company, Sector } from '../../../types';

const fractionNumber = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

interface UserStockData {
  company: Company | undefined;
  sector: Sector | undefined;
  stocks: Number;
  price: string;
  singlePrice: string;
  totalReturn: string;
  currency: string;
  positionChange: string;
  isProfitable: boolean;
}

export function resolvePortfolioData(
  portfolioData: any,
  companies: Company[],
  sectors: Sector[],
) {
  let userStockData: UserStockData[] = [];
  let tradingChartData = [];
  let tradingChartLabels = [];
  let stockMarketValue = 0;
  let calculatePNLPCT = 0;
  let unrealizedPNL = 0;

  let totalPurchasePrice = 0;

  let posID = portfolioData.map((position: { conid: any }) => position.conid);
  let posName = portfolioData.map((position: { name: any }) => position.name);
  let posTicker = portfolioData.map(
    (position: { ticker: any }) => position.ticker,
  );
  let posSector = portfolioData.map(
    (position: { sector: any }) => position.sector,
  );
  let posCurrency = portfolioData.map(
    (position: { currency: any }) => position.currency,
  );
  let posMarketValue = portfolioData.map(
    (position: { mktValue: any }) => position.mktValue,
  );
  let posMarketPrice = portfolioData.map(
    (position: { mktPrice: any }) => position.mktPrice,
  );
  let posSharesAmount = portfolioData.map(
    (position: { position: any }) => position.position,
  );
  let posPurchasePrice = portfolioData.map(
    (position: { avgPrice: any }) => position.avgPrice,
  );
  let posUnrealizedPNL = portfolioData.map(
    (position: { unrealizedPnl: any }) => position.unrealizedPnl,
  );
  let posSectorGroup = portfolioData.map(
    (position: { group: any }) => position.group,
  );

  if (posName === undefined) {
    posName = 'noName';
  }
  let tempPosition = [
    posName,
    posMarketValue,
    posPurchasePrice,
    posID,
    posSharesAmount,
    posTicker,
    posCurrency,
    posUnrealizedPNL,
    posSector,
    posMarketPrice,
    posSectorGroup,
  ];
  let positionsAmount = tempPosition[0].length;

  for (let i = 0; i < positionsAmount; i++) {
    if (tempPosition[4][i] > 0) {
      let positionPCT =
        (tempPosition[7][i] / (tempPosition[2][i] * tempPosition[4][i])) * 100;
      positionPCT = Number(positionPCT.toFixed(2));
      let isProfitable = false;

      if (positionPCT > 0) {
        isProfitable = true;
      }

      const company = companies.find(
        c => c.conId === tempPosition[3][i].toString(),
      );
      if (company !== undefined) {
        userStockData.push({
          company: company,
          sector: sectors.find(s => s.id === company?.sectorId),
          stocks: tempPosition[4][i],
          price:
            getCurrencySymbol(tempPosition[6][i]) +
            fractionNumber.format(tempPosition[1][i]),
          isProfitable: isProfitable,
          positionChange:
            (positionPCT > 0 ? '+' : '') +
            fractionNumber.format(positionPCT) +
            '%',
          singlePrice: tempPosition[2][i].toFixed(2),
          totalReturn: tempPosition[7][i].toFixed(2),
          currency: tempPosition[6].toString(),
        });
      }

      tradingChartData.push(tempPosition[1][i]);
      tradingChartLabels.push(tempPosition[0][i]);
      stockMarketValue = stockMarketValue + tempPosition[1][i];
      unrealizedPNL = unrealizedPNL + tempPosition[7][i];
      totalPurchasePrice =
        totalPurchasePrice + tempPosition[2][i] * tempPosition[4][i];
      calculatePNLPCT = Number(
        ((unrealizedPNL / totalPurchasePrice) * 100).toFixed(2),
      );
    }
  }
  return [
    userStockData,
    tradingChartData,
    tradingChartLabels,
    stockMarketValue,
    unrealizedPNL,
    calculatePNLPCT,
  ];
}

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
