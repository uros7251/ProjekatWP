import {Menu} from './Menu.js';
import {Lounge} from './Lounge.js';

document.body.onload = function() {
    const glavnaSekcija = document.querySelector("#mainSection");
    
    let footer = document.querySelector("footer");
    footer.innerHTML = "Урош Стојковић, сва права задржана";

    const kokteli = new Menu("Cocktail Card &#127864");
    const margarita = kokteli.addMenuEntry("Margarita", 7);
    //margarita.setDescription("Hose Cuervo, lemon juice & lime");
    kokteli.addMenuEntry("Manhattan", 7);
    kokteli.addMenuEntry("Mojito", 9);
    const vina = new Menu("Wine Card &#127863");
    vina.addMenuEntry("Red Wine", 5);
    vina.addMenuEntry("White Wine", 5.5);
    vina.addMenuEntry("Rosé", 6);
    const lounge = new Lounge("Hudson Lounge", [3,2,1], [kokteli, vina]);
    //lounge.addMenu(kokteli, vina);
    lounge.drawLoungeView(glavnaSekcija);
}

