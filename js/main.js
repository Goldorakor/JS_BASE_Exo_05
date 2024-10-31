const quotesContainer = document.getElementById('quotes-container');


// Récupérer les citations favorites depuis le localStorage
// le tableau vide est une valeur de secours pour éviter que JSON.parse() avec un localStorage.getItem('quoteDataStorage') null ne renvoie une erreur.
// en gros, si rien n'est trouvé dans le localStorage, favorites sera initialisé comme un tableau vide [].
const favorites = (JSON.parse(localStorage.getItem('quoteDataStorage')) OR []);


// boucle qui parcourt chaque entrée de l'objet quotes (notre "tableau associatif" associant auteurs et citations) où chaque entrée de cet objet est un tableau contenant un auteur et une citation [author, text].
// cette boucle sert donc à afficher les citations et plus bas dans le code à vérifier si elles sont favorites
for (const [auteur, texte] of Object.entries(quotes)) {

    // pour chaque citation, un nouvel élément 'quoteDiv' est créé, un élément 'heart' est également créé
    const quoteDiv = document.createElement('div');
    const heart = document.createElement('div');

    // La classe 'quote' est ajoutée à cet élément 'quoteDiv' qui n'avait pas de classe, (voir possibilités de className) ce qui permet de le styliser facilement via CSS (dans style.css) ou de le manipuler ici.
    quoteDiv.className = 'quote';

    // La classe 'coeur' est ajoutée à cet élément 'heart' qui n'avait pas de classe, (voir possibilités de className) ce qui permet de le styliser facilement via CSS (dans style.css) ou de le manipuler ici.
    heart.className = 'coeur'; 

    // La propriété style.width est définie pour que la largeur du div s'adapte au contenu qu'il contient.
    quoteDiv.style.width = 'fit-content';

    // Le contenu de quoteDiv est défini en utilisant des backticks (``) pour permettre l'insertion de variables. 
    // Il inclut la citation et l'auteur en spécifiant la classe de chaque élément qui reçoit sa variable.
    quoteDiv.innerHTML = `
        <p class="texte">"${texte}"</p> 
        <p class="auteur">${auteur}</p>
    `;

    // innerHTML : Cela permet de définir le contenu HTML du div 'heart'. Tu peux inclure des éléments HTML comme des paragraphes et des icônes. Ici, on vient y loger une icone.
    heart.innerHTML = `
        <i class="fa-regular fa-heart"></i>
    `;

    // La ligne quotesContainer.appendChild(heart); signifie que l'élément heart (qui est un <div>) est un enfant de l'élément quotesContainer (qui est un <div> aussi).
    quoteDiv.appendChild(heart);

    // De même, on précise ici que l'élément quoteDiv est un enfant de l'élément quotesContainer (c'est ici plus évident vu la structure html).
    quotesContainer.appendChild(quoteDiv);

    // Vérifier si la citation est dans les favoris
    // favorites : Il s'agit d'un tableau d'objets qui contient toutes les citations favorites de l'utilisateur. Chaque objet a deux propriétés : text (le texte de la citation) et author (l'auteur de la citation).
    // .some() : C'est une méthode de tableau en JavaScript qui teste si au moins un élément du tableau satisfait la condition fournie. Elle renvoie true si c'est le cas, et false sinon.
    // fav => fav.text === texte && fav.author === auteur : Il s'agit d'une fonction fléchée qui définit la condition à vérifier pour chaque élément du tableau favorites.
    // fav représente un objet dans le tableau favorites.
    // fav.text === texte vérifie si le texte de la citation fav est égal à la citation actuellement traitée (texte).
    // idem author
    // Syntaxe des fonctions fléchées : array.some(element => condition) 
    // element : C'est la variable qui représente chaque élément du tableau au cours de l'itération.
    // condition : C'est l'expression qui renvoie true ou false. Si true, cela signifie que l'élément satisfait la condition.
    
    if (favorites.some(fav => ((fav.text === texte) && (fav.author === auteur)))) {
        heart.classList.add('clicked');
        heart.style.display = 'flex';
        heart.innerHTML = `<i class="fa fa-heart" aria-hidden="true"></i>`;
    
}

// Gestion des événements pour le cœur
    quoteDiv.addEventListener('mouseover', function() {
        if (!heart.classList.contains('clicked')) { // si coeur pas cliqué
            heart.style.display = 'flex'; // Affiche le cœur du rectangle survolé
        }
    });

    quoteDiv.addEventListener('mouseout', function() {
        if (!heart.classList.contains('clicked')) { // si coeur pas cliqué
            heart.style.display = 'none'; // Masque le cœur lorsque le curseur quitte le rectangle
        }
    });

    quoteDiv.addEventListener('click', function() {
        heart.classList.add('clicked'); // Ajoute la classe 'clicked' sans écraser les autres classes
        heart.style.display = 'flex'; // Le coeur n'est plus caché
        
        // Affiche le nouveau coeur plein après le clique
        heart.innerHTML = `<i class="fa fa-heart" aria-hidden="true"></i>`;

        const quoteData = { author: auteur, text: texte };

        // Récupérer les citations existantes
        let favorites = JSON.parse(localStorage.getItem('quoteDataStorage')) || [];
        
        // Ajouter la nouvelle citation si elle n'est pas déjà dans le tableau
        if (!favorites.some(favo => favo.text === quoteData.text && favo.author === quoteData.author)) {
            favorites.push(quoteData);
            localStorage.setItem('quoteDataStorage', JSON.stringify(favorites));
        }
    });
}


/*

Object.entries(quotes) est une méthode très utile en JavaScript qui te permet de récupérer les paires clé-valeur d'un objet sous forme de tableau. ((quotes est un objet))

exemple pour bien comprendre :

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

Facilité de itération : on peut facilement parcourir les paires clé-valeur à l'aide d'une boucle for...of, comme dans l'exemple précédent :

for (const [author, text] of Object.entries(quotes)) {
    console.log(`${author}: "${text}"`);
}


        exemples pour illustrer l'importance de texteContent

        <p id="monParagraphe">Bonjour, monde !</p>

        <script>
            const paragraphe = document.getElementById('monParagraphe');
            const texte = paragraphe.textContent;
            console.log(texte); // Affiche "Bonjour, monde !"
        </script>

        <p id="monParagraphe">Bonjour, monde !</p>

        <script>
            const paragraphe = document.getElementById('monParagraphe');
            paragraphe.textContent = "Nouveau texte ici.";
            // Le texte du paragraphe devient "Nouveau texte ici."
        </script>


        <div id="monDiv">
            <p>Texte 1</p>
            <p>Texte 2</p>
        </div>

        <script>
            const div = document.getElementById('monDiv');
            console.log(div.textContent); // Affiche "Texte 1Texte 2"
        </script>


        .innerHTML : Utilisé pour récupérer ou définir le contenu HTML d'un élément. Utiliser .innerHTML peut exposer ton site à des risques de sécurité si tu manipules des données non sécurisées (par exemple, injection de code).


        .innerText : Semblable à .textContent, mais il renvoie uniquement le texte visible (par exemple, il ignore le texte caché par des styles CSS).

        */
