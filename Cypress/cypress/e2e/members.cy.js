import {
  givenNavigateToTheSite,
  givenUserIsLogin,
} from "../steps/givenSteps.cy";
import { andCloseSession } from "../steps/andSteps.cy";
import {
  andClickOnSaveBtn,
  andInsertMemberName,
  andNavigateToMembersPage, itCreatesNewMemberWithEmail, itCreatesNewMemberWithEmailAndName,
  itCreatesNewMemberWithEmailNameAndLabels,
  itCreatesNewMemberWithEmailNameLabelsAndNote,
  itCreatesNewMemberWithInvalidEmail,
  itCreatesNewMemberWithInvalidLabel,
  itCreatesNewMemberWithInvalidName, itCreatesNewMemberWithInvalidNote, whenClickOnNewMemberButton
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
      labels: [faker.lorem.word({ length: getRandomInt(1, 180)}), faker.lorem.word({ length: getRandomInt(1, 180)})],
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
      labels: [faker.lorem.word(getRandomInt(1, 180)), faker.lorem.word(getRandomInt(1, 180))],
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

  it('EP_73_FRONTERA_SUPERIOR_A-PRIORI Como administrador de Ghost, al crear un nuevo Member con el campo de Name con más de 191 caracteres debe aparecer el error "Name cannot be longer than 191 characters."', function () {
    const longName = 'b'.repeat(192);
    itCreatesNewMemberWithInvalidName(longName, 'Name cannot be longer than 191 characters.');
  });

  it('EP_74_FRONTERA_SUPERIOR_A-PRIORI Como administrador de Ghost, al crear un nuevo Member con el campo de Email con más de 65 caracteres debe aparecer el error de "Invalid Email".', function () {
    const longEmail = 'c'.repeat(64) + '@example.com';
    itCreatesNewMemberWithInvalidEmail(longEmail, 'Email cannot be longer than 191 characters.');
  });

  it('EP_75_FRONTERA_SUPERIOR_A-PRIORI Como administrador de Ghost, al crear un nuevo Member con un Label con más de 191 caracteres debe aparecer el error de "Validation failed for label".', function () {
    const longLabel = 'd'.repeat(192);
    const member = { email: 'test@example.com', labels: [longLabel] };
    itCreatesNewMemberWithInvalidLabel(member, 'Validation failed for label');
  });

  it('EP_76_FRONTERA_SUPERIOR_A-PRIORI Como administrador de Ghost, al crear un nuevo Member con el campo de notas con más de 500 caracteres debe aparecer el error de "Note is too long."', function () {
    const longNote = 'e'.repeat(501);
    const member = { email: 'test@example.com', note: longNote };
    itCreatesNewMemberWithInvalidNote(member, 'Note is too long.');
  });
  it('EP_77_FRONTERA_SUPERIOR_PSEUDO Como administrador de Ghost, al crear un nuevo Member con el campo de Name con más de 191 caracteres debe aparecer el error "Name cannot be longer than 191 characters."', function () {
    const memberSchema = new Schema(() => ({
      email: faker.internet.email(),
      name: faker.lorem.sentence(getRandomInt(150, 200))
    }));
    const longName = memberSchema.makeOne(fakerSeed).name;

    itCreatesNewMemberWithInvalidName(longName, 'Name cannot be longer than 191 characters.');
  });

  it('EP_78_FRONTERA_SUPERIOR_PSEUDO Como administrador de Ghost, al crear un nuevo Member con el campo de Email con más de 191 caracteres debe aparecer el error de "Invalid Email".', function () {
      const memberSchema = new Schema(() => ({
        email: faker.internet.email(),
        name: faker.lorem.sentence(getRandomInt(50, 60))
      }));
      const longEmail = memberSchema.makeOne(fakerSeed).name.replace(/\s/g, '') + '@example.com';

      itCreatesNewMemberWithInvalidEmail(longEmail, 'Email cannot be longer than 191 characters.');
  });

  it('EP_79_FRONTERA_SUPERIOR_PSEUDO Como administrador de Ghost, al crear un nuevo Member con un Label con más de 191 caracteres debe aparecer el error de "Validation failed for label".', function () {
    const memberSchema = new Schema(() => ({
      email: faker.internet.email(),
      labels: [faker.lorem.sentence(getRandomInt(180, 200))]
    }));
    const member = memberSchema.makeOne(fakerSeed);

    itCreatesNewMemberWithInvalidLabel(member,  'Validation failed for label');
  });

  it('EP_80_FRONTERA_SUPERIOR_PSEUDO Como administrador de Ghost, al crear un nuevo Member con el campo de notas con más de 500 caracteres debe aparecer el error de "Note is too long."', function () {
    const memberSchema = new Schema(() => ({
      email: faker.internet.email(),
      note: faker.lorem.sentence(getRandomInt(100, 150)),
    }));
    const member = memberSchema.makeOne(fakerSeed);

    itCreatesNewMemberWithInvalidNote(member, 'Note is too long.');
  });

  it('EP_81_FRONTERA_SUPERIOR_ALEATORIO Como administrador de Ghost, al crear un nuevo Member con el campo de Name con más de 191 caracteres debe aparecer el error "Name cannot be longer than 191 characters."', function () {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const longName = faker.lorem.words(50).slice(0, 192);
    itCreatesNewMemberWithInvalidName(longName, 'Name cannot be longer than 191 characters.');
  });

  it('EP_82_FRONTERA_SUPERIOR_ALEATORIO Como administrador de Ghost, al crear un nuevo Member con el campo de Email con más de 65 caracteres debe aparecer el error de "Invalid Email".', function () {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const longEmail = faker.lorem.words(50).slice(0, 64).replace(/\s/g, '') + '@example.com'; // Ensure it exceeds 65 characters
    itCreatesNewMemberWithInvalidEmail(longEmail, 'Email cannot be longer than 191 characters.');
  });

  it('EP_83_FRONTERA_SUPERIOR_ALEATORIO Como administrador de Ghost, al crear un nuevo Member con un Label con más de 191 caracteres debe aparecer el error de "Validation failed for label".', function () {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const longLabel = faker.lorem.words(50).slice(0, 192); // Ensure it exceeds 191 characters
    const member = { email: faker.internet.email(), labels: [longLabel] };
    itCreatesNewMemberWithInvalidLabel(member, 'Validation failed for label');
  });

  it('EP_84_FRONTERA_SUPERIOR_ALEATORIO Como administrador de Ghost, al crear un nuevo Member con el campo de notas con más de 500 caracteres debe aparecer el error de "Note is too long."', function () {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const longNote = faker.lorem.paragraphs(10).slice(0, 501); // Ensure it exceeds 500 characters
    const member = { email: faker.internet.email(), note: longNote };
    itCreatesNewMemberWithInvalidNote(member, 'Note is too long.');
  });

  it('EP_85_A-PRIORI Como administrador de Ghost, al crear un nuevo Member con caracteres especiales en el campo de Email debe aparecer el error "Invalid Email".', function () {
    const specialCharEmail = 'ODk5&HXbVJ(]>nwY3Z6">!@gmail.com';
    itCreatesNewMemberWithInvalidEmail(specialCharEmail, 'Invalid Email');
  });

  it('EP_86_PSEUDO Como administrador de Ghost, al crear un nuevo Member con caracteres especiales en el campo de Email debe aparecer el error "Invalid Email".', function () {
    const memberSchema = new Schema(() => ({
      email: faker.string.symbol(getRandomInt(0, 100)) + '@example.com',
    }));
    const specialCharEmail = memberSchema.makeOne(fakerSeed).email;
    itCreatesNewMemberWithInvalidEmail(specialCharEmail, 'Invalid Email');
  });

  it('EP_87_ALEATORIO Como administrador de Ghost, al crear un nuevo Member con caracteres especiales en el campo de Email debe aparecer el error "Invalid Email".', function () {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const specialCharEmail =  faker.string.sample(getRandomInt(0, 100)) + '@' + faker.string.symbol() + '.' + faker.string.symbol();
    itCreatesNewMemberWithInvalidEmail(specialCharEmail, 'Invalid Email');
  });

  it('EP_88_PSEUDO Como administrador de Ghost, al crear un nuevo Member con el campo de Name con más de 100 caracteres el botón de Save y el formulario deben ser visibles', function () {
    const memberSchema = new Schema(() => ({
      email: faker.internet.email(),
      name: faker.lorem.words(70).slice(0, 101) // Ensure it exceeds 100 characters
    }));
    const longName = memberSchema.makeOne(fakerSeed).name;
    whenClickOnNewMemberButton();
    andInsertMemberName(longName);
    cy.get('[data-test-button="save"]').should('be.visible');
    cy.get('.member-basic-info-form').should('be.visible');
  });

  it('EP_89_PSEUDO Como administrador de Ghost, al crear un miembro en Ghost sin email y hago clic en guardar aparece el error "Please enter an email".', function () {
    const memberSchema = new Schema(() => ({
      email: '',
      name: faker.person.fullName()
    }));
    const member = memberSchema.makeOne(fakerSeed);
    whenClickOnNewMemberButton();
    andInsertMemberName(member.name);
    andClickOnSaveBtn();
    cy.contains('Please enter an email').should('be.visible');
  });

  it('EP_90_ALEATORIO Como administrador de Ghost, al crear un miembro en Ghost sin email y hago clic en guardar aparece el error "Please enter an email".', function () {
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
    const member = { email: '', name: faker.person.fullName() };
    whenClickOnNewMemberButton();
    andInsertMemberName(member.name);
    andClickOnSaveBtn();
    cy.contains('Please enter an email').should('be.visible');
  });
  afterEach(() => {
    andCloseSession();
  });
});
