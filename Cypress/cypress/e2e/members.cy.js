import {
  givenNavigateToTheSite,
  givenUserIsLogin,
} from "../steps/givenSteps.cy";
import { andCloseSession } from "../steps/andSteps.cy";
import {
  andNavigateToMembersPage,
  itCreatesNewMemberWithEmailNameAndLabels,
  itCreatesNewMemberWithEmailNameLabelsAndNote,
  itCreatesNewMemberWithInvalidEmail,
  itCreatesNewMemberWithInvalidLabel,
  itCreatesNewMemberWithInvalidName, itCreatesNewMemberWithInvalidNote
} from "../steps/membersSteps.cy";
import {getRandomInt} from "../support/helpers";
import {faker} from "@faker-js/faker";
import {Schema} from "faker-schema";
const fakerSeed = 123;

describe("Crear un miembro en Ghost version base", () => {
  beforeEach(() => {
    // Given que inicio sesión como administrador
    givenNavigateToTheSite();
    givenUserIsLogin(Cypress.env("emailTest4"), Cypress.env("passwordTest4"));
    andNavigateToMembersPage();
    cy.fixture('members-a-priori.json').as('membersApriori');
  });

  it('EP_61_A-PRIORI Como administrador de Ghost, creo un nuevo Member con el campo de Email', function (){
    const memberEmail = this.membersApriori[getRandomInt(0, 30)].email;
    itCreatesNewMemberWithEmail(memberEmail)
  });

  it ('EP_62_PSEUDO Como administrador de Ghost, creo un nuevo Member con el campo de Email', function () {
    const memberSchema = new Schema(() => ({
      email: faker.internet.email(),
    }));
    const memberEmailPseudo = memberSchema.makeOne(fakerSeed).email;
    itCreatesNewMemberWithEmail(memberEmailPseudo)
  });

  it ('EP_63_ALEATORIO Como administrador de Ghost, creo un nuevo Member con el campo de Email', function () {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const memberEmailAleatorio = faker.internet.email({allowSpecialCharacters: true});
    itCreatesNewMemberWithEmail(memberEmailAleatorio)
  });

  it('EP_64_A-PRIORI Como administrador de Ghost, creo un nuevo Member con el campo de Email y Name', function () {
    const member = this.membersApriori[getRandomInt(0, 30)];
    itCreatesNewMemberWithEmailAndName(member.email, member.name);
  });

  it('EP_65_PSEUDO Como administrador de Ghost, creo un nuevo Member con el campo de Email y Name', function () {
    const memberSchema = new Schema(() => ({
      email: faker.internet.email(),
      name: faker.person.firstName(),
    }));
    const memberPseudo = memberSchema.makeOne(fakerSeed);
    itCreatesNewMemberWithEmailAndName(memberPseudo.email, memberPseudo.name);
  });

  it('EP_66_ALEATORIO Como administrador de Ghost, creo un nuevo Member con el campo de Email y Name', function () {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const memberAleatorio = {
      email: faker.internet.email({allowSpecialCharacters: true}),
      name: faker.person.fullName(),
    };
    itCreatesNewMemberWithEmailAndName(memberAleatorio.email, memberAleatorio.name);
  });

  it('EP_67_A-PRIORI Como administrador de Ghost, creo un nuevo Member con el campo de Email, Name y Labels', function () {
    const member = this.membersApriori[getRandomInt(0, 30)];
    itCreatesNewMemberWithEmailNameAndLabels(member.email, member.name, member.labels);
  });

  it('EP_68_PSEUDO Como administrador de Ghost, creo un nuevo Member con el campo de Email, Name y Labels', function () {
    const memberSchema = new Schema(() => ({
      email: faker.internet.email({allowSpecialCharacters: true}),
      name: faker.person.fullName(),
      labels: [faker.lorem.word(), faker.lorem.word()],
    }));
    const memberPseudo = memberSchema.makeOne(fakerSeed);
    itCreatesNewMemberWithEmailNameAndLabels(memberPseudo.email, memberPseudo.name, memberPseudo.labels);
  });

  it('EP_69_ALEATORIO Como administrador de Ghost, creo un nuevo Member con el campo de Email, Name y Labels', function () {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const memberAleatorio = {
      email: faker.internet.email({allowSpecialCharacters: true}),
      name: faker.person.fullName(),
      labels: [faker.lorem.word({ length: getRandomInt(1, 190)}), faker.lorem.word({ length: getRandomInt(1, 190)})],
    };
    itCreatesNewMemberWithEmailNameAndLabels(memberAleatorio.email, memberAleatorio.name, memberAleatorio.labels);
  });

  it('EP_70_A-PRIORI Como administrador de Ghost, creo un nuevo Member con el campo de Email, Name, Labels y Note', function () {
    const member = this.membersApriori[getRandomInt(0, 30)];
    itCreatesNewMemberWithEmailNameLabelsAndNote(member.email, member.name, member.labels, member.note);
  });

  it('EP_71_PSEUDO Como administrador de Ghost, creo un nuevo Member con el campo de Email, Name, Labels y Note', function () {
    const memberSchema = new Schema(() => ({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      labels: [faker.lorem.word(), faker.lorem.word()],
      note: faker.lorem.sentence(),
    }));
    const memberPseudo = memberSchema.makeOne(fakerSeed);
    itCreatesNewMemberWithEmailNameLabelsAndNote(memberPseudo.email, memberPseudo.name, memberPseudo.labels, memberPseudo.note);
  });

  it('EP_72_ALEATORIO Como administrador de Ghost, creo un nuevo Member con el campo de Email, Name, Labels y Note', function () {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const memberAleatorio = {
      email: faker.internet.email({allowSpecialCharacters: true}),
      name: faker.person.fullName(),
      labels: [faker.lorem.word(), faker.lorem.word()],
      note: faker.lorem.sentence(),
    };
    itCreatesNewMemberWithEmailNameLabelsAndNote(memberAleatorio.email, memberAleatorio.name, memberAleatorio.labels, memberAleatorio.note);
  });


  it('EP_77 Como administrador de Ghost, al crear un nuevo Member con el campo de Name con más de 191 caracteres debe aparecer el error "Name cannot be longer than 191 characters."', function () {
    const longName = 'a'.repeat(192);
    itCreatesNewMemberWithInvalidName(longName, 'Name cannot be longer than 191 characters.');
  });

  it('EP_78 Como administrador de Ghost, al crear un nuevo Member con el campo de Email con más de 65 caracteres debe aparecer el error de "Invalid Email".', function () {
    const longEmail = 'a'.repeat(64) + '@example.com';
    itCreatesNewMemberWithInvalidEmail(longEmail, 'Invalid Email');
  });

  it('EP_79 Como administrador de Ghost, al crear un nuevo Member con un Label con más de 191 caracteres debe aparecer el error de "Validation failed for label".', function () {
    const longLabel = 'a'.repeat(192);
    itCreatesNewMemberWithInvalidLabel(longLabel, 'Validation failed for label');
  });

  it('EP_80 Como administrador de Ghost, al crear un nuevo Member con el campo de notas con más de 500 caracteres debe aparecer el error de "Note is too long."', function () {
    const longNote = 'a'.repeat(501);
    itCreatesNewMemberWithInvalidNote(longNote, 'Note is too long.');
  });

  // EP_73 Como administrador de Ghost, al crear un nuevo Member con el campo de Name con más de 191 caracteres debe aparecer el error 'Name cannot be longer than 191 characters.'. (Frontera superior a-priori)
  // EP_74 Como administrador de Ghost, al crear un nuevo Member con el campo de Email con más de 65 caracteres debe aparecer el error de 'Invalid Email'. (Frontera superior a-priori)
  // EP_75 Como administrador de Ghost, al crear un nuevo Member con un Label con más de 191 caracteres debe aparecer el error de 'Validation failed for label'.  (Frontera superior a-priori)
  // EP_76 Como administrador de Ghost, al crear un nuevo Member con el campo de notas con más de 500 caracteres debe aparecer el error de 'Note is too long.'.  (Frontera superior a-priori)

  // EP_77 Como administrador de Ghost, al crear un nuevo Member con el campo de Name con más de 191 caracteres debe aparecer el error 'Name cannot be longer than 191 characters.'. (Frontera superior pseudo)
  // EP_78 Como administrador de Ghost, al crear un nuevo Member con el campo de Email con más de 65 caracteres debe aparecer el error de 'Invalid Email'. (Frontera superior pseudo)
  // EP_79 Como administrador de Ghost, al crear un nuevo Member con un Label con más de 191 caracteres debe aparecer el error de 'Validation failed for label'.  (Frontera superior pseudo)
  // EP_80 Como administrador de Ghost, al crear un nuevo Member con el campo de notas con más de 500 caracteres debe aparecer el error de 'Note is too long.'.  (Frontera superior pseudo)

  // EP_81 Como administrador de Ghost, al crear un nuevo Member con el campo de Name con más de 191 caracteres debe aparecer el error 'Name cannot be longer than 191 characters.'. (Frontera superior aleatorio)
  // EP_82 Como administrador de Ghost, al crear un nuevo Member con el campo de Email con más de 65 caracteres debe aparecer el error de 'Invalid Email'. (Frontera superior aleatorio)
  // EP_83 Como administrador de Ghost, al crear un nuevo Member con un Label con más de 191 caracteres debe aparecer el error de 'Validation failed for label'.  (Frontera superior aleatorio)
  // EP_84 Como administrador de Ghost, al crear un nuevo Member con el campo de notas con más de 500 caracteres debe aparecer el error de 'Note is too long.'.  (Frontera superior aleatorio)

  // EP_85 Como administrador de Ghost, al crear un nuevo Member con caracteres especiales en el campo de Email debe aparecer el error de 'Invalid Email'. (aleatorio)
  // EP_85 Como administrador de Ghost, al crear un nuevo Member con caracteres especiales en el campo de Email debe aparecer el error de 'Invalid Email'. (pseudo)

  // EP_86 Como administrador de Ghost, al crear un nuevo Member con el campo de Name con más de 100 caracteres el botón de Save y el formulario deben ser visibles (a-priori)
  // EP_86 Como administrador de Ghost, al crear un nuevo Member con el campo de Name con más de 100 caracteres el botón de Save y el formulario deben ser visibles (a-priori)

  // EP_88 Como administrador de Ghost, al crear un miembro en Ghost sin email y hago clic en guardar aparece el error Please enter an email (a-priori)
  // EP_89 Como administrador de Ghost, al crear un miembro en Ghost sin email y hago clic en guardar aparece el error Please enter an email (pseudo-aleatorio)
  // EP_90 Como administrador de Ghost, al crear un miembro en Ghost sin email y hago clic en guardar aparece el error Please enter an email (aleatorio)

  afterEach(() => {
    andCloseSession();
  });
});
