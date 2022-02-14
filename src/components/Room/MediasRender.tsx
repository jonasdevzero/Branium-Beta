import Image from "next/image";
import { ContactMediaMessage, GroupMediaMessage } from "~/types/user";

import { AudioPlayer } from "..";
import {
  Container,
  ImageContainer,
  Document,
  ImageGroupContainer,
  ImageGroup,
} from "~/styles/components/Room/MediasRender";
import { FiDownload } from "react-icons/fi";

interface MediasRenderI {
  medias?: ContactMediaMessage[] | GroupMediaMessage[];
  viewFullScreen(medias: any[], initialIndex: number): void
}

export default function MediasRender({ medias, viewFullScreen }: MediasRenderI) {

  function renderMedias(medias: ContactMediaMessage[] | GroupMediaMessage[]) {
    const isImageGroup = !medias.find(m => m.type !== "image") && medias.length > 1;

    return isImageGroup ? renderImageGroup(medias) : medias.map(renderMedia)
  }

  function renderMedia(media: ContactMediaMessage | GroupMediaMessage, index: number, arr: any[]) {
    switch (media.type) {
      case "image":
        return (
          <ImageContainer key={media.id} onClick={() => viewFullScreen(arr, index)}>
            <Image src={media.url} alt="" layout="fill" priority />
          </ImageContainer>
        )
      case "video":
        return (
          <video key={media.id} src={media.url} controls />
        )
      case "audio":
        return (
          <AudioPlayer key={media.id} src={media.url} />
        )
      case "document":
        return (
          <Document key={media.id}>
            <div>
              <a href={media.url} download>
                <FiDownload />
              </a>

              <span>{media.url.split(/[\S ]*\./gm)[1]}</span>
            </div>

            <p>{media.url.split("-")[1]}</p>
          </Document>
        )
    }
  }

  function renderImageGroup(medias: ContactMediaMessage[] | GroupMediaMessage[]) {
    const moreThan4 = medias.length > 4;

    return (
      <ImageGroupContainer>
        {medias.slice(0, 4).map((m, i) => (
          <ImageGroup 
            key={m.id} 
            className={moreThan4 && i === 3 ? "plus" : ""}
            onClick={() => viewFullScreen(medias, i)}
          >
            <Image key={m.id} src={m.url} layout="fill" priority />
          </ImageGroup>
        ))}

        {moreThan4 ? (
          <span className="plus">{medias.length - 4}+</span>
        ) : null}
      </ImageGroupContainer>
    )
  }

  return (
    medias?.length ? <Container>{renderMedias(medias)}</Container> : null
  )
}