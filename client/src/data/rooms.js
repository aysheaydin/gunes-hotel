/**
 * Rooms Data - Central source of truth
 * Tüm oda bilgileri burada tutulur
 */

export const getRoomsData = (t) => [
  {
    id: 1,
    nameKey: 'rooms.double',
    descKey: 'rooms.doubleDesc',
    image: '/img/double-room-1.webp',
    images: ['/img/double-room-1.webp', '/img/double-room-2.webp', '/img/double-room-3.webp'],
    guests: 2,
    beds: '1 Çift Kişilik Yatak',
    price: '1.500',
    features: [
      { icon: 'fa-users', textKey: 'rooms.features.guests', count: 2 },
      { icon: 'fa-tint', textKey: 'rooms.features.hotWater' },
      { icon: 'fa-mountain', textKey: 'rooms.features.mountainView' },
      { icon: 'fa-coffee', textKey: 'rooms.features.teaCoffee' }
    ],
    popular: false
  },
  {
    id: 2,
    nameKey: 'rooms.twin',
    descKey: 'rooms.twinDesc',
    image: '/img/twin-room-1.webp',
    images: ['/img/twin-room-1.webp', '/img/twin-room-2.webp', '/img/twin-room-3.webp'],
    guests: 2,
    beds: '2 Tek Kişilik Yatak',
    price: '1.500',
    features: [
      { icon: 'fa-users', textKey: 'rooms.features.guests', count: 2 },
      { icon: 'fa-tint', textKey: 'rooms.features.hotWater' },
      { icon: 'fa-mountain', textKey: 'rooms.features.mountainView' },
      { icon: 'fa-coffee', textKey: 'rooms.features.teaCoffee' }
    ],
    popular: true
  },
  {
    id: 3,
    nameKey: 'rooms.triple',
    descKey: 'rooms.tripleDesc',
    image: '/img/triple-room.webp',
    images: ['/img/triple-room.webp', '/img/triple-room-1.webp', '/img/triple-room-2.webp'],
    guests: 3,
    beds: '3 Tek Kişilik Yatak',
    price: '2.000',
    features: [
      { icon: 'fa-users', textKey: 'rooms.features.guests', count: 3 },
      { icon: 'fa-tint', textKey: 'rooms.features.hotWater' },
      { icon: 'fa-mountain', textKey: 'rooms.features.mountainView' },
      { icon: 'fa-coffee', textKey: 'rooms.features.teaCoffee' }
    ],
    popular: false
  },
  {
    id: 4,
    nameKey: 'rooms.family',
    descKey: 'rooms.familyDesc',
    image: '/img/family-room.webp',
    images: ['/img/family-room.webp', '/img/gallery-28.webp', '/img/gallery-29.webp'],
    guests: 5,
    beds: '1 Çift + 3 Tek Kişilik Yatak',
    price: '3.000',
    features: [
      { icon: 'fa-users', textKey: 'rooms.features.guests', count: 5 },
      { icon: 'fa-tint', textKey: 'rooms.features.hotWater' },
      { icon: 'fa-mountain', textKey: 'rooms.features.mountainView' },
      { icon: 'fa-coffee', textKey: 'rooms.features.teaCoffee' },
      { icon: 'fa-home', textKey: 'rooms.features.spacious' }
    ],
    popular: false,
    familyFriendly: true
  }
]
