import { givenNavigateToTheSite, givenUserIsLogin } from '../steps/givenSteps.cy';
import { whenNavigateToThePages } from '../steps/whenSteps.cy';
import { thenCreateNewPage, thenInsertTitlePage, thenInsertContentPage, thenClicInPublish, thenClicInFinishReview, thenClicInPublishPage,
    thenCloseWindowPagePublished, thenViewCreatedPage, thenCloseSession
 } from '../steps/thenSteps.cy';

describe('Crear un page en Ghost', () => {
    beforeEach(()=>{
        // Given que inicio sesión como administrador
        givenNavigateToTheSite();
        givenUserIsLogin();
    });

    it('Como administrador inicio sesión, creo una página en Ghost exitosamente y la veo en el listado de páginas', () => {
        // When navego a la página de crear páginas
        whenNavigateToThePages();
        // And hago clic en crear nueva página
        thenCreateNewPage();
        // And ingreso el título de la página "Titulo página"
        thenInsertTitlePage("Titulo página");
        // And ingreso el contenido de la página "Contenido de lá página" 
        thenInsertContentPage("Contenido de lá página");
        // And hago clic en Publish
        thenClicInPublish();
        // And hago clic en finalizar revisión
        thenClicInFinishReview();
        // And hago clic en Publish page
        thenClicInPublishPage();
        // And cierro la ventana de página publicada
        thenCloseWindowPagePublished();
        // And veo en el listado de páginas la página con el titulo "Titulo página"
        thenViewCreatedPage("Titulo página");
        // And cierro sesión
        thenCloseSession();
    });
});