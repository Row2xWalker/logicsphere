export {default} from 'next-auth/middleware'

export const config = {matcher: [
    "/", 
    "/records/par",
    "/records/ptr"
]};