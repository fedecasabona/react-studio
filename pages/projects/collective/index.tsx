import Head from 'next/head'
import ProjectLayout from '../../../components/ProjectLayout'

export default function CollectiveProject() {
  const description = `Web and mobile platform seamlessly connecting residents of a co-living community.
The Collective offers co-living spaces that blend private living areas with distinctive amenities.

Collaboration to design an online platform that enables residents to connect, share, and stay informed about activities organised within the community. This project encompassed the complete end-to-end design of both web and mobile experiences, alongside a comprehensive rebrand. The challenge was to create a premium yet approachable experience that resonates with The Collective’s younger millennial audience. 
Results:  A unique, user-centered web and mobile platform that puts community engagement front and center.  The launch of the web and mobile platform significantly boosted resident engagement, with active participation in community events increasing by 35% within the first three months.  By simplifying access to community information and activities, the platform drove a significant increase in event RSVPs, fostering stronger connections among residents, enhancing the sense of belonging within the co-living spaces. 

User Experience
User interface 
Brand
Animation

  const images: string[] = [
    '/images/projects/collective/collaboration1.jpg',
    '/images/projects/collective/community2.jpg',
    '/images/projects/collective/network3.jpg'
  ]

  return (
    <>
      <Head>
        <title>COLLECTIVE - Fede Casabona Portfolio</title>
        <meta name="description" content="COLLECTIVE project by Fede Casabona - Creative Collaboration Platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Condensed:wght@300;400;700&family=Doto:wght@300&display=swap" rel="stylesheet" />
      </Head>

      <ProjectLayout
        projectName="COLLECTIVE"
        description={description}
        images={images}
      />
    </>
  )
}
