/// <reference types="cypress" />

// FICHIER : cypress/e2e/guide_cypress_methods.cy.js
// -----------------------------------------------
// Ce fichier est un "pense-bête" Cypress.
// Il contient des exemples de méthodes utiles pour écrire tes tests (listes, clics, assertions, etc.)
// Les tests sont en .skip pour ne pas être exécutés par défaut.
// Pour tester un bloc, remplace `it.skip` par `it`.

describe('Guide Cypress - Sélecteurs et navigation', () => {
  it.skip('Sélectionner des éléments avec cy.get et cy.contains', () => {
    // cy.get(selector) -> sélection par sélecteur CSS
    cy.get('.product-card')                // toutes les cartes produit
    cy.get('input[name="search"]')         // champ de recherche par name

    // cy.contains(texte) -> élément qui contient ce texte
    cy.contains('Rechercher').click()      // bouton ou lien "Rechercher"

    // cy.contains(selector, texte) -> élément d’un type donné qui contient ce texte
    cy.contains('button', 'Accepter tous').click({ force: true })
  })

  it.skip('Limiter la recherche à un parent avec find / within', () => {
    // Exemple typique : liste de produits
    cy.get('.product-list')                // parent (liste)

    // 1) find(selector) : cherche uniquement dans ce parent
    cy.get('.product-list')
      .find('.product-card')               // produits à l’intérieur de .product-list
      .should('have.length.at.least', 1)

    // 2) within(() => ...) : toutes les commandes dedans sont limitées au parent
    cy.get('.product-list').within(() => {
      cy.get('.product-card')              // ne cherche QUE dans .product-list
        .its('length')
        .should('be.greaterThan', 0)

      cy.contains('.product-title', 'robe', { matchCase: false }).should('exist')
    })
  })
})

describe('Guide Cypress - Parcourir des listes', () => {
  it.skip('Prendre le 1er, 2e, dernier élément', () => {
    cy.get('.product-card')
      .should('have.length.at.least', 2)

    // 1er élément (index 0)
    cy.get('.product-card').first()

    // 2e élément (index 1)
    cy.get('.product-card').eq(1)

    // dernier élément
    cy.get('.product-card').last()
  })

  it.skip('Parcourir chaque élément avec each', () => {
    const searchWord = 'robe' // par ex. vérifier que chaque produit contient "robe"

    cy.get('.product-card').each(($card) => {
      const text = $card.innerText.toLowerCase()
      expect(text).to.include(searchWord.toLowerCase())
    })
  })

  it.skip('Vérifier le nombre d’éléments avec its("length")', () => {
    cy.get('.product-card')
      .its('length')
      .should('be.greaterThan', 0) // au moins 1 produit
  })
})

describe('Guide Cypress - Remonter / descendre dans le DOM', () => {
  it.skip('Utiliser closest / parent / children', () => {
    // On part d’un titre de produit et on veut cliquer sur la carte complète
    cy.get('.product-title')
      .eq(1)                      // 2e titre
      .closest('a')               // remonte au lien cliquable
      .click()

    // parent() -> parent direct
    cy.get('.product-title')
      .eq(0)
      .parent()                   // parent direct de ce titre

    // parents() -> tous les parents
    cy.get('.product-title')
      .eq(0)
      .parents('.product-card')   // remonte jusqu’au parent avec cette classe

    // children(selector) -> enfants directs
    cy.get('.product-list')
      .children('.product-card')  // produits enfants directs
  })
})

describe('Guide Cypress - Actions (click, type, select, check)', () => {
  it.skip('Actions clavier / souris de base', () => {
    // Clic simple
    cy.get('.add-to-cart-button').click()

    // Clic forcé (si recouvert par un élément, ex: bannière)
    cy.contains('button', 'Accepter tous').click({ force: true })

    // Taper du texte + Entrée
    cy.get('input[name="search"]')
      .type('robe maille{enter}')   // {enter} = touche Entrée

    // Cocher une checkbox
    cy.get('input[type="checkbox"][name="promo"]').check()

    // Choisir une valeur dans un <select>
    cy.get('select[name="size"]').select('M') // par texte ou par valeur
  })
})

describe('Guide Cypress - Assertions utiles', () => {
  it.skip('Visibilité et existence', () => {
    cy.get('.product-card').should('be.visible')
    cy.get('.loader').should('not.exist')       // par ex : loader disparu
  })

  it.skip('Texte et contenu', () => {
    cy.get('.product-title')
      .first()
      .should('contain', 'robe')                // contient "robe"

    cy.get('.product-title')
      .first()
      .should('have.text', 'Robe maille combiné asymétrique') // texte EXACT

    cy.url().should('include', '/cart')         // URL contient "/cart"
  })

  it.skip('Valeur d’un input', () => {
    cy.get('input[name="search"]')
      .type('robe maille')
      .should('have.value', 'robe maille')
  })

  it.skip('Combiner plusieurs assertions', () => {
    cy.get('.cart-total')
      .should('be.visible')
      .and('contain', '€')                      // contient le symbole €
  })
})

describe('Guide Cypress - Récupérer des valeurs (nom, prix...)', () => {
  it.skip('Lire un texte et le réutiliser (ex: nom produit)', () => {
    // Exemple : lire le nom du 2e produit dans une liste, cliquer dessus,
    // et vérifier que le titre sur la page produit est le même.

    cy.get('.product-title')
      .eq(1)                    // 2e produit (index 1)
      .then(($title) => {
        const nameInList = $title.text().trim()

        // Cliquer sur le produit (en remontant au lien cliquable)
        cy.wrap($title)
          .closest('a')
          .click()

        // Sur la page, vérifier que le titre correspond
        cy.get('h1', { timeout: 10000 })
          .invoke('text')
          .then((nameOnPage) => {
            expect(nameOnPage.trim()).to.eq(nameInList)
          })
      })
  })

  it.skip('Lire un prix et le comparer (ex: avec le panier)', () => {
    // Exemple : lire le prix sur la fiche produit, ajouter au panier,
    // puis vérifier que le total du panier est égal à ce prix.

    // Lire le prix produit
    cy.get('.product-price')
      .invoke('text')
      .then((text) => {
        const price = parseFloat(text.replace(',', '.').replace(/[^\d.]/g, '')) // nettoie "€", espaces, etc.

        // Ajouter au panier
        cy.contains('Ajouter au panier').click()

        // Ouvrir le panier
        cy.contains('Panier').click()

        // Vérifier le total panier
        cy.get('.cart-total-price')
          .invoke('text')
          .then((cartText) => {
            const cartPrice = parseFloat(
              cartText.replace(',', '.').replace(/[^\d.]/g, '')
            )

            expect(cartPrice).to.eq(price)
          })
      })
  })
})

describe('Guide Cypress - Utiliser alias et then', () => {
  it.skip('Créer un alias pour réutiliser une liste', () => {
    cy.get('.product-card').as('products')

    cy.get('@products').should('have.length.at.least', 1)
    cy.get('@products').eq(1).click()
  })

  it.skip('Utiliser then pour des logiques JS custom', () => {
    cy.get('.product-card')
      .then(($cards) => {
        // $cards est une liste d’éléments DOM (jQuery-like)
        const count = $cards.length

        // Exemple : on veut vérifier qu’il y a un nombre pair de produits
        expect(count % 2).to.eq(0)
      })
  })
})
