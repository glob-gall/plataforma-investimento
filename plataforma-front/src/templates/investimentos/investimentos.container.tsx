import {ContainerWithProps} from "@/@common/types/container.types";
import {InvestimentosContainerArgs} from "@templates/investimentos/investimentos.types";
import React from "react";

export const InvestimentosContainer = (props: ContainerWithProps<InvestimentosContainerArgs>) => {

    const [loading, setLoading] = React.useState<boolean>(false)
    const [formOpen, setFormOpen] = React.useState(false)
    const [movementOpen, setMovementOpen] = React.useState(false)

    return props.children({
        loading,
        formOpen,
        movementOpen,
        actions: {
            setFormOpen,
            setMovementOpen
        }
    })

};