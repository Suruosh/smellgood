import { Product } from '@/lib/types';

// Helper to generate product ID
function pid(brand: string, name: string): string {
  return `${brand}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Placeholder image based on category
function img(category: 'men' | 'women' | 'unisex', idx: number): string {
  const hues: Record<string, number[]> = {
    men: [210, 220, 230, 200, 240],
    women: [330, 340, 350, 320, 310],
    unisex: [40, 50, 30, 45, 35],
  };
  const h = hues[category][idx % 5];
  return `https://placehold.co/400x500/${hslToHex(h, 30, 85)}/${hslToHex(h, 40, 25)}?text=${encodeURIComponent('SmellGood')}`;
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `${f(0)}${f(8)}${f(4)}`;
}

const topNotesMen = ['bergamott', 'citron', 'grapefrukt', 'peppar', 'kardemumma', 'lavendel', 'mynta', 'ingefära', 'äpple', 'ananas'];
const middleNotesMen = ['iris', 'geranium', 'salvia', 'kanel', 'jasmin', 'rosmarin', 'havstång', 'violblad', 'nejlika', 'cederträ'];
const baseNotesMen = ['vetiver', 'sandelträ', 'mysk', 'ambra', 'tonkaböna', 'läder', 'patchouli', 'vanilj', 'ek', 'bärnsten'];

const topNotesWomen = ['ros', 'pion', 'frésia', 'magnolia', 'bergamott', 'päron', 'lychee', 'mandarin', 'blåbär', 'persika'];
const middleNotesWomen = ['jasmin', 'tuberosa', 'ylang-ylang', 'iris', 'orkidé', 'lily', 'ros', 'viol', 'mimosa', 'gardenia'];
const baseNotesWomen = ['vanilj', 'mysk', 'sandelträ', 'kasjmir', 'ambra', 'cederträ', 'pralin', 'tonkaböna', 'patchouli', 'bärnsten'];

const topNotesUnisex = ['bergamott', 'grapefrukt', 'svartvinbär', 'safran', 'pink peppar', 'kumquat', 'neroli', 'te', 'fikon', 'röd äpple'];
const middleNotesUnisex = ['iris', 'oud', 'amber', 'jasmin', 'cederträ', 'lavendel', 'incens', 'kardemumma', 'geranium', 'violrot'];
const baseNotesUnisex = ['mysk', 'sandelträ', 'vetiver', 'ambra', 'bärnsten', 'patchouli', 'vanilj', 'läder', 'ek', 'labdanum'];

function pickNotes(topArr: string[], midArr: string[], baseArr: string[], idx: number) {
  return {
    top: [topArr[idx % topArr.length], topArr[(idx + 3) % topArr.length]],
    middle: [midArr[idx % midArr.length], midArr[(idx + 2) % midArr.length]],
    base: [baseArr[idx % baseArr.length], baseArr[(idx + 4) % baseArr.length]],
  };
}

// Men's perfume brands and names
const menPerfumes: [string, string, string, number, number?][] = [
  ['Dior', 'Sauvage', 'En kraftfull och fräsch doft med rå maskulinitet. Bergamott möter ambroxan i en oförglömlig kombination.', 349, 499],
  ['Bleu de Chanel', 'Eau de Parfum', 'Sofistikerad och tidlös. Trädiga toner med en hint av citrus skapar en elegant signatur.', 379, 549],
  ['Versace', 'Eros', 'Gudomlig passion i en flaska. Mynta, vanilj och tonkaböna i en förförisk blandning.', 299, 449],
  ['Armani', 'Acqua di Giò', 'Medelhavsinspirerad fräschör. Havstoner och citrus för en avslappnad men stilfull doft.', 329, 479],
  ['Paco Rabanne', '1 Million', 'Lyxig och utmanande. Blodmandarin och läder i en gyllene dröm.', 289, 429],
  ['Tom Ford', 'Oud Wood', 'Exotisk och mystisk. Oud, sandelträ och vetiver skapar en djup och komplex doft.', 459, 699],
  ['Yves Saint Laurent', 'Y Eau de Parfum', 'Modern maskulinitet. Salvia, ingefära och cederträ i perfekt balans.', 359, 519],
  ['Hugo Boss', 'Bottled', 'Klassisk elegans. Äpple, kanel och sandelträ i en tidlös komposition.', 249, 389],
  ['Calvin Klein', 'Eternity', 'Ren och frisk. Lavendel, jasmin och sandelträ för den moderna mannen.', 199, 329],
  ['Dolce & Gabbana', 'The One', 'Karismatisk och varm. Ingefära, tobak och ambra i en sofistikerad blandning.', 319, 469],
  ['Jean Paul Gaultier', 'Le Male', 'Ikonisk och djärv. Lavendel, vanilj och mynta i en legendarisk flaska.', 279, 419],
  ['Givenchy', 'Gentleman', 'Raffinerad charm. Iris, lavendel och patchouli för gentlemannen.', 299, 449],
  ['Burberry', 'Hero', 'Djärv och äventyrlig. Cederträ och svart peppar med havsinspiration.', 269, 399],
  ['Montblanc', 'Explorer', 'Utforskaren. Bergamott, vetiver och patchouli för den äventyrlige.', 229, 349],
  ['Valentino', 'Uomo Born in Roma', 'Italiensk sophistication. Ginblomma och vetiver i en modern klassiker.', 339, 499],
  ['Hermès', 'Terre d\'Hermès', 'Jordnära elegans. Apelsin, peppar och vetiver i en mästerlig komposition.', 399, 599],
  ['Creed', 'Aventus', 'Kunglig. Ananas, björkträ och mysk i en legendarisk doft.', 549, 849],
  ['Maison Margiela', 'Jazz Club', 'Kvällens soundtrack. Tobak, rom och vanilj skapar en stämningsfull atmosfär.', 389, 579],
  ['Issey Miyake', 'L\'Eau d\'Issey Pour Homme', 'Minimalistisk elegans. Vatteniga toner med yuzu och cederträ.', 259, 389],
  ['Ralph Lauren', 'Polo Blue', 'Sportig fräschör. Melon, gurka och suede i en energisk komposition.', 239, 359],
  ['Azzaro', 'Wanted', 'Efterlyst. Ingefära, kardemumma och tonkaböna i en varm mix.', 249, 369],
  ['Carolina Herrera', 'Bad Boy', 'Rebellisk charm. Svart och vit peppar med kakao och tonkaböna.', 299, 439],
  ['Guerlain', 'L\'Homme Idéal', 'Den perfekte mannen. Mandel, lavendel och läder i harmoni.', 319, 469],
  ['Bvlgari', 'Man in Black', 'Mörk intensitet. Tobak, rom och läder i en magnetisk doft.', 289, 429],
  ['Lacoste', 'L.12.12 Blanc', 'Ren sportig stil. Cederträ, suede och grapefrukt.', 199, 299],
  ['Coach', 'For Men', 'Amerikansk cool. Nashi-päron, kumquat och vetiver.', 219, 329],
  ['Jimmy Choo', 'Man', 'Urban sophistikation. Lavendel, melon och patchouli.', 239, 359],
  ['Diesel', 'Only The Brave', 'Modig och oförskräckt. Citron, cederträ och ambra.', 229, 339],
  ['Abercrombie & Fitch', 'First Instinct', 'Instinktiv attraktion. Gin-tonic ackord och suede.', 209, 309],
  ['Nautica', 'Voyage', 'Havets frihet. Äpple, mimosablomma och cederträ.', 149, 229],
  ['David Beckham', 'Instinct', 'Stilsäker maskulinitet. Bergamott, stjärnanis och patchouli.', 129, 199],
  ['Jaguar', 'Classic Black', 'Klassisk raffinemang. Mandarin, mynta och sandelträ.', 139, 209],
  ['Antonio Banderas', 'The Secret', 'Förförisk mystik. Kardemumma, äpple och läder.', 119, 179],
  ['Kenneth Cole', 'Mankind', 'Modern man. Ingefära, suede och ek.', 169, 249],
  ['Perry Ellis', '360°', 'Full cirkel. Mandarin, lavendel och mysk.', 149, 219],
  ['Davidoff', 'Cool Water', 'Ikonisk friskhet. Havstoner med lavendel och sandelträ.', 169, 259],
  ['Dunhill', 'Icon', 'Brittisk elegans. Neroli, lavendel och agarträ.', 279, 419],
  ['Salvatore Ferragamo', 'Uomo', 'Italiensk stil. Kardemumma, tiramisu-ackord och cashmeranträ.', 259, 389],
  ['Roberto Cavalli', 'Uomo', 'Vild elegans. Kanel, kakaobutter och virginiakrydda.', 239, 359],
  ['Ermenegildo Zegna', 'Z Zegna', 'Diskret lyx. Grapefrukt, violblad och vetiver.', 299, 449],
  ['Michael Kors', 'Extreme Blue', 'Intensivt blå. Bergamott, änglatrumpet och suede.', 249, 369],
  ['John Varvatos', 'Artisan', 'Hantverksmässig kvalitet. Tangerin, lavendel och trähybrid.', 259, 389],
  ['Ed Hardy', 'Love & Luck', 'Djärv stil. Ingefära, salvia och tonkaböna.', 139, 209],
  ['Guess', 'Seductive', 'Förförande manlighet. Kardemumma, mandarin och patchouli.', 149, 229],
  ['Oscar de la Renta', 'Pour Lui', 'Raffinerad elegans. Lavendel, muskotnöt och bärnsten.', 189, 279],
  ['Mancera', 'Cedrat Boise', 'Citrus och trä. Citron, cederträ och läder i harmoni.', 329, 489],
  ['Nishane', 'Hacivat', 'Konstnärligt mästerverk. Ananas, bergamott och ek.', 399, 599],
  ['Xerjoff', 'Naxos', 'Siciliansk poesi. Tobak, honung och lavendel.', 449, 679],
  ['Initio', 'Side Effect', 'Beroendeframkallande. Tobak, vanilj och rum.', 429, 649],
  ['Parfums de Marly', 'Layton', 'Kungligt arv. Äpple, vanilj och peppar.', 419, 629],
  ['Amouage', 'Reflection Man', 'Spegling av elegans. Neroli, jasmin och sandelträ.', 459, 689],
  ['Byredo', 'Gypsy Water', 'Nomadisk charm. Bergamott, citron och vanilj.', 389, 579],
  ['Le Labo', 'Santal 33', 'Kultstatus. Sandelträ, papyrus och cederträ.', 419, 629],
  ['Diptyque', 'Tam Dao', 'Poetisk enkelhet. Sandelträ, rosenträ och myrra.', 359, 539],
  ['Malin+Goetz', 'Dark Rum', 'Mörk och förförisk. Rum, läder och plommon.', 299, 449],
  ['Aesop', 'Hwyl', 'Japansk skog. Cypress, vetiver och rökt incens.', 349, 519],
  ['Commodity', 'Gold', 'Ren lyx. Citron, jasmin och mysk i minimalistisk form.', 249, 369],
  ['Clean Reserve', 'Sueded Oud', 'Medveten lyx. Oud, saffran och suede.', 269, 399],
  ['Atelier Cologne', 'Cédrat Enivrant', 'Berusande citrus. Citron, mynta och elemi.', 289, 429],
  ['Jo Malone', 'Wood Sage & Sea Salt', 'Brittisk kust. Havssalt, salvia och ambrett.', 299, 449],
  ['Acqua di Parma', 'Colonia', 'Italiensk tradition. Citrus, rosmarin och vetiver.', 329, 489],
  ['Penhaligon\'s', 'Halfeti', 'Exotisk turkisk ros. Oud, rökelse och läder.', 399, 599],
  ['Floris London', 'No.89', 'Brittiskt arv sedan 1951. Lavendel, neroli och sandelträ.', 329, 489],
  ['D.S. & Durga', 'Cowboy Grass', 'Amerikansk prärie. Gräs, salvia och vetiver.', 319, 479],
  ['Escentric Molecules', 'Molecule 01', 'Minimalistisk innovation. Iso E Super i ren form.', 299, 449],
  ['Juliette Has a Gun', 'Not a Perfume', 'Anti-parfym. Ambroxan i minimalistisk skönhet.', 279, 419],
  ['Imaginary Authors', 'Every Storm a Serenade', 'Litterär poesi. Vetiver, havstång och träharts.', 289, 429],
  ['Boy Smells', 'Flor de la Virgen', 'Genderless elegans. Cempazúchitl och tonkaböna.', 259, 389],
  ['19-69', 'Purple Haze', 'Svensk fri anda. Cannabis, violblad och patchouli.', 349, 519],
  ['Zarko Perfume', 'Cloud Collection No.2', 'Skandinavisk sky. Iso E Super och cederträ.', 299, 449],
  ['Vilhelm Parfumerie', 'Dear Polly', 'Stockholms charm. Te, äpple och vanilj.', 339, 509],
  ['Ormonde Jayne', 'Montabaco', 'Tobaksbladets poesi. Tabak, kakao och osmanthus.', 379, 569],
  ['Serge Lutens', 'Chergui', 'Ökennatt. Tobak, honung och incens.', 349, 519],
  ['Memo Paris', 'African Leather', 'Afrikansk resa. Läder, safran och cardamomma.', 389, 579],
  ['Tiziana Terenzi', 'Kirke', 'Mytologisk kraft. Päron, passionsfrukt och vanilj.', 419, 629],
  ['Clive Christian', 'No. 1', 'Världens dyraste parfym i pocketformat. Bergamott, lime och sandelträ.', 549, 899],
  ['Roja Parfums', 'Elysium', 'Himmelskt. Grapefrukt, jasmin och vetiver.', 499, 749],
  ['Frederic Malle', 'Portrait of a Lady', 'Konstnärligt porträtt. Turkisk ros, patchouli och incens.', 449, 679],
  ['Kilian', 'Straight to Heaven', 'Rakt till himlen. Rum, cederträ och mysk.', 399, 599],
  ['Tom Ford', 'Tobacco Vanille', 'Ikonisk tobaksvanilj. Tobak, vanilj och kakao.', 479, 719],
  ['Tom Ford', 'Noir Extreme', 'Extrem mörker. Kardemumma, kulfi-ackord och ambra.', 439, 659],
  ['Dior', 'Homme Intense', 'Intensiv elegans. Iris, ambra och lavendel.', 359, 529],
  ['Chanel', 'Allure Homme Sport', 'Sportig lyx. Mandarin, peppar och cederträ.', 349, 519],
  ['Versace', 'Dylan Blue', 'Medelhavets blå. Bergamott, violblad och patchouli.', 269, 399],
  ['Prada', 'Luna Rossa Carbon', 'Teknologisk fräschör. Lavendel och ambroxan.', 319, 469],
  ['Gucci', 'Guilty Pour Homme', 'Förbjuden frukt. Lavendel, apelsinblomma och patchouli.', 299, 449],
  ['Viktor & Rolf', 'Spicebomb', 'Explosiv krydda. Chili, tobak och vetiver.', 329, 489],
];

const womenPerfumes: [string, string, string, number, number?][] = [
  ['Chanel', 'N°5', 'Den ultimata ikoniska doften. Aldehyder, jasmin och sandelträ i tidlös elegans.', 399, 599],
  ['Dior', 'Miss Dior', 'Romantisk och feminin. Ros, jasmin och mysk i en drömmande komposition.', 369, 549],
  ['Lancôme', 'La Vie Est Belle', 'Livet är vackert. Iris, pralin och patchouli i en glädjefull doft.', 329, 489],
  ['Yves Saint Laurent', 'Black Opium', 'Beroendeframkallande. Kaffe, vanilj och vitpeppar i en mörk förförelse.', 349, 519],
  ['Gucci', 'Bloom', 'Blommande trädgård. Tuberosa, jasmin och rangoonklängväxt.', 319, 469],
  ['Marc Jacobs', 'Daisy', 'Lekfull charm. Jordgubbe, viol och vanilj i en ungdomlig bukett.', 249, 369],
  ['Viktor & Rolf', 'Flowerbomb', 'En explosion av blommor. Orkidé, jasmin och ros i en kraftfull bukett.', 339, 499],
  ['Dolce & Gabbana', 'Light Blue', 'Medelhavsdrömmar. Siciliansk citron, äpple och cederträ.', 279, 419],
  ['Versace', 'Bright Crystal', 'Strålande kristall. Granatäpple, magnolia och mysk.', 259, 389],
  ['Coco Mademoiselle', 'Eau de Parfum', 'Parisiskan. Apelsin, ros och patchouli i en sofistikerad blandning.', 389, 579],
  ['Prada', 'Candy', 'Söt förförelse. Karamell, muskotnöt och mysk.', 299, 449],
  ['Narciso Rodriguez', 'For Her', 'Feminin mystik. Mysk, ambra och osmanthus.', 309, 459],
  ['Givenchy', 'Irresistible', 'Oemotståndlig. Ros, iris och mysk i en charmig dans.', 289, 429],
  ['Valentino', 'Donna Born in Roma', 'Romersk elegans. Jasmin, vanilj och bourbon.', 339, 509],
  ['Burberry', 'Her', 'Londoninskan. Blåbär, jasmin och ambra.', 279, 419],
  ['Hermès', 'Twilly d\'Hermès', 'Ungdomlig elegans. Ingefära, tuberosa och sandelträ.', 349, 519],
  ['Jo Malone', 'Peony & Blush Suede', 'Brittisk raffinemang. Pion, rosäpple och suede.', 329, 489],
  ['Tom Ford', 'Black Orchid', 'Mörk lyx. Svart orkidé, kryddor och choklad.', 449, 669],
  ['Thierry Mugler', 'Alien', 'Utomjordisk. Jasmin, cashmeranträ och ambra i en hypnotisk doft.', 299, 449],
  ['Carolina Herrera', 'Good Girl', 'Feminin dualitet. Tuberosa, jasmin och kakao i en stilettflaska.', 329, 489],
  ['Chloé', 'Eau de Parfum', 'Blommig fräschhet. Ros, magnolia och cederträ.', 289, 429],
  ['Balenciaga', 'Florabotanica', 'Botanisk konst. Ros, hemp och vetiver.', 319, 479],
  ['Miu Miu', 'L\'Eau Rosée', 'Rosa drömmar. Lily, akaciahonung och mysk.', 279, 419],
  ['Elie Saab', 'Le Parfum', 'Couture-elegans. Apelsinblomma, jasmin och rosor.', 299, 449],
  ['Tiffany & Co', 'Eau de Parfum', 'Luxuös klarhet. Iris, patchouli och muskotnöt.', 329, 489],
  ['Bvlgari', 'Omnia Crystalline', 'Kristallklar skönhet. Bambu, te och lotusblomma.', 249, 369],
  ['Guerlain', 'Mon Guerlain', 'Hyllning till feminitet. Lavendel, jasmin och vanilj.', 339, 509],
  ['Kenzo', 'Flower by Kenzo', 'Poetisk blomma. Valmue, bulgariakros och vanilj.', 249, 369],
  ['Issey Miyake', 'L\'Eau d\'Issey', 'Japansk renhet. Melon, lotus och cyklamen.', 239, 359],
  ['Elizabeth Arden', 'Red Door', 'Klassisk glamour. Ros, jasmin och orchidé.', 189, 279],
  ['Estée Lauder', 'Beautiful', 'Tidlös skönhet. Tuberosa, jasmin och lily i bröllopsbuketten.', 229, 339],
  ['Calvin Klein', 'Euphoria', 'Eufori. Granatäpple, svart orkidé och ambra.', 219, 329],
  ['Ralph Lauren', 'Romance', 'Kärlekshistoria. Ros, ingefära och ekmossa.', 249, 369],
  ['Donna Karan', 'Cashmere Mist', 'Len som kashmir. Jasmin, lily och sandelträ.', 239, 359],
  ['Michael Kors', 'Sexy Amber', 'Förförisk ambra. Vit jasmin, sandelträ och ambra.', 249, 369],
  ['Coach', 'Floral', 'Blommig optimism. Te-ros, gardenia och cederträ.', 229, 339],
  ['Kate Spade', 'In Full Bloom', 'Full blom. Iris, tuberosa och vit mysk.', 209, 309],
  ['Juicy Couture', 'Viva La Juicy', 'Festlig. Mandarin, gardenia och karamell.', 219, 329],
  ['Philosophy', 'Amazing Grace', 'Nådens doft. Muguet, ros och mysk.', 179, 269],
  ['Clean Reserve', 'Skin', 'Huden du är i. Mysk, tonkaböna och olibanum.', 249, 369],
  ['Byredo', 'Rose of No Man\'s Land', 'Krigets ros. Turkisk rosa peppar och papyrus.', 389, 579],
  ['Le Labo', 'Rose 31', 'Rosinnovation. Ros, cederträ och gaïak.', 419, 629],
  ['Diptyque', 'Do Son', 'Vietnamesisk poesi. Tuberosa, iris och mysk.', 349, 519],
  ['Maison Francis Kurkdjian', 'Baccarat Rouge 540', 'Röda kristaller. Safran, jasmin och amberträ.', 549, 849],
  ['Parfums de Marly', 'Delina', 'Kunglig ros. Lychee, ros och vanilj.', 419, 629],
  ['Nishane', 'Hundred Silent Ways', 'Hundra tysta vägar. Rose absolute, tonkaböna och vanilj.', 399, 599],
  ['Xerjoff', 'Casamorati Lira', 'Operans röst. Bergamott, karamell och vanilj.', 429, 649],
  ['Initio', 'Atomic Rose', 'Atomisk kraft. Ros, mysk och ambra.', 449, 679],
  ['Amouage', 'Honour Woman', 'Ära och skönhet. Tuberosa, gardenia och mysk.', 439, 659],
  ['Kilian', 'Love Don\'t Be Shy', 'Öm kärlek. Marshmallow, neroli och vanilj.', 429, 649],
  ['Creed', 'Love in White', 'Kärlek i vitt. Ris, magnolia och sandelträ.', 469, 709],
  ['Frederic Malle', 'Carnal Flower', 'Sinnlig blomma. Tuberosa, melon och mysk.', 449, 679],
  ['Serge Lutens', 'La Fille de Berlin', 'Berlinflickan. Ros, vax och honung.', 349, 519],
  ['Memo Paris', 'Marfa', 'Texasöken. Hesperedin, freesia och kasjmir.', 379, 569],
  ['Tiziana Terenzi', 'Andromeda', 'Galaktisk ros. Ros, mandarin och mysk.', 399, 599],
  ['Clive Christian', 'No. 1 Feminine', 'Ultimat lyx. Plommon, orchidé och vanilj.', 549, 899],
  ['Roja Parfums', 'Elixir Pour Femme', 'Elixir av skönhet. Ros, jasmin och oud.', 499, 749],
  ['Vilhelm Parfumerie', 'Poets of Berlin', 'Berlins poeter. Bambu, blåbär och kasjmir.', 339, 509],
  ['19-69', 'Kasbah', 'Marockansk marknad. Svartvinbär, ros och cederträ.', 349, 519],
  ['Zarko Perfume', 'Pink Molécule 090.09', 'Rosa molekyl. Iso E Super och ros i perfekt balans.', 289, 429],
  ['Malin+Goetz', 'Stem', 'Minimalistisk grönska. Blåklint, nässla och mysk.', 279, 419],
  ['Aesop', 'Rōzu', 'Japansk trädgård. Ros, guaïak och patchouli.', 349, 519],
  ['Boy Smells', 'Tantrum', 'Passionerat utbrott. Jasmin, lychee och sandelträ.', 249, 369],
  ['Commodity', 'Nectar', 'Blommig nektar. Freesia, jasmin och mysk.', 239, 359],
  ['Atelier Cologne', 'Rose Anonyme', 'Anonym ros. Ros, oud och patchouli.', 289, 429],
  ['Escentric Molecules', 'Molecule 02', 'Molekylär magin. Ambroxan i ren form.', 279, 419],
  ['Juliette Has a Gun', 'Mmmm...', 'Njutningens ljud. Tuberosa, iris och mysk.', 269, 399],
  ['Imaginary Authors', 'Saint Julep', 'Sydstaternas charm. Mynta, magnolia och socker.', 279, 419],
  ['Acqua di Parma', 'Rosa Nobile', 'Ädel ros. Centifolia-ros, peoner och mysk.', 339, 509],
  ['Penhaligon\'s', 'Empressa', 'Kejsarinnans val. Ros, oud och rökelse.', 389, 579],
  ['Floris London', 'Cherry Blossom', 'Körsbärsblom. Mandel, ros och mysk.', 299, 449],
  ['D.S. & Durga', 'Debaser', 'Tusenfotsfikon. Fikon, kokosmjölk och iris.', 309, 459],
  ['Ormonde Jayne', 'Champaca', 'Tropisk blomma. Champaca, jasmin och cederträ.', 369, 549],
  ['Mancera', 'Roses Vanille', 'Ros och vanilj. Turkisk ros, vanilj och mysk.', 309, 459],
  ['Chanel', 'Chance Eau Tendre', 'Mild chans. Grapefrukt, jasmin och vit mysk.', 339, 509],
  ['Dior', 'J\'adore', 'Jag älskar. Ylang-ylang, ros och jasmin.', 379, 559],
  ['YSL', 'Libre', 'Frihet. Lavendel, apelsinblomma och vanilj.', 349, 519],
  ['Gucci', 'Flora Gorgeous Gardenia', 'Gardenians skönhet. Gardenia, päron och brun socker.', 299, 449],
  ['Prada', 'Paradoxe', 'Paradoxal kvinna. Neroli, jasmin och ambra.', 329, 489],
  ['Armani', 'Sì', 'Ja. Svartvinbär, freesia och vanilj.', 319, 479],
  ['Lancôme', 'Idôle', 'Idol. Ros, jasmin och kashmir.', 299, 449],
  ['Versace', 'Crystal Noir', 'Mörk kristall. Ingefära, gardenia och ambra.', 269, 399],
  ['Valentino', 'Voce Viva', 'Livets röst. Bergamott, gardenia och sandelträ.', 329, 489],
];

const unisexPerfumes: [string, string, string, number, number?][] = [
  ['Maison Francis Kurkdjian', 'Aqua Universalis', 'Universellt vatten. Bergamott, vit blomma och mysk i en doft för alla.', 399, 599],
  ['Byredo', 'Bal d\'Afrique', 'Afrikansk bal. Neroli, violblad och vetiver.', 389, 579],
  ['Le Labo', 'Another 13', 'Molekylär elegans. Ambroxan, jasmin och mysk.', 419, 629],
  ['Tom Ford', 'Neroli Portofino', 'Italiensk riviera. Neroli, bergamott och ambra.', 459, 689],
  ['Escentric Molecules', 'Escentric 01', 'Kemisk konst. Iso E Super med rosa peppar och lime.', 299, 449],
  ['Comme des Garçons', 'Wonderwood', 'Underbara trä. Cederträ, sandelträ och vetiver.', 279, 419],
  ['Maison Margiela', 'Replica Whispers in the Library', 'Biblioteksviskning. Peppar, cederträ och vanilj.', 339, 509],
  ['Diptyque', 'Philosykos', 'Fikonträdet. Fikon, kokosnöt och cederträ.', 349, 519],
  ['Aesop', 'Tacit', 'Tyst skönhet. Yuzu, basilika och vetiver.', 329, 489],
  ['19-69', 'Chinese Tobacco', 'Kinesisk tobak. Tobak, ciste och cederträ.', 349, 519],
  ['Byredo', 'Mojave Ghost', 'Ökenspöke. Sapodilla, magnolia och sandelträ.', 389, 579],
  ['Le Labo', 'Bergamote 22', 'Bergamottens själ. Bergamott, amber och vetiver.', 399, 599],
  ['Maison Francis Kurkdjian', 'Gentle Fluidity Silver', 'Mjukt silver. Juniper, mysk och ambra.', 429, 649],
  ['Tom Ford', 'Soleil Blanc', 'Vit sol. Ylang-ylang, tuberosa och ambra.', 449, 679],
  ['Creed', 'Silver Mountain Water', 'Silvervatten. Bergamott, te och mysk.', 469, 709],
  ['Jo Malone', 'Lime Basil & Mandarin', 'Brittisk kreativitet. Lime, basilika och vit mysk.', 299, 449],
  ['Acqua di Parma', 'Blu Mediterraneo', 'Blått medelhav. Citron, rosmarin och ambra.', 309, 459],
  ['Atelier Cologne', 'Vanille Insensée', 'Vansinnig vanilj. Vanilj, lime och cederträ.', 289, 429],
  ['Clean Reserve', 'Warm Cotton', 'Varm bomull. Lily, bomull och mysk.', 249, 369],
  ['Vilhelm Parfumerie', 'Morning Chess', 'Morgonschack. Svart te, vetiver och mysk.', 339, 509],
  ['Zarko Perfume', 'MOL\'éCULE 234·38', 'Molekylär precision. Iso E Super och mysk.', 289, 429],
  ['D.S. & Durga', 'I Don\'t Know What', 'Jag vet inte vad. Iso E Super, mysk och iris.', 329, 489],
  ['Imaginary Authors', 'Memoirs of a Trespasser', 'Inkräktarens memoarer. Vanilj, mysk och oud.', 279, 419],
  ['Commodity', 'Book', 'Boken. Safran, olibanum och tonkaböna.', 249, 369],
  ['Malin+Goetz', 'Cannabis', 'Grön frihet. Cannabis, svart fig och kryddor.', 269, 399],
  ['Boy Smells', 'Suede Pony', 'Lekfull mocka. Ylang-ylang, suede och mysk.', 249, 369],
  ['Juliette Has a Gun', 'Anyway', 'I alla fall. Jasmin, iris och mysk.', 279, 419],
  ['Comme des Garçons', '2', 'Nummer två. Incens, aldehyder och ambra.', 259, 389],
  ['Diptyque', 'Eau Duelle', 'Dubbelt vatten. Vanilla, te och cederträ.', 349, 519],
  ['Serge Lutens', 'L\'Eau', 'Vattnet. Mint, ceder och mysk.', 299, 449],
  ['Ormonde Jayne', 'Ormonde Man', 'Cederträets mästare. Hemlockceder, violblad och vetiver.', 379, 569],
  ['Memo Paris', 'Italian Leather', 'Italienskt läder. Läder, iris och tonkaböna.', 399, 599],
  ['Floris London', 'Neroli Voyage', 'Nerolins resa. Neroli, bergamott och ambra.', 309, 459],
  ['Penhaligon\'s', 'Sartorial', 'Skräddarsytt. Lavendel, bivax och viol.', 349, 519],
  ['Nishane', 'Ani', 'Tidlös harmoni. Vanilj, bergamott och labdanum.', 389, 579],
  ['Xerjoff', 'Renaissance', 'Renässans. Bergamott, jasmin och mysk.', 439, 659],
  ['Initio', 'Musk Therapy', 'Muskterapi. Mysk, sandelträ och cederträ.', 399, 599],
  ['Amouage', 'Library Collection Opus V', 'Femte kapitlet. Oud, vanilj och patchouli.', 449, 679],
  ['Parfums de Marly', 'Pegasus', 'Bevingad. Mandel, heliotrope och vanilj.', 419, 629],
  ['Mancera', 'Instant Crush', 'Omedelbar crush. Safran, jasmin och sandelträ.', 319, 479],
  ['Tiziana Terenzi', 'Cas', 'Kosmisk harmoni. Bergamott, suede och mysk.', 399, 599],
  ['Kilian', 'Angels\' Share', 'Änglarnas andel. Cognac, kanelbark och pralin.', 429, 649],
  ['Roja Parfums', 'Enigma', 'Gåtan. Bergamott, peppar och oud.', 499, 749],
  ['Frederic Malle', 'Musc Ravageur', 'Förödande mysk. Mysk, bärnsten och vanilj.', 439, 659],
  ['Clive Christian', 'V', 'Femte. Bergamott, citron och sandelträ.', 499, 749],
  ['Maison Margiela', 'By the Fireplace', 'Vid brasan. Kastanj, vanilj och rökig trä.', 339, 509],
  ['Tom Ford', 'Lost Cherry', 'Förlorat körsbär. Svart körsbär, likör och tonkaböna.', 479, 719],
  ['Guerlain', 'Santal Royal', 'Kungligt sandelträ. Oud, sandelträ och ros.', 399, 599],
  ['Hermès', 'Un Jardin sur le Nil', 'Nilens trädgård. Mango, lotus och incens.', 339, 509],
  ['Bvlgari', 'Le Gemme Tygar', 'Ädelsten. Rum, mysk och ambra.', 449, 679],
];

function buildProducts(
  items: [string, string, string, number, number?][],
  category: 'men' | 'women' | 'unisex',
  topArr: string[],
  midArr: string[],
  baseArr: string[],
): Product[] {
  return items.map((item, idx) => {
    const [brand, name, description, price, originalPrice] = item;
    return {
      id: pid(brand, name) + '-' + (idx + 1),
      name,
      brand,
      description,
      price,
      originalPrice,
      image: img(category, idx),
      category,
      size: '25ml pocket',
      notes: pickNotes(topArr, midArr, baseArr, idx),
      rating: Math.round((3.8 + Math.random() * 1.2) * 10) / 10,
      inStock: Math.random() > 0.08,
      featured: idx < 6,
      bestseller: idx < 10,
      new: idx >= items.length - 8,
    };
  });
}

// Use a seeded random for consistent ratings
const _origRandom = Math.random;
let _seed = 42;
function seededRandom() {
  _seed = (_seed * 16807) % 2147483647;
  return (_seed - 1) / 2147483646;
}

// Override Math.random temporarily for deterministic data
Math.random = seededRandom;

export const products: Product[] = [
  ...buildProducts(menPerfumes, 'men', topNotesMen, middleNotesMen, baseNotesMen),
  ...buildProducts(womenPerfumes, 'women', topNotesWomen, middleNotesWomen, baseNotesWomen),
  ...buildProducts(unisexPerfumes, 'unisex', topNotesUnisex, middleNotesUnisex, baseNotesUnisex),
];

// Restore Math.random
Math.random = _origRandom;

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.bestseller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.new);
}

export function getProductsByCategory(category: 'men' | 'women' | 'unisex'): Product[] {
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q),
  );
}

export function getBrands(): string[] {
  return [...new Set(products.map((p) => p.brand))].sort();
}
