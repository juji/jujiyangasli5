
import type { Work } from './types'

export const bridestory: Work = {
  id: 'bridestory',
  year: '2015 - 2016',
  title:'Bridestory - Career',
  url: 'https://careers.bridestory.com',
  gradientColor: 'rgb(255 118 107 / 52%)',
  logo: {
    url: '/images/works-logo/bridestory.webp',
    width: 112,
    height: 27
  },
  images: [
    {
      thumbnail: '/images/thumb/bridestory-careers-700.webp',
      url: '/images/works/bridestory-careers.webp',
      dimension: {
        thumb: {
          width: 700,
          height: 369
        },
        image: {
          width: 1425,
          height: 752
        }
      },
      title: 'Home'
    },
    {
      thumbnail: '/images/thumb/bridestory1-700.webp',
      url: '/images/works/bridestory1.webp',
      dimension: {
        thumb: {
          width: 700,
          height: 589
        },
        image: {
          width: 1425,
          height: 1200
        }
      },
      title: 'Home full page'
    },
    {
      thumbnail: '/images/thumb/bridestory2-700.webp',
      url: '/images/works/bridestory2.webp',
      dimension: {
        thumb: {
          width: 700,
          height: 791
        },
        image: {
          width: 1425,
          height: 1610
        }
      },
      title: 'Job Detail'
    }
  ]
}