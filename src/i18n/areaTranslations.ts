/** Name/description translations for the content-complete tours, keyed by
 * area id then language code. Route waypoint narration stays English-only —
 * translating the full spoken scripts is a much larger follow-up. Any area
 * id or language not listed here falls back to the area's own English
 * name/description. */
type AreaText = { name: string; description: string };

export const AREA_TRANSLATIONS: Record<string, Partial<Record<"zh" | "es" | "fr", AreaText>>> = {
  mayfair: {
    zh: {
      name: "梅费尔",
      description:
        "伦敦最尊贵的街区，徒步探索：乔治王朝风格的广场、一座隐藏的小村落、摇滚明星与作曲家为邻的公寓，以及世界上第一条购物拱廊。",
    },
    es: {
      name: "Mayfair",
      description:
        "El barrio más elegante de Londres, a pie: plazas georgianas, un pueblo escondido, el piso de una estrella del rock junto al de un compositor, y la primera galería comercial del mundo.",
    },
    fr: {
      name: "Mayfair",
      description:
        "Le quartier le plus chic de Londres, à pied : places géorgiennes, un village caché, l'appartement d'une rock star voisin de celui d'un compositeur, et la première galerie marchande du monde.",
    },
  },
  soho: {
    zh: {
      name: "苏豪区",
      description: "伦敦昔日的波希米亚街区，徒步探索：一条市集街、一场时尚革命、一个满是传说的广场，以及唐人街最好吃的一碗面。",
    },
    es: {
      name: "Soho",
      description:
        "El antiguo barrio bohemio de Londres, a pie: una calle de mercado, una revolución de la moda, una plaza llena de fantasmas y los mejores fideos del barrio chino.",
    },
    fr: {
      name: "Soho",
      description:
        "L'ancien quartier bohème de Londres, à pied : une rue de marché, une révolution de la mode, une place hantée par les fantômes, et les meilleures nouilles du quartier chinois.",
    },
  },
  "covent-garden": {
    zh: {
      name: "科文特花园",
      description: "曾经的果蔬市场，如今是街头表演的舞台，徒步探索：歌剧、演员的历史、一个隐秘庭院，以及七晷迷宫般的街巷。",
    },
    es: {
      name: "Covent Garden",
      description:
        "El antiguo mercado de frutas y verduras convertido en escenario callejero, a pie: ópera, historia de actores, un patio escondido y el laberinto de Seven Dials.",
    },
    fr: {
      name: "Covent Garden",
      description:
        "L'ancien marché aux fruits et légumes devenu scène de rue, à pied : opéra, histoire des comédiens, une cour cachée, et le labyrinthe de Seven Dials.",
    },
  },
  westminster: {
    zh: {
      name: "威斯敏斯特",
      description: "英国政府的所在地，徒步探索：大本钟、议会大厦、一座皇家修道院、丘吉尔的地下指挥所，以及英国最著名的一扇门。",
    },
    es: {
      name: "Westminster",
      description:
        "La sede del gobierno británico, a pie: el Big Ben, el Parlamento, una abadía real, el búnker subterráneo de Churchill, y la puerta más famosa de Gran Bretaña.",
    },
    fr: {
      name: "Westminster",
      description:
        "Le siège du gouvernement britannique, à pied : Big Ben, le Parlement, une abbaye royale, le bunker souterrain de Churchill, et la porte la plus célèbre de Grande-Bretagne.",
    },
  },
  "paris-louvre": {
    zh: {
      name: "卢浮宫与杜乐丽花园",
      description: "从中世纪堡垒到世界参观人数最多的博物馆，徒步探索：玻璃金字塔、一条隐藏的护城河，以及为王后而建的花园。",
    },
    es: {
      name: "Louvre y Tullerías",
      description:
        "De fortaleza medieval al museo más visitado del mundo, a pie: la pirámide de cristal, un foso oculto y un jardín construido para una reina.",
    },
    fr: {
      name: "Louvre et Tuileries",
      description:
        "D'une forteresse médiévale au musée le plus visité au monde, à pied : la pyramide de verre, des douves cachées, et un jardin construit pour une reine.",
    },
  },
  "paris-montmartre": {
    zh: {
      name: "蒙马特",
      description: "巴黎的山丘村落，徒步探索：一座俯瞰全城的大教堂、艺术家广场、一面写满爱的墙，以及康康舞的诞生地。",
    },
    es: {
      name: "Montmartre",
      description:
        "El pueblo en la colina de París, a pie: una basílica con vistas, plazas de artistas, un muro hecho de amor y el lugar de nacimiento del cancán.",
    },
    fr: {
      name: "Montmartre",
      description:
        "Le village perché de Paris, à pied : une basilique avec vue, des places d'artistes, un mur fait d'amour, et le berceau du french cancan.",
    },
  },
  "paris-ile-de-la-cite": {
    zh: {
      name: "西岱岛与巴黎圣母院",
      description: "巴黎诞生的岛屿，徒步探索：一座从灰烬中重生的大教堂、一座珠宝盒般的礼拜堂、一座皇家监狱，以及城中最古老的桥。",
    },
    es: {
      name: "Île de la Cité y Notre-Dame",
      description:
        "La isla donde nació París, a pie: una catedral que renace de las cenizas, una capilla joya, una prisión real y el puente más antiguo de la ciudad.",
    },
    fr: {
      name: "Île de la Cité et Notre-Dame",
      description:
        "L'île où Paris est née, à pied : une cathédrale renaissant de ses cendres, une chapelle bijou, une prison royale, et le plus vieux pont de la ville.",
    },
  },
  "paris-eiffel": {
    zh: {
      name: "埃菲尔铁塔与特罗卡德罗",
      description: "世界上最著名的铁塔，徒步探索：巴黎最美的天际线景观、铁塔本身，以及为世界博览会而建的阅兵广场。",
    },
    es: {
      name: "Torre Eiffel y Trocadéro",
      description:
        "El hierro más famoso del mundo, a pie: la mejor vista del horizonte de París, la torre en sí, y la explanada construida para una Exposición Universal.",
    },
    fr: {
      name: "Tour Eiffel et Trocadéro",
      description:
        "Le fer le plus célèbre du monde, à pied : la plus belle vue sur les toits de Paris, la tour elle-même, et l'esplanade construite pour une Exposition universelle.",
    },
  },
  "oxford-harry-potter": {
    zh: {
      name: "哈利·波特的牛津",
      description:
        "牛津真实存在的电影魔法，徒步探索：一条被电影两次取景的回廊小巷、曾扮演霍格沃茨医务室的图书馆、塑造了魔法学院大厅的校门，以及那间至今仍带着魔力的隐秘酒馆。",
    },
    es: {
      name: "Oxford de Harry Potter",
      description:
        "La magia cinematográfica real de Oxford, a pie: un pasaje con claustro que las películas usaron dos veces, una biblioteca en funcionamiento que hizo de enfermería de Hogwarts, la puerta que inspiró un gran comedor mágico, y el pub escondido donde todavía se respira algo de encantamiento.",
    },
    fr: {
      name: "Oxford d'Harry Potter",
      description:
        "La magie cinématographique bien réelle d'Oxford, à pied : une ruelle à cloître utilisée deux fois par les films, une bibliothèque en activité qui a servi d'infirmerie à Poudlard, le portail qui a inspiré une grande salle magique, et le pub caché où la magie semble encore opérer.",
    },
  },
  "oxford-bodleian": {
    zh: {
      name: "博德利图书馆与拉德克利夫图书馆",
      description:
        "牛津的学术心脏，徒步探索：一座仿古罗马风格的剧院、由印刷所改建的大学办公楼、英国被拍照最多的图书馆，以及守护着英国重要私人藏书之一的学院。",
    },
    es: {
      name: "Bodleiana y Radcliffe Camera",
      description:
        "El corazón académico de Oxford, a pie: un teatro inspirado en la Roma antigua, una imprenta convertida en oficinas de la universidad, la biblioteca más fotografiada de Inglaterra, y el colegio que custodia una de las grandes colecciones privadas de libros de Gran Bretaña.",
    },
    fr: {
      name: "Bodléienne et Radcliffe Camera",
      description:
        "Le cœur académique d'Oxford, à pied : un théâtre inspiré de la Rome antique, une ancienne imprimerie devenue bureaux universitaires, la bibliothèque la plus photographiée d'Angleterre, et le collège qui garde l'une des grandes collections privées de livres de Grande-Bretagne.",
    },
  },
  "oxford-castle-market": {
    zh: {
      name: "牛津城堡与有顶市场",
      description: "牛津日常生活的一面，徒步探索：赋予这座城市中心的十字路口、一座营业了两个多世纪的维多利亚市场，以及一座比城中任何学院都古老的诺曼土丘。",
    },
    es: {
      name: "Castillo de Oxford y el Mercado Cubierto",
      description:
        "El lado cotidiano y vivo de Oxford, a pie: el cruce que da nombre al centro de la ciudad, un mercado victoriano que sigue activo tras más de dos siglos, y un montículo normando más antiguo que cualquier colegio de la ciudad.",
    },
    fr: {
      name: "Château d'Oxford et le marché couvert",
      description:
        "Le visage quotidien et vivant d'Oxford, à pied : le carrefour qui donne son centre à la ville, un marché victorien encore actif après deux siècles, et une motte normande plus ancienne qu'aucun collège de la ville.",
    },
  },
  "oxford-inklings": {
    zh: {
      name: "牛津墨环社：托尔金与 C.S. 刘易斯",
      description:
        "塑造了中土世界与纳尼亚的牛津，徒步探索：墨环社（Inklings）每周聚会的酒馆、一间藏书量堪比小型图书馆的书店、一条两旁尽是静谧学院的鹅卵石街道，以及两位作家常去思考漫步的草地。",
    },
    es: {
      name: "Oxford de los Inklings: Tolkien y C.S. Lewis",
      description:
        "El Oxford que dio forma a la Tierra Media y a Narnia, a pie: el pub donde los Inklings se reunían cada semana, una librería con una sala del tamaño de una pequeña biblioteca, una calle adoquinada bordeada de colegios tranquilos, y el prado por donde ambos escritores paseaban para pensar.",
    },
    fr: {
      name: "Oxford des Inklings : Tolkien et C.S. Lewis",
      description:
        "L'Oxford qui a façonné la Terre du Milieu et Narnia, à pied : le pub où les Inklings se retrouvaient chaque semaine, une librairie dotée d'une salle grande comme une petite bibliothèque, une rue pavée bordée de collèges paisibles, et la prairie où les deux écrivains marchaient pour réfléchir.",
    },
  },
};

export function localizedAreaText(
  areaId: string,
  language: string,
  fallback: AreaText
): AreaText {
  const entry = AREA_TRANSLATIONS[areaId]?.[language as "zh" | "es" | "fr"];
  return entry ?? fallback;
}
