
import {
  Container,
  Col1,
  Col2,
  Col3,
  Col4,
  Col5,
  Col6,
  Col7,
  Col8,
  Col9,
  Col10,
  Col11,
  Col12,
  Col13,
  Col14,
  Col15,
  Col16,
  Col17,
  Col18,
} from "~/styles/components/Animations/Binary"

export default function Binary() {

  function renderBinary(b: string) {
    return b.split("").map((n, i) => (
      <span key={`binary-${n}-${i}`}>{n}</span>
    ))
  }

  return (
    <Container>
      <Col1>{renderBinary("01000010")}</Col1>
      <Col2>{renderBinary("01110010")}</Col2>
      <Col3>{renderBinary("01100001")}</Col3>
      <Col4>{renderBinary("01101110")}</Col4>
      <Col5>{renderBinary("01101001")}</Col5>
      <Col6>{renderBinary("01110101")}</Col6>
      <Col7>{renderBinary("01101101")}</Col7>
      <Col8>{renderBinary("00100000")}</Col8>
      <Col9>{renderBinary("01100010")}</Col9>
      <Col10>{renderBinary("01111001")}</Col10>
      <Col11>{renderBinary("00100000")}</Col11>
      <Col12>{renderBinary("01100100")}</Col12>
      <Col13>{renderBinary("01100101")}</Col13>
      <Col14>{renderBinary("01110110")}</Col14>
      <Col15>{renderBinary("01111010")}</Col15>
      <Col16>{renderBinary("01100101")}</Col16>
      <Col17>{renderBinary("01110010")}</Col17>
      <Col18>{renderBinary("01101111")}</Col18>
    </Container>
  )
}
