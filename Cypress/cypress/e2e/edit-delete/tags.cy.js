// Escenarios de edición de tags semana 1 estrategia 

import { faker } from "@faker-js/faker";
import {
  givenNavigateToTheSiteUrl,
  givenUserIsLogin,
} from "../../steps/givenSteps.cy";  // Subir dos niveles para ir a la carpeta steps
import { whenCreateNewTag } from "../../steps/whenSteps.cy";  // Subir dos niveles
import {
  thenViewCreatedTag,
  thenTagCreationShouldFail,
} from "../../steps/thenSteps.cy";  // Subir dos niveles
import {
  andInsertTitleTag,
  andInsertTagDescription,
  andClickInSaveTag,
  andCloseSession,
} from "../../steps/andSteps.cy";  // Subir dos niveles
const { Schema } = require("faker-schema");

const rpcVerUrl = "http://localhost:" + Cypress.env("ghostRcVersionPort");
const fakerSeed = 456;

describe("Editar y Eliminar un tag en Ghost.", () => {
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
