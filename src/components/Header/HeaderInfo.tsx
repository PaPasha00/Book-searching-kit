type TypesSelect = {
    position: string;
    name: string;
}

export const CATEGORIES: TypesSelect[] = [
    { position: 'all', name: 'Все' },
    { position: 'all', name: 'Искусство' },
    { position: 'all', name: 'Автобиография' },
    { position: 'all', name: 'Компьютеры' },
    { position: 'all', name: 'История' },
    { position: 'all', name: 'Медицина' },
    { position: 'all', name: 'Поэзия' },
]
export const SORTED: TypesSelect[] = [
    { position: 'relevance', name: 'актуальность' },
    { position: 'newest', name: 'новейшие' },
]