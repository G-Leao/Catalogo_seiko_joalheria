/* =============================================================
   products.js — BASE DE DADOS DOS PRODUTOS + CAMADA DE PERSISTÊNCIA
   -------------------------------------------------------------
   >>> COMO EDITAR O CATÁLOGO MANUALMENTE:
   Altere o array DEFAULT_PRODUCTS abaixo.

   >>> IMAGENS:
   Coloque as fotos reais em:  /assets/relogios/
   Ex.: /assets/relogios/seiko-01.jpg
   Enquanto o arquivo real não existir, o site mostra
   automaticamente um PLACEHOLDER identificado.

   >>> ATENÇÃO:
   As especificações abaixo são DEMONSTRATIVAS (placeholder).
   Substitua pelos dados reais de cada referência antes de publicar.
   Campos vazios ("") simplesmente NÃO aparecem no site.

   >>> TROCAR LocalStorage POR API / SUPABASE / FIREBASE:
   Basta reescrever os 3 métodos de Storage no final deste arquivo
   (load / save). O resto da aplicação não precisa mudar.
   ============================================================= */

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    brand: "Seiko",
    collection: "Prospex",
    name: "Seiko Prospex",
    model: "SSC965",
    reference: "SSC965B1-A1SX",
    price: "10X R$787,50",
    image: "./assets/relogios/SSC965B1-A1SX.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Solar",
      caliber: "V192",
      case: "Aço inoxidável",
      diameter: "39 mm",
      thickness: "13,3 mm",
      material: "Aço inoxidável",
      glass: "Safira curvo, antirreflexo na face interna",
      bracelet: "Aço inoxidável",
      waterResistance: "10 bar / 100 m",
      powerReserve: "Aproximadamente 6 meses com carga completa",
      functions:
        "Cronógrafo até 60 min em incrementos de 1/5 s, indicador de 24 h, segundos pequenos, data, reserva de marcha e proteção contra sobrecarga",
      dialColor: "Verde-claro / verde-menta",
    },
  },

  {
    id: 2,
    brand: "Seiko",
    collection: "Presage",
    name: "Seiko Presage Cocktail MockingBird",
    model: "SRPE15",
    reference: "SRPE15J1-E1SX",
    price: "10X R$ 478,50",
    image: "./assets/relogios/SRP15J1-E1SX.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R35",
      case: "Aço inoxidável",
      diameter: "40,5 mm",
      thickness: "11,8 mm",
      material: "Couro",
      glass: "Hardlex em formato box",
      bracelet: "Couro",
      waterResistance: "5 ATM / 50 m",
      powerReserve: "Aproximadamente 41 horas",
      functions: "Parada de segundos e calendário/data",
      dialColor: "Verde, acabamento texturizado tipo sunray",
    },
  },
  {
    id: 3,
    brand: "Seiko",
    collection: "Prospex",
    name: "Seiko Samurai PADI",
    model: "SRPL53",
    reference: "SRPL53B1-E1SX",
    price: "10X R$ 597,50",
    image: "./assets/relogios/SRPL53B1-E1SX.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R35",
      case: "Aço inoxidável",
      diameter: "41,7 mm",
      thickness: "12,3 mm",
      material: "Aço inoxidável",
      glass: "Hardlex",
      bracelet: "Aço inoxidável",
      waterResistance: "Diver's 200 m",
      powerReserve: "Aproximadamente 41 horas",
      functions:
        "Parada de segundos, calendário/data e bisel rotativo unidirecional",
      dialColor: "Verde",
    },
  },

  {
    id: 4,
    brand: "Seiko",
    collection: "Prospex",
    name: "Seiko Samurai Save the Ocean",
    model: "SRPE33",
    reference: "SRPE33K1-D1SX",
    price: "10X R$497,50",
    image: "./assets/relogios/SRPE33K1-D1SX.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R35",
      case: "Aço inoxidável",
      diameter: "43,8 mm",
      thickness: "12,8 mm",
      material: "Aço inoxidável",
      glass: "Cristal de safira com antirreflexo interno",
      bracelet: "Aço inoxidável",
      waterResistance: "Diver's 200 m",
      powerReserve: "Aproximadamente 41 horas",
      functions: "Parada de segundos, data e bisel rotativo unidirecional",
      dialColor: "Azul",
    },
  },
  {
    id: 5,
    brand: "Seiko",
    collection: "Prospex",
    name: "Seiko Samurai",
    model: "SRPL11",
    reference: "SRPL11B1-N1SX",
    price: "10X R$ 597,50",
    image: "./assets/relogios/SRPL11B1-N1SX.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R35",
      case: "Aço inoxidável",
      diameter: "41,7 mm",
      thickness: "12,3 mm",
      material: "Aço inoxidável",
      glass: "Hardlex",
      bracelet: "Aço inoxidável",
      waterResistance: "Diver's 200 m",
      powerReserve: "Aproximadamente 41 horas",
      functions: "Parada de segundos, data e bisel rotativo unidirecional",
      dialColor: "Vermelho",
    },
  },
  {
    id: 6,
    brand: "Seiko",
    collection: "Prospex",
    name: "Seiko Samurai",
    model: "SRPL51",
    reference: "SRPL51B1-D1SX",
    price: "10X R$ 597,50",
    image: "./assets/relogios/SRPL51B1-D1SX.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R35",
      case: "Aço inoxidável",
      diameter: "41,7 mm",
      thickness: "12,3 mm",
      material: "Aço inoxidável",
      glass: "Hardlex",
      bracelet: "Aço inoxidável",
      waterResistance: "Diver's 200 m",
      powerReserve: "Aproximadamente 41 horas",
      functions: "Parada de segundos, data e bisel rotativo unidirecional",
      dialColor: "Azul",
    },
  },
  {
    id: 7,
    brand: "Seiko",
    collection: "Seiko 5 Sports GMT",
    name: "Seiko 5 Sports GMT",
    model: "SSK003",
    reference: "SSK003B1-D1SX",
    price: "10X R$478,50",
    image: "./assets/relogios/SSK003B1-D1SX.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R34",
      case: "Aço inoxidável",
      diameter: "42,5 mm",
      thickness: "13,6 mm",
      material: "Aço inoxidável",
      glass: "Hardlex com lente de aumento",
      bracelet: "Aço inoxidável",
      waterResistance: "10 ATM / 100 m",
      powerReserve: "Aproximadamente 41 horas",
      functions:
        "GMT/segundo fuso horário, indicador de 24 h, data, parada de segundos e bisel rotativo de 24 h",
      dialColor: "Azul",
    },
  },
  {
    id: 8,
    brand: "Seiko",
    collection: "Seiko 5 Sports GMT",
    name: "Seiko 5 Sports GMT",
    model: "SSK001",
    reference: "SSK001B1-P1SX",
    price: "10X R$ 478,50",
    image: "./assets/relogios/SSK001B1-P1SX.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R34",
      case: "Aço inoxidável",
      diameter: "42,5 mm",
      thickness: "13,6 mm",
      material: "Aço inoxidável",
      glass: "Hardlex com lente de aumento",
      bracelet: "Aço inoxidável",
      waterResistance: "10 ATM / 100 m",
      powerReserve: "Aproximadamente 41 horas",
      functions:
        "GMT/segundo fuso horário, indicador de 24 h, data, parada de segundos e bisel rotativo de 24 h",
      dialColor: "Preto",
    },
  },
  {
    id: 9,
    brand: "Seiko",
    collection: "Seiko 5 Sports GMT",
    name: "Seiko 5 Sports GMT Field",
    model: "SSK059",
    reference: "SSK059B1-B2SX",
    price: "10X R$ 478,50",
    image: "./assets/relogios/SSK059B1-B2SX.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R34",
      case: "Aço inoxidável",
      diameter: "39,4 mm",
      thickness: "13,6 mm",
      material: "Aço inoxidável",
      glass: "Hardlex curvo",
      bracelet: "Aço inoxidável",
      waterResistance: "10 bar / 100 m",
      powerReserve: "Aproximadamente 41 horas",
      functions:
        "GMT/segundo fuso horário, indicador de 24 h, data e parada de segundos",
      dialColor: "Branco/prateado",
    },
  },
  {
    id: 10,
    brand: "Seiko",
    collection: "SKX",
    name: "Seiko SKX",
    model: "SRPL85",
    reference: "SRPL85B1-P1SX",
    price: "10X R$ 370",
    image: "./assets/relogios/SRPL85B1-P1SX.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R36",
      case: "Aço inoxidável",
      diameter: "42,5 mm",
      thickness: "13,9 mm",
      material: "Aço inoxidável",
      glass: "Hardlex curvo",
      bracelet: "Aço inoxidável",
      waterResistance: "10 ATM / 100 m",
      powerReserve: "Aproximadamente 41 horas",
      functions: "Parada de segundos, dia/data e bisel rotativo unidirecional",
      dialColor: "Preto",
    },
  },
  {
    id: 11,
    brand: "Seiko",
    collection: "Seiko 5 Sports",
    name: "Seiko 5 Sports",
    model: "SRPD65",
    reference: "SRPD65B1-P1SX",
    price: "10X R$ 340",
    image: "./assets/relogios/SRPD65B1-P1SX.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R36",
      case: "Aço inoxidável com revestimento rígido",
      diameter: "42,5 mm",
      thickness: "13,4 mm",
      material: "Aço inoxidável com revestimento rígido",
      glass: "Hardlex",
      bracelet: "Aço inoxidável",
      waterResistance: "10 ATM / 100 m",
      powerReserve: "Aproximadamente 41 horas",
      functions: "Parada de segundos, dia/data e bisel rotativo unidirecional",
      dialColor: "Preto",
    },
  },
  {
    id: 12,
    brand: "Seiko",
    collection: "Reduced",
    name: "Seiko 5 Sports / Reduced",
    model: "SRPK29",
    reference: "SRPK29B1-P1SX",
    price: "10X R$ 275,50",
    image: "./assets/relogios/SRPK29B1-P1SX.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R36",
      case: "Aço inoxidável",
      diameter: "38 mm",
      thickness: "12,1 mm",
      material: "Aço inoxidável",
      glass: "Hardlex",
      bracelet: "Aço inoxidável",
      waterResistance: "10 bar / 100 m",
      powerReserve: "Aproximadamente 41 horas",
      functions: "Parada de segundos, dia/data e bisel rotativo unidirecional",
      dialColor: "Preto",
    },
  },
  {
    id: 13,
    brand: "Seiko",
    collection: "Reduced",
    name: "Seiko Reduced",
    model: "SRPL79",
    reference: "SRPL79B1-G1SX",
    price: "10X R$340",
    image: "./assets/relogios/SRBL79B1-G1SX.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R36",
      case: "Aço inoxidável",
      diameter: "38 mm",
      thickness: "12,1 mm",
      material: "Aço inoxidável",
      glass: "Hardlex",
      bracelet: "Aço inoxidável",
      waterResistance: "10 bar / 100 m",
      powerReserve: "Aproximadamente 41 horas",
      functions: "Parada de segundos, dia/data e bisel rotativo unidirecional",
      dialColor: "Cinza escuro/preto",
    },
  },
  /* {
    id: 14,
    brand: "Seiko",
    collection: "Seiko 5 Sports",
    name: "Seiko 5 Sports",
    model: "SRPD51",
    reference: "SRPD51B1-D1SX",
    price: "R$ 0.000,00",
    image: "/assets/relogios/seiko-14.jpg",
    available: true,
    visible: true,
  },*/
  {
    id: 15,
    brand: "Seiko",
    collection: "King Turtle",
    name: "Seiko King Turtle / PADI",
    model: "SRPK01",
    reference: "SRPK01B1-D1SX",
    price: "10X R$ 627,50",
    image: "./assets/relogios/SRPK01B1-D1SX.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R36",
      case: "Aço inoxidável",
      diameter: "45 mm",
      thickness: "13,2 mm",
      material: "Aço inoxidável",
      glass: "Cristal de safira com lupa e antirreflexo interno",
      bracelet: "Aço inoxidável",
      waterResistance: "Diver's 200 m",
      powerReserve: "Aproximadamente 41 horas",
      functions: "Parada de segundos, dia/data e bisel rotativo unidirecional",
      dialColor: "Azul",
    },
  },
  {
    id: 16,
    brand: "Seiko",
    collection: "Presage",
    name: "Seiko Presage Azul Gelo",
    model: "SRPB43J1",
    reference: "SRPB43J1",
    price: "10X R$ 398,50",
    image: "./assets/relogios/SRPB43J1.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R35",
      case: "Aço inoxidável",
      diameter: "40,5 mm",
      thickness: "11,8 mm",
      material: "Couro de vaca",
      glass: "Hardlex em formato box",
      bracelet: "Couro",
      waterResistance: "5 ATM / 50 m",
      powerReserve: "Aproximadamente 41 horas",
      functions: "Parada de segundos e data",
      dialColor: "Azul-claro/prateado",
    },
  },

  {
    id: 17,
    brand: "Seiko",
    collection: "Prospex",
    name: "Seiko Prospex Turtle",
    model: "SRPE93B1",
    reference: "SRPE93B1 P1PX",
    price: "10X R$ 478,50",
    image: "./assets/relogios/SRPE93B1 P1PX.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R36",
      case: "Aço inoxidável",
      diameter: "45 mm",
      thickness: "13,4 mm",
      material: "Silicone",
      glass: "Hardlex",
      bracelet: "Silicone",
      waterResistance: "Diver's 200 m",
      powerReserve: "Aproximadamente 41 horas",
      functions:
        "Parada de segundos, dia/data, corda manual e bisel rotativo unidirecional",
      dialColor: "Preto",
    },
  },

  // Seiko Presage SSK049 J1 — Presage GMT
  {
    id: 18,
    brand: "Seiko",
    collection: "Presage",
    name: "Seiko Presage GMT",
    model: "SSK049",
    reference: "SSK049J1",
    price: "10X R$ 589,50",
    image: "./assets/relogios/SSK049J1.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R34",
      case: "Aço inoxidável",
      diameter: "40,5 mm",
      thickness: "12,8 mm",
      material: "Aço inoxidável",
      glass: "Hardlex em formato de caixa",
      bracelet: "Couro de vaca",
      waterResistance: "5 ATM",
      powerReserve: "Aproximadamente 41 horas",
      functions:
        "Ponteiro de 24 horas (segundo fuso horário), parada de segundos e data",
    },
  },

  // Seiko Presage SSA441 J1 — Open Heart
  {
    id: 19,
    brand: "Seiko",
    collection: "Presage",
    name: "Seiko Presage Open Heart",
    model: "SSA441",
    reference: "SSA441J1",
    price: "10X R$ 438,50",
    image: "./assets/relogios/SSA441J1.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R38",
      case: "Aço inoxidável",
      diameter: "40,5 mm",
      thickness: "11,8 mm",
      material: "Aço inoxidável",
      glass: "Hardlex em formato de caixa",
      bracelet: "Aço inoxidável",
      waterResistance: "5 ATM",
      powerReserve: "Aproximadamente 41 horas",
      functions: "Parada de segundos",
    },
  },

  // Seiko Presage SRP45 J1 — Mojito / Negroni
  {
    id: 20,
    brand: "Seiko",
    collection: "Presage",
    name: "Seiko Presage Mojito",
    model: "SRP45",
    reference: "SRPE45J1",
    price: "10X R$ 438,50",
    image: "./assets/relogios/SRP45J1.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R35",
      case: "Aço inoxidável",
      diameter: "38,5 mm",
      thickness: "11,8 mm",
      material: "Aço inoxidável",
      glass: "Hardlex",
      bracelet: "Couro",
      waterResistance: "5 ATM",
      powerReserve: "Aproximadamente 41 horas",
      functions: "Parada de segundos e data",
    },
  },

  // Seiko Presage SRPD37 J1
  {
    id: 21,
    brand: "Seiko",
    collection: "Presage",
    name: "Seiko Presage",
    model: "SRPD37",
    reference: "SRPD37J1",
    price: "10X R$ 398,50",
    image: "./assets/relogios/SRPD37J1.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R35",
      case: "Aço inoxidável",
      diameter: "40,5 mm",
      thickness: "11,8 mm",
      material: "Aço inoxidável",
      glass: "Hardlex em formato de caixa",
      bracelet: "Couro de vaca",
      waterResistance: "5 ATM",
      powerReserve: "Aproximadamente 41 horas",
      functions: "Parada de segundos e data",
    },
  },

  // Seiko Presage SRPB46 J1
  {
    id: 22,
    brand: "Seiko",
    collection: "Presage",
    name: "Seiko Presage",
    model: "SRPB46",
    reference: "SRPB46J1",
    price: "10X R$ 498,50",
    image: "./assets/relogios/SRPB46J1.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R35",
      case: "Aço inoxidável",
      diameter: "40,5 mm",
      thickness: "11,8 mm",
      material: "Aço inoxidável",
      glass: "Hardlex em formato de caixa",
      bracelet: "Couro",
      waterResistance: "5 ATM",
      powerReserve: "Aproximadamente 41 horas",
      functions: "Parada de segundos e data",
    },
  },

  // Seiko Presage SSA405 J1
  {
    id: 23,
    brand: "Seiko",
    collection: "Presage",
    name: "Seiko Presage",
    model: "SSA405",
    reference: "SSA405J1",
    price: "10X R$ 439,50",
    image: "./assets/relogios/SSA405J1.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "4R38",
      case: "Aço inoxidável",
      diameter: "40,5 mm",
      thickness: "11,8 mm",
      material: "Aço inoxidável",
      glass: "Hardlex em formato de caixa",
      bracelet: "Couro de vaca",
      waterResistance: "5 ATM",
      powerReserve: "Aproximadamente 41 horas",
      functions: "Parada de segundos",
    },
  },

  // Seiko Prospex Alpinist SPB121 J1
  {
    id: 24,
    brand: "Seiko",
    collection: "Prospex",
    name: "Seiko Alpinist",
    model: "SPB121",
    reference: "SPB121J1",
    price: "10X R$ 750,00",
    image: "./assets/relogios/SRPB121J1.png",
    available: true,
    visible: true,
    specifications: {
      movement: "Automático com corda manual",
      caliber: "6R15",
      case: "Aço inoxidável",
      diameter: "39,5 mm",
      thickness: "13,2 mm",
      material: "Aço inoxidável",
      glass: "Safira",
      bracelet: "Couro",
      waterResistance: "20 ATM",
      powerReserve: "Aproximadamente 50 horas",
      functions: "Data e bisel interno rotativo",
    },
  },
].map((p) => ({
  ...p,
  /* Preserve existing specifications/adendo if set in the product entry; otherwise use placeholders */
  specifications: {
    movement: p.specifications?.movement ?? "", // Ex.: Automático
    caliber: p.specifications?.caliber ?? "", // Ex.: 4R35
    case: p.specifications?.case ?? "", // Ex.: Aço inoxidável
    diameter: p.specifications?.diameter ?? "", // Ex.: 40,5 mm
    thickness: p.specifications?.thickness ?? "", // Ex.: 11,8 mm
    material: p.specifications?.material ?? "", // Ex.: Aço 316L
    glass: p.specifications?.glass ?? "", // Ex.: Cristal Hardlex
    bracelet: p.specifications?.bracelet ?? "", // Ex.: Aço / Couro
    waterResistance: p.specifications?.waterResistance ?? "", // Ex.: 100 m
    powerReserve: p.specifications?.powerReserve ?? "", // Ex.: 41 horas
    functions: p.specifications?.functions ?? "", // Ex.: Horas, minutos, segundos, data
    dialColor: p.specifications?.dialColor ?? "", // Ex.: Azul
  },
  // texto do desconto à vista — adicionado por padrão a todos os produtos
  discountText: p.discountText ?? "desconto À vista",
}));

/* Rótulos exibidos na ficha técnica */
const SPEC_LABELS = {
  movement: "Movimento",
  caliber: "Calibre",
  case: "Caixa",
  diameter: "Diâmetro",
  thickness: "Espessura",
  material: "Material",
  glass: "Vidro",
  bracelet: "Pulseira",
  waterResistance: "Resistência à água",
  powerReserve: "Reserva de marcha",
  functions: "Funções",
  dialColor: "Cor do mostrador",
};

/* Categorias do filtro — adicione novas linhas aqui no futuro */
const CATEGORIES = [
  "Todos",
  "Prospex",
  "Presage",
  "Seiko 5 Sports GMT",
  "SKX",
  "Seiko 5 Sports",
  "Reduced",
  "King Turtle",
];

/* ============ ORDEN DE EXIBIÇÃO NA VITRINE ============
   A vitrine NÃO segue a ordem de cadastro nem o ID dos produtos:
   os relógios são agrupados pela linha (collection).

   - A ordem dos grupos segue a lista CATEGORIES definida acima.
   - Linhas novas (ainda não listadas em CATEGORIES) são agrupadas
     automaticamente e aparecem ao final, em ordem alfabética.
   - A ordenação é ESTÁVEL: dentro de cada linha se preserva a ordem
     interna já definida no catálogo. */
function sortByCollection(products) {
  const known = new Map();
  CATEGORIES.forEach((cat, i) => {
    if (cat !== "Todos") known.set(cat, i);
  });
  return products
    .map((p, index) => ({
      p,
      index,
      rank: known.get(p.collection),
      slug: String(p.collection || "").toLocaleLowerCase(),
    }))
    .sort((a, b) => {
      if (a.rank !== b.rank) {
        if (a.rank === undefined) return 1; // linhas novas ao final
        if (b.rank === undefined) return -1;
        return a.rank - b.rank;
      }
      if (a.rank === undefined) {
        const cmp = a.slug.localeCompare(b.slug);
        if (cmp) return cmp;
      }
      return a.index - b.index; // estável: preserva a ordem interna
    })
    .map((x) => x.p);
}

/* Correção de dados antigos no LocalStorage:
   "Samurai" não é uma linha própria — pertence à linha Prospex. */
function normalizeCollections(products) {
  return products.map((p) =>
    p.collection === "Samurai" ? { ...p, collection: "Prospex" } : p,
  );
}
/* ============ CAMADA DE PERSISTÊNCIA (LocalStorage) ============
   Para migrar para API/Supabase/Firebase, reescreva apenas
   ProductStore.load() e ProductStore.save().                     */
const STORAGE_KEY = "gravina.seiko.catalogo.v2";

const ProductStore = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(DEFAULT_PRODUCTS);
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length
        ? normalizeCollections(parsed)
        : structuredClone(DEFAULT_PRODUCTS);
    } catch (e) {
      console.warn("Falha ao ler o catálogo salvo, usando dados padrão.", e);
      return structuredClone(DEFAULT_PRODUCTS);
    }
  },
  save(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  },
  reset() {
    localStorage.removeItem(STORAGE_KEY);
  },
  /* Somente os produtos que devem aparecer na vitrine */
  catalog() {
    return sortByCollection(this.load().filter((p) => p.visible !== false));
  },
  nextId(products) {
    return products.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0) + 1;
  },
};

const PLACEHOLDER_IMAGE = "/assets/relogios/placeholder.svg";
