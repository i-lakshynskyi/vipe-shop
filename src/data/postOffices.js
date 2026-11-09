/**
 * Postal offices and postal codes compiled from the official Posta Shqiptare
 * "Kodi Postar" regional directory.
 *
 * `region` is the section in the official directory.
 * `city` is the town/locality shown to the customer.
 * `office` is the postal office/area option for that town.
 * `postalCode` is the official postal code.
 *
 * This is a curated national starter dataset for the main towns and urban
 * postal offices. It is not the complete 533-office national network.
 * Source: https://www.postashqiptare.al/c/45/kodi-postar
 */

/**
 * @typedef {Object} PostOffice
 * @property {string} id
 * @property {string} region
 * @property {string} city
 * @property {string} office
 * @property {string} postalCode
 * @property {string|null} address
 * @property {number|null} latitude
 * @property {number|null} longitude
 * @property {string|null} locationSource
 * @property {string|null} locationSourceUrl
 * @property {boolean} hasMapLocation
 * @property {string|null} mapUrl
 * @property {'address_and_coordinates'|'coordinates_only'|'address_only'|'unavailable'} locationDataStatus
 */

/**
 * @param {string} region
 * @param {string} city
 * @param {[string, string, string][]} entries
 * @returns {PostOffice[]}
 */
const createOffices = (region, city, entries) =>
  entries.map(([id, office, postalCode]) => ({
    id,
    region,
    city,
    office,
    postalCode,
  }));

/** @type {PostOffice[]} */
const basePostOffices = [
  // Durrës region — Durrës
  ...createOffices('Durrës', 'Durrës', [
    ['durres-qender', 'Durres Qender', '2001'],
    ['durres-1', 'Durres 1', '2002'],
    ['durres-2', 'Durres 2', '2003'],
    ['durres-3', 'Durres 3', '2004'],
    ['durres-4', 'Durres 4', '2005'],
    ['durres-5', 'Durres 5', '2006'],
    ['durres-shkozet', 'ZP Shkozet', '2007'],
    ['durres-plazh', 'ZP Plazh', '2008'],
    ['durres-spitall', 'ZP Spitall', '2009'],
    ['durres-7', 'Durres 7', '2024'],
    ['durres-8', 'Durres 8', '2025'],
    ['durres-fidanishte', 'Fidanishte', '2026'],
  ]),
  ...createOffices('Durrës', 'Sukth', [['sukth', 'ZP Sukth', '2010']]),
  ...createOffices('Durrës', 'Shijak', [
    ['shijak', 'ZP Shijak', '2013'],
    ['shijak-1', 'ZP Shijak 1', '2014'],
  ]),
  ...createOffices('Durrës', 'Krujë', [['kruje', 'Kruje', '1501']]),
  ...createOffices('Durrës', 'Fushë-Krujë', [['fushe-kruje', 'Fushe Kruje', '1502']]),

  // Elbasan region
  ...createOffices('Elbasan', 'Elbasan', [
    ['elbasan-qender', 'Elbasan Qender 1', '3001'],
    ['elbasan-2', 'Elbasan 2', '3002'],
    ['elbasan-3', 'Elbasan 3.1', '3003'],
    ['elbasan-4', 'Elbasan 4', '3004'],
    ['elbasan-5', 'Elbasan 5', '3005'],
    ['elbasan-6', 'Elbasan 6', '3006'],
    ['elbasan-5-1', 'Elbasan 5/1', '3031'],
  ]),
  ...createOffices('Elbasan', 'Belsh', [['belesh', 'Belesh', '3008']]),
  ...createOffices('Elbasan', 'Cërrik', [
    ['cerrik', 'Cerrik', '3007'],
    ['cerrik-1', 'Cerrik 1', '3034'],
  ]),
  ...createOffices('Elbasan', 'Gramsh', [['gramsh', 'Gramsh', '3301']]),
  ...createOffices('Elbasan', 'Librazhd', [
    ['librazhd-1', 'Librazhd 1', '3401'],
    ['librazhd-2', 'Librazhd 2', '3402'],
  ]),
  ...createOffices('Elbasan', 'Prrenjas', [
    ['prrenjas-1', 'Prrenjas 1', '3403'],
    ['prrenjas-2', 'Prrenjas 2', '3404'],
  ]),

  // Gjirokastër region
  ...createOffices('Gjirokastër', 'Gjirokastër', [
    ['gjirokaster-qender', 'Qender Gjirokaster', '6001'],
    ['gjirokaster-1', 'Gjirokastra 1', '6002'],
  ]),
  ...createOffices('Gjirokastër', 'Tepelenë', [['tepelene', 'Tepelene', '6301']]),
  ...createOffices('Gjirokastër', 'Memaliaj', [['memaliaj', 'Memaliaj', '6302']]),
  ...createOffices('Gjirokastër', 'Përmet', [['permet', 'Permet', '6401']]),
  ...createOffices('Gjirokastër', 'Këlcyrë', [['kelcyre', 'Kelcyr', '6402']]),

  // Mat region
  ...createOffices('Mat', 'Burrel', [['burrel', 'Burrel', '8001']]),
  ...createOffices('Mat', 'Klos', [['mat-klos', 'Klos', '8002']]),
  ...createOffices('Mat', 'Peshkopi', [['peshkopi', 'Peshkopi', '8301']]),
  ...createOffices('Mat', 'Bulqizë', [
    ['bulqize', 'Bulqize', '8401'],
    ['bulqize-1', 'Bulqiza 1', '8402'],
  ]),

  // Berat region
  ...createOffices('Berat', 'Berat', [
    ['berat-1', 'Berati 1', '5001'],
    ['berat-2', 'Berati 2', '5002'],
    ['berat-qender', 'Berati Qender', '5003'],
    ['berat-4', 'Berati 4', '5004'],
    ['berat-5', 'Berati 5', '5005'],
    ['berat-6', 'Berati 6', '5006'],
  ]),
  ...createOffices('Berat', 'Kuçovë', [['kucove', 'Kucove Qender', '5301']]),
  ...createOffices('Berat', 'Çorovodë', [
    ['corovode-1', 'Corovoda 1', '5401'],
    ['corovode-2', 'Corovoda 2', '5402'],
  ]),
  ...createOffices('Berat', 'Poliçan', [
    ['polican-1', 'Policani 1', '5403'],
    ['polican-2', 'Policani 2', '5404'],
  ]),

  // Shkodër region
  ...createOffices('Shkodër', 'Shkodër', [
    ['shkoder-qender', 'Shkoder Qender', '4001'],
    ['shkoder-1', 'Shkoder 1', '4002'],
    ['shkoder-2', 'Shkoder 2', '4003'],
    ['shkoder-3', 'Shkoder 3', '4004'],
    ['shkoder-4', 'Shkoder 4', '4005'],
    ['shkoder-5', 'Shkoder 5', '4006'],
    ['shkoder-9', 'Shkoder 9', '4033'],
    ['shkoder-12', 'Shkoder 12', '4034'],
  ]),
  ...createOffices('Shkodër', 'Vau i Dejës', [['vau-dejes', 'Vau Dejes', '4008']]),
  ...createOffices('Shkodër', 'Koplik', [['koplik', 'Qender Koplik', '4301']]),
  ...createOffices('Shkodër', 'Pukë', [['puke', 'Puke', '4401']]),
  ...createOffices('Shkodër', 'Fushë-Arrëz', [['fushe-arrez', 'Fush-Arrez', '4402']]),

  // Lezhë region
  ...createOffices('Lezhë', 'Lezhë', [
    ['lezhe-qender', 'Lezhe Qender', '4501'],
    ['lezhe-1', 'Lezha 1', '4502'],
  ]),
  ...createOffices('Lezhë', 'Shëngjin', [['shengjin', 'Shengjin', '4503']]),
  ...createOffices('Lezhë', 'Laç', [
    ['lac-qender', 'Lac Qender', '4701'],
    ['lac-1', 'Lac 1', '4702'],
  ]),
  ...createOffices('Lezhë', 'Rrëshen', [
    ['rreshen-qender', 'Rreshen Qender', '4601'],
    ['rreshen-1', 'Rreshen 1', '4602'],
  ]),
  ...createOffices('Lezhë', 'Rubik', [['rubik', 'Rubik', '4603']]),

  // Tiranë region
  ...createOffices('Tiranë', 'Tiranë', [
    ['tirane-1001', 'Tirana 5', '1001'],
    ['tirane-1002', 'Tirana 26', '1002'],
    ['tirane-1003', 'Tirana 13', '1003'],
    ['tirane-1004', 'Tirana 18', '1004'],
    ['tirane-1005', 'Tirana 14', '1005'],
    ['tirane-1006', 'Tirana 22', '1006'],
    ['tirane-1007', 'Tirana 10', '1007'],
    ['tirane-1057', 'Tirana 5/1', '1057'],
    ['tirane-1061', 'Tirana 15', '1061'],
    ['tirane-1060', 'Tirana 2', '1060'],
    ['tirane-1008', 'Tirana 30', '1008'],
    ['tirane-1058', 'Tirana 50', '1058'],
    ['tirane-1010', 'Tirana 1', '1010'],
    ['tirane-1011', 'Tirana 29', '1011'],
    ['tirane-1012', 'Tirana 19', '1012'],
    ['tirane-1013', 'Tirana 24', '1013'],
    ['tirane-1014', 'Tirana 27', '1014'],
    ['tirane-1015', 'Tirana 32', '1015'],
    ['tirane-1016', 'Tirana 4', '1016'],
    ['tirane-1017', 'Tirana 3', '1017'],
    ['tirane-1018', 'Tirana 31', '1018'],
    ['tirane-1019', 'Tirana 8', '1019'],
    ['tirane-1020', 'Tirana 8/1', '1020'],
    ['tirane-1021', 'Tirana 8/2', '1021'],
    ['tirane-1022', 'Tirana 33', '1022'],
    ['tirane-1023', 'Tirana 9', '1023'],
    ['tirane-1024', 'Tirana 21', '1024'],
    ['tirane-1025', 'Tirana 7', '1025'],
    ['tirane-1026', 'Tirana 23', '1026'],
    ['tirane-1027', 'Tirana 6', '1027'],
    ['tirane-1028', 'Tirana 28', '1028'],
    ['tirane-1031', 'Tirana 11', '1031'],
    ['tirane-1062', 'Tirana 16', '1062'],
    ['tirane-1063', 'Tirana 17', '1063'],
    ['tirane-1064', 'Tirana 20', '1064'],
    ['tirane-1065', 'Tirana 25', '1065'],
  ]),
  ...createOffices('Tiranë', 'Kamëz', [
    ['kamez-institut', 'Kamez Institut', '1029'],
    ['kamez', 'Kamez', '1030'],
  ]),
  ...createOffices('Tiranë', 'Vorë', [['vore', 'Vore', '1032']]),
  ...createOffices('Tiranë', 'Kavajë', [
    ['kavaje-qender', 'Kavaje Qender', '2501'],
    ['kavaje-1', 'Kavaja 1', '2502'],
  ]),
  ...createOffices('Tiranë', 'Rrogozhinë', [['rrogozhine', 'Rrogozhine', '2503']]),
  ...createOffices('Tiranë', 'Golem', [['golem-kavaje', 'Golem', '2504']]),

  // Sarandë region
  ...createOffices('Sarandë', 'Sarandë', [
    ['sarande-qender', 'Qender Sarande', '9701'],
    ['sarande-lagje-1', 'Lagje Nr 1 Sarande', '9702'],
    ['sarande-gjashte', 'Gjashte', '9703'],
  ]),
  ...createOffices('Sarandë', 'Delvinë', [['delvine', 'Delvine', '9704']]),
  ...createOffices('Sarandë', 'Konispol', [['konispol', 'Konispol', '9705']]),
  ...createOffices('Sarandë', 'Ksamil', [['ksamil', 'Ksamil', '9706']]),

  // Korçë region
  ...createOffices('Korçë', 'Korçë', [
    ['korce-qender', 'Korce Qender', '7001'],
    ['korce-1', 'Korce 1', '7002'],
    ['korce-2', 'Korce 2', '7003'],
    ['korce-3', 'Korce 3', '7004'],
    ['korce-4', 'Korce 4', '7034'],
  ]),
  ...createOffices('Korçë', 'Maliq', [['maliq', 'Maliq', '7005']]),
  ...createOffices('Korçë', 'Bilisht', [['bilisht', 'Bilisht', '7006']]),
  ...createOffices('Korçë', 'Ersekë', [['erseke', 'Erseke', '7401']]),
  ...createOffices('Korçë', 'Pogradec', [
    ['pogradec', 'Pogradec', '7301'],
    ['pogradec-1', 'Pogradec 1', '7302'],
    ['pogradec-2', 'Pogradec 2', '7303'],
  ]),

  // Fier region
  ...createOffices('Fier', 'Fier', [
    ['fier-qender', 'Fier Qender', '9301'],
    ['fier-1', 'Fieri 1', '9302'],
    ['fier-2', 'Fieri 2', '9303'],
    ['fier-3', 'Fieri 3', '9304'],
    ['fier-4', 'Fieri 4', '9305'],
  ]),
  ...createOffices('Fier', 'Roskovec', [['roskovec', 'Roskovec', '9306']]),
  ...createOffices('Fier', 'Patos', [['patos', 'Patos', '9307']]),
  ...createOffices('Fier', 'Ballsh', [['ballsh', 'Ballsh', '9308']]),

  // Vlorë region
  ...createOffices('Vlorë', 'Vlorë', [
    ['vlore-qender', 'Vlora Qender', '9401'],
    ['vlore-1', 'Vlora 1', '9402'],
    ['vlore-2', 'Vlora 2', '9403'],
    ['vlore-skele', 'Skele', '9404'],
    ['vlore-uji-ftohte', 'Uji Ftohte', '9405'],
    ['vlore-3', 'Vlora 3', '9428'],
    ['vlore-4', 'Vlora 4', '9429'],
  ]),
  ...createOffices('Vlorë', 'Himarë', [['himare', 'Himare', '9425']]),
  ...createOffices('Vlorë', 'Orikum', [['orikum', 'Orikum', '9426']]),
  ...createOffices('Vlorë', 'Selenicë', [['selenice', 'Selenice', '9427']]),

  // Lushnje region
  ...createOffices('Lushnje', 'Lushnje', [
    ['lushnje-qender', 'Lushnja Qender', '9001'],
    ['lushnje-1', 'Lushnja 1', '9023'],
  ]),
  ...createOffices('Lushnje', 'Divjakë', [['divjake', 'Divjak', '9022']]),

  // Kukës region
  ...createOffices('Kukës', 'Kukës', [
    ['kukes-qender', 'Kukes Qender', '8501'],
    ['kukes-1', 'Kukes 1', '8502'],
  ]),
  ...createOffices('Kukës', 'Krumë', [['krume', 'Krume', '8602']]),
  ...createOffices('Kukës', 'Bajram Curri', [
    ['bajram-curri-qender', 'Bajram Curri Qender', '8701'],
    ['bajram-curri-1', 'Bajram Curri 1', '8702'],
  ]),
];

/**
 * Location data is added only when a matching post office could be identified
 * in a map or local-business directory. Missing values intentionally remain null.
 * Coordinates are used to build a precise Google Maps destination link.
 */
const officeLocations = {
  'durres-qender': {
    address: 'Rruga Ismail Beja, Durrës, Albania',
    latitude: 41.3174802,
    longitude: 19.4487378,
    locationSource: 'Courierslist',
    locationSourceUrl:
      'https://www.courierslist.com/detail/albania/durr%C3%ABs/post-office/975053/posta-shqiptare-durr%C3%ABs-zp-qend%C3%ABr-2001',
  },
  'durres-plazh': {
    address: 'Rruga Pavarësia, Durrës, Albania',
    latitude: 41.3067993,
    longitude: 19.4921935,
    locationSource: 'Courierslist / Waze',
    locationSourceUrl:
      'https://www.waze.com/live-map/directions/al/qarku-i-durresit/durres/posta-shqiptare-durres-zp-plazh-2008?to=place.ChIJoTXtkpnZTxMRU9xJ8XyUMR8',
  },
  'tirane-1001': {
    address: null,
    latitude: 41.32708,
    longitude: 19.81584,
    locationSource: 'OpenStreetMap via Mapcarta',
    locationSourceUrl: 'https://mapcarta.com/W232052083',
  },
  'tirane-1002': {
    address: 'Rruga e Kavajës, Tiranë, Albania',
    latitude: 41.32766,
    longitude: 19.80874,
    locationSource: 'OpenStreetMap via Mapcarta',
    locationSourceUrl: 'https://mapcarta.com/N10925191816',
  },
  'tirane-1005': {
    address: 'Sheshi Franc J. Shtraus, Tiranë, Albania',
    latitude: 41.33539,
    longitude: 19.8363,
    locationSource: 'OpenStreetMap via Mapcarta',
    locationSourceUrl: 'https://mapcarta.com/N11081997359',
  },
  'tirane-1006': {
    address: 'Rruga Kujtim Laro, Tiranë, Albania',
    latitude: 41.33918,
    longitude: 19.84044,
    locationSource: 'OpenStreetMap via Mapcarta',
    locationSourceUrl: 'https://mapcarta.com/N11677815103',
  },
  'tirane-1007': {
    address: 'Rruga e Dibrës, Tiranë, Albania',
    latitude: 41.34452,
    longitude: 19.83696,
    locationSource: 'OpenStreetMap via Mapcarta',
    locationSourceUrl: 'https://mapcarta.com/N11070168452',
  },
  'tirane-1010': {
    address: 'Rruga e Elbasanit, Pallati 1, Njësia 2, Tiranë, Albania',
    latitude: 41.3233334,
    longitude: 19.824605,
    locationSource: 'Courierslist',
    locationSourceUrl:
      'https://www.courierslist.com/detail/albania/tirana/post-office/1068827/posta-shqiptare-tiran%C3%AB-zp-nr1-1010',
  },
  'tirane-1011': {
    address: null,
    latitude: 41.3209075,
    longitude: 19.8248774,
    locationSource: 'Courierslist',
    locationSourceUrl: 'https://www.courierslist.com/category/albania/tirana/post-office?pid=1',
  },
  'tirane-1013': {
    address: 'Rruga Pjetër Bogdani, Tiranë, Albania',
    latitude: 41.3206374,
    longitude: 19.811892,
    locationSource: 'Courierslist',
    locationSourceUrl: 'https://www.courierslist.com/category/albania/tirana/post-office?pid=1',
  },
  'tirane-1016': {
    address: 'Bulevardi Zogu I, Tiranë, Albania',
    latitude: 41.3320371,
    longitude: 19.8176224,
    locationSource: 'Courierslist',
    locationSourceUrl: 'https://www.courierslist.com/category/albania/tirana/post-office?pid=1',
  },
  'tirane-1017': {
    address: 'Rruga Muhamet Malo, Tiranë, Albania',
    latitude: 41.33869,
    longitude: 19.82585,
    locationSource: 'OpenStreetMap via Mapcarta',
    locationSourceUrl: 'https://mapcarta.com/N12055394386',
  },
  'tirane-1018': {
    address: 'Rruga Ali Pashë Gucia, Tiranë, Albania',
    latitude: 41.3350194,
    longitude: 19.8246743,
    locationSource: 'Courierslist',
    locationSourceUrl: 'https://www.courierslist.com/category/albania/tirana/post-office?pid=1',
  },
  'tirane-1019': {
    address: 'Rruga Sulejman Delvina, Tiranë, Albania',
    latitude: 41.3179939,
    longitude: 19.8132106,
    locationSource: 'Courierslist',
    locationSourceUrl: 'https://www.courierslist.com/category/albania/tirana/post-office?pid=1',
  },
  'tirane-1021': {
    address: 'Rruga Sulejman Delvina, Tiranë, Albania',
    latitude: 41.3191421,
    longitude: 19.8081277,
    locationSource: 'Courierslist',
    locationSourceUrl: 'https://www.courierslist.com/category/albania/tirana/post-office?pid=1',
  },
  'tirane-1023': {
    address: null,
    latitude: 41.3258019,
    longitude: 19.8030419,
    locationSource: 'Courierslist',
    locationSourceUrl: 'https://www.courierslist.com/category/albania/tirana/post-office?pid=1',
  },
  'tirane-1024': {
    address: 'Rruga Sali Butka 11, Tiranë, Albania',
    latitude: 41.32318,
    longitude: 19.8007529,
    locationSource: 'Courierslist',
    locationSourceUrl: 'https://www.courierslist.com/category/albania/tirana/post-office?pid=1',
  },
  'tirane-1025': {
    address: 'Rruga Lord Bajron, Tiranë, Albania',
    latitude: 41.3399742,
    longitude: 19.794244,
    locationSource: 'Courierslist',
    locationSourceUrl: 'https://www.courierslist.com/category/albania/tirana/post-office?pid=1',
  },
  'tirane-1064': {
    address: 'Ish-Fusha e Aviacionit, Tiranë, Albania',
    latitude: 41.3329125,
    longitude: 19.7931559,
    locationSource: 'Courierslist',
    locationSourceUrl: 'https://www.courierslist.com/category/albania/tirana/post-office?pid=1',
  },
  'vlore-qender': {
    address: 'L. 28 Nëntori, Rr. Tsim Jonuzi, Pallati 1156, Vlorë, Albania',
    latitude: null,
    longitude: null,
    locationSource: 'Albtiko',
    locationSourceUrl:
      'https://albtiko.com/subjekte/shqiperi/vlore-1/vlore-3/zyra-postare-vlora-qender/',
  },
  'vlore-1': {
    address: 'L. Isa Boletini, Rr. Bulevardi Ismail Qemali, Pallati 372, Vlorë, Albania',
    latitude: 40.4615316,
    longitude: 19.4892417,
    locationSource: 'Albtiko / Courierslist',
    locationSourceUrl:
      'https://albtiko.com/subjekte/shqiperi/vlore-1/vlore-3/zyra-postare-vlora-1/',
  },
  'sarande-qender': {
    address: null,
    latitude: 39.87431,
    longitude: 20.00857,
    locationSource: 'OpenStreetMap via Mapcarta',
    locationSourceUrl: 'https://mapcarta.com/N6870927594',
  },
};

export const postOffices = basePostOffices.map((office) => {
  const location = officeLocations[office.id] ?? {};
  const address = location.address ?? null;
  const latitude = location.latitude ?? null;
  const longitude = location.longitude ?? null;
  const hasMapLocation = Number.isFinite(latitude) && Number.isFinite(longitude);

  let locationDataStatus = 'unavailable';

  if (address && hasMapLocation) {
    locationDataStatus = 'address_and_coordinates';
  } else if (hasMapLocation) {
    locationDataStatus = 'coordinates_only';
  } else if (address) {
    locationDataStatus = 'address_only';
  }

  return {
    ...office,
    address,
    latitude,
    longitude,
    locationSource: location.locationSource ?? null,
    locationSourceUrl: location.locationSourceUrl ?? null,
    hasMapLocation,
    mapUrl: hasMapLocation
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${latitude},${longitude}`)}`
      : null,
    locationDataStatus,
  };
});

export const postalCities = [...new Set(postOffices.map((office) => office.city))].sort((a, b) =>
  a.localeCompare(b, 'sq')
);

