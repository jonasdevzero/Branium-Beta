
import {
  Container,
} from "~/styles/components/Room/Group/Info"

export default function Info({ close }: { close(): void }) {

  return (
    <>
      <div className="overlay" onClick={close}></div>

      <Container>
        <h1>Info</h1>
      </Container>
    </>
  )
}