import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Projects } from './pages/Projects/Projects'
import { ToDo } from './pages/ToDo/ToDo'

export const App = () => {
  return (
    <>
      <div className="container py-3">
          <BrowserRouter basename={window.location.pathname || ''}>
            <Routes>
              <Route path="/" element={ <Projects /> } />
              <Route path="/project/:id" element={ <ToDo /> } />
            </Routes>
          </BrowserRouter>
      </div>
    </>
  )
}
