import { useEffect } from "react";
import ReactDOM from 'react-dom'


export const ModalCreator = ({children}) => {

  const portalNode= document.createElement('div')

  useEffect( () => {
      document.body.appendChild(portalNode) ;

      return () => {
          portalNode.remove();
      }
  }, [portalNode])

  return ReactDOM.createPortal(children, portalNode)

};