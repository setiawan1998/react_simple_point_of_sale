import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({children, ...rest}) => {
    const token = localStorage.getItem('Authorization')
    const access = localStorage.getItem('access')
    const routeAccess = { ...rest.access }
    return(
        <Route
            {...rest}
            render={()=>
                token===null?(
                    <Redirect to="/login"/>
                ):routeAccess[0]===access?(
                    children
                ):(
                    <Redirect to="/login"/>
                )
            }
        />
    )
}
export default PrivateRoute;