
import { Navigate } from 'react-router-dom';




export const PublicRoutes = ({isAuthenticated, children}) => {

    return isAuthenticated
    ?  <Navigate to="/" />
    : children
        
}
