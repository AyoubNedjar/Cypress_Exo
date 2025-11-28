class HomePage{

    visit(){
        cy.visit("/")
    }

    acceptCookies(){
        cy.contains('button', 'Accepter tous').click({force:true})
    }

    /**
     * quand l'ecran est plus petit nécessaire
     */
    openMenu(){
         cy.get('button[aria-label="Menu"]').click()
    }
    
    openSearch() {
        cy.contains('Rechercher').click()
    }

    search(term) {
        cy.get('input[name="search"][placeholder="Rechercher"]')
        .type(`${term}{enter}`)
    }

    /**
     * Voir les accessoires en cuir
     */
    showLeatherAccessories(){
        this.openMenu()
        cy.contains('button', 'Nouvelle Collection', { matchCase: false }).click()
        cy.contains('a', 'Accessoires en cuir', { matchCase: false }).click()
        cy.url().should('include', '/nouvelle-collection/accessoires-en-cuir_7d0ddbba')
    }
}

//rendre la classe accessible à l'exterieur
export default new HomePage()