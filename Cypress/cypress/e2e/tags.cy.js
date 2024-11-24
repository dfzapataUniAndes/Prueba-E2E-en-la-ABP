import { faker } from "@faker-js/faker";
import {
  givenNavigateToTheSiteUrl,
  givenUserIsLogin,
} from "../steps/givenSteps.cy";
import { whenCreateNewTag } from "../steps/whenSteps.cy";
import {
  thenViewCreatedTag,
  thenTagCreationShouldFail,
} from "../steps/thenSteps.cy";
import {
  andInsertTitleTag,
  andInsertTagDescription,
  andClickInSaveTag,
  andCloseSession,
} from "../steps/andSteps.cy";
const { Schema } = require("faker-schema");

const rpcVerUrl = "http://localhost:" + Cypress.env("ghostRcVersionPort");
const fakerSeed = 456;

describe("Crear un tag en Ghost.", () => {
  beforeEach(() => {
    // Given que inicio sesión como administrador y navego a la página de tags:
    givenNavigateToTheSiteUrl(rpcVerUrl + "/ghost/#/signin");
    givenUserIsLogin(Cypress.env("emailTest3"), Cypress.env("passwordTest3"));
    givenNavigateToTheSiteUrl(rpcVerUrl + "/ghost/#/tags");
  });

  afterEach(() => {
    // And cierro sesión
    andCloseSession();
  });

  // Escenarios con datos a priori moockaroo usando tags.json
  it("EP_90_A_PRIORI Crear un tag con título y descripción válidos a priori", () => {
    cy.fixture("tags.json").then((tags) => {
      const tag = tags[0];
      whenCreateNewTag();
      andInsertTitleTag(tag.title);
      andInsertTagDescription(tag.description);
      andClickInSaveTag();
      thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
    });
  });

  it("EP_91_A_PRIORI Crear un tag sin descripción a priori", () => {
    cy.fixture("tags.json").then((tags) => {
      const tag = tags[1];
      whenCreateNewTag();
      andInsertTitleTag(tag.title);
      andInsertTagDescription("");
      andClickInSaveTag();
      thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
    });
  });

  it("EP_92_A_PRIORI Crear un tag sin título pero con descripción a priori", () => {
    cy.fixture("tags.json").then((tags) => {
      const tag = tags[2];
      whenCreateNewTag();
      andInsertTitleTag("");
      andInsertTagDescription(tag.description);
      andClickInSaveTag();
      thenTagCreationShouldFail();
    });
  });

  it("EP_93_A_PRIORI Crear un tag con título muy largo", () => {
    cy.fixture("tags.json").then((tags) => {
      const tag = tags[3];
      whenCreateNewTag();
      andInsertTitleTag(tag.title);
      andInsertTagDescription(tag.description);
      andClickInSaveTag();
      thenTagCreationShouldFail();
    });
  });

  it("EP_94_A_PRIORI Crear un tag con caracteres especiales en la descripción", () => {
    cy.fixture("tags.json").then((tags) => {
      const tag = tags[4];
      whenCreateNewTag();
      andInsertTitleTag(tag.title);
      andInsertTagDescription(tag.description);
      andClickInSaveTag();
      thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
    });
  });

  it("EP_95_A_PRIORI Crear un tag con emojis en la descripción", () => {
    cy.fixture("tags.json").then((tags) => {
      const tag = tags[5];
      whenCreateNewTag();
      andInsertTitleTag(tag.title);
      andInsertTagDescription(tag.description);
      andClickInSaveTag();
      thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
    });
  });

  it("EP_96_A_PRIORI Crear un tag con título vacío y caracteres especiales en la descripción", () => {
    cy.fixture("tags.json").then((tags) => {
      const tag = tags[6];
      whenCreateNewTag();
      andInsertTitleTag("");
      andInsertTagDescription(tag.description);
      andClickInSaveTag();
      thenTagCreationShouldFail();
    });
  });

  it("EP_97_A_PRIORI Crear un tag con comillas en la descripción", () => {
    cy.fixture("tags.json").then((tags) => {
      const tag = tags[8];
      whenCreateNewTag();
      andInsertTitleTag(tag.title);
      andInsertTagDescription(tag.description);
      andClickInSaveTag();
      thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
    });
  });

  it("EP_98_A_PRIORI Crear un tag con descripción vacía y título normal", () => {
    cy.fixture("tags.json").then((tags) => {
      const tag = tags[7];
      whenCreateNewTag();
      andInsertTitleTag(tag.title);
      andInsertTagDescription("");
      andClickInSaveTag();
      thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
    });
  });

  it("EP_99_A_PRIORI Crear un tag válido con datos regulares", () => {
    cy.fixture("tags.json").then((tags) => {
      const tag = tags[9];
      whenCreateNewTag();
      andInsertTitleTag(tag.title);
      andInsertTagDescription(tag.description);
      andClickInSaveTag();
      thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
    });
  });

  // Escenarios con datos pseudoaleatorios (10) faker schema
it("EP_100_PSEUDO Crear un tag con título corto y descripción breve", () => {
  faker.seed(fakerSeed);
  const tagSchema = new Schema(() => ({
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
  }));
  const tag = tagSchema.makeOne();
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
});

it("EP_101_PSEUDO Crear un tag con título normal y descripción normal", () => {
  faker.seed(fakerSeed + 1);
  const tagSchema = new Schema(() => ({
    title: faker.lorem.words(3),
    description: faker.lorem.sentences(2),
  }));
  const tag = tagSchema.makeOne();
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
});

it("EP_102_PSEUDO Crear un tag con título largo y descripción corta", () => {
  faker.seed(fakerSeed + 2);
  const tagSchema = new Schema(() => ({
    title: faker.lorem.words(10),
    description: faker.lorem.sentence(),
  }));
  const tag = tagSchema.makeOne();
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
});

it("EP_103_PSEUDO Crear un tag con título corto y descripción larga", () => {
  faker.seed(fakerSeed + 3);
  const tagSchema = new Schema(() => ({
    title: faker.lorem.word(),
    description: faker.lorem.paragraphs(3),
  }));
  const tag = tagSchema.makeOne();
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
});

it("EP_104_PSEUDO Crear un tag con título vacío y descripción pseudoaleatoria", () => {
  faker.seed(fakerSeed + 4);
  const tagSchema = new Schema(() => ({
    title: "",
    description: faker.lorem.sentences(3),
  }));
  const tag = tagSchema.makeOne();
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenTagCreationShouldFail();
});

it("EP_105_PSEUDO Crear un tag con título pseudoaleatorio y descripción vacía", () => {
  faker.seed(fakerSeed + 5);
  const tagSchema = new Schema(() => ({
    title: faker.lorem.words(3),
    description: "",
  }));
  const tag = tagSchema.makeOne();
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
});

it("EP_106_PSEUDO Crear un tag con caracteres especiales en el título", () => {
  faker.seed(fakerSeed + 6);
  const tagSchema = new Schema(() => ({
    title: "@#$%^&*()_+",
    description: faker.lorem.sentence(),
  }));
  const tag = tagSchema.makeOne();
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
});

it("EP_107_PSEUDO Crear un tag con caracteres especiales en la descripción", () => {
  faker.seed(fakerSeed + 7);
  const tagSchema = new Schema(() => ({
    title: faker.lorem.words(3),
    description: "!@#$%^&*()_+",
  }));
  const tag = tagSchema.makeOne();
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
});

it("EP_108_PSEUDO Crear un tag con emojis en el título", () => {
  faker.seed(fakerSeed + 8);
  const tagSchema = new Schema(() => ({
    title: "🔥🚀✨",
    description: faker.lorem.sentence(),
  }));
  const tag = tagSchema.makeOne();
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
});

it("EP_109_PSEUDO Crear un tag con emojis en la descripción", () => {
  faker.seed(fakerSeed + 9);
  const tagSchema = new Schema(() => ({
    title: faker.lorem.words(3),
    description: "🔥🚀✨",
  }));
  const tag = tagSchema.makeOne();
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
});

  // Escenarios con datos aleatorios (10) faker semilla
  it("EP_110_ALEATORIO Crear un tag con datos aleatorios válidos", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentences(3),
    };
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
  });

  it("EP_111_ALEATORIO Crear un tag aleatorio sin descripción", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: faker.lorem.words(3),
      description: "",
    };
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
  });

  it("EP_112_ALEATORIO Crear un tag aleatorio sin título", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: "",
      description: faker.lorem.sentences(2),
    };
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenTagCreationShouldFail();
  });

  it("EP_113_ALEATORIO Crear un tag con caracteres especiales en el título", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: "@#$%^&*()_+|",
      description: faker.lorem.sentences(2),
    };
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
  });

  it("EP_114_ALEATORIO Crear un tag con caracteres especiales en la descripción", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: faker.lorem.words(3),
      description: "@#$%^&*()_+|",
    };
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
  });

  it("EP_115_ALEATORIO Crear un tag con emojis en el título", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: "🔥🚀✨",
      description: faker.lorem.sentences(3),
    };
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
  });

  it("EP_116_ALEATORIO Crear un tag con emojis en la descripción", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: faker.lorem.words(3),
      description: "🔥🚀✨",
    };
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
  });

  it("EP_117_ALEATORIO Crear un tag con título largo", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: faker.lorem.words(50),
      description: faker.lorem.sentences(2),
    };
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenTagCreationShouldFail();
  });

  it("EP_118_ALEATORIO Crear un tag con descripción larga", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentences(50),
    };
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenTagCreationShouldFail();
  });

  it("EP_119_ALEATORIO Crear un tag con título y descripción normales", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentences(3),
    };
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenViewCreatedTag(rpcVerUrl + "/ghost/#/tags", tag.title);
  });

  it("EP_120_ALEATORIO Crear un tag con descripción vacía y título largo", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: faker.lorem.words(10),
      description: "",
    };
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenTagCreationShouldFail();
  });


});

