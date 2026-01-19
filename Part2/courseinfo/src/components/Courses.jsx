const Header = ({course}) => <h2>{course}</h2>

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({parts}) => {
  const result = parts.map(part => 
      <Part key={part.id} part={part} />
  )
  return(
    <div>
      {result}
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return(
    <b>total of {total} exercises</b>
  )
}

const Course = ({course}) => (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
)

const Courses = ({courses}) => {
  const result = courses.map(course =>
    <Course key={course.id} course={course}/>
  )
  return(
    <div>
       {result}
    </div>
  )
}

export default Courses