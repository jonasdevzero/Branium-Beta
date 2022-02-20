
import {
  Container,
  Core,

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

  RowH1G5,
  RowV1G5,
  
  RowH1G6,
  RowV1G6,

  RowV1G7,
  RowH1G7,

  RowV1G8,
  RowH1G8,
  
  RowH1G9,
  RowV1G9,
  RowH2G9,

  RowH1G10,
  RowV1G10,
  RowH2G10,

  RowH1G11,
  RowV1G11,

  RowH1G12,
  RowV1G12,
  RowH2G12,
  RowV2G12,
} from "~/styles/components/Animations/Cpu"

type CpuI = {
  color?: string;
}
export default function Cpu({ color = "green" }: CpuI) {

  return (
    <Container color={color}>
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

      <RowH1G5 />
      <RowV1G5 />

      <RowH1G6 />
      <RowV1G6 />

      <RowV1G7 />
      <RowH1G7 />

      <RowV1G8 />
      <RowH1G8 />

      <RowH1G9 />
      <RowV1G9 />
      <RowH2G9 />

      <RowH1G10 />
      <RowV1G10 />
      <RowH2G10 />

      <RowH1G11 />
      <RowV1G11 />

      <RowH1G12 />
      <RowV1G12 />
      <RowH2G12 />
      <RowV2G12 />

      <Core>
        <span>Branium</span>
      </Core>
    </Container>
  )
}