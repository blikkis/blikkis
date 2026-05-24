export type MemberStatuses = Record<string, boolean>;

export const memberList = [
  { name: "Oscar",   key: "oscar" },
  { name: "Mike",    key: "mike" },
  { name: "Vikanes", key: "vikanes" },
  { name: "Tutt",    key: "tutt" },
  { name: "Fosse",   key: "fosse" },
  { name: "AnneMa",  key: "annema" },
  { name: "Lars",    key: "lars" },
  { name: "Affen",   key: "affen" },
  { name: "Fred",    key: "fred" },
  { name: "Syver",   key: "syver" },
  { name: "Sondre",  key: "sondre" },
  { name: "Hanna",   key: "hanna" },
  { name: "Bjærn",   key: "bjærn" },
  { name: "Simen",   key: "simen" },
];

export const defaultStatuses: MemberStatuses = {
  oscar: false, mike: false, vikanes: false, tutt: false,
  fosse: false, annema: false, lars: false, affen: false,
  fred: false, syver: false, sondre: true, hanna: false,
  "bjærn": false, simen: true,
};
