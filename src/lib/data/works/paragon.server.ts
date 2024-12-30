
import type { Work } from './types'

export const paragon: Work = {
  id: 'paragon',
  year: '2012 est.',
  title:'Solo Paragon Hotel',
  url: 'https://soloparagonhotel.com',
  gradientColor: 'rgba(207,27,14,0.5)',
  logo: {
    url: '/images/works-logo/paragon.avif',
    width: 580,
    height: 571
  },
  images: [
    {
      thumbnail: '/images/thumb/paragon1-700.avif',
      url: '/images/works/paragon1.avif',
      dimension: {
        thumb: {
          width: 700,
          height: 375
        },
        image: {
          width: 985,
          height: 527
        }
      },
      title: 'Home'
    },
    {
      thumbnail: '/images/thumb/paragon2-700.avif',
      url: '/images/works/paragon2.avif',
      dimension: {
        thumb: {
          width: 700,
          height: 375
        },
        image: {
          width: 985,
          height: 528
        }
      },
      title: 'About'
    },
    {
      thumbnail: '/images/thumb/paragon3-700.avif',
      url: '/images/works/paragon3.avif',
      dimension: {
        thumb: {
          width: 700,
          height: 372
        },
        image: {
          width: 985,
          height: 524
        }
      },
      title: 'Location'
    },
    {
      thumbnail: '/images/thumb/paragon5-700.avif',
      url: '/images/works/paragon5.avif',
      dimension: {
        thumb: {
          width: 700,
          height: 376
        },
        image: {
          width: 987,
          height: 530
        }
      },
      title: 'Image View'
    },
    {
      thumbnail: '/images/thumb/paragon6-700.avif',
      url: '/images/works/paragon6.avif',
      dimension: {
        thumb: {
          width: 700,
          height: 374
        },
        image: {
          width: 985,
          height: 526
        }
      },
      title: 'Promo'
    }
  ]
}