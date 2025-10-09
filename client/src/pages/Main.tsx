import { Routes, Route } from 'react-router-dom'
import { Home } from './Home'

const Main = () => (
    <Routes>
        <Route
            path='/'
            element={
                <>
                    <Home />
                </>
            }
        ></Route>
    </Routes>
)

export default Main
