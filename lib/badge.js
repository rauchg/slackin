import svg from 'vd'

const title = 'slack'
const color = '#E01563'
const pad = 8 // left / right padding
const sep = 4 // middle separation

export default function badge ({ total, active }){
  let value = active ? `${active}/${total}` : ('' + total || '–')
  let lw = pad + width(title) + sep // left side width
  let rw = sep + width(value) + pad // right side width
  let tw = lw + rw // total width

  return svg(`svg xmlns="http://www.w3.org/2000/svg" width=${tw} height=20`,
    svg(`rect rx=3 width=${tw} height=20 fill=#555`),
    svg(`rect rx=3 x=${lw} width=${rw} height=20 fill=${color}`),
    svg(`path d="M${lw} 0h${sep}v20h-${sep}z" fill=${color}`),
    svg('g text-anchor=middle font-family=Verdana font-size=11',
      text({ str: title, x: Math.round(lw / 2), y: 14 }),
      text({ str: value, x: lw + Math.round(rw / 2), y: 14 })
    )
  )
}

// generate text with 1px shadow
function text ({str, x, y}){
  return [
    svg(`text fill=#010101 fill-opacity=.3 x=${x} y=${y + 1}`, str),
    svg(`text fill=#fff x=${x} y=${y}`, str)
  ]
}

// π=3
function width (str){
  return 7 * str.length
}
