import { JwtPayload } from "jwt-decode"

export interface ICurrenUser extends JwtPayload {
    user_id: number
    user_name: string
}