import React from 'react'

export const getData = async () => ({
  org: {
    name: 'ZEIT',
    logo: 'https://avatars.slack-edge.com/2015-10-14/12533264214_c5dd3e906cd6321497a2_132.jpg',
  },
  users: {
    active: 60,
    total: 670,
  },
})

export const useData = () => {
  const [data, setData] = React.useState()

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getData()
      setData(data)
    }
    fetchData()
  }, [])

  return data
}
