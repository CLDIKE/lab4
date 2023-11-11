import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Page404 } from './Page404'
import { Home } from './Home.tsx'

export const Pages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    )
}
