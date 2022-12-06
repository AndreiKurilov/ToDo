import { Link } from 'react-router-dom';

export const Projects = (props) => {
  
  const ProjectList = [
    { id: 1, title: 'Project 1' },
  ]
  
  return (
    <>
      <h1>Projects</h1>

      <div className="list-group" style={{width: 400}}>
        { ProjectList.map((elem) => (
          <div className="list-group-item mt-3" style={{background: "", height: 60, display: 'flex', alignItems: 'center', borderRadius: 6}}  key={elem.id}>
            <Link to={`/project/${elem.id}`} style={{textDecoration: "none", fontSize: 24}}>{elem.title}</Link>
          </div>
        ))}
      </div>
    </>
  )
}
