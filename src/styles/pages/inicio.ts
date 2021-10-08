import styled from "styled-components"

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;

    &:nth-child(odd) {
        background-color: #131313;
    }
    
    &.info {
        height: 45rem;
    }
`

export const Presentation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;

    h1 {
        font-size: 6.4rem;
        font-family: 'Arial', sans-serif;
        font-weight: 400;
        max-width: 90rem;
        text-align: center;
    }
`

export const CallToAction = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28rem;
    height: 7rem;

    background-color: #0c0c0c;
    margin-top: 3rem;
    border-radius: 1.5rem;
    font-size: 2.4rem;
    transition: background-color .2s ease;

    &:hover {
        background-color: #0a0a0a;
    }
`
export const SectionInner = styled.div`
    width: 80%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
        max-width: 40%;
        width: 100%;
        object-fit: cover;
    };
`

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 46%;
    font-family: 'Red Hat Text', sans-serif;

    h2 {
        font-size: 6.5rem;
        font-weight: 500;
        max-width: 45rem;
    };

    p {
        font-size: 2.8rem;
        margin-top: 2rem;
    };
`

export const SectionImage = styled.div`
    width: 45%;

    div {
        position: unset !important;
    }

    .image {
        object-fit: contain;
        width: 100% !important;
        position: relative !important;
        height: unset !important;
    }
`

export const Features = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    max-width: 40rem;

    & > div.row {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 3rem;
    };
`

export const Feature = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 15rem;

    cursor: pointer;
    transition: .3s transform ease-in-out;

    &:hover {
        transform: translateY(-.5rem);
    };
`

export const FeatureIcon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10rem;
    height: 10rem;

    border-radius: 1.5rem;
    border: solid .1rem #555;

    svg {
        font-size: 4.5rem;
    };
`

export const FeatureText = styled.span`
    height: 4.2rem;
    margin-top: 1rem;
    font-size: 1.8rem;
    font-family: 'Raleway', sans-serif;
    max-width: 10rem;
    text-align: center;
`

export const CallToActionCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
        font-size: 5rem;
        font-family: 'Noto Sans', sans-serif;
        font-weight: 500;
        text-align: center;
    };
    a {
        background-color: #0a0a0a;
    };
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 1100px) {
        ${Info} {
            h2 {
                font-size: 4.5rem;
            }
            p {
                font-size: 2rem;
            }
        }

        ${Feature} {
            height: 10rem;
            width: 10rem;

            ${FeatureIcon} {
                height: 7rem;
                width: 7rem;
                border: none;

                svg {
                    font-size: 3.5rem;
                }
            }

            ${FeatureText} {
                font-size: 1.5rem;
            }
        }

        ${CallToActionCard} {
            h3 {
                font-size: 4rem;
            }
        }
    }

    @media (max-width: 900px) {
        ${Presentation} > h1 {
            font-size: 5rem;
            max-width: 70rem;
        }

        ${CallToActionCard} {
            h3 {
                font-size: 4rem;
            }
        }
    }

    @media (max-width: 800px) {
        ${Section}.info {
            height: fit-content;
            padding: 7rem 0;
        }

        .section__image {
            width: 90% !important;
        }
            
        ${Info} {
            h2 {
                font-size: 3.5rem;
            }
            p {
                font-size: 1.7rem;
            }            
        }

        ${Features} > div.row {
            margin-top: 1.5rem;
        }

        ${Feature} {
            height: 7rem;
            width: 7rem;

            ${FeatureText} {
                display: none;
            }
        }

        ${CallToActionCard} {
            h3 {
                font-size: 3rem;
            }
        }
    }

    @media (max-width: 600px) {
        ${Presentation} {
            h1 {
                font-size: 4rem;
            }
        }

        ${CallToActionCard} {
            h3 {
                font-size: 2.5rem;
            }
        }
    }

    @media (max-width: 550px) {
        ${Features} {
            display: none;
        }

        ${SectionImage} {
            display: none;
        }

        ${Info} {
            max-width: 100%;

            P {
                font-size: 2rem;
            }
        }
    }
`
