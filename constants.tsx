
import { GameNode } from './types';

export const FOREST_NODES: GameNode[] = [
  {
    id: 'zorro-culpeo',
    order: 0,
    type: 'fauna',
    name: 'Zorro Culpeo',
    scientificName: 'Lycalopex culpaeus',
    description: '¡Hola! Soy Zorrito. He perdido los fragmentos de la "Semilla de Esmeralda" que mantiene vivo nuestro bosque. ¿Me ayudas? El primer fragmento lo tengo yo, pero para activarlo debes conocer mi secreto.',
    funFact: '¡Soy el segundo cánido más grande de Sudamérica y mis orejas detectan hasta el caminar de un insecto!',
    imageUrl: 'images/zorro_culpeo.png',
    magicImageUrl: 'images/zorro_culpeo.png',
    caricatureUrl: 'images/caricature_zorro.png',
    videoUrl: '',
    ecoTip: 'Mantén a tus mascotas con correa. ¡Mis primos y yo nos asustamos mucho con los perros!',
    unlocked: true,
    completed: false
  },
  {
    id: 'quillay',
    order: 1,
    type: 'flora',
    name: 'Árbol Quillay',
    scientificName: 'Quillaja saponaria',
    description: '¡Buen trabajo! El segundo fragmento de la semilla cayó entre las ramas de este viejo Quillay. Es un árbol generoso que limpia el aire y hasta nuestra piel.',
    funFact: '¡Antiguamente, la gente usaba mi corteza molida como jabón natural porque hace mucha espuma!',
    imageUrl: 'images/quillay.png',
    magicImageUrl: 'images/quillay.png',
    caricatureUrl: 'images/caricature_quillay.png',
    ecoTip: 'Nunca arranques mi corteza. Es mi piel y me protege de las enfermedades.',
    unlocked: false,
    completed: false
  },
  {
    id: 'loica',
    order: 2,
    type: 'fauna',
    name: 'Loica',
    scientificName: 'Leistes loyca',
    description: '¡Escucha ese canto! La Loica encontró un trozo brillante de la Semilla de Esmeralda cerca de su nido. Ella vigila los campos con su pecho rojo.',
    funFact: 'Mi pecho es de un rojo tan intenso que en el campo dicen que soy un pequeño soldado de la paz.',
    imageUrl: 'images/loica.png',
    magicImageUrl: 'images/loica.png',
    caricatureUrl: 'images/caricature_loica.png',
    ecoTip: 'No uses hondas ni asustes a los pájaros. Su canto es la música del bosque.',
    unlocked: false,
    completed: false
  },
  {
    id: 'peumo',
    order: 3,
    type: 'flora',
    name: 'Árbol Peumo',
    scientificName: 'Cryptocarya alba',
    description: '¡Estamos cerca! Bajo la sombra fresca del Peumo descansa el penúltimo fragmento. Sus frutos rojos son como pequeñas joyas del bosque.',
    funFact: 'Mis hojas huelen delicioso si las frotas un poquito y doy la sombra más fresca de todo Chile.',
    imageUrl: 'images/peumo.png',
    magicImageUrl: 'images/peumo.png',
    caricatureUrl: 'images/caricature_peumo.png',
    ecoTip: 'Cuida el agua. Mis raíces ayudan a que la tierra siempre esté húmeda.',
    unlocked: false,
    completed: false
  },
  {
    id: 'puma',
    order: 4,
    type: 'fauna',
    name: 'Puma Chileno',
    scientificName: 'Puma concolor',
    description: '¡Cuidado! El fragmento final lo custodia el gran Puma. No tengas miedo, él es el rey de las montañas y si lo respetas, él te respetará a ti.',
    funFact: '¡Soy el felino más grande de Chile y puedo saltar más de 5 metros de altura sin esfuerzo!',
    imageUrl: 'images/puma.png',
    magicImageUrl: 'images/puma.png',
    caricatureUrl: 'images/caricature_puma.png',
    ecoTip: 'Si ves rastros de puma, aléjate despacio. Recuerda que tú eres la visita en su hogar.',
    unlocked: false,
    completed: false
  }
];
