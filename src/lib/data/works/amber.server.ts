import type { Work } from './types'

export const amber: Work = {
  zombie: true,
  id: 'amber',
  title:'Amber Video',
  year: '2018',
  url: 'https://www.linkedin.com/company/ambervideo',
  gradientColor: 'rgb(255 147 0 / 50%)',
  logo: {
    url: '/images/works-logo/amber.avif',
    width: 200,
    height: 200
  },
  images: [
    {
      thumbnail: '/images/thumb/amber-app-700.avif',
      url: '/images/works/amber-app.avif',
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
      thumbnail: '/images/thumb/amber-videos-700.avif',
      url: '/images/works/amber-videos.avif',
      dimension: {
        thumb: {
          width: 700,
          height: 736
        },
        image: {
          width: 1425,
          height: 1498
        }
      },
      title: 'Videos'
    },
    {
      thumbnail: '/images/thumb/amber-video-700.avif',
      url: '/images/works/amber-video.avif',
      dimension: {
        thumb: {
          width: 700,
          height: 883
        },
        image: {
          width: 1425,
          height: 1798
        }
      },
      title: 'Video Detail with comparison'
    }
  ]
}