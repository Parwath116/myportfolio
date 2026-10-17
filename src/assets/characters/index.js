// Single place that knows about every character image.
// h / w are the native pixel sizes of each cleaned cut-out. They let GraffitiCharacter
// keep every pose at a consistent scale (a sitting pose is shorter than a standing one).
import stand from './stand.webp'
import wave from './wave.webp'
import walk1 from './walk1.webp'
import walk2 from './walk2.webp'
import walk3 from './walk3.webp'
import point from './point.webp'
import sit from './sit.webp'
import lookback from './lookback.webp'

import neutral from './neutral.webp'
import happy from './happy.webp'
import smile from './smile.webp'
import serious from './serious.webp'
import thinking from './thinking.webp'
import sideLook from './side-look.webp'

import coding from './coding.webp'
import explorer from './explorer.webp'
import professional from './professional.webp'
import future from './future.webp'
import traditional from './traditional.webp'

export const STAND_H = 849 // native height of the standing pose = 1.0 scale

export const POSES = {
  stand: { src: stand, w: 291, h: 849 },
  wave: { src: wave, w: 330, h: 849 },
  walk1: { src: walk1, w: 435, h: 858 },
  walk2: { src: walk2, w: 390, h: 840 },
  walk3: { src: walk3, w: 342, h: 858 },
  point: { src: point, w: 459, h: 864 },
  sit: { src: sit, w: 402, h: 675 },
  lookback: { src: lookback, w: 349, h: 855 },
}

export const WALK_CYCLE = ['walk1', 'walk2', 'walk3', 'walk2']

export const FACES = { neutral, happy, smile, serious, thinking, side: sideLook }

// Full illustrated outfit panels (they come with their own paint-splash backgrounds).
export const POSTERS = {
  coding: { src: coding, w: 620, h: 1114, alt: 'Comic graffiti illustration of Parwath in a black hoodie coding on a laptop' },
  explorer: { src: explorer, w: 610, h: 1118, alt: 'Comic graffiti illustration of Parwath in the college explorer outfit with a backpack' },
  professional: { src: professional, w: 600, h: 1154, alt: 'Comic graffiti illustration of Parwath in a smart-casual professional outfit holding a laptop' },
  future: { src: future, w: 507, h: 940, alt: 'Comic graffiti illustration of Parwath from behind, looking at a sunset city skyline' },
  traditional: { src: traditional, w: 760, h: 1150, alt: 'Comic graffiti illustration of Parwath in the signature yellow kurta' },
}
