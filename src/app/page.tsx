
async function getData() {

  let fetchAuth = await fetch("https://staging.api.zeipt.io/auth/public", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: "6405ff6a-f4d2-451a-9ed2-7173aede9e45",
      provider_gcid: "01G3EZTHEHRGQMBMYFHCC34EHY"
    }),
  })
    .then((res) => res.json())

  let receipt = await fetch("https://staging.api.zeipt.io/app/user/receipt/fetch/transnr", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + fetchAuth
    },
    body: JSON.stringify({
      provider_gcid: "01G3EZTHEHRGQMBMYFHCC34EHY",
      zeipt_receipt_transnrs: ["01G3EZTHEHEYCQCCT21EWT5MTR"],
    }),
  })
    .then((response) => {

      if (response.status === 200) {
        return response.json();
      }
      throw new Error(response.status + ": " + response.statusText);
    })

    .catch((err) => {
      console.log('Can\'t fetch receipt;', err);
    })

  return receipt;
}

export default async function Home() {
  const data: any = await getData();
  console.log("Heiei", data);
  return <main>
    {data[0]?.total?.final_price}
  </main>;
}