

function handeEmoji(){
  const pigEmojis = [
    '✌️','🫶','👋',
    '🤙','🔥','👍',
    '🤝','🤟','🖖',
    '🫰',
  ]
  return pigEmojis[Math.floor(Math.random() * pigEmojis.length)] 
}

export default handeEmoji