type ChildrenWithOptionalArgs<T> = (args?: T) => JSX.Element
type ChildrenWithRequiredArgs<T> = (args: T) => JSX.Element

// eslint-disable-next-line @typescript-eslint/ban-types
export type ContainerWithProps<T = undefined, P = {}> = {
    children: T extends undefined ? ChildrenWithOptionalArgs<T> : ChildrenWithRequiredArgs<T>
} & P