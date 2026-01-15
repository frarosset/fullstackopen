const Header = (props) => <h2>{props.course}</h2>;

const Content = (props) => (
  <div>
    {props.parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </div>
);

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>total of {total} exercises</p>;
};

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;
