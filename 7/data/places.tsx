import Place from "@/entities/place";

export const places: Place[] = [
    new Place(1, "Байтерек", "Достопримечательности", "Символ Астаны, отражающий древние легенды.", require('../assets/images/baiterek.jpg'), 4.8),
    new Place(2, "Хан Шатыр", "Достопримечательности", "Торгово-развлекательный центр под необычным шатром.", require('../assets/images/khanshatyr.jpg'), 4.7),
    new Place(3, "Мечеть Хазрет Султан", "Достопримечательности", "Одна из крупнейших мечетей в Центральной Азии.", require('../assets/images/hazret_sultan.jpg'), 4.9),
    new Place(4, "Дворец мира и согласия", "Достопримечательности", "Пирамидальное здание, символизирующее единство народов.", require('../assets/images/palace_of_peace.jpg'), 4.6),

    new Place(5, "Центральный парк", "Парки", "Популярное место для прогулок и активного отдыха.", require('../assets/images/central_park.jpg'), 4.5),
    new Place(6, "Ботанический сад", "Парки", "Просторный сад с редкими растениями и зонами отдыха.", require('../assets/images/botanical_garden.jpg'), 4.7),
    new Place(7, "Парк Президентский", "Парки", "Большая зелёная зона с фонтанами и аллеями.", require('../assets/images/presidential_park.jpg'), 4.6),

    new Place(8, "Ресторан Line Brew", "Рестораны", "Известен своими стейками и пивом собственного производства.", require('../assets/images/linebrew.jpg'), 4.8),
    new Place(9, "Кафе Rumi", "Рестораны", "Современная восточная кухня в уютной атмосфере.", require('../assets/images/rumi.jpg'), 4.5),
    new Place(10, "Гастробар Pinta", "Рестораны", "Большой выбор напитков и живой музыки.", require('../assets/images/pinta.jpg'), 4.4),
];

export const categories: string[] = [
    "Достопримечательности",
    "Парки",
    "Рестораны"
];
