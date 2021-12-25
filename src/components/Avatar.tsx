import Image from "next/image"
import store from "../store"

import { AvatarWrapper } from "../styles/components/Avatar"

type AvatarProps = {
    src?: string
    size?: string
    user?: boolean
}

const noProfile = "/images/profile-picture.png"

export default function Avatar({ src, size, user }: AvatarProps) {

    return (
        <AvatarWrapper size={size}>
            <Image 
                src={user ? (store.getState().user?.picture || noProfile) : (src || noProfile)} 
                alt="" 
                layout="fill"
            />
        </AvatarWrapper>
    )
}