import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState('');
  const [sanatoriumRecommendations, setSanatoriumRecommendations] = useState<any[]>([]);

  const searchableContent = [
    { keywords: ['взрослая', 'карта', '072', 'форма'], target: '#info', label: 'Взрослая санаторно-курортная карта (Форма 072/у)' },
    { keywords: ['детская', 'карта', '076', 'ребенок', 'дети'], target: '#info', label: 'Детская санаторно-курортная карта (Форма 076/у-04)' },
    { keywords: ['поликлиника', 'бесплатно', 'оформить'], target: '#where', label: 'Оформление в поликлинике (бесплатно)' },
    { keywords: ['медцентр', 'быстро', 'платно', 'стоимость'], target: '#where', label: 'Оформление в медцентре' },
    { keywords: ['санаторий', 'выбрать', 'подобрать'], target: '#sanatoriums', label: 'Подбор санатория' },
    { keywords: ['льготы', 'бесплатная', 'путевка', 'пенсионер'], target: '#sanatoriums', label: 'Льготные путевки' },
    { keywords: ['анализы', 'обследование', 'оак', 'оам'], target: '#faq', label: 'Какие анализы нужны?' },
    { keywords: ['срок', 'действия', 'период'], target: '#faq', label: 'Срок действия карты' },
    { keywords: ['противопоказания', 'нельзя'], target: '#faq', label: 'Противопоказания' },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = searchableContent
      .filter(item => item.keywords.some(keyword => keyword.includes(query) || query.includes(keyword)))
      .map(item => item.label);
    
    setSearchResults(results);

    if (results.length > 0) {
      const firstMatch = searchableContent.find(item => 
        item.keywords.some(keyword => keyword.includes(query) || query.includes(keyword))
      );
      if (firstMatch) {
        document.querySelector(firstMatch.target)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const mainSections = [
    { id: 'adult', title: 'Взрослая карта', subtitle: 'Форма 072/у', icon: 'User' },
    { id: 'child', title: 'Детская карта', subtitle: 'Форма 076/у-04', icon: 'Baby' },
    { id: 'electronic', title: 'Электронная форма', subtitle: 'Онлайн оформление', icon: 'Smartphone' },
  ];

  const whereToGet = [
    {
      title: 'Поликлиника',
      time: '5-7 дней',
      cost: 'Бесплатно',
      icon: 'Hospital',
      steps: ['Запись к терапевту', 'Сдача анализов', 'Обход врачей', 'Получение карты']
    },
    {
      title: 'Медцентр',
      time: '1-2 дня',
      cost: 'От 2000 ₽',
      icon: 'Stethoscope',
      steps: ['Обращение в центр', 'Экспресс-анализы', 'Осмотр врачей', 'Выдача карты']
    },
    {
      title: 'Санаторий',
      time: 'В день заезда',
      cost: 'Включено',
      icon: 'TreePine',
      steps: ['Приезд в санаторий', 'Осмотр врача', 'Оформление карты', 'Начало лечения']
    },
  ];

  const infoBlocks = [
    { title: 'Срок действия', content: '6 месяцев для взрослых, 3 месяца для детей', icon: 'Calendar' },
    { title: 'Стоимость', content: 'Бесплатно в поликлинике, 2000-5000 ₽ в медцентрах', icon: 'Wallet' },
    { title: 'Анализы', content: 'ОАК, ОАМ, ЭКГ, флюорография, осмотр терапевта', icon: 'FileText' },
    { title: 'Противопоказания', content: 'Острые заболевания, обострения хронических болезней', icon: 'AlertCircle' },
  ];

  const diagnosisDatabase = {
    'cardio': {
      name: 'Сердечно-сосудистые заболевания',
      sanatoriums: [
        { name: 'Кисловодск "Плаза"', region: 'Кавказ', specialty: 'Кардиология', price: 'От 3500₽/день', features: ['Минеральные воды', 'Терренкур', 'ЛФК'] },
        { name: 'Сочи "Актер"', region: 'Черное море', specialty: 'Сердце и сосуды', price: 'От 4200₽/день', features: ['Бальнеотерапия', 'Массаж', 'Климатолечение'] },
        { name: 'Кисловодск "Нарзан"', region: 'Кавказ', specialty: 'Кардиология', price: 'От 3200₽/день', features: ['Нарзанные ванны', 'Терренкур', 'Диетотерапия'] },
      ]
    },
    'joint': {
      name: 'Заболевания опорно-двигательного аппарата',
      sanatoriums: [
        { name: 'Пятигорск "Родник"', region: 'Кавказ', specialty: 'Суставы и позвоночник', price: 'От 3000₽/день', features: ['Грязелечение', 'Радоновые ванны', 'Массаж'] },
        { name: 'Саки "Полтава"', region: 'Крым', specialty: 'Опорно-двигательный', price: 'От 3800₽/день', features: ['Сакские грязи', 'Бассейн', 'ЛФК'] },
        { name: 'Анапа "ДиЛуч"', region: 'Черное море', specialty: 'Суставы', price: 'От 3500₽/день', features: ['Морелечение', 'Грязи', 'Физиотерапия'] },
      ]
    },
    'nervous': {
      name: 'Нервная система и стресс',
      sanatoriums: [
        { name: 'Алтай "Белокуриха"', region: 'Алтай', specialty: 'Неврология', price: 'От 3300₽/день', features: ['Радонотерапия', 'Тишина природы', 'Психотерапия'] },
        { name: 'Сочи "Золотой колос"', region: 'Черное море', specialty: 'Антистресс', price: 'От 4000₽/день', features: ['Релаксация', 'Массаж', 'Ароматерапия'] },
        { name: 'Подмосковье "Дорохово"', region: 'Московская область', specialty: 'Нервная система', price: 'От 2800₽/день', features: ['Тихая зона', 'Йога', 'Медитация'] },
      ]
    },
    'respiratory': {
      name: 'Органы дыхания',
      sanatoriums: [
        { name: 'Анапа "Русь"', region: 'Черное море', specialty: 'Легкие и бронхи', price: 'От 3600₽/день', features: ['Морской воздух', 'Ингаляции', 'Спелеотерапия'] },
        { name: 'Кисловодск "Виктория"', region: 'Кавказ', specialty: 'Органы дыхания', price: 'От 3400₽/день', features: ['Горный воздух', 'Терренкур', 'Дыхательная гимнастика'] },
        { name: 'Белокуриха "Россия"', region: 'Алтай', specialty: 'Дыхательная система', price: 'От 3200₽/день', features: ['Чистый воздух', 'Ингаляции', 'Климатолечение'] },
      ]
    },
    'digestive': {
      name: 'Желудочно-кишечный тракт',
      sanatoriums: [
        { name: 'Ессентуки "Виктория"', region: 'Кавказ', specialty: 'ЖКТ', price: 'От 3100₽/день', features: ['Минеральные воды', 'Диетотерапия', 'Питьевая галерея'] },
        { name: 'Железноводск "Русь"', region: 'Кавказ', specialty: 'Пищеварение', price: 'От 2900₽/день', features: ['Лечебные воды', 'Диетическое питание', 'Терренкур'] },
        { name: 'Трускавец "Кристалл"', region: 'Карпаты', specialty: 'ЖКТ', price: 'От 3500₽/день', features: ['Минеральные воды', 'SPA', 'Диетология'] },
      ]
    },
    'rehabilitation': {
      name: 'Реабилитация после COVID-19',
      sanatoriums: [
        { name: 'Сочи "Звездный"', region: 'Черное море', specialty: 'Реабилитация', price: 'От 4500₽/день', features: ['Комплексное восстановление', 'Кислородотерапия', 'ЛФК'] },
        { name: 'Кисловодск "Целебный Нарзан"', region: 'Кавказ', specialty: 'Постковидная реабилитация', price: 'От 3800₽/день', features: ['Минеральные воды', 'Дыхательная гимнастика', 'Массаж'] },
        { name: 'Подмосковье "Архангельское"', region: 'Московская область', specialty: 'Восстановление', price: 'От 3200₽/день', features: ['Комплексная программа', 'Физиотерапия', 'Диетотерапия'] },
      ]
    },
  };

  const handleDiagnosisSelect = (diagnosis: string) => {
    setSelectedDiagnosis(diagnosis);
    if (diagnosis && diagnosisDatabase[diagnosis as keyof typeof diagnosisDatabase]) {
      setSanatoriumRecommendations(diagnosisDatabase[diagnosis as keyof typeof diagnosisDatabase].sanatoriums);
    } else {
      setSanatoriumRecommendations([]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Heart" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold">Сан-Карта.ру</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#info" className="text-sm hover:text-primary transition-colors">Что это</a>
              <a href="#where" className="text-sm hover:text-primary transition-colors">Где оформить</a>
              <a href="#sanatoriums" className="text-sm hover:text-primary transition-colors">Санатории</a>
              <a href="#faq" className="text-sm hover:text-primary transition-colors">Вопросы</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Санаторно-курортная карта
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Всё о санаторно-курортных картах: оформление, стоимость, санатории
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-3">
              <Input
                placeholder="Поиск по порталу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-lg py-6"
              />
              <Button size="lg" className="px-8" onClick={handleSearch}>
                <Icon name="Search" size={20} />
              </Button>
            </div>
            {searchResults.length > 0 && (
              <div className="mt-4 bg-white rounded-lg shadow-lg p-4 text-left">
                <p className="text-sm text-muted-foreground mb-2">Найдено результатов: {searchResults.length}</p>
                <ul className="space-y-2">
                  {searchResults.map((result, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-2">
                      <Icon name="CheckCircle" className="text-primary" size={16} />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {searchQuery && searchResults.length === 0 && searchQuery.length > 0 && (
              <div className="mt-4 bg-white rounded-lg shadow-lg p-4 text-left">
                <p className="text-sm text-muted-foreground">По запросу "{searchQuery}" ничего не найдено</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <select
              className="px-4 py-2 border rounded-md bg-white"
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
            >
              <option value="">Ваш возраст</option>
              <option value="18-35">18-35 лет</option>
              <option value="36-50">36-50 лет</option>
              <option value="51-60">51-60 лет</option>
              <option value="60+">60+ лет</option>
            </select>

            <select
              className="px-4 py-2 border rounded-md bg-white"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">Ваш регион</option>
              <option value="moscow">Москва</option>
              <option value="spb">Санкт-Петербург</option>
              <option value="kazan">Казань</option>
              <option value="sochi">Сочи</option>
              <option value="other">Другой регион</option>
            </select>
          </div>
        </div>
      </section>

      <section id="info" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Виды санаторно-курортных карт</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {mainSections.map((section) => (
              <Card key={section.id} className="hover-scale cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={section.icon as any} className="text-primary" size={24} />
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.subtitle}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {infoBlocks.map((block, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <Icon name={block.icon as any} className="text-primary mb-2" size={24} />
                  <CardTitle className="text-lg">{block.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{block.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="where" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Где оформить карту</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Выберите удобный способ оформления санаторно-курортной карты
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {whereToGet.map((option, idx) => (
              <Card key={idx} className="hover-scale">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={option.icon as any} className="text-primary" size={32} />
                  </div>
                  <CardTitle>{option.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{option.time}</Badge>
                    <Badge variant="outline">{option.cost}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {option.steps.map((step, stepIdx) => (
                      <li key={stepIdx} className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">
                          {stepIdx + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <Button className="w-full mt-4">Подробнее</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="sanatoriums" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Выбор санатория</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Помогаем подобрать оптимальный санаторий для вашего лечения и отдыха
          </p>

          <Tabs defaultValue="goals" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="goals">Цели лечения</TabsTrigger>
              <TabsTrigger value="льготы">Льготы</TabsTrigger>
              <TabsTrigger value="regions">Регионы</TabsTrigger>
              <TabsTrigger value="foreign">Зарубежные</TabsTrigger>
            </TabsList>

            <TabsContent value="goals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Подбор санатория по диагнозу</CardTitle>
                  <CardDescription>Выберите ваше заболевание или цель лечения</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <select
                    className="w-full px-4 py-3 border rounded-md bg-white"
                    value={selectedDiagnosis}
                    onChange={(e) => handleDiagnosisSelect(e.target.value)}
                  >
                    <option value="">Выберите диагноз или цель...</option>
                    <option value="cardio">Сердечно-сосудистые заболевания</option>
                    <option value="joint">Заболевания опорно-двигательного аппарата</option>
                    <option value="nervous">Нервная система и стресс</option>
                    <option value="respiratory">Органы дыхания</option>
                    <option value="digestive">Желудочно-кишечный тракт</option>
                    <option value="rehabilitation">Реабилитация после COVID-19</option>
                  </select>

                  {sanatoriumRecommendations.length > 0 && (
                    <div className="space-y-4 mt-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Icon name="CheckCircle" className="text-green-600 mt-1" size={20} />
                          <div>
                            <p className="font-semibold text-green-900">
                              Найдено {sanatoriumRecommendations.length} санаториев
                            </p>
                            <p className="text-sm text-green-700 mt-1">
                              Специализация: {diagnosisDatabase[selectedDiagnosis as keyof typeof diagnosisDatabase]?.name}
                            </p>
                          </div>
                        </div>
                      </div>

                      {sanatoriumRecommendations.map((sanatorium, idx) => (
                        <Card key={idx} className="hover-scale">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-lg">{sanatorium.name}</CardTitle>
                                <CardDescription>{sanatorium.region}</CardDescription>
                              </div>
                              <Badge variant="secondary">{sanatorium.price}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Icon name="Stethoscope" className="text-primary" size={18} />
                                <span className="text-sm font-medium">{sanatorium.specialty}</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {sanatorium.features.map((feature: string, fIdx: number) => (
                                  <Badge key={fIdx} variant="outline" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                              <Button size="sm" className="w-full mt-2">
                                Узнать подробнее
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="льготы" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Icon name="Gift" className="text-primary" size={20} />
                      <span>Бесплатные путевки для льготников</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Medal" className="text-primary" size={20} />
                      <span>Путевки для военнослужащих</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Heart" className="text-primary" size={20} />
                      <span>Льготы для инвалидов</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Users" className="text-primary" size={20} />
                      <span>Льготы пенсионерам и предпенсионерам</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Ticket" className="text-primary" size={20} />
                      <span>Путевки по сертификатам (Мосгортур)</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6">Узнать о своих льготах</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="regions" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">Популярные санаторные регионы России:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline">Сочи и Крым</Button>
                    <Button variant="outline">Кавказские Минеральные Воды</Button>
                    <Button variant="outline">Алтай</Button>
                    <Button variant="outline">Подмосковье</Button>
                    <Button variant="outline">Урал</Button>
                    <Button variant="outline">Башкирия</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="foreign" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">Зарубежные санатории, принимающие российские карты:</p>
                  <ul className="space-y-2">
                    <li>🇧🇾 Беларусь (Минск, Гродно, Витебск)</li>
                    <li>🇰🇿 Казахстан (Алматы, Боровое)</li>
                    <li>🇦🇲 Армения (Джермук, Дилижан)</li>
                  </ul>
                  <Button className="w-full mt-6">Забронировать зарубежный санаторий</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="faq" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Частые вопросы</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Ответы на популярные вопросы о санаторно-курортных картах
          </p>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto bg-white rounded-lg">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-6">Какие анализы нужны для оформления?</AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="text-muted-foreground">
                  Для взрослых: общий анализ крови (ОАК), общий анализ мочи (ОАМ), ЭКГ, флюорография (действительна 1 год), 
                  осмотр терапевта. Для детей дополнительно требуется справка об эпидокружении и прививках.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="px-6">Сколько действует санаторно-курортная карта?</AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="text-muted-foreground">
                  Для взрослых карта действительна 6 месяцев с момента выдачи. Для детей — 3 месяца. 
                  После истечения срока требуется оформление новой карты.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="px-6">Можно ли поехать в санаторий без карты?</AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="text-muted-foreground">
                  Да, можно. Некоторые санатории оформляют карту на месте в день заезда. Однако это может занять время 
                  и потребовать дополнительных анализов. Лучше оформить карту заранее.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="px-6">Как получить бесплатную путевку?</AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="text-muted-foreground">
                  Обратитесь в отделение социальной защиты населения по месту жительства. Льготникам предоставляются 
                  путевки по очереди. Также можно получить путевку через ФСС при наличии показаний.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="px-6">Какие есть противопоказания?</AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="text-muted-foreground">
                  Основные противопоказания: острые инфекционные заболевания, обострение хронических болезней, 
                  онкология в активной стадии, тяжелые психические расстройства, венерические заболевания.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="px-6">Чем отличается форма 072/у от 076/у?</AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="text-muted-foreground">
                  Форма 072/у — для взрослых, форма 076/у-04 — для детей до 18 лет. Детская карта имеет расширенный 
                  перечень обследований и требует справку о прививках и эпидокружении.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы оформить санаторно-курортную карту?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Найдите ближайший медцентр в вашем городе и оформите карту быстро
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              Найти медцентр
            </Button>
            <Button size="lg" variant="outline" className="px-8 text-white border-white hover:bg-white/10">
              Подобрать санаторий
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-white mb-4">Сан-Карта.ру</h3>
              <p className="text-sm">
                Информационный портал о санаторно-курортных картах и санаторном лечении
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Разделы</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Виды карт</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Где оформить</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Санатории</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Льготы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Помощь</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Частые вопросы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">О проекте</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Контакты</h4>
              <p className="text-sm mb-2">info@san-karta.ru</p>
              <p className="text-sm">8 (800) 555-35-35</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 Сан-Карта.ру. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;