import { GameFeature, GameProduct, GalleryItem } from "./types";

export const BRAND_NAME = "SONS OF HELL";

export const HERO_VIDEO_MOCKUP_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuCS7zcJBEYDzcUqfnRASEnP6MGwfhDQn5PJ5E1DQS0om1KmAYaBaM7LesJkVAufPYYaHIEQz3nLu3UJ7YUmZ-mZ72mpj5Zh0jpAmE-WVGDXnXjmkoGR47nA1AxUyiM7seZoLwrPWCVsMFNxLqSifH2frUknaK5crSAN-y6yZWLQ2ejbDzT4vfZejbJe-6S4r7-GOyg2ArpVHbJl6i5E6_rN0CnVwDtGgwFDdRoddsMUR5m3R1HbeLT5y6IGpIcJ9-YDemnN-002IOY";

export const CONFLICT_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuAEVeafOpGyHF2QNtvMwxK_sL-dkinBp2Z2tj4Oe0SF1zd6Kt-T9gC8EvG9yhrLjz31S8lIAKxonGCwEmaKes2L60OOKjCIPNzP5Vc6xfwGvgOnLAug7oh96C8dyIyy160LUUU51OcHP8UV6M1pQW9AT2dbHWa9dR5UC-I9SC74kBbynAHffa2NIbb2PV0Fbdx7e6FSHjsdkiy5fSaEMxk3PuEWKehrldYeXM7F6RDTyV1IT22LSjMYX46tptV3kWK4p-k7Qrw5LPU";

export const GAME_LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBXbErbfbmT47T38daeiCCeVV58sFUKvcY09JfAXckOyqQDAd89LLy1lvyU5xnpCqmxGECdK671caDVodvoQpDa12YWinESlkEEo3TwFfWcntAr3_yceAkKe8EC8uo3E152FovK6K6OeEMB4BDNUqqtDGzIq5cDe8noaEn5epvNS6EdOa7EDp38LvKJOc2w4HHff6BReTDYN_Oa0nu7SpfNUW8KSihCcFa6R0_k93fNlaBLVvNIFbO8dmwWN4qvJ4--o8OpEMYstj8";

export const FEATURES: GameFeature[] = [
  {
    id: "open-world",
    icon: "Compass",
    title: "Mundo abierto",
    description: "Explora selvas impenetrables de Hibueras, templos sagrados y florecientes colonias recreadas con precisión histórica."
  },
  {
    id: "strategy-combat",
    icon: "Swords",
    title: "Estrategia y combate",
    description: "Domina el implacable acero toledano o las invisibles emboscadas de jaguar en combates viscerales y sangrientos."
  },
  {
    id: "interactive-history",
    icon: "Scroll",
    title: "Historia interactiva",
    description: "Tus diálogos, traiciones y alianzas determinarán de manera irrevocable el auge o la trágica caída de naciones enteras."
  },
  {
    id: "culture-roots",
    icon: "Flame",
    title: "Cultura y raíces",
    description: "Desvela antiguos mitos prehispánicos, invoca el favor celestial o combate maldiciones en el misterioso nuevo mundo."
  }
];

export const PRODUCTS: GameProduct[] = [
  {
    id: "collector-edition",
    title: "Edición Coleccionista",
    subtitle: "COFRE DE MADERA RÚSTICA CON TRASFONDO HISTÓRICO",
    description: "La joya definitiva de colección guardada en un cofre de madera tallada a mano en Honduras, ideal para los amantes de las piezas legendarias y la historia colonial.",
    price: 189.99,
    priceLabel: "$189.99",
    buttonText: "AÑADIR COFRE",
    badge: "EDICIÓN COLECCIONISTA",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBnGpxVbxoPs_GMK0uo0Xz8m9jqYW8xvZ2WgqHa6vu0W8zIL7Zd-NfywKqhcJ2SlwlueYeyxPWRMr9TwohyC1zWtAkMpiu61m68Gyq-DYsyzu5VQujFQjVdw_5cA9Ccna8PFcg7r2qM01BR4lvMwHFq46DFfzweGzhs66WlDkc99pSR9FR_j4jS8xBntyNBosmIMRYGalwVseX_QLcbBNUMU75s0A0mxVnEV2hdFpwxhygBnBFCPkup_90cNkFI2rMnx_CmQE01S4",
    alt: "Premium physical game collector's edition box set for Sons of Hell",
    includes: [
      "Disco físico de juego con caja metálica exclusiva (Steelbook de acero)",
      "Mapa cartográfico de tela de Hibueras firmado por exploradores",
      "Moneda conmemorativa de plata y bronce de la Legión Lenca",
      "Pin de bronce templado de la Real Corona Española",
      "Caja exterior rústica de roble oscuro con bisagras de hierro forjado"
    ],
    editionType: "collector",
    platforms: ["PC", "PlayStation 5", "Xbox Series X"],
    rating: 4.9,
    featuresList: [
      "Simulación de clima húmedo y tropical en 4K nativo 60fps",
      "Sistemas de facciones interactivas con elecciones de moral",
      "Artbook de tapa dura con ilustraciones del mestizaje e historia"
    ],
    trailerUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmv4Frw50zweedw26ku-gjLWj2H5m_POmCR7Iu1RFDAd3LT8cSgj5x-p9DVvmIS2q-_Ua1QSYfXdH27JTeSflCG4L80luhcaNCnuWDlEMWDbe-bcPnd4XjtGoD2cAMXheqBdb3iDVdulhMDIxqg8QoCKEi8bgnJu7g-jasE2LKG01Ib0Z-wi2GbFmYw8AXvsdFyAHMYcOPRzmIZpx2tAt06jSg9i60zcZac4g3CQ6Y_n-IMefw-32CjdiKKu9aeg6JB6POyb83YVQ"
  },
  {
    id: "deluxe-edition",
    title: "Edición Deluxe",
    subtitle: "ACCESO PREFERENCIAL Y RECOMPENSAS MILITARES",
    description: "Desbloquea el contenido completo del juego de forma anticipada. Sumérgete con una ventaja táctica invaluable, skins ceremoniales con grabados en pan de oro y el soundtrack digital.",
    price: 79.99,
    priceLabel: "$79.99",
    buttonText: "COMPRAR DELUXE",
    badge: "MÁS POPULAR",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0cnnTpj0ILhucSinbOSO11yvOwHEEFDbasL12uByOyCC5AEiE2LPLcBtAqYqVcwjSq_EDnmyLeYdC5RE0oYP380Ut40JnipyrGnC_cVqLdykchHB2ix8IWnaV0i5uBRnFnlBVKHW_sYUb00UitdNUxoOrMz00J6u0FhLQA48DLuydFlZqKIwhcu-g15sYlgoFgx4aiXqpARGT9UxEPDZSpsn-bnpITId79hSg4JfuWcIioFYg9VY9tWhEN6cig0WbXo9UYLouaTA",
    alt: "Sons of Hell Digital Deluxe Edition character artwork showcase",
    includes: [
      "Acceso anticipado de 72 horas al juego completo",
      "Skin exclusiva de armadura 'Caballero Negro de Toledo'",
      "Skin ceremonial de plumaje imperial 'Guerrero de Cacao y Jade'",
      "Banda sonora orquestal épica de Sons of Hell en alta fidelidad (FLAC)",
      "Cómic digital interactivo: El Levantamiento de Trujillo"
    ],
    editionType: "deluxe",
    platforms: ["PC", "PlayStation 5", "Xbox Series X", "Nintendo Switch"],
    rating: 4.7,
    featuresList: [
      "10 Reliquias iniciales exclusivas",
      "Acceso al modo cooperativo multijugador asíncrono",
      "Pack de armas iniciales doradas"
    ],
    trailerUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxlRdKS2OFWslxV1s7LOkMznPtYiPr6KjOexhb-v0UCzkdcVanwG6Ez7i-sMbvth_RuxVMFmxKN22J53nMub9tRhpeWSB6_j_SjZ7ib6jP_1CTzQnu3PJpIkiGT8iVBKPswe9Beq1RCmq2HHSZeBFqrx2JvTuFL3bSJrM3FZiTbMfAcd_99PheAR9bohH-qgCVxW3cAx9Cdvm0RxjJAcFIWBq-PiqZp8ynRxk3DTd18EAVdJaNENnaKPHqX1OmANesOyEA_2zDRqs"
  },
  {
    id: "standard-edition",
    title: "Edición Estándar",
    subtitle: "DISCO COMPLETO DE SONS OF HELL",
    description: "Consigue el juego base completo de Sons of Hell y adéntrate en las playas calientes de Hibueras donde se decidirá el choque entre conquistadores imperiales de Toledo y defensores Lencas.",
    price: 59.99,
    priceLabel: "$59.99",
    buttonText: "COMPRAR CLÁSICO",
    badge: "JUEGO BASE",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEVeafOpGyHF2QNtvMwxK_sL-dkinBp2Z2tj4Oe0SF1zd6Kt-T9gC8EvG9yhrLjz31S8lIAKxonGCwEmaKes2L60OOKjCIPNzP5Vc6xfwGvgOnLAug7oh96C8dyIyy160LUUU51OcHP8UV6M1pQW9AT2dbHWa9dR5UC-I9SC74kBbynAHffa2NIbb2PV0Fbdx7e6FSHjsdkiy5fSaEMxk3PuEWKehrldYeXM7F6RDTyV1IT22LSjMYX46tptV3kWK4p-k7Qrw5LPU",
    alt: "Standard Edition campaign combat visual for Sons of Hell",
    includes: [
      "Copia física o digital del videojuego Sons of Hell",
      "Soporte multilenguaje (Castellano medieval, Lenca aproximado, Inglés)",
      "Guía básica digital de supervivencia histórica en la selva",
      "Acceso al foro oficial de estrategas de RR Games"
    ],
    editionType: "standard",
    platforms: ["PC", "PlayStation 5", "Xbox Series X", "Nintendo Switch"],
    rating: 4.4,
    featuresList: [
      "Campaña completa de más de 45 horas de juego",
      "Elección de facción libre (Conquistadores vs Defensores)",
      "Recreación fidedigna de Trujillo e Hibueras de la época"
    ],
    trailerUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmv4Frw50zweedw26ku-gjLWj2H5m_POmCR7Iu1RFDAd3LT8cSgj5x-p9DVvmIS2q-_Ua1QSYfXdH27JTeSflCG4L80luhcaNCnuWDlEMWDbe-bcPnd4XjtGoD2cAMXheqBdb3iDVdulhMDIxqg8QoCKEi8bgnJu7g-jasE2LKG01Ib0Z-wi2GbFmYw8AXvsdFyAHMYcOPRzmIZpx2tAt06jSg9i60zcZac4g3CQ6Y_n-IMefw-32CjdiKKu9aeg6JB6POyb83YVQ"
  },
  {
    id: "official-merch",
    title: "Sudadera de la Legión",
    subtitle: "PRENDA EXCLUSIVA RR GAMES",
    description: "Vístete con los colores imperiales y sagrados de Sons of Hell. Sudadera premium de algodón pesado con serigrafía en pan de oro cepillado y costuras reforzadas a prueba de clima difícil.",
    price: 34.99,
    priceLabel: "$34.99",
    buttonText: "COMPRAR PRENDA",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaTFPMddriZPL7-WsaE-xtdGvfWLMWilQtyqF8BJ1kBS9NusiVoizvOO6egeEYLWOIlxhoprdVDX74QhpuLHteMK1hxl8B763_A0Pe2jAYgePpWOO6TWLro2T9x_naj5uZXPksjVLBHIHo-312Cy9vFkL5951v5ZPHHkRd3PzI7nnmsfoQnJn4fUKCPBS52QBNfDKatMlurdm5-amfamo1028WY905wNB5HIWipVZYfSzVKOAZPvqtKAKzk4G7ZFuAf04OgN87kco",
    alt: "Official Sons of Hell heavyweight cotton black hoodie",
    includes: [
      "Algodón 100% pesado premium de importación",
      "Estampado frontal y dorsal con el escudo de Sons of Hell en pan de oro",
      "Capucha reforzada con cincha doble y ojales metálicos medievales",
      "Disponible en tallas S, M, L, XL, XXL",
      "Incluye un código digital para una amadura especial in-game"
    ],
    editionType: "merch",
    rating: 4.8,
    featuresList: [
      "Excelente transpirabilidad",
      "Escudo texturizado de la legión",
      "Hecho con materiales reciclables de alta gama"
    ]
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: "helmet",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBhG7_Oh_5l3ilvIoyW5tTf6Ut-KSainPRrPLQ_wLZtOtLpbD52xryDbOBfFvtbddjH2-NxMSGiPbItSIf_lNtneidmZqmzPLymt3AePcth0jlLm8W520yCA2u0PiZ_pDYa4XxlWIXjUtUCaSiYmw-YKgTM9MdvRDwTChi91BJQFqyJU0yXwvJNE8-rZg71nsF391jlTWtUyazkr8Zbxrtxe6vP2WdS7m72ZFOa1SHIppa2jaa_EIhLIq9Cqyx_pWa-1QOMG4LoxM",
    alt: "Conquistador helmet covered in droplets on the custom jungle floor",
    title: "El Yelmo Olvidado",
    tagline: "LA SELVA LO DEVORA TODO",
    description: "Macrofotografía del yelmo morrión de un soldado español, abandonado en la espesura húmeda tras una emboscada Lenca.",
    lore: "El acero europeo es resistente, pero la constante humedad tropical de Hibueras engendra musgo y herrumbre con mayor rapidez de la proyectada. Para muchos conquistadores, desprenderse de sus armaduras de más de quince kilos es la única posibilidad de cruzar selvas sin ahogarse."
  },
  {
    id: "dagger",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAblCW9Grd3_wHt6nLLsjEKsojl30x3XLdxoz6vys0MFvnNNMPB7LyNVsgWScTwIIZff8-LUr8MJrGsALx7SGFJWdmY1_UxB1oFmN4I7yc_eDagufxskjzco14k_BBcQAbIMwO35ezU7ccjzzQzqxSSm0qHsW0514yvyWZYhPik1GMO579oVaIkEZGAXsG0iIb_4Arrq0GDRF-kFg6QoKx-8wa8E7rPZXVupY9L5MRoJ69dTnnbAWtNu4Dk_vCB4hRdjxyiAzTSdxE",
    alt: "Ancient Mayan obsidian dagger lying on parchment maps",
    title: "La Daga de Jade",
    tagline: "HOJA DE CRISTAL VOLCÁNICO",
    description: "Un puñal ceremonial esculpido en obsidiana de brillo letal con empuñadura de jade ancestral, apoyado sobre mapas coloniales.",
    lore: "La obsidiana es capaz de cortes limpios imperceptibles, pero es frágil frente a las corazas metálicas castellanas. Sin embargo, en manos de asesinos Lencas sigilosos, una simple puñalada en las articulaciones de la armadura puede drenar la vida de un capitán imperial en cuestión de respiraciones."
  },
  {
    id: "path",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt_SvdHXzejSe_3SckUY8iFoTMI2bVvb_waYMtkrau7ADSifko_sMiJsy_VJPiOEG5JwSCG6diD1FNSh9_7m2Wl8Ct3bmKX9YlRwHKHS5Lm1XxNtfB66A4HPQ6wFBJtwSyyh9xhJRWi5Rk2Ja2nHtTeycpfTUz8k_ytVpvWB0Pr7YEt9lKUdY-KcmYvh0SH9x4OHUUG31HmTvuYQMSs-t8tem0iT0ckpOcRFNF-yzrxiTiZjo3Yh4g-0Bt8Gl_0uC7f3-lsI4R6G8",
    alt: "Misty jungle path with moonlight piercing through the canopy",
    title: "Sendas de Bruma",
    tagline: "EL ALMA QUE SUSURRA",
    description: "Un sendero lúgubre que se introduce en el corazón de la selva virgen, envuelto por brumas nocturnas y una luz mística celestial.",
    lore: "Nuestros guías nativos juran escuchar voces ancestrales cuando la niebla desciende sobre el río Copán. Los hombres afirman que los guerreros caídos no descansan jamás, sino que cazan permanentemente bajo el aspecto de felinos sagrados para proteger estas tierras de la intrusión imperial."
  },
  {
    id: "galleon",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbfnXRIDkB2NDCMohzwiMKf3Kn44woBh0XTLnEOqSlx4X_B7tHQCAwUAKaxIJYqV83LrmomY40Rqt9VxcI0wEiaz1J054OteXHcSRwfq3QfPaz3df5Qz1KEe_mLcWX38rthv0TWAFsTwJxxoGnStlsbrgFlOugXZrnTZgvVAg6HKb3Q6o7w-wH0W0d-oiFc8BWex6GEuYOnoPbJSWkm9QTEcY5qt1UhhELBB5md1gsA32-4xPRnv0TlccAI3JehBBdxF-5txvvab0",
    alt: "Spanish galleon caught in a stormy sea",
    title: "Tormenta en el Atlántico",
    tagline: "LA TIERRA NO QUIERE ESTE ENCUENTRO",
    description: "Un imponente galeón de la corona española embestido por olas colosales en los acantilados de la misteriosa costa atlántica de Hibueras.",
    lore: "Se dice que Dios envió estas tormentas espeluznantes para ahogar la soberbia del rey Carlos. Los cascos de roble crujen como ramas secas y la mitad del armamento pesado descansa ya en el infinito fondo marino, rindiendo tributo involuntario a Poseidón y a los dioses prehispánicos que exigen que se devuelva el mar a su pureza absoluta."
  }
];

export const STORIES = {
  conquistador: [
    {
      id: "c-1",
      scenario: "Desembarcas en las costas calientes de Trujillo. La bruma asfixia las playas y más allá se yerguen montes impenetrables. Has venido por la gloria imperial y la fortuna prometida. Tus exploradores corren hacia ti advirtiendo de sombras guerreras observando desde la densa floresta.",
      choices: [
        {
          text: "Avanzar con los arcabuceros encendidos en formación defensiva cerrada.",
          outcome: "Los arcabuceros ahuyentan el sigilo nativo con rumbos ensordecedores. Encuentran un templo ceremonial abandonado repleto de grabados antiguos de piedra, pero tu marcha es lenta y el sol abrasa tu infantería, agotando la vitalidad de tus hombres armados.",
          next: "c-2a"
        },
        {
          text: "Enviar exploradores nativos aliados (aliados tlaxcaltecas) a negociar pacíficamente.",
          outcome: "Los exploradores se adentran en el follaje. Minutos más tarde un silencio sepulcral impera, interrumpido por tambores rústicos de guerra. Tus guías han desaparecido, dejando únicamente un rastro de huellas ensangrentadas y flechas de caña dura.",
          next: "c-2b"
        }
      ]
    },
    {
      id: "c-2a",
      scenario: "Con el batallón exhausto, logran levantar un campamento fortificado con empalizadas de madera sobre una colina de piedra caliza. Durante la noche sin luna, los gritos de jaguares y ruidos metálicos misteriosos te despiertan. Las antorchas se apagan de súbito por dardos de cerbatana.",
      choices: [
        {
          text: "Disparar ráfagas de mosquete descontroladas hacia la maleza para ahuyentar el peligro.",
          outcome: "La pólvora ilumina las tinieblas pero no halla blanco útil alguno. El fuego indiscriminado causa pánico; un asalto por los flancos de guerreros jaguar equipados con macuahuitl diezma tu retaguardia. Debes retroceder abandonando tus suntuosos cofres.",
          next: "c-3"
        },
        {
          text: "Mantener calma absoluta con picas alzadas y organizar guardias con espías veteranos.",
          outcome: "Los Lencas chocan contra un muro imbatible de picas templadas. El acero imperial corta la noche a la perfección y capturas a uno de sus sacerdotes heridos. Al examinar sus ornamentos de jade puro, descubres la ubicación exacta de su bastión principal.",
          next: "c-3"
        }
      ]
    },
    {
      id: "c-2b",
      scenario: "Sin tus guías aliados, tu infantería vaga ciega por los laberintos de mangle y fango de Trujillo. De repente, una lluvia devastadora de flechas con punta de sílex y hachas de piedra cae del cielo de copas.",
      choices: [
        {
          text: "Cargar de frente con espadas de Toledo desenvainadas.",
          outcome: "Tus espadas cercenan ramas y corazas de algodón con soberbia letal, pero el fango entierra las botas armadas. Caes en una trampa de estacas afiladas. Los sobrevivientes huyen bajo el amparo de los escudos metálicos.",
          next: "c-3"
        },
        {
          text: "Retirarse ordenadamente disparando armas de fuego para amparar la cobertura rústica.",
          outcome: "Los fogonazos de los arcabuces detienen el avance enemigo por pavor a la pólvora. Logras replegarte perdiendo hombres pero preservando la disciplina del destacamento militar.",
          next: "c-3"
        }
      ]
    },
    {
      id: "c-3",
      scenario: "Es la víspera de la gran batalla en el templo de la Serpiente Pluma. Tu comandante te otorga el mando del asalto definitivo. Tienes una última elección táctica que definirá la influencia de España en el Nuevo Mundo.",
      choices: [
        {
          text: "Invocar la gracia del Altísimo y sitiar el templo, derribando los altares sagrados.",
          outcome: "Arrasas las defensas. Las riquezas acumuladas son incalculables, pero el odio eterno de los sobrevivientes ha germinado. Te conviertes en el temido y brutal virrey español de una provincia sitiada por el resto de tus sangrientos días.",
          next: "final-c1"
        },
        {
          text: "Ofrecer pactos respetando sus tierras y deidades a cambio de oro tributario regular.",
          outcome: "Se forja una paz híbrida sin precedentes. Eres condecorado por Valladolid por expandir las posesiones con baja mortandad de españoles, y tu descendencia ostentará escudos imperiales bordados con plumas de quetzal.",
          next: "final-c2"
        }
      ]
    }
  ],
  defensor: [
    {
      id: "d-1",
      scenario: "El oráculo de los sacerdotes fue certero: monstruos de metal brillante flotando sobre montañas de lona blanca han tocado puerto. Tú, un distinguido y ágil guerrero del Templo del Jaguar Lenca, eres encomendado a defender el suelo sagrado. Un batallón de hombres armados con cañones se interna en tu selva sagrada.",
      choices: [
        {
          text: "Envenenar sus fuentes de agua y asaltar sus patrullas desde las alturas de la canopia.",
          outcome: "Los invasores caen enfermos de fiebres estomacales inexplicables para sus médicos. Su pavor se dispara cuando ven plumas sagradas manchadas de sangre humana colgadas sobre sus tiendas de campaña.",
          next: "d-2a"
        },
        {
          text: "Ofrecer una emboscada con trampas de fango y piedras gigantes sobre el desfiladero del río.",
          outcome: "Las rocas colosales despedazan sus armaduras de hierro rústico. Muchos quedan sepultados bajo toneladas de piedras, pero los jinetes y caballos españoles logran flanquearte disparando pistolas letales desde terreno elevado.",
          next: "d-2b"
        }
      ]
    },
    {
      id: "d-2a",
      scenario: "La moral de los hombres pálidos se desmorona; no toleran las picaduras ni los ruidos selváticos. No obstante, emplean fuego para prender el santuario inferior del bosque y obligarte a descender.",
      choices: [
        {
          text: "Atacar su vanguardia bajo una tormenta celestial usando arcos largos con puntas calientes.",
          outcome: "La tormenta humedece su pólvora anulando la ventaja táctica de sus armas de fuego. Tu tropa entra al combate cuerpo a cuerpo armada con macuahuitl. El filo sagrado cobra justicia histórica sobre la hierba encharcada.",
          next: "d-3"
        },
        {
          text: "Hacer un simulacro de huida hacia las cuevas del jaguar sagrado para emboscarlos en la oscuridad.",
          outcome: "Los codiciosos soldados imperiales entran con antorchas buscando joyas. En los sumideros oscuros y estrechos, su equipamiento de acero carece de utilidad. Eres letal y silencioso en las sombras, aniquilando a su capitán.",
          next: "d-3"
        }
      ]
    },
    {
      id: "d-2b",
      scenario: "Las bestias de cuatro patas (caballos imperiales) siembran temor en las aldeas bajas con cargas de caballería de acero.",
      choices: [
        {
          text: "Alzar troncos con púas untadas de veneno de sapo para frenar las cargas de caballería.",
          outcome: "Los corceles se encabritan de pánico por las trampas nativas. La ventaja táctica ecuestre de los intrusos queda destruida, equilibrando las condiciones sobre la tierra virgen del combate.",
          next: "d-3"
        },
        {
          text: "Rezar a las antiguas divinidades del Sol en el Templo y replegar la población a la montaña.",
          outcome: "Los conquistadores queman las plantaciones de cacao perdonando templos para no enojar a las fuerzas desconocidas, pero la escasez de víveres debilita a tu gente campesina.",
          next: "d-3"
        }
      ]
    },
    {
      id: "d-3",
      scenario: "Las legiones de España asedian con cañones el gran templo sagrado de la Luna. Lempira e Hibueras depositan su confianza eterna en tu liderazgo para realizar la maniobra crítica.",
      choices: [
        {
          text: "Atacar en la madrugada de forma suicida las tiendas del comandante español para decapitar su mando.",
          outcome: "Logras clavar la lanza de obsidiana en el pecho de su general. Los españoles caen en retirada hacia sus barcos. Eres recordado para la posteridad como el espíritu inmortal que derrotó el avance del imperio europeo.",
          next: "final-d1"
        },
        {
          text: "Atraerlos simulando rendición y detonar las reservas de pólvora que les has robado en su propio campamento.",
          outcome: "Una explosión sísmica hace eco en toda Centroamérica, desintegrando el asedio invasor. Expulsas a los barbados con una demostración de audacia tecnológica asombrosa, marcando el renacimiento de la civilización lenca.",
          next: "final-d2"
        }
      ]
    }
  ]
};

export const RECRUIT_SPECIALTIES = {
  conquistador: [
    {
      name: "Tirador de Arcabuz",
      weapon: "Arcabuz de Mecha de Hierro",
      armor: "Yelmo Morrión y Coselete Corto",
      stats: { fuerza: 82, fe: 75, agilidad: 60, honor: 88 },
      bio: "Un veterano tirador entrenado en las campañas europeas de Flandes. El olor a pólvora negra y azufre es su única religión, capaz de sembrar el pavor con truenos tácticos destructores."
    },
    {
      name: "Caballero de Espada",
      weapon: "Espada de Acero de Toledo",
      armor: "Coraza de Placas Completa y Gola de Acero",
      stats: { fuerza: 95, fe: 70, agilidad: 50, honor: 92 },
      bio: "Fiel defensor de la corona e hidalgos de espada devota. Su hoja cortante de doble filo representa el orgullo del imperio castellano y la tenacidad implacable en el uno contra uno."
    },
    {
      name: "Explorador Montado",
      weapon: "Lanza de Fresno y Daga Imperial",
      armor: "Cota de Malla Flexible y Cuero Engrasado",
      stats: { fuerza: 75, fe: 65, agilidad: 98, honor: 80 },
      bio: "Caballero ágil capaz de vadear pantanos y rastrear en dunas. Su veloz corcel le confiere una ventaja táctica invaluable para transmitir mensajes urgentes de Trujillo a Valladolid."
    }
  ],
  defensor: [
    {
      name: "Guerrero Jaguar",
      weapon: "Macuahuitl con Filos de Obsidiana Sagrada",
      armor: "Gola de Fieltro de Algodón y Tocado de Jaguar",
      stats: { fuerza: 92, fe: 88, agilidad: 95, honor: 90 },
      bio: "Elite consagrada al jaguar sagrado de Hibueras. Veloz, letal en selvas tupidas y sigiloso como una sombra, busca defender el honor milenario y los templos divinos con su letal garra tallada."
    },
    {
      name: "Explorador de Águila",
      weapon: "Arco Largo de Caña y Cerbatana con Veneno",
      armor: "Capa de Plumas Imperiales y Brazales de Cuero",
      stats: { fuerza: 65, fe: 85, agilidad: 99, honor: 89 },
      bio: "Infiltrador de los montes que desciende con silencio absoluto. El veneno de sus dardos duerme corceles en segundos, siendo los ojos invisibles que vigilan incansables las sendas de Trujillo."
    },
    {
      name: "Místico del Templo",
      weapon: "Bastón Ceremonial Lenca",
      armor: "Tocado Sagrado de Jade y Pintura Sagrada Corporal",
      stats: { fuerza: 50, fe: 99, agilidad: 75, honor: 95 },
      bio: "Guardián consagrado a los espíritus de la selva y las divinidades agrarias Lencas. Capaz de infundir fe inquebrantable a sus hermanos guerreros y curar las quemaduras hechas por la pólvora invasora."
    }
  ]
};
export const PREVIEW_TRAILERS = [
  {
    title: "Cinemática de Lanzamiento: Tierra Ardiente",
    duration: "2:15",
    description: "Presencia el desembarco imperial en Trujillo y el juramento nativo sagrado para liberar Hibueras.",
    videoMockup: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmv4Frw50zweedw26ku-gjLWj2H5m_POmCR7Iu1RFDAd3LT8cSgj5x-p9DVvmIS2q-_Ua1QSYfXdH27JTeSflCG4L80luhcaNCnuWDlEMWDbe-bcPnd4XjtGoD2cAMXheqBdb3iDVdulhMDIxqg8QoCKEi8bgnJu7g-jasE2LKG01Ib0Z-wi2GbFmYw8AXvsdFyAHMYcOPRzmIZpx2tAt06jSg9i60zcZac4g3CQ6Y_n-IMefw-32CjdiKKu9aeg6JB6POyb83YVQ",
    bgClass: "from-amber-950/80 to-stone-950/95"
  },
  {
    title: "Gameplay Revelación: Tácticas de Selva",
    duration: "4:32",
    description: "Muestra del sistema de juego, combates con desfiladeros, lluvia en tiempo real y el ciclo de asedios.",
    videoMockup: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxlRdKS2OFWslxV1s7LOkMznPtYiPr6KjOexhb-v0UCzkdcVanwG6Ez7i-sMbvth_RuxVMFmxKN22J53nMub9tRhpeWSB6_j_SjZ7ib6jP_1CTzQnu3PJpIkiGT8iVBKPswe9Beq1RCmq2HHSZeBFqrx2JvTuFL3bSJrM3FZiTbMfAcd_99PheAR9bohH-qgCVxW3cAx9Cdvm0RxjJAcFIWBq-PiqZp8ynRxk3DTd18EAVdJaNENnaKPHqX1OmANesOyEA_2zDRqs",
    bgClass: "from-stone-900/80 to-slate-950/95"
  }
];
