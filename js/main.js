const quotesContainer = document.getElementById('quotes-container');


// boucle qui parcourt chaque entrée de l'objet quotes (notre "tableau associatif" associant auteurs et citations) où chaque entrée de cet objet est un tableau contenant un auteur et une citation [author, text].
for (const [auteur, texte] of Object.entries(quotes)) {

    // pour chaque citation, un nouvel élément 'div' est créé, un coeur est également créé
    const quoteDiv = document.createElement('div');
    const heart = document.createElement('div');

    // La classe quote est ajoutée à ce div, (voir possibilités de className) ce qui permet de le styliser facilement via CSS (dans style.css).
    quoteDiv.className = 'quote';

    // la classe de mon div s'appelle coeur
    heart.className = 'coeur'; 

    // La propriété style.width est définie pour que la largeur du div s'adapte au contenu qu'il contient.
    quoteDiv.style.width = 'fit-content';

    // Le contenu de quoteDiv est défini en utilisant des backticks (``) pour permettre l'insertion de variables. 
    // Il inclut la citation et l'auteur avec le style de chaque classe spécifiée.
    quoteDiv.innerHTML = `
        <p class="texte">"${texte}"</p> 
        <p class="auteur">${auteur}</p>
    `;


    // innerHTML : Cela te permet de définir le contenu HTML du heart. Tu peux inclure des éléments HTML comme des paragraphes et des icônes.
    heart.innerHTML = `
        <i class="fa-regular fa-heart"></i>
    `;

    

    // La ligne quotesContainer.appendChild(heart); signifie qu'on ajoute l'élément heart (qui est un <div>) en tant qu'enfant de l'élément quotesContainer.
    quoteDiv.appendChild(heart);

    // Enfin, chaque quoteDiv est ajouté à un conteneur existant dans le document (représenté par quotesContainer).
    quotesContainer.appendChild(quoteDiv);

    
}


// Object.entries(quotes) est une méthode très utile en JavaScript qui te permet de récupérer les paires clé-valeur d'un objet sous forme de tableau. ((quotes est un objet))


/* exemple pour bien comprendre :


const quotes = {
    "Albert Einstein": "La vie est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre.",
    "Marie Curie": "Rien dans la vie n'est à craindre, tout est à comprendre.",
    "Confucius": "Il ne suffit pas d'ouvrir les yeux, il faut aussi voir."
};


Lorsque tu appelles Object.entries(quotes), cela retourne :


[
    ["Albert Einstein", "La vie est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre."],
    ["Marie Curie", "Rien dans la vie n'est à craindre, tout est à comprendre."],
    ["Confucius", "Il ne suffit pas d'ouvrir les yeux, il faut aussi voir."]
]

Chaque sous-tableau contient deux éléments : le premier est le nom de l'auteur (la clé) et le deuxième est la citation (la valeur).



Facilité de itération : Tu peux facilement parcourir les paires clé-valeur à l'aide d'une boucle for...of, comme dans ton exemple précédent :

for (const [author, text] of Object.entries(quotes)) {
    console.log(`${author}: "${text}"`);
}


*/




/*
ce code ne fonctionne que pour le premier coeur


const quoteDiv = document.querySelector('.quote');
const heart = document.querySelector('.coeur');


// quand le souris passe sur la zone quoteDiv (quoteDiv.addEventListener)
quoteDiv.addEventListener('mouseover', function() {
    heart.style.display = 'flex'; // Affiche le cœur
});

// quand le souris quitte la zone quoteDiv (quoteDiv.addEventListener)
quoteDiv.addEventListener('mouseout', function() {
    heart.style.display = 'none'; // Masque le cœur
});

*/


// Sélectionne tous les éléments avec la classe 'quote'
// attention de bien changer le nom de la variable, si on reprend quotes, ça ne fonctionnera pas !

const citations = document.querySelectorAll('.quote');


citations.forEach(citation => {
    const heart = citation.querySelector('.coeur'); // Sélectionne le cœur associé car quote.querySelector et pas bidule.querySelector



    // on a besoin de ces deux variables pour injecter dans le localStorage si favori
    const texte = citation.querySelector('.texte'); // ('.texte') car je veux sélectionner l'élément de la classe texte
    const auteur = citation.querySelector('.auteur'); // pareil pour la classe auteur



    citation.addEventListener('mouseover', function() {
        if (!heart.classList.contains('clicked')) {
            // Affiche le cœur du rectangle survolé
        heart.style.display = 'flex';
        }
        

    });

    citation.addEventListener('mouseout', function() {
        if (!heart.classList.contains('clicked')) {
            heart.style.display = 'none'; // Masque le cœur lorsque le curseur quitte le rectangle
        }
        
    });

/*

    citation.addEventListener('mouseout', function() {
        if (this.heart.classList.contains = 'aria-hidden') {this.heart.style.display = 'flex'} else {heart.style.display = 'none'}
        ; // Masque le cœur lorsque le curseur quitte le rectangle
    });

*/

    citation.addEventListener('click', function() {
        // Affiche le nouveau coeur plein après le clique
        heart.classList.add('clicked'); // Ajoute la classe 'clicked'
        heart.style.display = 'flex';
        heart.innerHTML = `
        <i class="fa fa-heart" aria-hidden="true"></i>
        `;
        

        // stocker dans le localStorage
        const quoteData = {
            author : auteur,
            text : texte,
        };


        // 'selectedQuote' est la clé de stockage
        localStorage.setItem('selectedQuote', quoteData);
        console.log (localStorage);


    });


});



