export async function fetchPortfolio() {
  try {
    const endpoint =
      'https://us-central1-makeimpact-test.cloudfunctions.net/ibportfolioPaper';
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Caught err' + err);
  }
}

export async function fetchAccountDetails() {
  try {
    const endpoint =
      'https://us-central1-makeimpact-test.cloudfunctions.net/ibaccountDetailsPaper';
    const response = await fetch(endpoint);
    const data = await response.json();
    return data[0];
  } catch (err) {
    console.log('Caught err' + err);
  }
}

export async function fetchAccountBalance() {
  try {
    const endpoint =
      'https://us-central1-makeimpact-test.cloudfunctions.net/ibCashBalancePaper';
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Caught err' + err);
  }
}

export async function fetchStockPrice(accountId: string, conId: string) {
  try {
    const endpoint =
      'https://us-central1-makeimpact-test.cloudfunctions.net/ibGetInstrumentPricePaper?accountId=' +
      accountId +
      '&conid=' +
      conId;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Caught err' + err);
  }
}

export async function fetchActiveOrders() {
  try {
    const endpoint =
      'https://us-central1-makeimpact-test.cloudfunctions.net/ibActiveOrdersPaper';
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Caught err' + err);
  }
}

export async function fetchPreviewOrder(
  accountId: string,
  conId: string,
  quantity: number,
  type: string,
) {
  try {
    const endpoint =
      'https://us-central1-makeimpact-test.cloudfunctions.net/previewOrderPaper?ibAccountIdPaper=' +
      accountId;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conid: conId,
        orderType: 'MKT',
        side: type,
        tif: 'DAY',
        quantity: quantity,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Caught err' + err);
  }
}

export async function postAnOrder(
  accountId: string,
  conId: string,
  quantity: number,
  type: string,
) {
  try {
    const endpoint =
      'https://us-central1-makeimpact-test.cloudfunctions.net/ibPlaceOrderPaper?accountId=' +
      accountId;
    const body = JSON.stringify({
      conid: parseInt(conId, 10),
      orderType: 'MKT',
      side: type,
      tif: 'DAY',
      quantity: quantity,
    });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    };
    const response = await fetch(endpoint, options);
    if (response.status === 500 && response.statusText !== '') {
      console.log(response);
      return 'Error';
    } else {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log('Caught err' + err);
  }
}
