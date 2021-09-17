
export function setOption(option: "contacts" | "groups") {
    const optName = {
        contacts: "Contatos",
        groups: "Grupos"
    }

    return {
        type: "SET_OPTION",
        option,
        optionName: optName[option]
    }
}
