export interface ActiveOrder {
  acct: string;
  bgColor: string;
  cashCcy: string;
  companyName: string;
  conid: number;
  conidex: string;
  description1: string;
  fgColor: string;
  filledQuantity: number;
  lastExecutionTime: string;
  lastExecutionTime_r: number;
  listingExchange: string;
  orderDesc: string;
  orderId: number;
  orderType: string;
  origOrderType: string;
  price: string;
  remainingQuantity: number;
  secType: string;
  side: string;
  sizeAndFills: string;
  status: string;
  supportsTaxOpt: string;
  ticker: string;
  timeInForce: string;
  avgPrice: string;
}
