export {};

declare global {
    interface String {
        toURL(payload: object): string
    }
}