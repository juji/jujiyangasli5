

import fs from 'fs/promises'
import Sharp from 'sharp'
import path from 'path'


async function resize(
  file: string,
  target: string
){

  let f = target.split('.')
  f[ f.length -1 ] = 'avif'
  

  const sharp = Sharp(file)
  const res = await sharp.avif().resize({ width: 600, kernel: Sharp.kernel.lanczos3 }).toFile(f.join('.'))
  console.log(res)

}

///
;(async () => {
  
  console.log(__dirname)
  
  const imagesDir = path.resolve(__dirname, '../static/images/play')
  const target = path.resolve(__dirname, 'play')

  const files = await fs.readdir(imagesDir)
  for(let i = 0; i < files.length; i++){
    await resize(
      path.resolve(imagesDir, files[i]), 
      path.resolve(target, files[i])
    )
  }
  

})()

