const { createAccountsReport } = require("./createReport");
const { getTotalInvestmentByID } = require("./getTotalInvestmentByID");

const allAccounts = [
  "0x133ab4bda3053fb9d0bd801f3788ef7024f73539",
  "0x21cfda5050291658634d2a47d70b0ad0add687aa",
  "0xf82b7842c005ebc1bc775474ed2ea995bad85d52",
  "0xb67fc274be3bb5d2b894d026a6c3382843aaf92e",
  "0x4892fc926864a012d9074efc68d5f1ae344a65d1",
  "0x955751b7b9b640b17d3c67f34731156b6b66b30a",
  "0x815b38cecf776e4392fa927bca04a7061035690c",
  "0x3f276bbd01de74387b269432d183206a01b28e73",
  "0x800813acd09770454c60444e1c3a62023115c890",
  "0x6c5ba2236e46c9f297b5a9391ae66e54ce5ee104",
  "0x37c1bf0dc626e5480a82b41fd37aa4d7e38bd23e",
  "0xfa2b4b1d9a5e8cb1d242a2885aea8876e53ccb2b",
  "0xd5284a96626609793e0f310d0094d45a07e4b13e",
  "0x4019bc24c0ada7aaf475d2d521db74d9fc89ba02",
  "0xd83c0061a20c9fb62cc141ef6985505837e91da0",
  "0xe803510183f44fa2c805e40941a024998ee14de3",
  "0x460f3a4a9edde5779213c573c0032827b40e9538",
  "0x41e94293ae051fe7538c8771cd74d059376c55db",
  "0x7fe21dbf012316b6fcedd0408c2df58d7591cecf",
  "0xcf3c0cced74ef1603fe6a367f1862f81391a704e",
  "0x184a755c95c3e110ed2fee93c1bd99e584669716",
  "0x1c121e2470287d718378f60286cc96c015277836",
  "0xae5ca4d0a51942d2a635b218d0fb344d438df764",
  "0xda69285f3cff48c87a19f126ace1b5c8c8f63428",
  "0x78a21a7debcc87701069eef71776c220799596c8",
];

async function start() {
  const accountsInfo = await Promise.all(
    allAccounts.map((id, i) => {
      return new Promise((res) => {
        setTimeout(() => {
          res(getTotalInvestmentByID(id));
        }, 2000 * i);
      });
    })
  );

  // const totalInvestment = allAccountsValue.reduce((prev, cur) => prev + cur, 0);

  createAccountsReport(accountsInfo);
  // console.log(totalInvestment);

  // return totalInvestment;
}

start();
