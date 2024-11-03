import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Provider } from 'react-redux'
import { store } from "./app/store"

export const App = () => {
    return (
      <Provider store={store}>
        <ChakraProvider value={defaultSystem}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </Provider >
    )
}

export default App