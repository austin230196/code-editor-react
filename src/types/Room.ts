export default interface Room {
    _id: string
    roomId: string
    owner: string
    participants: string[]
    createdAt: Date
    updatedAt: Date
}