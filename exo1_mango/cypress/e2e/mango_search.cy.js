

import homePage from "./pages/HomePage"

//evite que le test echoue si erreur dans le code du site
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})


describe('mango-recherche', ()=>{

    it('TC1 - Recherche Robe maille', () => {
        homePage.visit()
        homePage.acceptCookies()
        homePage.openSearch()
        homePage.search("robe maille")
      
        const searchWord = 'robe maille'
          
          //verifie que au moins un produit contient le mot chercher
        cy.get('.virtual-list',{ timeout: 10000 })
        //trouve une balise p qui continet le mot, et j'ai rajouter un timout pour lui laisser le temps de trouver
          .contains('p', searchWord, { matchCase: false})
          .should('exist')
    })

    //cloqiuer sur le menu
    // ->nouvelle collection
    // ->accessoires en cuir
    // -> cliquer sur sac cabas cuir suédé
    //->afficher le panier
    //-> varifier si le produit est dans le panier 
    //->&verifier que la quantité est 1 
    //->& veirfier que le total est le prix du produit

    it("verification du panier", ()=>{
      homePage.visit()
      homePage.acceptCookies()
      homePage.showLeatherAccessories()
        
            
      cy.get('a[href="https://shop.mango.com/be/fr/p/femme/chaussure/boot-et-bottin/bottes-suede-talon_17026743"]')
        .first()
        .click()
            
      cy.get('#pdp-primary-actions').within(() => {
          cy.contains('button', 'Ajouter', { matchCase: false })
              .click()
      })
        
        //PAS moyen de choisir une taille car dialog ne s'ouvre pas dans l'environnment de test
    })

})