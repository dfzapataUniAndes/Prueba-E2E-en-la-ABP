import { givenNavigateToTheSite, givenUserIsLogin } from '../steps/givenSteps.cy';
import { whenNavigateToThePages } from '../steps/whenSteps.cy';
import { thenCreateNewPage } from '../steps/thenSteps.cy';

describe('Testing create pages ', () => {
    beforeEach(()=>{
        // Given que inicio sesion como administrador
        givenNavigateToTheSite();
        // And ingreso el correo "<USERNAME1>"
        givenUserIsLogin();
    });

    it('Test create a new page', () => {
        // When navego a la página de crear páginas
        whenNavigateToThePages();
        // And hago clic en crear nueva página
        thenCreateNewPage();

    });
});