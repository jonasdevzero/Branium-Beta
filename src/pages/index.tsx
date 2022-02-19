import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { constant } from "../constant"

import { Header, Footer } from "../components"
import {
  Container,
  Landing,
  LandingText,
  SlideDown,
  Section,
  CallToAction,
  SectionInner,
  Info,
  SectionImage,
  Features,
  Feature,
  FeatureIcon,
  FeatureText,
  CallToActionCard
} from "../styles/pages/inicio"
import {
  FiUser,
  FiUsers,
  FiPhone,
  FiFile,
  FiMic,
  FiActivity,
  FiChevronDown,
} from "react-icons/fi"

export default function Home() {

  function slideDown() {
    const landing = document.getElementById("landing")
    if (!landing) return;

    window.scroll({
      top: landing.offsetHeight,
      behavior: "smooth"
    })
  }

  return (
    <Container>
      <Head>
        <title>Branium</title>
      </Head>

      <Header links={true} />

      <Landing id="landing">
        <div className="text">
          <LandingText>
            Um Chat Brasileiro para
          </LandingText>

          <LandingText>
            Brasileiros
          </LandingText>
        </div>

        <Link href={constant.routes.SIGN_UP} passHref>
          <CallToAction>Começe agora!</CallToAction>
        </Link>

        <SlideDown type="button" onClick={slideDown}>
          <FiChevronDown />
        </SlideDown>
      </Landing>

      <Section className="info">
        <SectionInner>
          <Info>
            <h2>Simples e Rápido</h2>
            <p>Converse com seus amigos num espaço confortável e brasileiro.</p>
          </Info>

          <SectionImage>
            <Image src="/images/chat-baloons.svg" alt="" layout="fill" className="image" />
          </SectionImage>
        </SectionInner>
      </Section>

      <Section className="info">
        <SectionInner>
          <Features>
            <div className='row'>
              <Feature>
                <FeatureIcon> <FiUser /> </FeatureIcon>
                <FeatureText>Chat privado</FeatureText>
              </Feature>

              <Feature>
                <FeatureIcon> <FiUsers /> </FeatureIcon>
                <FeatureText>Grupos</FeatureText>
              </Feature>

              <Feature>
                <FeatureIcon> <FiPhone /> </FeatureIcon>
                <FeatureText>Ligação voz/vídeo</FeatureText>
              </Feature>
            </div>

            <div className='row'>
              <Feature>
                <FeatureIcon> <FiFile /> </FeatureIcon>
                <FeatureText>Envie Arquivos</FeatureText>
              </Feature>

              <Feature>
                <FeatureIcon> <FiMic /> </FeatureIcon>
                <FeatureText>Mensagens de Voz</FeatureText>
              </Feature>

              <Feature>
                <FeatureIcon> <FiActivity /> </FeatureIcon>
                <FeatureText>Status</FeatureText>
              </Feature>
            </div>
          </Features>

          <Info>
            <h2>Plataforma completa</h2>
            <p>Tenha uma experiência completa com tudo o que um chat possui.</p>
          </Info>
        </SectionInner>
      </Section>

      <Section className="info">
        <CallToActionCard>
          <h3>Vamos Nessa!</h3>
          <h3>Inscreva-se Agora para Brasileirar Aqui!</h3>

          <Link href={constant.routes.SIGN_UP} passHref>
            <CallToAction>Inscreva-se!</CallToAction>
          </Link>
        </CallToActionCard>
      </Section>

      <Footer />
    </Container >
  )
}
