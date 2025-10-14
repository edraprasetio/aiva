import { Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { FileProvider } from '../components/FileContext'

const Main = () => (
    <Routes>
        <Route
            path='/'
            element={
                <>
                    <FileProvider>
                        <Home />
                    </FileProvider>
                </>
            }
        ></Route>
    </Routes>
)

export default Main
