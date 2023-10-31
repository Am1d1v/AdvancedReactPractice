import React from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";


const Home = (props) => {
  return (
    <Card className='home'>
      <h1>Рады Вас Видеть Снова!</h1>
      <Button onClick={props.onLogout}>Выход</Button>
    </Card>
  );
};

export default Home;
