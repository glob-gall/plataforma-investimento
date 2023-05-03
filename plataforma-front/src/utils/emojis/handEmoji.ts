

function handeEmoji(){
  const handEmojis = [
    '✌️','🫶','👋',
    '🤙','🔥','👍',
    '🤝','🤟','🖖',
    '🫰',
  ]
  return handEmojis[Math.floor(Math.random() * handEmojis.length)] 
}

export default handeEmoji