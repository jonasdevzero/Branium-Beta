
import {
  Container,
  Card,

  RowV1,
  RowV2,

  RowH1,
  RowH2,

  RowV1G1,
  RowH1G1,

  RowH1G2,
  RowV1G2,
  RowH2G2,

  RowV1G3,
  RowH1G3,
  RowV2G3,

  RowV1G4,
  RowH1G4,
  RowV2G4,
} from "~/styles/components/BraniumAnimation"

export default function BraniumAnimation() {

  return (
    <Container>
      <RowV1 />
      <RowV2 />

      <RowH1 />
      <RowH2 />

      <RowV1G1 />
      <RowH1G1 />

      <RowH1G2 />
      <RowV1G2 />
      <RowH2G2 />

      <RowV1G3 />
      <RowH1G3 />
      <RowV2G3 />

      <RowV1G4 />
      <RowH1G4 />
      <RowV2G4 />

      <Card>
        <span>Branium</span>
      </Card>
    </Container>
  )
}