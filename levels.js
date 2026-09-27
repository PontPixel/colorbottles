// ColorBottles levels (prototype).
// Bottles hold CAP units of paint. Paint doesn't layer: a bottle is always one mixed color (CF.mix of its contents).
// bottles: starting contents, e.g. {C:2,Y:2} is a half-full green bottle; {} is empty.
// targets: colors to deliver (a FULL bottle within 95% of the recipe's color; only ratios matter).
// regions: picture parts in the 320×240 viewBox; t = index of the target that paints it.
// extract: how many Extract uses the level gives (pull one paint out of a mix into an empty bottle).
// par: fewest pours/drains/extracts, from solver.js (open index.html?solve to recompute).
window.GAME={
name:'ColorBottles', saveKey:'colorBottles', cap:4,
levels:[
{id:'apple', title:'Apple', par:2, extract:0,
  tip:{title:'Pour to mix', text:'Tap a bottle, then another to pour into it. Paint doesn’t stack in layers: it mixes into one color. When a full bottle matches a target, tap the picture to pour it on.'},
  bottles:[{M:2},{Y:2},{C:2},{Y:2},{}],
  targets:[{name:'Red',recipe:{M:1,Y:1}},{name:'Green',recipe:{C:1,Y:1}}],
  regions:[
    {t:0,svg:'<path d="M160 78c-22-16-70-14-82 28-12 42 18 104 50 108 14 2 22-6 32-6s18 8 32 6c32-4 62-66 50-108-12-42-60-44-82-28z"/>'},
    {t:1,svg:'<path d="M166 70c4-30 30-48 64-44-6 30-30 48-64 44z"/>'}],
  decor:'<path d="M160 80c-2-18 2-34 10-46" fill="none" stroke-width="6" stroke-linecap="round"/>'},

{id:'melon', title:'Watermelon', par:3, extract:0,
  tip:{title:'Measure by filling', text:'A pour stops when the bottle is full. Pour into a nearly full bottle to add just a little.'},
  bottles:[{W:3},{M:4},{C:2},{Y:1},{K:1}],
  targets:[{name:'Pink',recipe:{M:1,W:3}},{name:'Dark green',recipe:{C:2,Y:1,K:1}}],
  regions:[
    {t:1,svg:'<path d="M30 70h260c0 84-58 140-130 140S30 154 30 70z"/>'},
    {t:0,svg:'<path d="M48 70h224c0 70-48 122-112 122S48 140 48 70z"/>'}],
  decor:'<g fill="#23283a"><ellipse cx="110" cy="110" rx="5" ry="8"/><ellipse cx="160" cy="130" rx="5" ry="8"/><ellipse cx="210" cy="110" rx="5" ry="8"/><ellipse cx="135" cy="160" rx="5" ry="8"/><ellipse cx="185" cy="160" rx="5" ry="8"/></g>'},

{id:'beach', title:'Beach', par:4, extract:0,
  tip:{title:'Every drop counts', text:'Paint is limited. Gather what’s left in other bottles to fill the last color.'},
  bottles:[{C:4},{W:2},{W:2},{Y:3},{C:1}],
  targets:[{name:'Sky',recipe:{C:1,W:1}},{name:'Sand',recipe:{Y:1,W:1}},{name:'Sea',recipe:{C:3,Y:1}}],
  regions:[
    {t:0,svg:'<rect x="0" y="0" width="320" height="120"/>'},
    {t:2,svg:'<path d="M0 120h320v60c-40 10-80-6-120 2s-80 20-120 10-60-8-80-4z"/>'},
    {t:1,svg:'<path d="M0 188c20-4 40-6 80 4s80 6 120-2 80 8 120-2v52H0z"/>'}],
  decor:'<circle cx="250" cy="55" r="22" fill="#fbfbfc"/>'},

{id:'iris', title:'Iris', par:4, extract:1,
  tip:{title:'Extract', text:'Mixed the wrong thing? Select a bottle and tap Extract to pull one paint back out into an empty bottle.'},
  bottles:[{C:2,Y:2},{M:2},{W:1},{Y:1},{}],
  targets:[{name:'Violet',recipe:{C:1,M:1}},{name:'Cream',recipe:{Y:3,W:1}}],
  regions:[
    {t:0,svg:'<ellipse cx="160" cy="70" rx="30" ry="52"/><ellipse cx="160" cy="70" rx="30" ry="52" transform="rotate(72 160 120)"/><ellipse cx="160" cy="70" rx="30" ry="52" transform="rotate(144 160 120)"/><ellipse cx="160" cy="70" rx="30" ry="52" transform="rotate(216 160 120)"/><ellipse cx="160" cy="70" rx="30" ry="52" transform="rotate(288 160 120)"/>'},
    {t:1,svg:'<circle cx="160" cy="120" r="26"/>'}]},

{id:'sunset', title:'Sunset', par:4, extract:1,
  bottles:[{M:4},{Y:3},{W:2},{W:2},{C:1}],
  targets:[{name:'Orange',recipe:{M:1,Y:3}},{name:'Rose',recipe:{M:1,W:1}},{name:'Lavender',recipe:{C:1,M:1,W:2}}],
  regions:[
    {t:2,svg:'<rect x="0" y="0" width="320" height="100"/>'},
    {t:1,svg:'<rect x="0" y="100" width="320" height="80"/>'},
    {t:0,svg:'<path d="M100 180a60 60 0 0 1 120 0z"/>'}],
  decor:'<rect x="0" y="180" width="320" height="60" fill="#fbfbfc"/><path d="M40 200h60M140 212h80M230 198h50" stroke-width="3" stroke-linecap="round"/>'},

{id:'autumn', title:'Autumn hill', par:4, extract:1,
  bottles:[{C:2,Y:2},{Y:2},{M:2,W:2},{M:2,Y:2},{}],
  targets:[{name:'Lime',recipe:{C:1,Y:3}},{name:'Peach',recipe:{M:1,Y:1,W:2}},{name:'Brown',recipe:{C:1,M:1,Y:2}}],
  regions:[
    {t:1,svg:'<rect x="0" y="0" width="320" height="170"/>'},
    {t:0,svg:'<path d="M0 170c60-40 140-50 200-30s90 20 120 10v90H0z"/>'},
    {t:2,svg:'<path d="M194 160l3-62-22-22 7-7 17 16v-25h9v29l19-18 7 7-25 25 2 57z"/>'},
    {t:0,svg:'<circle cx="70" cy="150" r="16"/><circle cx="92" cy="146" r="12"/><circle cx="262" cy="150" r="14"/>'}]}
],
strings:{
fr:{'Apple':'Pomme','Watermelon':'Pastèque','Beach':'Plage','Iris':'Iris','Sunset':'Coucher de soleil','Autumn hill':'Colline d’automne',
'Red':'Rouge','Green':'Vert','Pink':'Rose','Dark green':'Vert foncé','Sky':'Ciel','Sand':'Sable','Sea':'Mer','Violet':'Violet','Cream':'Crème',
'Orange':'Orange','Rose':'Vieux rose','Lavender':'Lavande','Lime':'Vert tilleul','Peach':'Pêche','Brown':'Brun',
'Pour to mix':'Versez pour mélanger','Tap a bottle, then another to pour into it. Paint doesn’t stack in layers: it mixes into one color. When a full bottle matches a target, tap the picture to pour it on.':'Touchez une bouteille, puis une autre pour la verser dedans. La peinture ne forme pas de couches : elle se mélange en une seule couleur. Quand une bouteille pleine correspond à une cible, touchez l’image pour la verser dessus.',
'Measure by filling':'Mesurez en remplissant','A pour stops when the bottle is full. Pour into a nearly full bottle to add just a little.':'On arrête de verser quand la bouteille est pleine. Versez dans une bouteille presque pleine pour n’ajouter qu’un peu.',
'Every drop counts':'Chaque goutte compte','Paint is limited. Gather what’s left in other bottles to fill the last color.':'La peinture est limitée. Rassemblez les restes des autres bouteilles pour la dernière couleur.',
'Extract':'Extraire','Mixed the wrong thing? Select a bottle and tap Extract to pull one paint back out into an empty bottle.':'Mauvais mélange ? Sélectionnez une bouteille et touchez Extraire pour en retirer une peinture dans une bouteille vide.'},
ru:{'Apple':'Яблоко','Watermelon':'Арбуз','Beach':'Пляж','Iris':'Ирис','Sunset':'Закат','Autumn hill':'Осенний холм',
'Red':'Красный','Green':'Зелёный','Pink':'Розовый','Dark green':'Тёмно-зелёный','Sky':'Небо','Sand':'Песок','Sea':'Море','Violet':'Фиолетовый','Cream':'Кремовый',
'Orange':'Оранжевый','Rose':'Пыльная роза','Lavender':'Лавандовый','Lime':'Лаймовый','Peach':'Персиковый','Brown':'Коричневый',
'Pour to mix':'Переливайте, чтобы смешать','Tap a bottle, then another to pour into it. Paint doesn’t stack in layers: it mixes into one color. When a full bottle matches a target, tap the picture to pour it on.':'Нажмите на бутылку, затем на другую, чтобы перелить. Краска не ложится слоями: она смешивается в один цвет. Когда полная бутылка совпадёт с целевым цветом, нажмите на картинку, чтобы вылить её.',
'Measure by filling':'Отмеряйте переливанием','A pour stops when the bottle is full. Pour into a nearly full bottle to add just a little.':'Переливание останавливается, когда бутылка полна. Лейте в почти полную бутылку, чтобы добавить совсем немного.',
'Every drop counts':'Каждая капля на счету','Paint is limited. Gather what’s left in other bottles to fill the last color.':'Краски мало. Соберите остатки из других бутылок для последнего цвета.',
'Extract':'Извлечь','Mixed the wrong thing? Select a bottle and tap Extract to pull one paint back out into an empty bottle.':'Смешали не то? Выберите бутылку и нажмите «Извлечь», чтобы вернуть одну краску в пустую бутылку.'}}
};
