import Head from 'next/head'
import ProjectLayout from '../../../components/ProjectLayout'

export default function ElevenFSProject() {
  const description = `Creating a content hub.

11:FS builds next-generation propositions for challengers in the financial services industry. 

They sit at the heart of the financial service and fin-tech community with an unparalleled reach through their media channels. 11:FS produce industry leading Podcasts, Videos, Events and Newsletters for existing firms looking to innovate, start-ups looking to scale, and everyone in between.

Visit 11:FS Content hub https://11fs.com/content-hub/

  const images: string[] = [
    '/images/projects/11fs/content1.jpg',
    '/images/projects/11fs/research2.jpg',
    '/images/projects/11fs/insights3.jpg'
  ]

  return (
    <>
      <Head>
        <title>11:FS Content Hub - Fede Casabona Portfolio</title>
        <meta name="description" content="11:FS Content Hub by Fede Casabona - Financial Services Content Platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Condensed:wght@300;400;700&family=Doto:wght@300&display=swap" rel="stylesheet" />
      </Head>

      <ProjectLayout
        projectName="11:FS / Content Hub"
        description={description}
        images={images}
      />
    </>
  )
}
