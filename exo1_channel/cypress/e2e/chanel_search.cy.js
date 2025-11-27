

//evite que le test echoue
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('chanel-recherche', ()=>{

    it('TC1 - Recherche Robe maille', () => {
         cy.visit("/")


        cy.contains('button', 'Accepter tous').click({ force: true })


         cy.contains('Rechercher').click()
         cy.get('input[name="search"][placeholder="Rechercher"]').type('robe maille{enter}')

          const searchWord = 'robe maille'
          
          //verifie que au moins un produit contient le mot chercher
          cy.get('.virtual-list',{ timeout: 10000 })
        //trouve une balise p qui continet le mot, et j'ai rajouter un timout pour lui laisser le temps de trouver
          .contains('p', searchWord, { matchCase: false,  timeout: 10000 })
          .should('exist')
    })
    
})