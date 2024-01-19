import { ReactNode } from "react";

import { Nav } from "../components";


type ILayout = {
    children: ReactNode
}

const Layout = ({children}: ILayout) => {
    return (
        <div className="w-screen h-screen">
            <Nav />
            <div>
                {children}
            </div>
        </div>
    )
} 


export default Layout;