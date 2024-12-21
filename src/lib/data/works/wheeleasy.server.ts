
import type { Work } from './types'

export const wheeleasy: Work = {
  id: 'wheeleasy',
  title:'WheelEasy',
  year: '2019 - 2023',
  url: 'https://wheeleasy.org',
  gradientColor: 'rgb(41 131 153 / 50%)',
  logo: {
    url: '/images/works-logo/wheeleasy.png',
    width: 301,
    height: 64
  },
  images: [
    {
      thumbnail: '/images/thumb/wez1-700.webp',
      url: '/images/works/wez1.webp',
      dimension: {
        thumb: {
          width: 700,
          height: 806
        },
        image: {
          width: 1920,
          height: 2211
        }
      },
      title: 'Homepage'
    },
    {
      thumbnail: '/images/thumb/wez2-700.webp',
      url: '/images/works/wez2.webp',
      dimension: {
        thumb: {
          width: 700,
          height: 347
        },
        image: {
          width: 1905,
          height: 944
        }
      },
      title: 'Search'
    },
    {
      thumbnail: '/images/thumb/wez3-700.webp',
      url: '/images/works/wez3.webp',
      dimension: {
        thumb: {
          width: 700,
          height: 347
        },
        image: {
          width: 1905,
          height: 944
        }
      },
      title: 'Hotspot'
    },
    {
      thumbnail: '/images/thumb/wez4-700.webp',
      url: '/images/works/wez4.webp',
      dimension: {
        thumb: {
          width: 700,
          height: 347
        },
        image: {
          width: 1905,
          height: 944
        }
      },
      title: 'Place Page'
    },
    {
      thumbnail: '/images/thumb/wez5-700.webp',
      url: '/images/works/wez5.webp',
      dimension: {
        thumb: {
          width: 700,
          height: 706
        },
        image: {
          width: 1535,
          height: 1549
        }
      },
      title: 'Donate Page'
    }
  ]
}