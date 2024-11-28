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

  const timeoutValue = 20000;

  afterEach(() => {
    // And cierro sesión
    andCloseSession();
  });

  // Escenarios con datos a priori moockaroo usando tags.json
  it("EP_90_A_PRIORI Crear un tag con título y descripción válidos a priori", () => {
    cy.fixture("tags.json").then((tags) => {
      const tag = tags[0];
      var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
      whenCreateNewTag();
      andInsertTitleTag(tag.title);
      andInsertTagDescription(tag.description);
      andClickInSaveTag();
      thenViewCreatedTag(tag.title,urlTags);   
    });
  });

  it("EP_91_A_PRIORI Crear un tag sin descripción a priori", () => {
    cy.fixture("tags.json").then((tags) => {
      const tag = tags[1];
      var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
      whenCreateNewTag();
      andInsertTitleTag(tag.title);
      andInsertTagDescription("");
      andClickInSaveTag();
      thenViewCreatedTag(tag.title,urlTags);   
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
      var urlTags = rpcVerUrl + "/ghost/#/tags/" 
      whenCreateNewTag();
      andInsertTitleTag(tag.title);
      andInsertTagDescription(tag.description);
      andClickInSaveTag();
      thenViewCreatedTag(tag.title,urlTags);   

    });
  });

  it("EP_95_A_PRIORI Crear un tag con emojis en la descripción", () => {
    cy.fixture("tags.json").then((tags) => {
      const tag = tags[5];
      var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
      whenCreateNewTag();
      andInsertTitleTag(tag.title);
      andInsertTagDescription(tag.description);
      andClickInSaveTag();
      thenViewCreatedTag(tag.title,urlTags);   
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
      var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
      whenCreateNewTag();
      andInsertTitleTag(tag.title);
      andInsertTagDescription(tag.description);
      andClickInSaveTag();
      thenViewCreatedTag(tag.title,urlTags);   
    });
  });

  it("EP_98_A_PRIORI Crear un tag con descripción vacía y título normal", () => {
    cy.fixture("tags.json").then((tags) => {
      const tag = tags[7];
      var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
      whenCreateNewTag();
      andInsertTitleTag(tag.title);
      andInsertTagDescription("");
      andClickInSaveTag();
      thenViewCreatedTag(tag.title ,urlTags);   
    });
  });

  it("EP_99_A_PRIORI Crear un tag válido con datos regulares", () => {
    cy.fixture("tags.json").then((tags) => {
      const tag = tags[9];
      var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
      whenCreateNewTag();
      andInsertTitleTag(tag.title);
      andInsertTagDescription(tag.description);
      andClickInSaveTag();
      thenViewCreatedTag(tag.title,urlTags);   
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
  var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(tag.title ,urlTags);   
});

it("EP_101_PSEUDO Crear un tag con título normal y descripción normal", () => {
  faker.seed(fakerSeed + 1);
  const tagSchema = new Schema(() => ({
    title: faker.lorem.words(3),
    description: faker.lorem.sentences(2),
  }));
  const tag = tagSchema.makeOne();
  var tagcreado = tag.title ;
  var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(tagcreado,urlTags);   
});

it("EP_102_PSEUDO Crear un tag con título largo y descripción corta", () => {
  faker.seed(fakerSeed + 2);
  const tagSchema = new Schema(() => ({
    title: faker.lorem.words(10),
    description: faker.lorem.sentence(),
  }));
  const tag = tagSchema.makeOne();
  var tagcreado = tag.title ;
  var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(tagcreado,urlTags);   
});

it("EP_103_PSEUDO Crear un tag con título corto y descripción larga", () => {
  faker.seed(fakerSeed + 3);
  const tagSchema = new Schema(() => ({
    title: faker.lorem.word(),
    description: faker.lorem.paragraphs(3),
  }));
  const tag = tagSchema.makeOne();
  var tagcreado = tag.title ;
  var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(tagcreado,urlTags);   
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
  var tagcreado = tag.title ;
  var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(tagcreado,urlTags);   
});

it("EP_106_PSEUDO Crear un tag con caracteres especiales en el título", () => {
  faker.seed(fakerSeed + 6);
  const tagSchema = new Schema(() => ({
    title: "@#$%^&*()_+",
    description: faker.lorem.sentence(),
  }));
  const tag = tagSchema.makeOne();
  var tagcreado = tag.title ;
  var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(tagcreado,urlTags);   
});

it("EP_107_PSEUDO Crear un tag con caracteres especiales en la descripción", () => {
  faker.seed(fakerSeed + 7);
  const tagSchema = new Schema(() => ({
    title: faker.lorem.words(3),
    description: "!@#$%^&*()_+",
  }));
  const tag = tagSchema.makeOne();
  var tagcreado = tag.title ;
  var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(tagcreado,urlTags);   
});

it("EP_108_PSEUDO Crear un tag con emojis en el título", () => {
  faker.seed(fakerSeed + 8);
  const tagSchema = new Schema(() => ({
    title: "🔥🚀✨",
    description: faker.lorem.sentence(),
  }));
  const tag = tagSchema.makeOne();
  var tagcreado = tag.title ;
  var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(tagcreado,urlTags);   
});

it("EP_109_PSEUDO Crear un tag con emojis en la descripción", () => {
  faker.seed(fakerSeed + 9);
  const tagSchema = new Schema(() => ({
    title: faker.lorem.words(3),
    description: "🔥🚀✨",
  }));
  const tag = tagSchema.makeOne();
  var tagcreado = tag.title ;
  var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
  whenCreateNewTag();
  andInsertTitleTag(tag.title);
  andInsertTagDescription(tag.description);
  andClickInSaveTag();
  thenViewCreatedTag(tagcreado,urlTags);   
});

  // Escenarios con datos aleatorios (10) faker semilla
  it("EP_110_ALEATORIO Crear un tag con datos aleatorios válidos", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentences(3),
    };
    var tagcreado = tag.title ;
    var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenViewCreatedTag(tagcreado,urlTags);   
  });

  it("EP_111_ALEATORIO Crear un tag aleatorio sin descripción", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: faker.lorem.words(3),
      description: "",
    };
    var tagcreado = tag.title ;
    var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenViewCreatedTag(tagcreado,urlTags);   
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
    var tagcreado = tag.title ;
    var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenViewCreatedTag(tagcreado,urlTags);   
  });

  it("EP_114_ALEATORIO Crear un tag con caracteres especiales en la descripción", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: faker.lorem.words(3),
      description: "@#$%^&*()_+|",
    };
    var tagcreado = tag.title ;
    var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenViewCreatedTag(tagcreado,urlTags);   
  });

  it("EP_115_ALEATORIO Crear un tag con emojis en el título", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: "🔥🚀✨",
      description: faker.lorem.sentences(3),
    };
    var tagcreado = tag.title ;
    var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenViewCreatedTag(tagcreado,urlTags);   
  });

  it("EP_116_ALEATORIO Crear un tag con emojis en la descripción", () => {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const tag = {
      title: faker.lorem.words(3),
      description: "🔥🚀✨",
    };
    var tagcreado = tag.title ;
    var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenViewCreatedTag(tagcreado,urlTags);   
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
    var tagcreado = tag.title ;
    var urlTags = rpcVerUrl + "/ghost/#/tags/" ;
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
    thenViewCreatedTag(tagcreado,urlTags);   
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

  // Escenarios de edición de tags semana 1 estrategia 

   // Escenarios de edición de tags
   it("EP_151_EDIT Editar un tag cambiando solo el título", () => {
    const originalTag = {
      title: "Daniel Zapata tag",
      description: "Original Tag Description",
    };
    const updatedTag = {
      title: "Updated Tag Title",
      description: originalTag.description,
    };
  
    const urlTags = rpcVerUrl + "/ghost/#/tags/";
  
    // Crear el tag original
    whenCreateNewTag();
    andInsertTitleTag(originalTag.title);
    andInsertTagDescription(originalTag.description);
    andClickInSaveTag();
  
    // Esperar a que el tag aparezca en la lista antes de continuar
    cy.visit(urlTags);
    cy.contains(originalTag.title, { timeout: 20000 }).should("exist").click();
  
    // Limpiar el campo del título antes de ingresar el nuevo título
    cy.get('input[data-test-input="tag-name"]').clear().type(updatedTag.title);
  
    andClickInSaveTag();
  
    // Verificar el nuevo título
    thenViewCreatedTag(updatedTag.title, urlTags);
  });
 
  it("EP_152_EDIT Editar un tag cambiando solo la descripción", () => {
    const originalTag = {
      title: "Tag Nicolas perez",
      description: "Description aaaaaaaa",
    };
    const updatedTag = {
      title: originalTag.title,
      description: "aaaaaaaa Description actualizada",
    };
  
    const urlTags = rpcVerUrl + "/ghost/#/tags/";
  
    // Crear el tag original
    whenCreateNewTag();
    andInsertTitleTag(originalTag.title);
    andInsertTagDescription(originalTag.description);
    andClickInSaveTag();
  
    // Buscar y editar el tag
    cy.visit(urlTags);
  
    // Asegurarse de que el título aparece en la lista visible
    cy.contains(originalTag.title, { timeout: 20000 }).should("exist").click();
  
    // Limpiar el campo de descripción y actualizarlo
    cy.get('textarea[data-test-input="tag-description"]')
      .clear()
      .type(updatedTag.description);
  
    andClickInSaveTag();
  
    // Verificar el tag actualizado
    thenViewCreatedTag(originalTag.title, urlTags);
  });
  
  
  it("EP_153_EDIT Editar un tag cambiando título y descripción", () => {
    const originalTag = {
      title: "Tag to Update",
      description: "Original Description",
    };
    const updatedTag = {
      title: "Updated Title",
      description: "Updated Description",
    };
  
    whenCreateNewTag();
    andInsertTitleTag(originalTag.title);
    andInsertTagDescription(originalTag.description);
    andClickInSaveTag();
  
    const urlTags = `${rpcVerUrl}/ghost/#/tags/`;
  
 
    cy.visit(urlTags);
  
    // Buscar el tag usando un selector único
    cy.contains(originalTag.title, { timeout: 20000 }).should("exist").click();
  
    // Actualizar título y descripción
    cy.get('input[data-test-input="tag-name"]').clear().type(updatedTag.title);
    cy.get('textarea[data-test-input="tag-description"]').clear().type(updatedTag.description);
    andClickInSaveTag();
  
    // Verificar actualización
    thenViewCreatedTag(updatedTag.title, urlTags);
  });
  
  
  
  
  it("EP_154_EDIT Editar un tag agregando caracteres especiales al título", () => {
    const originalTag = {
      title: "Special Character Tag",
      description: "Original Description",
    };
    const updatedTag = {
      title: "@#$%^&*() Updated Title",
      description: originalTag.description,
    };
  
    whenCreateNewTag();
    andInsertTitleTag(originalTag.title);
    andInsertTagDescription(originalTag.description);
    andClickInSaveTag();
  
    const urlTags = `${rpcVerUrl}/ghost/#/tags/`;
    cy.visit(urlTags);
    cy.contains(originalTag.title, { timeout: 20000 }).should("exist").click();
  
    // Actualizar título
    cy.get('input[data-test-input="tag-name"]').clear().type(updatedTag.title);
    andClickInSaveTag();
  
    // Verificar actualización
    thenViewCreatedTag(updatedTag.title, urlTags);
  });
  
  it("EP_155_EDIT Editar un tag agregando emojis al título", () => {
    const originalTag = {
      title: "Emoji Tag",
      description: "Original Description",
    };
    const updatedTag = {
      title: "🔥🚀✨ Updated Emoji Title",
      description: originalTag.description,
    };
  
    whenCreateNewTag();
    andInsertTitleTag(originalTag.title);
    andInsertTagDescription(originalTag.description);
    andClickInSaveTag();
  
    const urlTags = `${rpcVerUrl}/ghost/#/tags/`;
    
    cy.visit(urlTags);
    cy.contains(originalTag.title, { timeout: 20000 }).should("exist").click();
  
    // Actualizar título
    cy.get('input[data-test-input="tag-name"]').clear().type(updatedTag.title);
    andClickInSaveTag();
  
    // Verificar actualización
    thenViewCreatedTag(updatedTag.title, urlTags);
  });
  
  it("EP_156_EDIT Editar un tag cambiando la descripción a una muy larga", () => {
    const originalTag = {
      title: "Tag with Short Description",
      description: "Short Description",
    };
    const updatedTag = {
      title: originalTag.title,
      description: faker.lorem.paragraphs(5),
    };
  
    whenCreateNewTag();
    andInsertTitleTag(originalTag.title);
    andInsertTagDescription(originalTag.description);
    andClickInSaveTag();
  
    const urlTags = `${rpcVerUrl}/ghost/#/tags/`;
    
    cy.visit(urlTags);
    cy.contains(originalTag.title, { timeout: 20000 }).should("exist").click();
  
    // Actualizar descripción
    cy.get('textarea[data-test-input="tag-description"]').clear().type(updatedTag.description);
    andClickInSaveTag();
  
    // Verificar actualización
    thenViewCreatedTag(updatedTag.title, urlTags);
  });
  
  it("EP_157_EDIT Editar un tag cambiando la descripción a vacía", () => {
    const originalTag = {
      title: "Tag with Description",
      description: "Original Description",
    };
    const updatedTag = {
      title: originalTag.title,
      description: "",
    };
  
    whenCreateNewTag();
    andInsertTitleTag(originalTag.title);
    andInsertTagDescription(originalTag.description);
    andClickInSaveTag();
  
    const urlTags = `${rpcVerUrl}/ghost/#/tags/`;
  
 
    cy.visit(urlTags);
    cy.contains(originalTag.title, { timeout: 20000 }).should("exist").click();
  
    // Actualizar descripción
    cy.get('textarea[data-test-input="tag-description"]').clear();
    andClickInSaveTag();
  
    // Verificar actualización
    thenViewCreatedTag(updatedTag.title, urlTags);
  });
  
  it("EP_158_EDIT Editar un tag dejando título vacío (debe fallar)", () => {
    const originalTag = {
      title: "Tag with Title",
      description: "Original Description",
    };
    const updatedTag = {
      title: "",
      description: originalTag.description,
    };
  
    whenCreateNewTag();
    andInsertTitleTag(originalTag.title);
    andInsertTagDescription(originalTag.description);
    andClickInSaveTag();
  
    const urlTags = `${rpcVerUrl}/ghost/#/tags/`;
    
    cy.visit(urlTags);
    cy.contains(originalTag.title, { timeout: 20000 }).should("exist").click();
  
    // Intentar actualizar título vacío
    cy.get('input[data-test-input="tag-name"]').clear();
    andClickInSaveTag();
  
    // Verificar fallo esperado
    thenTagCreationShouldFail();
  });

  // Escenarios de eliminación de tags (2)
  it("EP_159_DELETE Eliminar un tag desde el detalle", () => {
    const tag = {
      title: "Tag to Delete",
      description: "Tag to be deleted",
    };
    
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
  
    cy.intercept("DELETE", "/ghost/api/admin/tags/*").as("deleteTagRequest");
  
    cy.visit(rpcVerUrl + "/ghost/#/tags");
    cy.contains(tag.title).click(); // Navegar al tag creado
    
    cy.get(".gh-btn-red").click(); // Hacer clic en el botón de eliminar
    cy.get(".modal-footer .gh-btn-red").click(); // Confirmar eliminación
    cy.wait("@deleteTagRequest"); // Esperar a que termine la solicitud
  
    cy.visit(rpcVerUrl + "/ghost/#/tags");

  });
  

  it("EP_160_DELETE Verificar mensaje exacto antes de eliminar un tag", () => {
    const tag = {
      title: "Normal Tag Title",
      description: "Tag created to test the confirmation message",
    };
  
    // Crear un nuevo tag
    whenCreateNewTag();
    andInsertTitleTag(tag.title);
    andInsertTagDescription(tag.description);
    andClickInSaveTag();
  
    // Visitar la lista de tags y navegar al detalle del tag creado
    cy.visit(rpcVerUrl + "/ghost/#/tags");
    cy.contains(tag.title).click(); // Ingresar al detalle del tag
  
    // Hacer clic en el botón de eliminar y verificar el mensaje del modal
    cy.get(".gh-btn-red").click(); // Botón de eliminar dentro del detalle
    cy.get(".modal-content").should(
      "contain",
      `You're about to delete "${tag.title}". This is permanent! We warned you, k?`
    );
  
    // Confirmar eliminación del tag
    cy.get(".modal-footer .gh-btn-red").should("be.visible").click();
  
    // Verificar que el tag fue eliminado correctamente
    cy.visit(rpcVerUrl + "/ghost/#/tags");
    cy.contains(tag.title).should("not.exist");
  });
  
  

   });


 




