import sanityClient from '@sanity/client'
import imageURLBuilder from '@sanity/image-url'

export const client =  sanityClient({
    projectId: "y6tf3djm",
    dataset: "production",
    apiVersion: '2021-08-31',
    useCdn: true,
    token : process.env.SANITY_TOKEN,

})
const builder = imageURLBuilder(client);
export const urlFor = (source) =>
     builder.image(source);

