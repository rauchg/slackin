function getChannels() {
  const carry = []
  const channelsStr = process.env.SLACK_CHANNELS

  if (channelsStr) {
    channelsStr.split(',').forEach(c => {
      const channel = c.trim()

      if (!channel) return

      carry.push(channel[0] === '#' ? channel.substring(1) : channel)
    })
  }

  return carry
}

export const channels = getChannels()
