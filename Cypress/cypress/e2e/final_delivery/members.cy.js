import {andCloseSession} from "../../steps/andSteps.cy";
import {givenNavigateToTheSite, givenUserIsLogin} from "../../steps/givenSteps.cy";
import {
    andClickOnSaveBtn,
    andInsertMemberEmail,
    andInsertMemberName,
    andInsertMemberNote,
    andNavigateToMembersPage,
    itCreatesNewMemberWithEmail,
    itCreatesNewMemberWithEmailAndName,
    itCreatesNewMemberWithEmailNameLabelsAndNote, saveBtnContainsMessage,
    thenMemberShouldBeVisible
} from "../../steps/membersSteps.cy";
import {getRandomInt} from "../../support/helpers";
import {
    andClickOnExistingMember,
    itCreatesNewMemberWithEmailAndNotes,
    itEditsExistingMemberEmail
} from "../../steps/edit-delete/membersSteps.cy";
import {faker} from "@faker-js/faker";
import {Schema} from "faker-schema";
const fakerSeed = 123;
describe('Editar un Member en la aplicación Ghost', () => {
    beforeEach(() => {
        // Given que inicio sesión como administrador
        givenNavigateToTheSite();
        givenUserIsLogin(Cypress.env("emailTest4"), Cypress.env("passwordTest4"));
        andNavigateToMembersPage();
        cy.fixture('members-a-priori.json').as('membersApriori');
    });

    it('EP_121_ALEATORIO Como administrador de Ghost, puedo editar el Email de un Member existente', function (){
        faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
        const memberEmail = faker.internet.email();
        itCreatesNewMemberWithEmail(memberEmail);
        faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
        const modifiedEmail = faker.internet.email();
        itEditsExistingMemberEmail(modifiedEmail);
        andNavigateToMembersPage();
        thenMemberShouldBeVisible({email: modifiedEmail})
    });

    it('EP_122_ALEATORIO Como administrador de Ghost, puedo editar el Email y el Nombre de un Member existente', function () {
        faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
        const memberEmail = faker.internet.email();
        const memberName = faker.person.firstName()
        itCreatesNewMemberWithEmailAndName(memberEmail, memberName);
        faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
        const modifiedEmail = faker.internet.email();
        const modifiedName = faker.person.firstName()

        andClickOnExistingMember(memberEmail);
        andInsertMemberEmail(modifiedEmail);
        andInsertMemberName(modifiedName);
        andClickOnSaveBtn();
        andNavigateToMembersPage();
        thenMemberShouldBeVisible({email: modifiedEmail});
    });

    it('EP_123_A-PSEUDO Como administrador de Ghost, puedo editar el Email, y las notas de un Member existente', function () {
        const memberSchema = new Schema(() => ({
            email: faker.internet.email(),
            note: faker.lorem.sentence(),
        }));
        const newMember = memberSchema.makeOne(fakerSeed);
        itCreatesNewMemberWithEmailAndNotes(newMember.email, newMember.note);
        andClickOnExistingMember(newMember.email);
        const modifiedSchema = new Schema(() => ({
            email: faker.internet.email(),
            note: faker.lorem.sentence(),
        }));
        const modifiedMember = modifiedSchema.makeOne(fakerSeed);
        andInsertMemberEmail(modifiedMember.email);
        andInsertMemberNote(modifiedMember.note);
        andClickOnSaveBtn();
        andNavigateToMembersPage();
        thenMemberShouldBeVisible({email: modifiedMember.email});
    });

    it('EP_124_ALEATORIO Como administrador de Ghost, al editar un Member existente no puedo agregar más de 191 caracteres en el campo de Name', function () {
        const memberEmail = this.membersApriori[getRandomInt(0, 30)].email;
        const longName = faker.lorem.words(70).slice(0, 191).replace(/\s/g, ''); // Ensure it exceeds 190 characters
        itCreatesNewMemberWithEmail(memberEmail);
        andClickOnExistingMember(memberEmail);
        andInsertMemberName(longName);
        andClickOnSaveBtn();
        cy.contains('Name cannot be longer than 191 characters').should('be.visible');
    });

    it('EP_125_A-PRIORI Como administrador de Ghost, al editar un Member existente no puedo agregar más de 190 caracteres en el campo de Email', function () {
        const memberEmail = this.membersApriori[getRandomInt(0, 30)].email;
        const longEmail = faker.lorem.sentence(180).replace(/\s/g, '') + '@example.com';
        itCreatesNewMemberWithEmail(memberEmail);
        andClickOnExistingMember(memberEmail);
        andInsertMemberEmail(longEmail);
        andClickOnSaveBtn();
        cy.contains('Email cannot be longer than 190 characters').should('be.visible');
    });

    it('EP_126_A-PRIORI Como administrador de Ghost, al editar un Member existente agregando emojis en el campo de Email debe generar error', function () {
        const memberEmail = this.membersApriori[getRandomInt(0, 30)].email;
        const emojisEmail = "🔥🚀✨" + '@example.com';
        itCreatesNewMemberWithEmail(memberEmail);
        andClickOnExistingMember(memberEmail);
        andInsertMemberEmail(emojisEmail);
        andClickOnSaveBtn();
        saveBtnContainsMessage('Retry');
        cy.contains('Invalid Email.').should('be.visible');
    });

    it('EP_127_A-PRIORI Como administrador de Ghost, al editar un Member existente agregando más de 60 caracteres en el campo de Name, puedo guardar los cambios correctamente', function () {
        const memberEmail = this.membersApriori[getRandomInt(0, 30)].email;
        const longName = faker.lorem.words(20).slice(0, 61); // Ensure it exceeds 60 characters
        itCreatesNewMemberWithEmail(memberEmail);
        andClickOnExistingMember(memberEmail);
        andInsertMemberName(longName);
        andClickOnSaveBtn();
        andNavigateToMembersPage();
        thenMemberShouldBeVisible({email: memberEmail});
    });

    it('EP_128_ALEATORIO Como administrador de Ghost, al editar un Member existente no debe ser posible agregar caracteres especiales en el email y en el nombre, y debe mostrar un error al guardar', function () {
        faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
        const memberEmail = faker.internet.email();
        const specialCharEmail = faker.string.sample(getRandomInt(0, 15)) + '@' + faker.string.symbol(4) + '.' + faker.string.symbol(3);
        const specialCharName = faker.string.symbol(10);
        itCreatesNewMemberWithEmail(memberEmail);
        andClickOnExistingMember(memberEmail);
        andInsertMemberEmail(specialCharEmail);
        andInsertMemberName(specialCharName);
        andClickOnSaveBtn();
        cy.contains('Invalid Email').should('be.visible');
        cy.contains('Invalid Name').should('be.visible');
    });

    it('EP_129_ALEATORIO Como administrador de Ghost, después de haber creado 10 Members puedo eliminar cualquiera aleatoriamente', async function () {
        faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
        for (let i = 0; i < 4; i++) {
            const email = faker.internet.email();
            const name = faker.person.fullName();
            itCreatesNewMemberWithEmailAndName(email, name);
        }
        const foundEmails = []

        await cy.get('tr[data-test-list="members-list-item"]').each($item => {
            const emailElement = $item.find('p.ma0.pa0.middarkgrey.f8.gh-members-list-email');
            const emailText = emailElement.text();
            foundEmails.push(emailText)
        })

        const emailToDelete = foundEmails[getRandomInt(0, foundEmails.length)]
        await andClickOnExistingMember(emailToDelete)
        await cy.get('[data-test-button="member-actions"]').click();
        cy.get('[data-test-button="delete-member"]').click();
        cy.contains('Delete member account').should('be.visible');
        cy.get('[data-test-button="confirm"]').click();
        await cy.contains(emailToDelete).should('not.exist');
    });

    it('EP_130_ALEATORIO Como administrador de Ghost, al editar un member existente con un nombre de más de 60 caracteres puedo eliminar correctamente el Member', function () {
        faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));
        const memberEmail = this.membersApriori[getRandomInt(0, 30)].email;
        const longName = faker.lorem.words(70).slice(0, 191).replace(/\s/g, '');
        itCreatesNewMemberWithEmail(memberEmail);
        andClickOnExistingMember(memberEmail);
        andInsertMemberName(longName);
        andClickOnSaveBtn();
        cy.get('[data-test-button="delete"]').click();
        cy.contains('Are you sure you want to delete this member?').should('be.visible');
        cy.get('[data-test-button="confirm-delete"]').click();
        cy.contains(memberEmail).should('not.exist');
    });

    afterEach(() => {
        andCloseSession();
    });
})