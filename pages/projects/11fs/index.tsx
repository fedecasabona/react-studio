import Head from 'next/head'
import ProjectLayout from '../../../components/ProjectLayout'

export default function ElevenFSProject() {
  const description = `Creating a content hub.

11:FS builds next-generation propositions for challengers in the financial services industry. 
They sit at the heart of the financial service and fin-tech community with an unparalleled reach through their media channels. 11:FS produce industry leading Podcasts, Videos, Events and Newsletters for existing firms looking to innovate, start-ups looking to scale, and everyone in between.
@International SOS
DESIGNING A SEAMLESS TRAVEL ASSISTANCE EXPERIENCE FROM THE GROUND UP.

International SOS is a global leader in health and security services, offering medical assistance, security support, travel risk management, and crisis response for organizations and their people.
Over 5 months engagement, I was tasked with defining the a mobile app design to support International SOS’s mission — helping their customers navigate issues during business travel.
The design outcome empowers companies to provide their employees with a reliable travel companion, simplifying travel logistics and improving crisis response wherever business takes them.Deliveries included a fully prototyped mobile app aligned with International SOS’s brand guidelines and the diverse needs of its global user base. I established a scalable design system to ensure visual and functional consistency across platforms, supporting future iterations. 


Visit 11:FS Content hub https://11fs.com/content-hub/`

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
