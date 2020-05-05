import * as contentful from 'contentful'
import { ContentfulData } from '../lib/contentful';

const { space,  accessToken } = ContentfulData;

const client = contentful.createClient({
  space,
  accessToken
})

export const getAllEntries = () => {
  const data = [];
  client.getEntries().then(entries => {
    entries.items.forEach(entry => {
      data.push(entry.field)
    })
  })

  return data;
}

export const getAllEntriesByConentType = (contentType) => {
  const data = [];
  client.getEntries({ content_type: contentType }).then(entries => {
    entries.items.forEach(entry => {
      data.push(entry.fields)
    })
  })

  return data;
}
