// 100 вопросов. Каждый ответ даёт очки по осям:
// theory/practice, analysis/synthesis, macro/micro, careful/risk
// Положительное = первый полюс, отрицательное = второй

const QUESTIONS = [
  // === БЛОК 1: ВВЕДЕНИЕ (1-10) ===
  { text: 'Что тебя больше привлекает в химии?', answers: [
    { text: 'Красивые реакции и эффекты', scores: { theory: 1, synthesis: 1, macro: 1, risk: 1 } },
    { text: 'Точные расчёты и закономерности', scores: { theory: 2, analysis: 2, micro: 1, careful: 1 } },
    { text: 'Возможность создавать новое', scores: { practice: 1, synthesis: 2, macro: 1, risk: 1 } },
    { text: 'Разгадывать, как всё устроено', scores: { theory: 2, analysis: 2, micro: 2, careful: 1 } }
  ]},
  { text: 'Ты в лаборатории. Первое, что делаешь?', answers: [
    { text: 'Читаю инструкцию и правила ТБ', scores: { theory: 1, analysis: 1, micro: 1, careful: 2 } },
    { text: 'Смотрю на реактивы и прикидываю, что смешать', scores: { practice: 2, synthesis: 1, macro: 1, risk: 2 } },
    { text: 'Проверяю оборудование и калибровку', scores: { practice: 1, analysis: 2, micro: 2, careful: 2 } },
    { text: 'Думаю, какую гипотезу проверить', scores: { theory: 2, analysis: 1, macro: 1, careful: 1 } }
  ]},
  { text: 'Какая задача тебе ближе?', answers: [
    { text: 'Синтезировать новое лекарство', scores: { practice: 2, synthesis: 2, macro: 2, risk: 1 } },
    { text: 'Определить состав неизвестного образца', scores: { practice: 1, analysis: 2, micro: 1, careful: 2 } },
    { text: 'Объяснить, почему реакция идёт именно так', scores: { theory: 2, analysis: 2, micro: 2, careful: 1 } },
    { text: 'Запустить производство на заводе', scores: { practice: 2, synthesis: 1, macro: 2, risk: 1 } }
  ]},
  { text: 'Что для тебя важнее в работе?', answers: [
    { text: 'Точность и воспроизводимость', scores: { theory: 1, analysis: 2, micro: 2, careful: 2 } },
    { text: 'Свобода экспериментировать', scores: { practice: 2, synthesis: 2, macro: 1, risk: 2 } },
    { text: 'Понимание фундаментальных законов', scores: { theory: 2, analysis: 2, micro: 1, careful: 1 } },
    { text: 'Видимый результат — продукт, вещество', scores: { practice: 2, synthesis: 1, macro: 2, risk: 1 } }
  ]},
  { text: 'Тебе дали неизвестное вещество. Что делаешь?', answers: [
    { text: 'Провожу серию качественных реакций', scores: { practice: 2, analysis: 2, micro: 1, careful: 1 } },
    { text: 'Смотрю в справочнике и строю гипотезы', scores: { theory: 2, analysis: 2, macro: 1, careful: 2 } },
    { text: 'Пробую с чем-нибудь смешать', scores: { practice: 2, synthesis: 2, macro: 1, risk: 2 } },
    { text: 'Изучаю строение под микроскопом', scores: { practice: 1, analysis: 1, micro: 2, careful: 2 } }
  ]},
  { text: 'Идеальный рабочий день — это...', answers: [
    { text: 'Тишина, приборы, точные измерения', scores: { theory: 1, analysis: 2, micro: 2, careful: 2 } },
    { text: 'Много опытов, ярких результатов', scores: { practice: 2, synthesis: 1, macro: 2, risk: 2 } },
    { text: 'Обсуждение теорий с коллегами', scores: { theory: 2, analysis: 2, macro: 1, careful: 1 } },
    { text: 'Создание чего-то нового своими руками', scores: { practice: 2, synthesis: 2, micro: 1, risk: 1 } }
  ]},
  { text: 'Что тебя больше восхищает?', answers: [
    { text: 'Периодический закон Менделеева', scores: { theory: 2, analysis: 2, macro: 2, careful: 1 } },
    { text: 'Синтез сложной молекулы', scores: { practice: 2, synthesis: 2, micro: 1, risk: 1 } },
    { text: 'Точный анализ следовых количеств', scores: { practice: 1, analysis: 2, micro: 2, careful: 2 } },
    { text: 'Промышленный реактор на тысячи тонн', scores: { practice: 2, synthesis: 1, macro: 2, risk: 2 } }
  ]},
  { text: 'Как ты относишься к риску?', answers: [
    { text: 'Никакого риска — только по протоколу', scores: { theory: 1, analysis: 1, micro: 1, careful: 3 } },
    { text: 'Риск оправдан, если ведёт к открытию', scores: { practice: 2, synthesis: 2, macro: 1, risk: 3 } },
    { text: 'Лучше перестраховаться', scores: { theory: 1, analysis: 2, micro: 1, careful: 2 } },
    { text: 'Умеренный риск — часть работы', scores: { practice: 1, synthesis: 1, macro: 1, risk: 1 } }
  ]},
  { text: 'Что интереснее изучать?', answers: [
    { text: 'Отдельные атомы и молекулы', scores: { theory: 2, analysis: 2, micro: 3, careful: 1 } },
    { text: 'Реакции в пробирке', scores: { practice: 2, synthesis: 1, micro: 1, risk: 1 } },
    { text: 'Процессы в атмосфере и океане', scores: { theory: 1, analysis: 2, macro: 3, careful: 1 } },
    { text: 'Производство и технологии', scores: { practice: 2, synthesis: 1, macro: 3, risk: 1 } }
  ]},
  { text: 'Финальный вопрос первого блока. Что выберешь?', answers: [
    { text: 'Написать статью о новом законе', scores: { theory: 3, analysis: 2, macro: 1, careful: 2 } },
    { text: 'Получить патент на новое вещество', scores: { practice: 2, synthesis: 3, micro: 1, risk: 2 } },
    { text: 'Улучшить существующую технологию', scores: { practice: 2, synthesis: 1, macro: 2, careful: 1 } },
    { text: 'Найти ошибку в чужом исследовании', scores: { theory: 2, analysis: 3, micro: 2, careful: 2 } }
  ]},

  // === БЛОК 2: ЛАБОРАТОРИЯ (11-20) ===
  { text: 'Что ты чувствуешь, когда реакция идёт не так?', answers: [
    { text: 'Злость — надо было точнее считать', scores: { theory: 1, analysis: 2, micro: 1, careful: 2 } },
    { text: 'Азарт — попробую иначе', scores: { practice: 2, synthesis: 2, macro: 1, risk: 2 } },
    { text: 'Интерес — почему так вышло?', scores: { theory: 2, analysis: 2, micro: 2, careful: 1 } },
    { text: 'Спокойствие — это часть работы', scores: { practice: 1, analysis: 1, macro: 1, careful: 1 } }
  ]},
  { text: 'Твой любимый прибор?', answers: [
    { text: 'Микроскоп', scores: { practice: 1, analysis: 2, micro: 3, careful: 1 } },
    { text: 'Спектрометр', scores: { theory: 2, analysis: 3, micro: 2, careful: 1 } },
    { text: 'Реактор', scores: { practice: 2, synthesis: 2, macro: 3, risk: 2 } },
    { text: 'Хроматограф', scores: { practice: 1, analysis: 3, micro: 1, careful: 2 } }
  ]},
  { text: 'Тебе нужно выбрать посуду для опыта. Что возьмёшь?', answers: [
    { text: 'Пробирку — просто и быстро', scores: { practice: 1, synthesis: 1, micro: 2, risk: 1 } },
    { text: 'Колбу — для точных измерений', scores: { theory: 1, analysis: 2, micro: 2, careful: 2 } },
    { text: 'Реактор — для большого объёма', scores: { practice: 2, synthesis: 1, macro: 3, risk: 1 } },
    { text: 'Чашку Петри — для наблюдения', scores: { theory: 1, analysis: 1, micro: 2, careful: 1 } }
  ]},
  { text: 'Как ты ведёшь записи?', answers: [
    { text: 'Строго по форме, всё точно', scores: { theory: 1, analysis: 2, micro: 1, careful: 3 } },
    { text: 'Рисую схемы и стрелки', scores: { practice: 1, synthesis: 2, micro: 2, risk: 1 } },
    { text: 'Пишу кратко, главное — результат', scores: { practice: 2, synthesis: 1, macro: 2, risk: 2 } },
    { text: 'Подробно описываю каждый шаг', scores: { theory: 2, analysis: 1, micro: 1, careful: 2 } }
  ]},
  { text: 'Что для тебя «красивая» реакция?', answers: [
    { text: 'Та, что идёт с ярким эффектом', scores: { practice: 2, synthesis: 1, macro: 2, risk: 1 } },
    { text: 'Та, что даёт 100% выход', scores: { theory: 1, analysis: 2, micro: 1, careful: 2 } },
    { text: 'Та, что открывает новое', scores: { practice: 2, synthesis: 3, macro: 1, risk: 2 } },
    { text: 'Та, что объясняется простым законом', scores: { theory: 3, analysis: 2, micro: 2, careful: 1 } }
  ]},
  { text: 'Ты нашёл ошибку в методике. Что делаешь?', answers: [
    { text: 'Записываю и сообщаю руководителю', scores: { theory: 1, analysis: 2, micro: 1, careful: 3 } },
    { text: 'Исправляю и проверяю на практике', scores: { practice: 2, synthesis: 1, macro: 1, risk: 1 } },
    { text: 'Ищу причину — почему так вышло', scores: { theory: 2, analysis: 3, micro: 2, careful: 1 } },
    { text: 'Пробую совершенно другой подход', scores: { practice: 2, synthesis: 2, macro: 1, risk: 2 } }
  ]},
  { text: 'Что тебе ближе в работе с реактивами?', answers: [
    { text: 'Точные навески до миллиграмма', scores: { theory: 1, analysis: 3, micro: 2, careful: 2 } },
    { text: 'Синтез нового вещества', scores: { practice: 2, synthesis: 3, micro: 1, risk: 1 } },
    { text: 'Работа с большими объёмами', scores: { practice: 2, synthesis: 1, macro: 3, risk: 1 } },
    { text: 'Анализ следовых количеств', scores: { practice: 1, analysis: 3, micro: 3, careful: 2 } }
  ]},
  { text: 'Как ты относишься к технике безопасности?', answers: [
    { text: 'Это святое — никогда не нарушаю', scores: { theory: 1, analysis: 1, micro: 1, careful: 3 } },
    { text: 'Соблюдаю, но иногда рискую', scores: { practice: 1, synthesis: 1, macro: 1, risk: 2 } },
    { text: 'Правила — для новичков', scores: { practice: 2, synthesis: 2, macro: 1, risk: 3 } },
    { text: 'Соблюдаю, если понимаю зачем', scores: { theory: 2, analysis: 2, micro: 1, careful: 2 } }
  ]},
  { text: 'Твой идеальный результат опыта?', answers: [
    { text: 'Всё точно по теории', scores: { theory: 3, analysis: 2, micro: 1, careful: 2 } },
    { text: 'Что-то новое и неожиданное', scores: { practice: 2, synthesis: 3, macro: 1, risk: 2 } },
    { text: 'Чистый продукт с высоким выходом', scores: { practice: 1, analysis: 1, micro: 2, careful: 2 } },
    { text: 'Работающая технология', scores: { practice: 2, synthesis: 1, macro: 3, risk: 1 } }
  ]},
  { text: 'Что тебя заставляет работать дальше?', answers: [
    { text: 'Желание понять, как всё устроено', scores: { theory: 3, analysis: 2, micro: 2, careful: 1 } },
    { text: 'Азарт открытия', scores: { practice: 2, synthesis: 2, macro: 1, risk: 2 } },
    { text: 'Польза для людей', scores: { practice: 2, synthesis: 1, macro: 2, careful: 1 } },
    { text: 'Точность и perfectionism', scores: { theory: 1, analysis: 2, micro: 2, careful: 3 } }
  ]},

  // === БЛОК 3: ТЕОРИЯ И ПРАКТИКА (21-30) ===
  { text: 'Что тебе интереснее читать?', answers: [
    { text: 'Научные статьи', scores: { theory: 3, analysis: 2, micro: 1, careful: 1 } },
    { text: 'Практические руководства', scores: { practice: 2, synthesis: 1, macro: 2, risk: 1 } },
    { text: 'Истории открытий', scores: { theory: 1, synthesis: 2, macro: 2, risk: 1 } },
    { text: 'Формулы и справочники', scores: { theory: 2, analysis: 3, micro: 2, careful: 2 } }
  ]},
  { text: 'Как ты решаешь сложную задачу?', answers: [
    { text: 'Разбиваю на части и считаю', scores: { theory: 1, analysis: 3, micro: 1, careful: 2 } },
    { text: 'Пробую разные варианты', scores: { practice: 2, synthesis: 2, macro: 1, risk: 2 } },
    { text: 'Ищу похожие решения', scores: { theory: 2, analysis: 2, macro: 1, careful: 2 } },
    { text: 'Доверяю интуиции', scores: { practice: 2, synthesis: 2, macro: 1, risk: 2 } }
  ]},
  { text: 'Что важнее в науке?', answers: [
    { text: 'Строгие доказательства', scores: { theory: 3, analysis: 3, micro: 1, careful: 2 } },
    { text: 'Смелые гипотезы', scores: { theory: 2, synthesis: 3, macro: 1, risk: 2 } },
    { text: 'Практический результат', scores: { practice: 3, synthesis: 1, macro: 2, risk: 1 } },
    { text: 'Красота теории', scores: { theory: 3, analysis: 1, macro: 1, careful: 1 } }
  ]},
  { text: 'Ты бы предпочёл работать...', answers: [
    { text: 'В тихой лаборатории', scores: { theory: 1, analysis: 2, micro: 2, careful: 2 } },
    { text: 'На производстве', scores: { practice: 2, synthesis: 1, macro: 3, risk: 2 } },
    { text: 'В университете', scores: { theory: 3, analysis: 2, macro: 1, careful: 1 } },
    { text: 'В поле — на природе', scores: { practice: 2, analysis: 1, macro: 2, risk: 2 } }
  ]},
  { text: 'Что тебя привлекает в химии больше всего?', answers: [
    { text: 'Возможность всё объяснить', scores: { theory: 3, analysis: 2, micro: 1, careful: 1 } },
    { text: 'Магия превращений', scores: { practice: 1, synthesis: 2, macro: 1, risk: 1 } },
    { text: 'Точность и предсказуемость', scores: { theory: 1, analysis: 3, micro: 2, careful: 2 } },
    { text: 'Масштаб и мощь', scores: { practice: 2, synthesis: 1, macro: 3, risk: 1 } }
  ]},
  { text: 'Как ты относишься к формулам?', answers: [
    { text: 'Люблю — это язык химии', scores: { theory: 3, analysis: 2, micro: 2, careful: 1 } },
    { text: 'Нужны только для расчётов', scores: { practice: 1, analysis: 2, macro: 2, risk: 1 } },
    { text: 'Предпочитаю схемы и картинки', scores: { practice: 2, synthesis: 2, micro: 1, risk: 1 } },
    { text: 'Обожаю выводить новые', scores: { theory: 3, analysis: 3, micro: 1, careful: 1 } }
  ]},
  { text: 'Что ты сделаешь, если опыт не удался?', answers: [
    { text: 'Пересчитаю всё сначала', scores: { theory: 1, analysis: 3, micro: 1, careful: 2 } },
    { text: 'Попробую изменить условия', scores: { practice: 2, synthesis: 2, macro: 1, risk: 1 } },
    { text: 'Опишу и проанализирую', scores: { theory: 2, analysis: 2, micro: 1, careful: 2 } },
    { text: 'Забуду и попробую что-то другое', scores: { practice: 2, synthesis: 1, macro: 1, risk: 2 } }
  ]},
  { text: 'Что тебе ближе?', answers: [
    { text: 'Работать в одиночку', scores: { theory: 2, analysis: 2, micro: 2, careful: 1 } },
    { text: 'В команде', scores: { practice: 2, synthesis: 1, macro: 2, risk: 1 } },
    { text: 'Руководить', scores: { practice: 2, synthesis: 1, macro: 3, risk: 2 } },
    { text: 'Учиться у других', scores: { theory: 2, analysis: 2, micro: 1, careful: 2 } }
  ]},
  { text: 'Что ты выберешь как хобби?', answers: [
    { text: 'Шахматы', scores: { theory: 2, analysis: 3, micro: 1, careful: 2 } },
    { text: 'Походы', scores: { practice: 2, synthesis: 1, macro: 2, risk: 2 } },
    { text: 'Рисование', scores: { theory: 1, synthesis: 3, micro: 1, risk: 1 } },
    { text: 'Кулинария', scores: { practice: 2, synthesis: 2, macro: 1, risk: 1 } }
  ]},
  { text: 'Что тебя пугает в науке?', answers: [
    { text: 'Ошибки в расчётах', scores: { theory: 1, analysis: 3, micro: 1, careful: 3 } },
    { text: 'Взрывы и опасность', scores: { practice: 1, analysis: 1, macro: 2, careful: 3 } },
    { text: 'Рутина', scores: { practice: 2, synthesis: 2, macro: 1, risk: 2 } },
    { text: 'Непонятность', scores: { theory: 3, analysis: 1, micro: 2, careful: 1 } }
  ]},

  // === БЛОК 4: ПРЕДПОЧТЕНИЯ (31-40) ===
  { text: 'Что для тебя «прогресс»?', answers: [
    { text: 'Новое открытие', scores: { theory: 3, synthesis: 2, macro: 1, risk: 1 } },
    { text: 'Новая технология', scores: { practice: 2, synthesis: 2, macro: 3, risk: 1 } },
    { text: 'Улучшение старого', scores: { practice: 2, analysis: 1, macro: 1, careful: 2 } },
    { text: 'Новое объяснение', scores: { theory: 3, analysis: 2, micro: 1, careful: 1 } }
  ]},
  { text: 'Ты бы хотел работать над...', answers: [
    { text: 'Новым лекарством', scores: { practice: 2, synthesis: 3, micro: 1, careful: 1 } },
    { text: 'Новым материалом', scores: { practice: 2, synthesis: 2, macro: 1, risk: 1 } },
    { text: 'Теорией', scores: { theory: 3, analysis: 2, micro: 1, careful: 1 } },
    { text: 'Методом анализа', scores: { practice: 1, analysis: 3, micro: 2, careful: 2 } }
  ]},
  { text: 'Что ты ценишь в коллегах?', answers: [
    { text: 'Точность', scores: { theory: 2, analysis: 2, micro: 1, careful: 3 } },
    { text: 'Смелость', scores: { practice: 2, synthesis: 2, macro: 1, risk: 3 } },
    { text: 'Глубину', scores: { theory: 3, analysis: 2, micro: 2, careful: 1 } },
    { text: 'Практичность', scores: { practice: 3, analysis: 1, macro: 2, risk: 1 } }
  ]},
  { text: 'Что тебе интереснее?', answers: [
    { text: 'Углерод', scores: { practice: 1, synthesis: 2, micro: 2, risk: 1 } },
    { text: 'Металлы', scores: { practice: 2, synthesis: 1, macro: 2, risk: 1 } },
    { text: 'Газы', scores: { theory: 2, analysis: 1, macro: 2, careful: 1 } },
    { text: 'Растворы', scores: { theory: 1, analysis: 2, micro: 1, careful: 2 } }
  ]},
  { text: 'Как ты относишься к компьютерам?', answers: [
    { text: 'Обожаю — моделирую всё', scores: { theory: 3, analysis: 2, micro: 1, careful: 1 } },
    { text: 'Использую для расчётов', scores: { practice: 1, analysis: 2, macro: 1, careful: 2 } },
    { text: 'Предпочитаю реальный эксперимент', scores: { practice: 3, synthesis: 1, macro: 2, risk: 2 } },
    { text: 'Компьютер — просто инструмент', scores: { practice: 2, synthesis: 1, macro: 1, careful: 1 } }
  ]},
  { text: 'Что тебя вдохновляет?', answers: [
    { text: 'Красота молекул', scores: { theory: 2, synthesis: 2, micro: 3, careful: 1 } },
    { text: 'Мощь реакций', scores: { practice: 2, synthesis: 1, macro: 2, risk: 1 } },
    { text: 'Сложность систем', scores: { theory: 2, analysis: 3, macro: 2, careful: 1 } },
    { text: 'Польза для человечества', scores: { practice: 2, synthesis: 1, macro: 2, careful: 1 } }
  ]},
  { text: 'Что бы ты выбрал?', answers: [
    { text: 'Написать книгу', scores: { theory: 3, analysis: 2, macro: 1, careful: 1 } },
    { text: 'Открыть компанию', scores: { practice: 2, synthesis: 2, macro: 3, risk: 3 } },
    { text: 'Сделать открытие', scores: { theory: 2, synthesis: 2, micro: 2, risk: 2 } },
    { text: 'Улучшить мир', scores: { practice: 2, synthesis: 1, macro: 2, careful: 1 } }
  ]},
  { text: 'Что тебя раздражает?', answers: [
    { text: 'Неточность', scores: { theory: 1, analysis: 3, micro: 1, careful: 3 } },
    { text: 'Однообразие', scores: { practice: 2, synthesis: 2, macro: 1, risk: 2 } },
    { text: 'Глупость', scores: { theory: 3, analysis: 2, micro: 1, careful: 1 } },
    { text: 'Пустая трата времени', scores: { practice: 2, analysis: 1, macro: 2, risk: 1 } }
  ]},
  { text: 'Что бы ты делал в идеальном мире?', answers: [
    { text: 'Изучал бы всё подряд', scores: { theory: 3, analysis: 2, micro: 1, careful: 1 } },
    { text: 'Создавал бы новое', scores: { practice: 2, synthesis: 3, macro: 1, risk: 1 } },
    { text: 'Помогал бы людям', scores: { practice: 2, synthesis: 1, macro: 2, careful: 1 } },
    { text: 'Решал бы сложные задачи', scores: { theory: 2, analysis: 3, micro: 2, careful: 1 } }
  ]},
  { text: 'Финальный вопрос 4-го блока. Что выберешь?', answers: [
    { text: 'Лабораторию в горах', scores: { theory: 2, analysis: 2, micro: 2, careful: 1 } },
    { text: 'Завод-гигант', scores: { practice: 2, synthesis: 1, macro: 3, risk: 2 } },
    { text: 'Стартап в гараже', scores: { practice: 2, synthesis: 3, macro: 1, risk: 3 } },
    { text: 'Институт с коллегами', scores: { theory: 3, analysis: 2, macro: 1, careful: 1 } }
  ]},

  // ============================================
  // БЛОКИ 5-10 (вопросы 41-100)
  // ============================================
  // Здесь идут блоки 41-50, 51-60, 61-70, 71-80, 81-90, 91-100.
  // Каждый блок — 10 вопросов, формат тот же, что выше.
  // Просто копируй предыдущий блок и меняй текст вопросов и очки.
  //
  // ШАБЛОН ДЛЯ ВОПРОСА:
  // { text: 'Текст вопроса?', answers: [
  //   { text: 'Вариант A', scores: { theory: 2, analysis: 1, micro: 1, careful: 1 } },
  //   { text: 'Вариант B', scores: { practice: 2, synthesis: 1, macro: 1, risk: 1 } },
  //   { text: 'Вариант C', scores: { theory: 1, synthesis: 2, micro: 2, careful: 1 } },
  //   { text: 'Вариант D', scores: { practice: 2, analysis: 2, macro: 1, risk: 1 } }
  // ]},
  //
  // Просто добавляй свои 60 вопросов перед закрывающей ];
  // Главное — 4 варианта в каждом, и очки по осям.

  // ============================================
  // БЛОК 5: САМООПРЕДЕЛЕНИЕ (41-50)
  // ============================================
  { text: 'Ты бы назвал себя...', answers: [
    { text: 'Учёным', scores: { theory: 3, analysis: 2, micro: 1, careful: 1 } },
    { text: 'Инженером', scores: { practice: 2, synthesis: 1, macro: 2, careful: 2 } },
    { text: 'Изобретателем', scores: { practice: 2, synthesis: 3, macro: 1, risk: 2 } },
    { text: 'Аналитиком', scores: { theory: 1, analysis: 3, micro: 2, careful: 2 } }
  ]},
  { text: 'Что важнее в работе?', answers: [
    { text: 'Свобода', scores: { theory: 2, synthesis: 2, macro: 1, risk: 2 } },
    { text: 'Стабильность', scores: { practice: 1, analysis: 1, macro: 1, careful: 3 } },
    { text: 'Открытия', scores: { theory: 2, synthesis: 2, micro: 2, risk: 2 } },
    { text: 'Результат', scores: { practice: 3, synthesis: 1, macro: 2, risk: 1 } }
  ]},
  { text: 'Ты бы хотел...', answers: [
    { text: 'Работать в лаборатории', scores: { practice: 1, analysis: 2, micro: 2, careful: 2 } },
    { text: 'Работать на заводе', scores: { practice: 2, synthesis: 1, macro: 3, risk: 1 } },
    { text: 'Преподавать', scores: { theory: 3, analysis: 1, macro: 1, careful: 1 } },
    { text: 'Изобретать', scores: { practice: 2, synthesis: 3, macro: 1, risk: 2 } }
  ]},
  { text: 'Что тебе сложнее всего?', answers: [
    { text: 'Скучная рутина', scores: { practice: 2, synthesis: 2, macro: 1, risk: 2 } },
    { text: 'Риск', scores: { theory: 1, analysis: 1, micro: 1, careful: 3 } },
    { text: 'Непонимание', scores: { theory: 3, analysis: 2, micro: 1, careful: 1 } },
    { text: 'Отсутствие результата', scores: { practice: 3, synthesis: 1, macro: 2, risk: 1 } }
  ]},
  { text: 'Что для тебя успех?', answers: [
    { text: 'Понять закон', scores: { theory: 3, analysis: 3, micro: 1, careful: 1 } },
    { text: 'Создать вещь', scores: { practice: 2, synthesis: 3, macro: 1, risk: 1 } },
    { text: 'Помочь людям', scores: { practice: 2, synthesis: 1, macro: 2, careful: 1 } },
    { text: 'Превзойти себя', scores: { theory: 2, synthesis: 2, micro: 2, risk: 2 } }
  ]},
  { text: 'Ты бы хотел работать с...', answers: [
    { text: 'Микроскопом', scores: { theory: 1, analysis: 3, micro: 3, careful: 1 } },
    { text: 'Реактором', scores: { practice: 2, synthesis: 1, macro: 3, risk: 2 } },
    { text: 'Компьютером', scores: { theory: 3, analysis: 2, micro: 1, careful: 1 } },
    { text: 'Людьми', scores: { practice: 2, synthesis: 1, macro: 2, careful: 1 } }
  ]},
  { text: 'Что ты ценишь больше?', answers: [
    { text: 'Истину', scores: { theory: 3, analysis: 2, micro: 1, careful: 1 } },
    { text: 'Пользу', scores: { practice: 3, synthesis: 1, macro: 2, careful: 1 } },
    { text: 'Красоту', scores: { theory: 2, synthesis: 2, micro: 2, risk: 1 } },
    { text: 'Свободу', scores: { practice: 2, synthesis: 2, macro: 1, risk: 3 } }
  ]},
  { text: 'Что тебя мотивирует?', answers: [
    { text: 'Любопытство', scores: { theory: 3, analysis: 2, micro: 1, careful: 1 } },
    { text: 'Азарт', scores: { practice: 2, synthesis: 2, macro: 1, risk: 3 } },
    { text: 'Ответственность', scores: { practice: 1, analysis: 2, macro: 2, careful: 3 } },
    { text: 'Творчество', scores: { theory: 1, synthesis: 3, micro: 2, risk: 1 } }
  ]},
  { text: 'Ты бы хотел...', answers: [
    { text: 'Понять всё', scores: { theory: 3, analysis: 3, micro: 1, careful: 1 } },
    { text: 'Сделать всё', scores: { practice: 2, synthesis: 2, macro: 2, risk: 2 } },
    { text: 'Попробовать всё', scores: { practice: 2, synthesis: 2, macro: 1, risk: 3 } },
    { text: 'Проверить всё', scores: { theory: 1, analysis: 3, micro: 2, careful: 2 } }
  ]},
  { text: 'Финальный вопрос 5-го блока.', answers: [
    { text: 'Я — теоретик', scores: { theory: 4, analysis: 2, micro: 1, careful: 1 } },
    { text: 'Я — практик', scores: { practice: 4, synthesis: 1, macro: 2, risk: 1 } },
    { text: 'Я — творец', scores: { theory: 1, synthesis: 4, micro: 1, risk: 2 } },
    { text: 'Я — исследователь', scores: { theory: 2, analysis: 3, micro: 2, careful: 2 } }
  ]}

  // ⚠️ ЗДЕСЬ ДОБАВЬ ЕЩЁ 50 ВОПРОСОВ (блоки 6-10)
  // Формат тот же — копируй пример и меняй текст.
  // Если хочешь — скажи, и я допишу следующие 50 отдельным файлом.
];